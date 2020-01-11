


	var JSZip = require("jszip")
	import ace from '@databank/ractive-ace-editor'
	import tree from './editor-tree'
	import tabs from './tabs'



	export default Ractive.extend({
		isolated: true,
		components: {
			ace: ace,
			tree: tree,
			tabs: tabs,
		},

		template: `


		<div style="height: 600px;border: 1px solid #545b64;position: relative;">

			<div class="editor-menubar"></div>
			<!-- folders -->
			{{#if files}}
				<tree files={{files}}/>
			{{/if}}


			<tabs style="position: absolute;top: 40px;left: 233px;right: 0px;border-bottom: 1px solid #eaeaea;background-color: #ddd;{{#if editor_result_open}}bottom: 280px;{{else}}bottom: 0px;{{/if}}">

				{{#tabs}}
				<tab name={{.name}} style="background-color: blue;font-size:  12px;" >
					<textarea value={{.content}}></textarea>
				</tab>
				{{/tabs}}

				<tab name="index.js" active={{true}} style="background-color: red;font-size:  12px;">




					<ace
						style="position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;"
						class=""

						font-size={{13}}
						show-invisibles={{false}}
						show-indent-guides={{false}}
						read-only={{ busy }}


						value='this is editor 2' />


						{{#if indexjs_content === false}}
							<div style="text-align: center;margin-top: 280px;">
								Downloading and unpacking zip locally
							<div>
						{{else}}


						<ace
							style="position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;"
							class=""

							font-size={{13}}
							show-invisibles={{false}}
							show-indent-guides={{false}}
							read-only={{ busy }}


							value='this is editor 1' />

						{{/if}}

				</tab>

			</tabs>



			{{#if editor_result_open}}
				<div style="position: absolute;left: 233px;right: 0px;height: 280px;bottom: 0px;border-top: 1px solid #ccc;">
					<pre style="position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;white-space: pre-wrap;border: 0px;background-color: transparent;">{{editor_result_raw}}</pre>
				</div>
			{{/if}}

		</div>

`,
		data: function() {
			return {
				indexjs_content: false,
				tabs: [
					{
						name: 'index1.js',
						content: 'hello1'
					},

					{
						name: 'index2.js',
						content: 'hello2'
					},
				]
			}
		},
		on: {
			init: function() {

				var ractive = this;

				this.observe('editor_result_open', function() {

					setTimeout(function() {
						try {
							ractive.findComponent('ace').resize()
						} catch(e) {
							console.log("resize failed", e )
						}
					}, 200)

				})

				var url = "http://localhost:8080/?proxyfile=" + encodeURIComponent( ractive.get('zip-url') )
				//var url = "https://cors-anywhere.herokuapp.com/" + encodeURIComponent( ractive.get('zip-url') )



				// fetch(url, { mode: 'cors', cache: 'no-cache', })
				// 	.then(function(response) { return response.blob() })
				// 	.then(function(data) {
				// 		//console.log("codebuff", data )
				// 		var new_zip = new JSZip();
				//
				// 		new_zip.loadAsync(data)
				// 		.then(function(contents) {
				// 			// contents.files
				// 			//console.log("after zip.loadAsync", contents.files )
				//
				// 			ractive.set({ files: contents.files })
				//
				// 			new_zip.file('index.js').async('string').then(function(response) {
				// 				//console.log('contents of index.js', response )
				// 				ractive.set({indexjs_content: response })
				// 			})
				// 		//    // you now have every files contained in the loaded zip
				// 		//    new_zip.file("hello.txt").async("string"); // a promise of "Hello World\n"
				// 		});
				// 	})


			}
		}
	})
