
import {IconX, IconLambda} from './svgicons';
import functionslistfull from './functionlist';
import functioncreate from './function/create';
import functiontab from './function/tab';

export default Ractive.extend({
	//isolated: true,
	components: {
		functionslistfull: functionslistfull,
		functioncreate: functioncreate,
		functiontab: functiontab,

		'icon-x': IconX,
		'icon-lambda': IconLambda,
	},
	template:
		`
		<tabhead>
			<tab class='{{#if active_id === "functions" }}active{{/if}}' on-click='@this.fire("activetab", "functions")'>
				<icon-lambda style="width: 15px;height: 15px;" />
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
			{{#if active_id === "functions" }}
				<functionslistfull />
			{{else}}
				{{#tabs}}
					{{#if .closed === true}}
						<div class='closedtab'></div>
					{{else}}
						{{#if .type === 'function_create' }}
							<functioncreate active={{ .id === active_id  }} />
						{{/if}}
						{{#if .type === 'function_tab' }}
							<functiontab
								function={{.}}
								active={{ .id === active_id  }}
								theme={{theme}}
								cors-proxy={{~/['cors-proxy']}}
								logs-streams-refresh-interval={{~/['logs-streams-refresh-interval']}}
							/>
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
		ractive.findAllComponents('function_tab').map(function( function_tab ) {
			function_tab.set('active', function_tab.get('table.id') === ractive.get('active_id') )
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
