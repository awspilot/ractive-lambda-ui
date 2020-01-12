
import editor from './editor';


export default Ractive.extend({
	components: {
		editor: editor,
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
			<div class="function-details-head" style="position: absolute;left: 0px;right:0px;top: 40px;bottom: 0px;">
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

							{{#if function.Code.Location}}
							<editor
								editor_result_open={{editor_result_open}}
								editor_result_raw={{editor_result_raw}}
								zip-url={{function.Code.Location}}
							/>
							{{/if}}

						</div>

					</div>

				</tabcontent>


			</div>








		</div>
	`,
	data: function() {
		return {
			tab: 'configuration',
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

			//console.log('getfunction', data)
			ractive.set({function: data })
			cb(null, data )
		})

	},


	on: {
		init: function() {
			var ractive = this;

			this.get_function(function(err,data) {



			})

		},
		// save: function() {
		// 	var ractive=this;
		//
		// 	var url = "http://localhost:8080/?proxyfile=" + encodeURIComponent( ractive.get('function').Code.Location )
		//
		// 	this.set({busy: true,})
		//
		// 	fetch(url, { mode: 'cors', cache: 'no-cache', })
		// 		.then(function(response) { return response.blob() })
		// 		.then(function(data) {
		// 			console.log("codebuff", data )
		// 			var new_zip = new JSZip();
		//
		// 			new_zip.loadAsync(data)
		// 			.then(function(contents) {
		//
		// 				console.log('zip loaded')
		//
		// 				new_zip.file("index.js", ractive.get('indexjs_content'))
		//
		// 				console.log("zip added index.js")
		// 				new_zip.generateAsync({
		// 					type:"blob",
		// 					//type: 'uint8array',
		// 					streamFiles: true,
		// 					compression: "DEFLATE",
		// 					compressionOptions: {level: 9}
		// 				})
		// 				.then(function(content) {
		//
		// 					console.log("zip regenerated")
		//
		// 					content.arrayBuffer().then(function(buff) {
		// 						console.log('save back buff', buff ) // content is blob
		//
		//
		// 						var params = {
		// 							FunctionName: ractive.get('name'),
		// 							Publish: true,
		// 							ZipFile: buff,
		// 						};
		// 						lambda.updateFunctionCode(params, function(err, data) {
		// 							if (err)
		// 								return alert('update code failed')
		//
		// 							ractive.set({busy: false,})
		// 							console.log(err,data)
		// 						});
		//
		// 					})
		//
		// 				});
		//
		//
		//
		//
		// 			});
		// 		})
		// },
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
