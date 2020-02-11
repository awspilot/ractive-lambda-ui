

import {IconRefresh, IconPlus } from '../svgicons';

export default Ractive.extend({
	//isolated: true,
	components: {
		'icon-refresh': IconRefresh,
		'icon-plus': IconPlus,
	},
	template:
		`
		<miniheader>
			Functions
			<div class='pull-right' style='margin-right: 2px;'>
				<a class='btn btn-xs btn-default' on-click='create'>
					<icon-plus />
				</a>
				<a class='btn btn-xs btn-default' on-click='refresh'>
					<icon-refresh />
				</a>
			</div>
		</miniheader>
		<scrollarea class='scrollarea miniheaderbody' style='position: absolute;'>
		<tables>
			{{#functions}}
			<div on-click='open_function'> {{.FunctionName}} </div>
			{{/functions}}
		</tables>
		</scrollarea>
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
			//console.log(data.Functions)
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
		open_function(e) {
			this.parent.fire("open_function", this.get(e.resolve()) )
		},
		create() {
			this.parent.fire("create_function")
		}

	},

})
