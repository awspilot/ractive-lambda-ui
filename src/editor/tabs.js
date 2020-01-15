


import CodeFlask from 'codeflask';


export default Ractive.extend({
	components: {

	},
	template:
		`
		<tabhead>
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
			{{#tabs}}
				{{#if .closed === true}}
					<div class='closedtab'></div>
				{{else}}
					<div style="position: absolute;top: 5px;left: 5px;right: 5px;bottom: 5px;{{#if .id !== active_id  }}visibility:hidden;{{/if}}">
						{{#if .type === 'ace' }}
							<div id="editor{{.id}}"></div>
						{{/if}}
					</div>

				{{/if}}
			{{/tabs}}
		</tabcontent>
		`,
	data: function() {
		return {
			tabs: [],
		}
	},
	active_cache: [],
	activetabcontent: function() {
		var ractive = this
		ractive.active_cache.push(ractive.get('active_id'))
		ractive.findAllComponents('function_tab').map(function( tableview_c ) {
			tableview_c.set('active', tableview_c.get('table.id') === ractive.get('active_id') )
		})
	},
	newtab: function(component_name, param1 ) {
		var ractive=this;

		var tabs_like_this = this.get('tabs').filter(function(t) {
			return (t.name === param1) && (t.type === component_name)
		})

		console.log(tabs_like_this[0])
		if (tabs_like_this.length) {
			// switch to it
			this.set('active_id', tabs_like_this[0].id )
			return;
		}

		var id=(Math.random()*100000000000000000).toString().split('.').join('')
		this.set('active_id', id )
		this.push('tabs', {
			id: id,

			name: param1,
			type: component_name,
		} )
		var idx = this.get('tabs').length - 1;
		this.activetabcontent()
		setTimeout(function() {
			var fs = ractive.get('fs');
			var content = fs.readFileSync(param1,'utf8')
			var flask = new CodeFlask('#editor'+id, { language: 'js', lineNumbers: true });
			flask.updateCode(content);
			flask.onUpdate((code) => {
				fs.writeFileSync( param1, code )
				//console.log("update", code )
				//ractive.parent = editor
				//ractive.parent.parent = tab_code
				//ractive.parent.parent.onFileChange(param1, code )
			});
			ractive.set('tabs.'+idx+'.flask', flask)
		}, 50)
	},
	oninit: function() {
		var ractive = this


		this.observe('active_id', function(newvalue, oldvalue, keypath ) {
			ractive.activetabcontent()
		})

		this.on('closetab', function(e) {

			var id = this.get( e.resolve() + '.id')
			var flask = this.get( e.resolve() + '.flask')
			// flask.destroy() // it has no destroy method


			this.set( e.resolve() + '.closed', true )
			this.set( e.resolve() + '.name' )

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
