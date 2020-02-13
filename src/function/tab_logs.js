
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

				{{#if emptying}}
					<a class="btn btn-xs btn-default" on-click='cancel-empty' > Cancel </a>
				{{else}}
					<a class="btn btn-xs btn-default" on-click='empty' > Empty </a>
					<a class="btn btn-xs btn-default {{#if selection_length > 0}}{{else}}disabled{{/if}}" {{#if selection_length > 0 }}on-click='delete'{{/if}}> <icon-trash /> </a>
					<a class="btn btn-xs btn-default" on-click='refresh' > <icon-refresh /> </a>
				{{/if}}

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
	select_all() {
		this.set('rows', this.get('rows').map(function(r,idx) { r[0].selected = true ;return r; }) )
	},
	delete_selected( cb ) {
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
			if (cb) cb()
		})

	},

	empty() {
		var ractive=this;

		this.set({emptying: true})

		if ((this.get('rows') || []).length === 0) {
			this.set({emptying: undefined})
			return;
		}

		this.select_all()
		this.delete_selected(function() {
			// reload the list
			ractive.refresh( true, function() {
				setTimeout(function() {
					var should_continue = ractive.get('emptying') === true;
					if (should_continue) {
						ractive.empty()
					}
				},1000)

			} )
		})
	},

	on: {

		delete() {
			this.delete_selected()
		},
		refresh() {
			this.refresh()
		},
		empty() {
			this.empty()
		},
		'cancel-empty': function() {
			this.set({emptying: undefined})
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

			this.on('tabledata.selectrow', function(context) {
				var keypath = context.resolve()
				ractive.set(keypath + '.0.selected', !ractive.get(keypath + '.0.selected') )

				ractive.set('selection_length',
					ractive.get('rows').filter(function(r) { return r[0].selected === true } ).length
				)
			})
			this.observe('logs-streams-refresh-interval', function( n, o, kp ) {
				this.handle_watch_interval()
			}, { init: false, })

			ractive.handle_watch_interval()

		},
		teardown() {
			clearInterval(this.get('log_watch_interval'))
		}
	},

	handle_watch_interval() {
		var ractive=this;

		var repeat_interval = parseInt(this.get('logs-streams-refresh-interval') || 0);

		console.log("handle_watch_interval", repeat_interval )

		clearInterval(this.get('log_watch_interval'))

		if (!Number.isInteger( repeat_interval ))
			return;

		if (repeat_interval < 1)
			return;

		this.set({
			log_watch_interval:setInterval(function() {
				ractive.background_refresh()
			}, repeat_interval * 1000 )
		})

	},

	refresh( silent, cb ) {
		var ractive=this;

		var params = {
			logGroupName: '/aws/lambda/' + this.get('function.name'),
			descending: true,
			//limit: 'NUMBER_VALUE',
			//logStreamNamePrefix: 'STRING_VALUE',
			//nextToken: 'STRING_VALUE',
			orderBy: 'LastEventTime', // LogStreamName | LastEventTime
		};

		if ( !silent ) this.set({rows: null}) // loading...

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
						{ S: new Date(l.lastIngestionTime).toLocaleDateString() + ' ' + new Date(l.lastIngestionTime).toLocaleTimeString()  },
						{ N: Math.ceil(l.storedBytes/1024) },
						{ S: '-' },
					]
				})
			)

			if ( cb ) cb()
		});
	},


	background_refresh(  ) {
		var ractive=this;

		if (ractive.get('emptying'))
			return;

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

			//console.log("refreshed")
			//console.log(data.logStreams)

			var rows = ractive.get('rows')

			if (!rows)
				return;

			if (ractive.get('emptying'))
				return;

			//console.log('display rows', rows )

			rows = rows.map(function(r) {
				data.logStreams.map(function( dbr ) {

					// found match
					if (dbr.logStreamName === r[0].item.logStreamName) {

						if (dbr.lastEventTimestamp !== r[0].item.lastEventTimestamp ) {
							console.log("found diff in lastEventTimestamp", r[0].item.lastEventTimestamp, dbr.lastEventTimestamp )
							r[3] = { S: new Date(dbr.lastEventTimestamp).toLocaleDateString() + ' ' + new Date(dbr.lastEventTimestamp).toLocaleTimeString()  };
						}
						if (dbr.lastIngestionTime !== r[0].item.lastIngestionTime ) {
							console.log("found diff in lastIngestionTime", r[0].item.lastIngestionTime, dbr.lastIngestionTime )
							r[4] = { S: new Date(dbr.lastIngestionTime).toLocaleDateString() + ' ' + new Date(dbr.lastIngestionTime).toLocaleTimeString()  };
						}

						r[0].item = dbr;

					}
				})
				return r;
			})

			ractive.set({rows})

		});
	},


	data: function() {
		return {
			columns: [ null, 'Log Streams', 'Version', 'Last Event Time', 'Last Ingestion Time', 'Size KB', 'Invocations'],
			rows: [],
			raw_log_data: false,

			log_watch_interval: null,
		}
	}
})
