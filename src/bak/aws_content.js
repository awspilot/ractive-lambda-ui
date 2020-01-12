import functionlist from './functionlist';


export default Ractive.extend({
	components: {
		functionlist: functionlist,
	},
	data: function() {
		return {
			tab: 'list',
		}
	},
	template: `
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
`
})
