
import tree from './tree';
import tabs from './tabs';

export default Ractive.extend({
	components: {
		tree: tree,
		tabs: tabs,
	},
	template: `
		<div class="databank-webide theme-{{theme}}">
			<tree fs={{fs}} />

			<div style="position: absolute;top: 0px;left: 238px;right: 0px;{{#if editor_result_open}}bottom: 280px;{{else}}bottom: 0px;{{/if}}">
				<tabs  fs={{fs}} />
			</div>

			{{#if editor_result_open}}
				<div style="position: absolute;left: 233px;right: 0px;height: 280px;bottom: 0px;border-top: 1px solid #ccc;">
					<pre style="position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;white-space: pre-wrap;border: 0px;background-color: transparent;">{{editor_result_raw}}</pre>
				</div>
			{{/if}}
		</div>
	`,
	openfile( path) {
		this.findComponent('tabs').newtab('ace', path )
	},
	on: {
		init() {
			//var fs = this.get('fs')
			//console.log(fs)
		}
	}
})
