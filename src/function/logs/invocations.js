
export default Ractive.extend({
	template: `
		<div style="position: absolute;top: 38px;margin: 3px;left: 0px;right: 0px;bottom: 0px;background-color: #fff;">

			<div style="position: absolute;top:0px;left:0px;right:0px;height: 30px;background-color: #d4d0c8;border-left: 1px solid #fcfcfb;border-bottom: 1px solid #404040;line-height: 30px;font-size: 13px;">
				Invocations: {{ events_count }}

				<div style="position: absolute;top: 3px;right: 3px;line-height: initial;">
					<a class="btn btn-xs btn-default" on-click='delete-raw-log'> <icon-trash /> </a>
				</div>
			</div>
			<div style="position: absolute;top:31px;left:0px;right:0px;bottom:0;overflow: auto;font-size: 12px;letter-spacing: 1px;font-family: monospace;">
				{{#if events === false}}
					<div style="padding: 5px;text-align: center;">
						Parsing events ...
					</div>
				{{else}}

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

		'delete-raw-log': function() {
			var ractive=this;
			var item = this.get('rawlog.item')
			var params = {
				logGroupName: this.get('rawlog.logGroupName'),
				logStreamName: item.logStreamName,
			};
			cloudwatchlogs.deleteLogStream(params, function(err, data) {
				if (err)
					return alert('delete failed')

				ractive.parent.remove_logstream_from_list(item.logStreamName)
				ractive.parent.close_rawlog()

			});
		},

		init() {

			this.set({events: false, })

			this.get_log_events()



		},
	}
})
