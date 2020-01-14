



	import "./css/style.less";

	import Ractive from 'ractive';
	import minifunctionlist from './function/list_mini';


	import tabs from './tabs';

	export default Ractive.extend({
		components: {
			minifunctionlist: minifunctionlist,
			tabs: tabs,
		},
		template: `
			<hsplit class='ractive-lambda-ui theme-{{theme}}'>
				<left>
					<minifunctionlist />
				</left>
				<content  style="background-color: transparent;border: 0px;overflow-x: auto;">
					<tabs active_id='functions' theme={{theme}} />
				</content>
			</hsplit>
		`,
		data: function() {
			return {

			}
		},

		on: {
			open_function( f ) {
				this.findComponent('tabs').newtab('function_tab', f.FunctionName )
			},

			create_function() {
				this.findComponent('tabs').newtab('function_create', 'Create Function' )
			},

			init: function() {
				lambda = new AWS.Lambda({
					endpoint: this.get('endpoint') || undefined,
					region: this.get('region'),
					credentials: {
						accessKeyId: this.get('accessKeyId'),
						secretAccessKey: this.get('secretAccessKey'),
					},
				});


				iam = new AWS.IAM({
					endpoint: this.get('endpoint') || undefined,
					region: this.get('region'),
					credentials: {
						accessKeyId: this.get('accessKeyId'),
						secretAccessKey: this.get('secretAccessKey'),
					},
				});


			}
		},
	});
