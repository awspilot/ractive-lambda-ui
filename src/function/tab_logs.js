
import {IconTrash, IconX, IconRefresh } from '../svgicons';
import tabledata from '../tabledata';

import rawlog from './logs/invocations';

export default Ractive.extend({
	components: {
		tabledata: tabledata,
		rawlog: rawlog,

		'icon-trash': IconTrash,
		'icon-x': IconX,
		'icon-refresh': IconRefresh,
	},
	template: `

		<div class='pull-right' style='padding: 7px;'>

			{{#if raw_log_data}}
				<a class="btn btn-xs btn-default" on-click='close-raw-log' > <icon-x /> </a>
			{{else}}
				<a class="btn btn-xs btn-default {{#if selection_length > 0}}{{else}}disabled{{/if}}" {{#if selection_length > 0 }}on-click='delete'{{/if}}> <icon-trash /> </a>
				<a class="btn btn-xs btn-default" on-click='refresh' > <icon-refresh /> </a>
			{{/if}}
		</div>

		<tabledata columns={{columns}} rows={{rows}} on-colclick='openstream' style='top: 38px;margin: 3px;' />

		{{#if raw_log_data}}
			<rawlog rawlog={{raw_log_data}} />
		{{/if}}
	`,
	remove_logstream_from_list( logStreamName ) {
		var ractive=this;


		// select only this line that's about to be removed from list, it helps visually
		ractive.set('rows', ractive.get('rows').map(function(r) {
			delete r[0].selected;
			if (r[0].item.logStreamName == logStreamName)
				r[0].selected=true;

			return r;
		}))

		setTimeout(function() {
			ractive.set('rows', ractive.get('rows').filter(function(r) { return r[0].item.logStreamName !== logStreamName }) )
		}, 1000)
	},
	close_rawlog() {
		this.set('raw_log_data');
	},
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

					ractive.set('rows', ractive.get('rows').filter(function(r) { return r[0].item.logStreamName !== item.logStreamName }) )
					cb()
				});
			}, function() {

			})
		},

		refresh() {
			this.refresh()
		},

		openstream( e, col, item, rawitem ) {
			var ractive=this;

			// var params = {
			// 	logGroupName: '/aws/lambda/' + this.get('function.name'),
			// 	logStreamName: item.logStreamName,
			// 	//endTime: 'NUMBER_VALUE',
			// 	//limit: 'NUMBER_VALUE',
			// 	//nextToken: 'STRING_VALUE',
			// 	startFromHead: true,
			// 	//startTime: 'NUMBER_VALUE'
			// };
			// cloudwatchlogs.getLogEvents(params, function(err, data) {
			//
			// 	if (err)
			// 		return;
			//
			// 	ractive.set({raw_log_data: {
			//
			// 		item: item,
			// 		logGroupName: '/aws/lambda/' + this.get('function.name'),
			//
			// 		events: data.events,
			// 		nextForwardToken: data.nextForwardToken,
			// 		nextBackwardToken: data.nextBackwardToken,
			// 	}})
			// });

			ractive.set({raw_log_data: {

				logGroupName: '/aws/lambda/' + this.get('function.name'),
				item: item,

			}})

		},
		'close-raw-log': function() {
			this.set('raw_log_data');
		},
		'delete-raw-log': function() {
			var ractive=this;
			var item = this.get('raw_log_data.item')
			var params = {
				logGroupName: '/aws/lambda/' + ractive.get('function.name'),
				logStreamName: item.logStreamName,
			};
			cloudwatchlogs.deleteLogStream(params, function(err, data) {
				if (err)
					return alert('delete failed')

				// close raw log
				ractive.set('raw_log_data');

				setTimeout(function() {
					ractive.set('rows', ractive.get('rows').filter(function(r) { return r[0].item.logStreamName !== item.logStreamName }) )
				}, 1000)
			});

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
						{ HASH: l.extra.stream || l.logStreamName, item: l, },
						{ S: l.extra.version },
						{ S: new Date(l.lastEventTimestamp).toLocaleDateString() + ' ' + new Date(l.lastEventTimestamp).toLocaleTimeString()  },
						{ N: Math.ceil(l.storedBytes/1024) },
						{ S: '-' },
					]
				})
			)
		});
	},

	data: function() {
		return {
			columns: [ null, 'Log Streams', 'Version', 'Last Event Time', 'Size KB', 'Invocations'],
			rows: [],
			raw_log_data: false,
		}
	}
})
