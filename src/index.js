



	import "./css/style.less";

	import Ractive from 'ractive';
	import functionlist from './functionlist'
	import functioncreate from './functioncreate'
	import functiondetail from './functiondetail'

	import AWSLeft from './aws_left';

	export default Ractive.extend({
		components: {
			functionlist: functionlist,
			functioncreate: functioncreate,
			functiondetail: functiondetail,

			AWSLeft: AWSLeft,
		},
		template: `
	<hsplit class='ractive-lambda-ui theme-{{theme}}'>
		<left>
			<AWSLeft />
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
