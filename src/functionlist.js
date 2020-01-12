
import tabledata from './tabledata';

export default Ractive.extend({
	//isolated: true,
	components: {
		tabledata: tabledata,
	},
	template:
		`
			<div class='pull-right' style='padding: 7px;'>

				<!-- good functions -->
				<a class="btn btn-xs btn-default {{#if refresh_tables }}disabled{{/if}}" on-click="refresh"> <icon-refresh /> </a>
				<a class="btn btn-xs btn-default {{#if selection_length === 1}}{{else}}disabled{{/if}}" {{#if selection_length === 1}}on-click='delete'{{/if}}> <icon-trash /> </a>
				<a class="btn btn-xs btn-primary" on-click='create'> Create function </a>
			</div>

		<tabledata columns='{{columns}}' rows='{{rows}}' style='top: 38px;margin: 3px;' />
		`,
	data: function() {
		return {
			selection_length: 0,
			refresh_tables: false,
		}
	},

	load_functions() {
		var ractive=this;
		ractive.set('refresh_tables', true)
		var params = {
			//Marker: "",
			// MaxItems: 50
		};
		ractive.set('rows', [])
		lambda.listFunctions(params, function(err, data) {
			ractive.set('refresh_tables')
			if (err)
				return ractive.set('err', err )

			ractive.set('err')
			ractive.set('columns', [ null, 'Function name', 'Description', 'Runtime', 'Code size', 'Last modified'])

			ractive.set('rows',
				data.Functions.map(function(f) {
					return [
						{ KEY: true, item: f, },
						{ S: f.FunctionName },
						{ },
						{ S: f.Runtime },
						{ S: f.CodeSize },
						{ S: f.LastModified }
					]
				})
			)

		});
	},
	on: {
		refresh: function() {
			this.load_functions()
		},

		create: function() {
			this.parent.parent.fire("create_function")
		},
		delete: function() {
			var ractive=this;

			var selected = ractive.get('rows').filter(function(r) { return r[0].selected === true } );

			if ( selected.length === 0 )
				return alert('Please select a function to delete')

			if ( selected.length > 1 )
				return alert('Please select one function at a time')

			var func = selected[0][0].item

			console.log(func)

			if (confirm('Are you sure you want to delete table ' + func.FunctionName )) {
				var params = {
					FunctionName: func.FunctionName,
				};
				lambda.deleteFunction(params, function(err, data) {
					if (err)
						alert('Delete failed')

					ractive.load_functions()
				})
			}
		},
	},
	oninit: function() {
		this.load_functions()
		var ractive = this
		// //ractive.on('open-table', function(e, table ) {
		// //	ractive.root.fire('open-table', table )
		// //})
		ractive.on('tabledata.selectrow', function(context) {
			var keypath = context.resolve()
			ractive.set(keypath + '.0.selected', !ractive.get(keypath + '.0.selected') )

			ractive.set('selection_length',
				ractive.get('rows').filter(function(r) { return r[0].selected === true } ).length
			)
		})
	},
})
