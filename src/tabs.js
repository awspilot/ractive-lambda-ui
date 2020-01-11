






	import ace from '@databank/ractive-ace-editor'
	var tab = Ractive.extend({
		//isolated: false,
		components: {
			ace: ace,
		},
		template: `
			<tab class='{{#if active}}active{{/if}}' on-click='tabactivate'>
				{{name}}
				<i class='icon zmdi zmdi-close' on-click='closetab'></i>
			</tab>
			<div class="content" style="{{style}};{{#if active}}{{else}}visibility: hidden;{{/if}}">
				{{ yield }}
			</div>
		`,
		on: {
			tabactivate: function() {
				this.parent.inactivate_all_tabs()
				this.set({active: true})
			}
		}
	})

	export default Ractive.extend({
		components: {
			tab: tab,
			ace: ace,
		},

		template: `

<div class="tabs editor-tabheads" style={{style}}>
	<tabhead-bg />
	<tabhead-tabs>
	{{ yield }}
	</tabhead-tabs>

</div>
`,
		data: function() {
			return {
			}
		},
		inactivate_all_tabs: function() {
			this.findAllComponents('tab').map(function(r) {
				r.set({active:false,})
			})
		}
	})
