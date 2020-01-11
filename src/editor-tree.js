





	var treelevel = Ractive.extend({
		template: `
		<ul>
			{{#each tree}}
				<li>
					{{#if .dir}}
						<svg style="width: 18px;height: 18px;vertical-align: sub;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve" on-click="openfolder">
							<path style="fill:#EFCE4A;" d="M55.981,54.5H2.019C0.904,54.5,0,53.596,0,52.481V20.5h58v31.981C58,53.596,57.096,54.5,55.981,54.5z"/>
							<path style="fill:#EBBA16;" d="M26.019,11.5V5.519C26.019,4.404,25.115,3.5,24,3.5H2.019C0.904,3.5,0,4.404,0,5.519V10.5v10h58 v-6.981c0-1.115-0.904-2.019-2.019-2.019H26.019z"/>
						</svg>
					{{else}}
						<svg style="width: 18px;height: 18px;vertical-align: sub;" viewBox="-48 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m416 512h-416v-374.625l137.375-137.375h278.625zm0 0" fill="#d7dee2"/>
							<path d="m176 448h-16c-26.464844 0-48-21.535156-48-48v-41.375l-38.625-38.625 38.625-38.625v-41.375c0-26.464844 21.535156-48 48-48h16v32h-16c-8.816406 0-16 7.183594-16 16v54.625l-25.375 25.375 25.375 25.375v54.625c0 8.816406 7.183594 16 16 16h16zm0 0" fill="#48c8ef"/>
							<path d="m256 448h-16v-32h16c8.816406 0 16-7.183594 16-16v-54.625l25.375-25.375-25.375-25.375v-54.625c0-8.816406-7.183594-16-16-16h-16v-32h16c26.464844 0 48 21.535156 48 48v41.375l38.625 38.625-38.625 38.625v41.375c0 26.464844-21.535156 48-48 48zm0 0" fill="#48c8ef"/>
							<path d="m137.375 137.375v-137.375l-137.375 137.375zm0 0" fill="#bfc9d1"/>
						</svg>
					{{/if}}

					{{#if .dir}}
						<a on-click="openfolder">{{.name}}</a>
					{{else}}
						<a on-dblclick="openfile">{{.name}}</a>
					{{/if}}


					{{#if .dir && .open}}
						<div style="margin-left: 16px;">
							<treelevel tree={{.childs}} level={{level+1}} />
						</div>
					{{/if}}


			{{/each}}
		</ul>
		`,
		openfile: function(path) {
			this.parent.openfile(path)
		},
		on:{
			openfolder: function(e) {
				this.toggle( e.resolve() + '.open' )
			},
			openfile: function(e) {
				this.parent.openfile(this.get(e.resolve() + '.path'))
			},
		},
		onconfig: function(options) {
			this.components['treelevel'] = treelevel;
		},
	})

	export default Ractive.extend({
		components: {
			treelevel: treelevel,
		},
		template: `
<div style="position: absolute;top: 40px;left: 0px;bottom: 0px;width: 233px;border-right: 1px solid #eaeaea;overflow: auto;">

	<treelevel tree={{tree}} level={{1}} />

</div>

`,


		openfile: function(path) {
			alert('open file ' + path )
		},
		on: {
			init: function() {
				var files = this.get('files')
				var tree = {}
				Object.keys(files).map(function(k) {
					tree[k] = {
						dir: files[k].dir,
						name: files[k].dir ? files[k].name.slice(0,-1) : files[k].name,
						path: files[k].dir ? undefined : files[k].name,
					}
				})
				Object.keys(tree).map(function(k) {
					if ( (k.split('/').length > 1) && k.split('/')[1] !== "" ) {

						if (tree.hasOwnProperty(k.split('/')[0] + '/')) {
							// move it and delete
							if ( ! tree[k.split('/')[0] + '/'].hasOwnProperty('childs') )
								tree[k.split('/')[0] + '/'].childs = {}

							tree[k.split('/')[0] + '/'].childs[k] = tree[k]

							delete tree[k];
						}

					}
				})

				var process_subfolder = function( childs, folder ) {
					var files = JSON.parse(JSON.stringify(childs))
					var tree = {}

					// remove preceding dir
					Object.keys(childs).map(function(k){
						if ( k.indexOf(folder + '/') === 0 )
							tree[ k.slice(folder.length+1)] = {
								dir: childs[k].dir,
								name: childs[k].name.slice(folder.length+1),
								path: childs[k].dir ? undefined : childs[k].path,
							}
					})

					Object.keys(tree).map(function(k) {
						if ( (k.split('/').length > 1) && k.split('/')[1] !== "" ) {

							if (tree.hasOwnProperty(k.split('/')[0] + '/')) {
								// move it and delete
								if ( ! tree[k.split('/')[0] + '/'].hasOwnProperty('childs') )
									tree[k.split('/')[0] + '/'].childs = {}

								tree[k.split('/')[0] + '/'].childs[k] = tree[k]

								delete tree[k];
							}

						}
					})


					Object.keys(tree).map(function(k) {
						if ((tree[k].dir === true) && tree[k].childs ) {
							tree[k].childs = process_subfolder(tree[k].childs, tree[k].name )
							//console.log("must process", tree[k].childs )
						}
					})


					var sorted = {}
					Object.keys(tree).sort(function(a,b) {
						if (tree[a].dir && tree[b].dir)
							return a > b ? 1 : -1;

						if (tree[a].dir)
							return -1

						if (tree[b].dir)
							return 1

						return a > b ? 1 : -1;

					}).map(function(k) {
						sorted[k] = tree[k]
					})

					return sorted;
				}

				Object.keys(tree).map(function(k) {
					if ((tree[k].dir === true) && tree[k].childs ) {
						tree[k].childs = process_subfolder(tree[k].childs, tree[k].name )
						//console.log("must process", tree[k].childs )
					}
				})


				var sorted = {}
				Object.keys(tree).sort(function(a,b) {
					if (tree[a].dir && tree[b].dir)
						return a > b ? 1 : -1;

					if (tree[a].dir)
						return -1

					if (tree[b].dir)
						return 1

					return a > b ? 1 : -1;

				}).map(function(k) {
					sorted[k] = tree[k]
				})

				this.set({tree: sorted})
			}
		}
	})