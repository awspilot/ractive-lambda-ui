<style>


</style>



<script>

	import "./css/style.less";

	import Ractive from 'ractive';
	import functionlist from './functionlist'
	import functioncreate from './functioncreate'
	import functiondetail from './functiondetail'

	export default Ractive.extend({
		template: `
	<hsplit style='' class='ractive-lambda-ui'>
		<left style="border-right: 1px solid #b9b8b6;background-color: #fff;">
			<div style="display: block;font-size: 12px;padding-left: 10px;font-size: 18px;font-weight: 700;color: #000;line-height: 2rem;padding: 12px 35px;border-bottom: 1px solid #ddd;">
				AWS Lambda
			</div>
			<div style="position: absolute;bottom: 0px;top: 60px;left: 0px;right: 0px;">

				<div style="display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;">Dashboard</div>
				<div style="display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;">Applications</div>
				<div style="display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #ec7211;font-weight: bold;">Functions</div>
				<div style="display: block;height: 30px;line-height: 30px;font-size: 13px;padding: 0px 35px;border-top: 1px solid transparent;border-left: 1px solid transparent;margin-bottom: 0px;color: #000;">Layers</div>
			</div>
		</left>
		<content  style="background-color: transparent;border: 0px;overflow-x: auto;">



			<div style="position: absolute;top: 40px;left: 10px;right: 10px;bottom: 10px;">
				{{#if tab === 'list'}}
					<div style="height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;">
						<a style="cursor: pointer;text-decoration: none;">Lambda</a>
						&gt; <a style="cursor: pointer;text-decoration: none;color: #999;">Functions</a>
					</div>
					<div style="position: absolute;top: 0px;left: 0px;width: {{#if active_id === 'stackdetails'}} 260px; {{else}}100%;{{/if}}; box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff">
						<functionlist />
					</div>
				{{/if}}

				{{#if tab === 'create'}}
					<div style="height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;">
						<a style="cursor: pointer;text-decoration: none;">Lambda</a>
						&gt; <a style="cursor: pointer;text-decoration: none;" on-click="@this.gotolist()">Functions</a>
						&gt; <a style="cursor: pointer;text-decoration: none;color: #999;">Create function</a>
					</div>
					<functioncreate />
				{{/if}}

				{{#if tab === 'detail'}}
					<div style="height: 30px;margin-left: 10px;line-height: 30px;font-size: 15px;">
						<a style="cursor: pointer;text-decoration: none;">Lambda</a>
						&gt; <a style="cursor: pointer;text-decoration: none;" on-click="@this.gotolist()">Functions</a>
						&gt; <a style="cursor: pointer;text-decoration: none;color: #999;">{{detailfunction}}</a>
					</div>
					<functiondetail name={{detailfunction}} />
				{{/if}}

			</div>
		</content>
	</hsplit>

`,
		components: {
			functionlist: functionlist,
			functioncreate: functioncreate,
			functiondetail: functiondetail,
		},
		data: function() {
			return {
				tab: 'list',
			}
		},

		create_function() {
			this.set({tab: 'create'})
		},
		gotolist() {
			this.set({tab: 'list'})
		},
		gotofunction( fname ) {
			this.set({tab: 'detail', detailfunction: fname, })
		},


		on: {
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
</script>
