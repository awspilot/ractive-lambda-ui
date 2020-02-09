
import tabledata from '../tabledata';

export default Ractive.extend({
	components: {
		tabledata: tabledata,
	},
	template: `

		<div class='pull-right' style='padding: 7px;'>

			<a class="btn btn-xs btn-default {{#if selection_length > 0}}{{else}}disabled{{/if}}" {{#if selection_length > 0 }}on-click='delete'{{/if}}> <icon-trash /> </a>

			<a class="btn btn-xs btn-default" on-click='refresh' > <icon-refresh /> </a>

		</div>

		<tabledata columns={{columns}} rows={{rows}} style='top: 38px;margin: 3px;' />
	`,
	on: {

		delete() {
			var ractive=this;

			var to_delete = this.get('rows').filter(function(r) { return r[0].selected === true } ).map(function(r) { return r[0].item })

			async.each(to_delete, function(item, cb ) {
				var params = {
					logGroupName: '/aws/lambda/' + ractive.get('function.name'),
					logStreamName: item.logStreamName,
				};
				cloudwatchlogs.deleteLogStream(params, function(err, data) {
					console.log( err, data )
					ractive.set('rows', ractive.get('rows').filter(function(r) { return r[0].item.logStreamName !== item.logStreamName }) )
					cb()
				});
			}, function() {

			})
		},

		refresh() {
			this.refresh()
		},

		init() {
			var ractive=this;

			this.refresh()

			ractive.on('tabledata.selectrow', function(context) {
				var keypath = context.resolve()
				ractive.set(keypath + '.0.selected', !ractive.get(keypath + '.0.selected') )

				ractive.set('selection_length',
					ractive.get('rows').filter(function(r) { return r[0].selected === true } ).length
				)
			})

		},
	},

	refresh() {
		var ractive=this;

		var params = {
			logGroupName: '/aws/lambda/' + this.get('function.name'),
			descending: true,
			//limit: 'NUMBER_VALUE',
			//logStreamNamePrefix: 'STRING_VALUE',
			//nextToken: 'STRING_VALUE',
			orderBy: 'LastEventTime', // LogStreamName | LastEventTime
		};

		this.set({rows: null}) // loading...

		cloudwatchlogs.describeLogStreams(params, function(err, data) {
			if (err)
				return console.log(err);

			//console.log( data.logStreams )


			ractive.set('rows',
				data.logStreams
					.map(function( l ) {

						var parsed = l.logStreamName.match( /^(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})\/\[(?<version>[^\]]+)\](?<stream>.{32})$/ )

						if (parsed)
							l.extra = {
								version: parsed.groups.version,
								stream: parsed.groups.stream,
							}


						return l;
					})
					.map(function(l) {
					return [
						{ KEY: true, item: l, },
						{ S: l.extra.stream || l.logStreamName },
						{ S: l.extra.version },
						{ S: new Date(l.lastEventTimestamp).toLocaleDateString() + ' ' + new Date(l.lastEventTimestamp).toLocaleTimeString()  },
						{ N: Math.ceil(l.storedBytes/1024) }
					]
				})
			)
		});
	},

	data: function() {
		return {
			columns: [ null, 'Log Streams', 'Version', 'Last Event Time', 'Size KB'],
			rows: [],
		}
	}
})
