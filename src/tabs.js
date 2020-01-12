
import functionslistfull from './functionlist';
import functioncreate from './function/create';
// import tabletab from './tabletab';

export default Ractive.extend({
	//isolated: true,
	components: {
		functionslistfull: functionslistfull,
		functioncreate: functioncreate,
		// tabletab: tabletab,
	},
	template:
		`
		<tabhead>
			<tab class='{{#if active_id === "tables" }}active{{/if}}' on-click='@this.fire("activetab", "tables")'>
				<icon-database style="width: 15px;height: 15px;" />
			</tab>
		{{#tabs}}
			{{#if .closed !== true}}
			<tab class='{{#if .id === active_id }}active{{/if}}' on-click='@this.fire("activetab",.id)'>
				{{.name}}
				<i class='' on-click='closetab'><icon-x style="width: 8px;height: 8px;line-height: 15px;" /></i>
			</tab>
			{{/if}}
		{{/tabs}}
		</tabhead>
		<tabcontent>
			{{#if active_id === "tables" }}
				<functionslistfull />
			{{else}}
				{{#tabs}}
					{{#if .closed === true}}
						<div class='closedtab'></div>
					{{else}}
						{{#if .type === 'tablecreate' }}
							<functioncreate active={{ .id === active_id  }} />
						{{/if}}
						{{#if .type === 'tabletab' }}
							<tabletab table={{.}} active={{ .id === active_id  }} />
						{{/if}}
					{{/if}}
				{{/tabs}}
			{{/if}}
		</tabcontent>
		`,
	data: function() { return {} },
	active_cache: [],
	activetabcontent: function() {
		var ractive = this
		ractive.active_cache.push(ractive.get('active_id'))
		ractive.findAllComponents('tabletab').map(function( tableview_c ) {
			tableview_c.set('active', tableview_c.get('table.id') === ractive.get('active_id') )
		})
	},
	newtab: function(component_name, param1 ) {
		var id=Math.random()
		this.set('active_id', id )
		this.push('tabs', {
			id: id,

			name: param1,
			type: component_name,
		} )
		this.activetabcontent()
	},
	oninit: function() {
		var ractive = this


		this.observe('active_id', function(newvalue, oldvalue, keypath ) {
			ractive.activetabcontent()
		})

		this.on('closetab', function(e) {

			console.log("close", e.resolve() )
			var id = this.get( e.resolve() + '.id')

			this.set( e.resolve() + '.closed', true )

			this.active_cache = this.active_cache.filter(function(tid) { return tid !== id })
			//this.set('tabs', this.get('tabs').filter(function(t) { return t.id !== id }) )

			if (this.get('active_id') === id ) {
				// the current tab was closed
				this.set('active_id', this.active_cache.pop() )
			}
			ractive.activetabcontent()
			return false;
		})
		this.on('activetab', function(e, id) {
			this.set('active_id', id )
			return false;
		})
	},
})
