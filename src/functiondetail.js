var JSZip = require("jszip");

import ace from '@databank/ractive-ace-editor';

export default Ractive.extend({
	components: {
		ace: ace,
	},
	template: `
		<div style="position: absolute;top: 30px;left: 10px;right: 0px;bottom:0px;">
			<div style="position: absolute;left: 0px;right:0px;top: 0px;height: 50px;">
				<div style="float: right;padding-top: 7px;">
					<a class="btn btn-sm btn-default disabled" > Delete </a>
					<a class="btn btn-sm btn-default" on-click="test" > Test </a>
					<a class="btn btn-sm btn-default" on-click="save" > Save </a>
				</div>
				<h4 style="color: #000;">{{name}}</h4>
			</div>
			<div style="position: absolute;left: 0px;right:0px;top: 40px;bottom: 0px;">
				<tabhead style="">
					<tab class='{{#if tab === "configuration" }}active{{/if}}' on-click='@this.set("tab", "configuration")'>Configuration</tab>
					<tab class='{{#if tab === "monitoring" }}active{{/if}}' on-click='@this.set("tab", "monitoring")'>Monitoring</tab>
				</tabhead>

				<tabcontent style="top: 50px;">
					<div style="box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff">

						<div style="height: 50px;padding: 0px 10px;background-color: #fafafa;font-size: 18px;font-weight: bold;line-height: 50px;border-bottom: 1px solid #eaeded;">
							Function code
						</div>

						<div style="padding: 10px;">

							<div style="height: 600px;border: 1px solid #545b64;position: relative;">

								<div style="position: absolute;top: 0px;left: 0px;right: 0px;height: 40px;border-bottom: 1px solid #eaeaea;"></div>
								<!-- folders -->
								<div style="position: absolute;top: 40px;left: 0px;bottom: 0px;width: 233px;border-right: 1px solid #eaeaea;">
									<div style="text-align: center;margin-top: 280px;">
										Folder preview<br>
										not implemented.
									</div>
								</div>

								<!-- content -->
								<div style="position: absolute;top: 40px;left: 233px;right: 0px;	{{#if editor_result_open}}bottom: 280px;{{else}}bottom: 0px;{{/if}} ">
									{{#if indexjs_content === false}}
										<div style="text-align: center;margin-top: 280px;">
											Downloading and unpacking zip locally
										<div>
									{{else}}

										<ace
											style="position: absolute;top: 0px;left: 0px;width: 100%;bottom: 0px;"
											class=""

											font-size={{13}}
											show-invisibles={{true}}

											value={{indexjs_content}} />

										<!--
										<textarea style="border: 0px;position: absolute;top: 0px;left: 0px;width: 100%;bottom: 0px;outline: none;{{#if busy}}background-color: #ccc;{{/if}}" value={{indexjs_content}} {{#if busy}}readonly{{/if}}></textarea>
										-->
									{{/if}}
								</div>

								{{#if editor_result_open}}
									<div style="position: absolute;left: 233px;right: 0px;height: 280px;bottom: 0px;border-top: 1px solid #ccc;">
										<pre style="position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;white-space: pre-wrap;border: 0px;background-color: transparent;">{{editor_result_raw}}</pre>
									</div>
								{{/if}}

							</div>

						</div>

					</div>

				</tabcontent>


			</div>








		</div>
	`,
	data: function() {
		return {
			tab: 'configuration',
			indexjs_content: false,
			busy: false,
			editor_result_open: false,
			editor_result_raw: '',
		}
	},

	get_function( cb ) {
		var ractive=this;
		var params = {
			FunctionName: this.get('name'),
		};
		lambda.getFunction(params, function(err, data) {
			if (err) {
				alert('Failed getting function configuration')
				return cb(err)
			}

			console.log('getfunction', data)
			ractive.set({function: data })
			cb(null, data )
		})

	},


	on: {
		init: function() {
			var ractive = this;

			this.get_function(function(err,data) {



				var url = "http://localhost:8080/?proxyfile=" + encodeURIComponent( ractive.get('function').Code.Location )
				//var url = "https://cors-anywhere.herokuapp.com/" + ractive.get('function').Code.Location


				fetch(url, { mode: 'cors', cache: 'no-cache', })
					.then(function(response) { return response.blob() })
					.then(function(data) {
						console.log("codebuff", data )
						var new_zip = new JSZip();

						new_zip.loadAsync(data)
						.then(function(contents) {
							// contents.files
							console.log("after zip.loadAsync", contents )
							new_zip.file('index.js').async('string').then(function(response) {
								//console.log('contents of index.js', response )
								ractive.set({indexjs_content: response })
							})
						//    // you now have every files contained in the loaded zip
						//    new_zip.file("hello.txt").async("string"); // a promise of "Hello World\n"
						});
					})
			})

		},
		save: function() {
			var ractive=this;

			var url = "http://localhost:8080/?proxyfile=" + encodeURIComponent( ractive.get('function').Code.Location )

			this.set({busy: true,})

			fetch(url, { mode: 'cors', cache: 'no-cache', })
				.then(function(response) { return response.blob() })
				.then(function(data) {
					console.log("codebuff", data )
					var new_zip = new JSZip();

					new_zip.loadAsync(data)
					.then(function(contents) {

						console.log('zip loaded')

						new_zip.file("index.js", ractive.get('indexjs_content'))

						console.log("zip added index.js")
						new_zip.generateAsync({
							type:"blob",
							//type: 'uint8array',
							streamFiles: true,
							compression: "DEFLATE",
							compressionOptions: {level: 9}
						})
						.then(function(content) {

							console.log("zip regenerated")

							content.arrayBuffer().then(function(buff) {
								console.log('save back buff', buff ) // content is blob


								var params = {
									FunctionName: ractive.get('name'),
									Publish: true,
									ZipFile: buff,
								};
								lambda.updateFunctionCode(params, function(err, data) {
									if (err)
										return alert('update code failed')

									ractive.set({busy: false,})
									console.log(err,data)
								});

							})

						});




					});
				})
		},
		test: function() {
			var ractive=this;
			this.set({ editor_result_open: true, editor_result_raw: '' })

			var ractive=this;
			var params = {
				FunctionName: ractive.get('name'),
				InvocationType: 'RequestResponse',
				LogType: "Tail",
				Payload: JSON.stringify({}),
			};
			lambda.invoke(params, function(err, data) {
				if (err) {
					ractive.set({ editor_result_open: true, editor_result_raw:
						"Response:\n" +
						JSON.stringify(JSON.parse(err), null, "\t")
					})
					return;
				}

				ractive.set({ editor_result_open: true, editor_result_raw:
					"Response:\n" +
					JSON.stringify(JSON.parse(data.Payload), null, "\t") +
					"\n" +
					atob(data.LogResult)
				})
			});
		}
	}
})
