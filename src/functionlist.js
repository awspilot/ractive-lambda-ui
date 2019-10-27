
export default Ractive.extend({
	template: `

		<div style="height: 50px;padding: 10px 10px 0px 0px;background-color: #fafafa;;">

			<div style="float: right;">
				<a class="btn btn-sm btn-default" on-click="refresh"><i class="icon zmdi zmdi-refresh"></i></a>
				<a class="btn btn-sm btn-default {{#if selection}}{{else}}disabled{{/if}}" {{#if selection}}on-click='delete'{{/if}}> Delete </a>
				<a class="btn btn-sm btn-warning" on-click="createfunction"> Create function </a>
			</div>
		</div>


		<table style="border-collapse: collapse;border-spacing: 0; empty-cells: show; border: 1px solid #eaeded;width: 100%;">
			<thead style="background-color: #fafafa;color: #000;text-align: left;vertical-align: bottom;border-bottom: 1px solid #eaeded">
				<tr>
					<th style="padding: 0.5em 1em;"></th>
					<th style="padding: 0.5em 1em;">Function name</th>
					<th style="padding: 0.5em 1em;">Description</th>
					<th style="padding: 0.5em 1em;">Runtime</th>
					<th style="padding: 0.5em 1em;">Code size</th>
					<th style="padding: 0.5em 1em;">Last modified</th>
				</tr>
			</thead>
			<tbody>
				{{#functions}}

				<tr style="{{#if selection === .FunctionName }}background-color: #f1faff;{{/if}}">
					<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"><input type="radio" name={{selection}} value='{{.FunctionName}}'></td>
					<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"><a style="cursor: pointer;" on-click="gotostack">{{.FunctionName}}</a></td>
					<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;"></td>
					<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.Runtime}}</td>
					<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.CodeSize}}</td>
					<td style="padding: 0.5em 1em;border-width: 0 0 1px 0;border-bottom: 1px solid #eaeded;">{{.LastModified}}</td>
				</tr>
				{{/functions}}

			</tbody>
		</table>


	`,
	load_functions() {
		var ractive=this;
		var params = {
			//Marker: "",
			// MaxItems: 50
		};
		ractive.set('functions', [])
		lambda.listFunctions(params, function(err, data) {
			if (err)
				return alert('failed getting functions list')

			ractive.set('functions', data.Functions)
			console.log(data.Functions)
		});
	},
	data: function() {
		return {
			selection: '',
		}
	},
	on: {
		init() {
			this.load_functions()
		},

		refresh() {
			this.load_functions()
		},

		delete() {
			var ractive=this;
			console.log('delete', this.get('selection'))
			if (confirm('Are you sure you want to delete ' + this.get('selection') )) {
				var params = {
					FunctionName: this.get('selection'),
				};
				lambda.deleteFunction(params, function(err, data) {
					if (err)
						alert('Delete failed')

					ractive.load_functions()
				})
			}

		},

		createfunction() {
			this.parent.create_function()
		}
	}
})
