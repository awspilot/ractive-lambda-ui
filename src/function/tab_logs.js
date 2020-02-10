
import tabledata from '../tabledata';

var rawlog = Ractive.extend({
	template: `
		<div style="position: absolute;top: 38px;margin: 3px;left: 0px;right: 0px;bottom: 0px;background-color: #fff;overflow: auto;font-size: 12px;letter-spacing: 1px;font-family: monospace;">

			{{#if events === false}}
				<div style="padding: 5px;text-align: center;">
					Parsing events ...
				</div>
			{{else}}

{{ events_count }}

				<div style="padding: 5px;text-align: center;">
					<a class="">Newer {{rawlog.nextForwardToken}}</a>
				</div>

				{{#events}}
					{{#if .type === 'invoke' }}
						<div class="log-invocation">
							<div class="log-invocation-title">{{.request_id}}</div>

							<div style="overflow-y: auto;color: lightgray;margin-top: 10px;">
								{{#.logs}}
								<div class="logline {{#if .expanded}}expanded{{/if}}" on-click="@this.toggle( @keypath + '.expanded' )">{{.message}}</div>
								{{/.logs}}
							</div>
							<div style='margin-top: 10px;text-align: right;'>
								<span style='color: #77b6f9;'>{{.duration}}ms</span>
								<span style='color: lightgreen;'>{{.max_memory}}/{{.memory}}RAM</span>
							</div>
						</div>
					{{else}}
						<div style="white-space: nowrap;">{{.message}}</div>
					{{/if}}
				{{/events}}

				<div style="padding: 5px;text-align: center;">
					<a class="">Older {{rawlog.nextBackwardToken}}</a>
				</div>

			{{/if}}

		</div>
	`,
	parse_log_events() {
		var ractive=this;

		var events = this.get('rawlog.events')

		events = events.map(function(e) {
			if (!e)
				return e;

			var match = e.message.match(/^START\ RequestId:\ (?<request_id>[^\-]+\-[^\-]+\-[^\-]+\-[^\-]+\-[^\s]+)\ Version:\ (?<version>.+)$/m);
			if (match) {
				e = {

					type: 'invoke',
					request_id: match.groups.request_id.trim(),
					version: match.groups.version,

					started_at: e.timestamp,
				}

				// find the matching end END RequestId: 22b8544b-04ea-4444-a8e7-94ac546f14d6
				events.map(function(end_e, end_k) {
					if (!end_e)
						return end_e;

					var endmatch = end_e.message.match(/^END\ RequestId:\ (?<request_id>[^-]+\-[^-]+\-[^-]+\-[^-]+\-[^\s]+)$/m);
					if (endmatch) {
						if (endmatch.groups.request_id.trim() === match.groups.request_id) {
							e.finished_at = end_e.timestamp
							delete events[end_k];
						}
					}
				})

				// find the matching report for dry run
				events.map(function(report_e, report_k) {
					if (!report_e)
						return report_e;

					// dry-run
					var regex = /^REPORT RequestId: (?<request_id>[^\-]+\-[^\-]+\-[^\-]+\-[^\-]+\-[^\s]+)\sDuration:\s(?<duration>[0-9\.]+) ms\sBilled Duration:\s(?<billed_duration>[0-9]+) ms\sMemory Size:\s(?<memory>[0-9]+) MB\sMax Memory Used:\s(?<max_memory>[0-9]+) MB\sInit Duration:\s(?<init_duration>[0-9\.]+) ms$/
					var reportmatch = report_e.message.trim().match(regex);


					if (reportmatch) {

						if (reportmatch.groups.request_id.trim() === match.groups.request_id) {

							e.duration = reportmatch.groups.duration;
							e.billed_duration = reportmatch.groups.billed_duration;
							e.memory = reportmatch.groups.memory;
							e.max_memory = reportmatch.groups.max_memory;
							e.init_duration = reportmatch.groups.init_duration;

							delete events[report_k];
						}
					}
				})

				// find the matching report
				events.map(function(report_e, report_k) {
					if (!report_e)
						return report_e;

					// non dry-run
					var regex = /^REPORT RequestId: (?<request_id>[^\-]+\-[^\-]+\-[^\-]+\-[^\-]+\-[^\s]+)\sDuration:\s(?<duration>[0-9\.]+) ms\sBilled Duration:\s(?<billed_duration>[0-9]+) ms\sMemory Size:\s(?<memory>[0-9]+) MB\sMax Memory Used:\s(?<max_memory>[0-9]+) MB$/
					var reportmatch = report_e.message.trim().match(regex);


					if (reportmatch) {

						if (reportmatch.groups.request_id.trim() === match.groups.request_id) {

							e.duration = reportmatch.groups.duration;
							e.billed_duration = reportmatch.groups.billed_duration;
							e.memory = reportmatch.groups.memory;
							e.max_memory = reportmatch.groups.max_memory;

							delete events[report_k];
						}
					}
				})


				// log type INFO
				events.map(function(log_e, log_k) {
					if (!log_e)
						return log_e;

					var regex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hh>\d{2}):(?<mm>\d{2}):(?<ss>\d{2})\.\d{0,}Z\s(?<request_id>[^\-]+\-[^\-]+\-[^\-]+\-[^\-]+\-[^\s]+)\sINFO\s(?<log>.*)$/s
					var logmatch = log_e.message.trim().match(regex);
					if (logmatch) {

						if (logmatch.groups.request_id.trim() === match.groups.request_id) {

							if (!e.hasOwnProperty('logs'))
								e.logs = []

							e.logs[ log_k ] = { type: 'info', message: logmatch.groups.log };
							delete events[log_k];
						}
					}
				})

				// log type default
				events.map(function(log_e, log_k) {
					if (!log_e)
						return log_e;

					var regex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T(?<hh>\d{2}):(?<mm>\d{2}):(?<ss>\d{2})\.\d{0,}Z\s(?<request_id>[^\-]+\-[^\-]+\-[^\-]+\-[^\-]+\-[^\s]+)\s(?<log>.*)$/s
					var logmatch = log_e.message.trim().match(regex);
					if (logmatch) {
						if (logmatch.groups.request_id.trim() === match.groups.request_id.trim() ) {
							console.log( logmatch )

							if (!e.hasOwnProperty('logs'))
								e.logs = []

							e.logs[ log_k ] = { message: logmatch.groups.log };
							delete events[log_k];
						}
					}
				})

			}
			return e;
		})

		events = events.filter(function(e) {
			if (!e)
				return false;

			return true;
		})

		this.set({events, events_count: events.length })
	},
	get_log_events() {

		var ractive=this;

		var params = {
			logGroupName: this.get('rawlog.logGroupName'),
			logStreamName: this.get('rawlog.item.logStreamName'),
			//endTime: 'NUMBER_VALUE',
			//limit: 'NUMBER_VALUE',
			//nextToken: 'STRING_VALUE',
			startFromHead: true,
			//startTime: 'NUMBER_VALUE'
		};
		cloudwatchlogs.getLogEvents(params, function(err, data) {

			if (err)
				return alert('failed getting log events');


			ractive.set('rawlog.events', data.events )

			//nextForwardToken: data.nextForwardToken,
			//nextBackwardToken: data.nextBackwardToken,

			ractive.parse_log_events()

		});
	},
	on: {
		init() {

			this.set({events: false, })

			this.get_log_events()



		},
	}
})

export default Ractive.extend({
	components: {
		tabledata: tabledata,
		rawlog: rawlog,
	},
	template: `

		<div class='pull-right' style='padding: 7px;'>

			{{#if raw_log_data}}
				<a class="btn btn-xs btn-default" on-click='delete-raw-log'> <icon-trash /> </a>
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
