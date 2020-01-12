import svgicons from './svgicons';

export default Ractive.extend({
	//isolated: true,
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
			<div on-click='open-function'> {{.FunctionName}} </div>
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

	// 	ractive.parent.fire('open-table', table )
	// 	ractive.on('create', function() {
	// 		ractive.root.findComponent('tabs').newtab('tablecreate', 'Create Table' )
	// 	})

	},

})
