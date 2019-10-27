
export default Ractive.extend({
	template: `
		<h3>Create function</h3>

		<div style="box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff">
			create function form
		</div>

		<div style="text-align: right;padding: 10px 0px;">
				<a class="btn btn-sm" on-click="cancel"> Cancel </a>
				<a class="btn btn-sm btn-warning" on-click="createfunction"> Create function </a>
		</div>
	`,
	on: {
		cancel() {
			this.parent.gotolist()
		}
	}
})
