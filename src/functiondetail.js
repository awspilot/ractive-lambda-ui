
export default Ractive.extend({
	template: `
		<div style="position: absolute;top: 30px;left: 10px;right: 0px;bottom:0px;">
			<div style="position: absolute;left: 0px;right:0px;top: 0px;height: 50px;">
				<div style="float: right;padding-top: 7px;">
					<a class="btn btn-sm btn-default disabled" > Delete </a>
				</div>
				<h4 style="color: #000;">{{name}}</h4>
			</div>
			<div style="position: absolute;left: 0px;right:0px;top: 40px;bottom: 0px;">
				<tabhead style="">
					<tab class='{{#if tab === "configuration" }}active{{/if}}' on-click='@this.set("tab", "configuration")'>Configuration</tab>
					<tab class='{{#if tab === "monitoring" }}active{{/if}}' on-click='@this.set("tab", "monitoring")'>Monitoring</tab>
				</tabhead>
			</div>
		</div>
	`,
	data: function() {
		return {
			tab: 'configuration',
		}
	}
})
