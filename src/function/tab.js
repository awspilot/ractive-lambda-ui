
import tab_config from './tab_config';
import tab_code from './tab_code';
import tab_logs from './tab_logs';

export default Ractive.extend({
	isolated: true,
	components: {
		tabconfig: tab_config,
		tabcode: tab_code,
		tablogs: tab_logs,
	},
	template: `
		<div class='tableview {{#if active}}active{{/if}}'>
			<div class='tableview-table-tabs noselect'>
				<a class='btn-tableview-tab {{#if tab === 'config'}}active{{/if}}'       on-click='@this.set('tab','config')'> Config </a>
				<a class='btn-tableview-tab {{#if tab === 'code'}}active{{/if}}'         on-click='@this.set('tab','code')'> Code </a>
				<a class='btn-tableview-tab {{#if tab === 'monitoring'}}active{{/if}}'   on-click='@this.set('tab','monitoring')'> Monitoring </a>
				<a class='btn-tableview-tab {{#if tab === 'logs'}}active{{/if}}'         on-click='@this.set('tab','logs')'> Logs </a>
			</div>
			<div style='position: absolute;top: 40px;left: 30px;right: 30px;bottom: 2px;'>
				{{#if err}}
					<br> {{ err.errorMessage || err.message }}
				{{else}}

						{{#if tab === 'config'}}
							<tabconfig function={{function}}  />
						{{/if}}

						{{#if tab === 'code'}}
							<tabcode function={{function}} theme={{theme}} cors-proxy={{.['cors-proxy']}} />
						{{/if}}

						{{#if tab === 'monitoring'}}
							<tabmonitoring function={{function}} />
						{{/if}}

						{{#if tab === 'logs'}}
							<tablogs function={{function}} logs-streams-refresh-interval={{~/['logs-streams-refresh-interval']}} />
						{{/if}}

				{{/if}}

			</div>
		</div>
	`,
	data: function() {
		return {
			tab: 'config',
		}
	},

	// oninit: function() {
	//
	// },
})
