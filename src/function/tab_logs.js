
import tabledata from '../tabledata';

export default Ractive.extend({
	components: {
		tabledata: tabledata,
	},
	template: `

		<div class='pull-right' style='padding: 7px;'>
			<a class="btn btn-xs btn-default {{#if selection_length === 1}}{{else}}disabled{{/if}}" {{#if selection_length === 1}}on-click='delete'{{/if}}> <icon-trash /> </a>
		</div>

		<tabledata columns={{columns}} rows={{rows}} style='top: 38px;margin: 3px;' />
	`,
	on: {

		init() {
			var ractive=this;

			var params = {
				logGroupName: '/aws/lambda/' + this.get('function.name'),
				descending: true,
				//limit: 'NUMBER_VALUE',
				//logStreamNamePrefix: 'STRING_VALUE',
				//nextToken: 'STRING_VALUE',
				orderBy: 'LastEventTime', // LogStreamName | LastEventTime
			};

			cloudwatchlogs.describeLogStreams(params, function(err, data) {
				if (err)
					return console.log(err);

				console.log( data.logStreams )


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

			ractive.on('tabledata.selectrow', function(context) {
				var keypath = context.resolve()
				ractive.set(keypath + '.0.selected', !ractive.get(keypath + '.0.selected') )

				ractive.set('selection_length',
					ractive.get('rows').filter(function(r) { return r[0].selected === true } ).length
				)
			})

		},
	},
	data: function() {
		return {
			columns: [ null, 'Log Streams', 'Version', 'Last Event Time', 'Size KB'],
			rows: [],
		}
	}
})
