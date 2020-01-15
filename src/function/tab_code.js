
import { fs } from 'memfs';
import editor from '../editor/index';
var JSZip = require("jszip");
var async = require("async")

export default Ractive.extend({
	components: {
		editor: editor,
	},
	template: `
		<div style="position: absolute;top: 0px;left: 10px;right: 0px;bottom:0px;">
			<div style="position: absolute;left: 0px;right:0px;top: 0px;height: 50px;">
				<div style="float: right;padding-top: 10px;">
					<a class="btn btn-sm btn-default disabled" > Delete </a>
					<a class="btn btn-sm btn-default disabled" on-click="test" > Test </a>
					<a class="btn btn-sm btn-default {{#if files_changed === 0}}disabled{{/if}}" {{#if files_changed > 0}}on-click="save"{{/if}} > Upload </a>
				</div>
				<h4 style="color: #000;">{{name}}</h4>
			</div>
			<div class="function-details-head" style="position: absolute;left: 0px;right:0px;top: 50px;bottom: 0px;">

				{{#if fs}}
					<editor fs={{fs}} theme={{theme}} />
				{{else}}
					<div style="text-align: center;margin-top: 280px;">
						Downloading and unpacking zip locally
					<div>
				{{/if}}

			</div>
		</div>
	`,
	onFileChange( file, code ) {
		var ractive=this;

		var zip = this.get('zip')
		var fs  = this.get('fs')
		var path = file.slice(1) // remve the preceding /, fs has it, zip doesnt
		console.log( "updated", path )

		zip.file( path ).async("string").then(function( content ) {

			var newcontent = fs.readFileSync( '/' + path, 'utf8' )
			if ( newcontent !== content ) {
				var changes = ractive.get('changes')
				changes[path] = true;
				ractive.set('changes', changes )
			} else {
				var changes = ractive.get('changes')
				delete changes[path];
				ractive.set('changes', changes )
			}

		})

	},
	load_zipfs: function( zipurl ) {
		var ractive=this;

		var url = zipurl;

		if (this.get('cors-proxy'))
			url =  this.get('cors-proxy') + encodeURIComponent( zipurl )

		//var url = "https://cors-anywhere.herokuapp.com/" + encodeURIComponent( ractive.get('zip-url') )

		fetch(url, { mode: 'cors', cache: 'no-cache', })
			.then(function(response) { return response.blob() })
			.then(function(data) {
				console.log("codebuff", data )
				var new_zip = new JSZip();

				new_zip.loadAsync(data)
				.then( function(contents) {


					Object.keys(contents.files).map(function( path ) {
						if (contents.files[path].dir === true )
							fs.mkdirpSync( '/' + contents.files[path].name );
					})
					console.log("done with dirs")

					async.each(Object.keys(contents.files), function(item, cb ) {
						//console.log(item)
						if ( contents.files[item].dir === true )
							return cb()

						new_zip.file(contents.files[item].name).async('uint8array').then(function(response) { // uint8array
							if (contents.files[item].name === 'index.js')
								console.log("got contents", response )
							fs.writeFileSync("/" + contents.files[item].name, response );
							cb()
						})

					}, function() {
						console.log("done with files")
						ractive.set('fs', fs )

					})
				});
				ractive.set('zip', new_zip )
			})


	},
	data: function() {
		return {
			tab: 'configuration',
			busy: false,
			editor_result_open: false,
			editor_result_raw: '',
			zip_body: null,

			files_changed: 0,
			changes: {

			},
		}
	},
	on: {
		init() {

			var ractive=this;
			var params = {
				FunctionName: this.get('function.name'),
				//Qualifier: "1"
			};
			lambda.getFunction(params, function(err, data) {
				console.log(err,data)
				if (err)
					return;


				ractive.set('function.Code', data.Code )
				ractive.load_zipfs( data.Code.Location )

			})

			this.observe('changes', function() {
				ractive.set("files_changed", Object.keys(ractive.get('changes')).length)
			})
		},

		save() {
			var ractive=this;

			var zip = this.get('zip')
			var fs  = this.get('fs')

			var changed = []
			async.each(Object.keys(zip.files), function(path, cb ) {
				if (zip.files[path].dir === true )
					return cb();

				zip.file( path ).async("string").then(function( content ) {

					var newcontent = fs.readFileSync( '/' + path, 'utf8' )
					if ( newcontent !== content ) {
						changed.push( path )
					}
					cb()
				})
			}, function(err) {
				if (!changed.length)
					return alert('no changes')

				console.log( changed.join("\n") )
				async.each( changed, function( path, cb ) {
					zip.file(path, fs.readFileSync( '/' + path, 'utf8' ) );
					cb()
				}, function(err) {
					console.log("updated files inside zip")

						zip.generateAsync({
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
									FunctionName: ractive.get('function.name'),
									Publish: true,
									ZipFile: buff,
								};
								lambda.updateFunctionCode(params, function(err, data) {
									if (err)
										return alert('update code failed')

									ractive.set({busy: false,})
									ractive.set({changes: {}})
									console.log(err,data)
								});

							})

						});
				})
			})
		},
	}
})
