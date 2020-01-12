
var JSZip = require("jszip");


export default Ractive.extend({
	template: `
		<h2>Create function</h2>

		<div style="box-shadow: 0 1px 1px 0 rgba(0,28,36,.5);border-top: 1px solid #eaeded;background-color: #fff">

			<div style="height: 50px;padding: 0px 10px;background-color: #fafafa;font-size: 24px;font-weight: bold;line-height: 50px;;">
				Basic information
			</div>

			<div style="padding: 10px;">
				<div>Function name</div>
				<div>Enter a name that describes the purpose of your function.</div>
				<div>
					<input value={{function_name}} placeholder="myFunctionName" style="width: 50%;" />
				</div>


				<div>Runtime</div>
				<div>Choose the language to use to write your function.</div>
				<div>
					<select value={{runtime}} style="width: 50%;" >
						<option value="nodejs10.x">NodeJS 10.x</option>
					</select>
				</div>


				<div>Permissions</div>
				<div>Choose a role that defines the permissions of your function.</div>
				<div>
					<select value={{role}} style="width: 50%;" >
						{{#if !roles}}
							<option>Loading...</option>
						{{/if}}
						{{#roles}}
							<option value={{.Arn}}>{{.RoleName}}</option>
						{{/roles}}
					</select>
				</div>
			</div>

		</div>

		<div style="text-align: right;padding: 10px 0px;">
				<a class="btn btn-sm" on-click="cancel"> Cancel </a>
				<a class="btn btn-sm btn-warning" on-click="createfunction"> Create function </a>
		</div>
	`,
	get_roles() {
		var ractive=this;
		var params = {
			//Marker: 'STRING_VALUE',
			//MaxItems: 'NUMBER_VALUE',
			//PathPrefix: 'STRING_VALUE'
		};
		iam.listRoles(params, function(err, data) {
			if (err)
				return alert('failed listing roles')

			var roles = data.Roles
				.map(function(r) {
					try {
						r.policy = JSON.parse(decodeURIComponent( r.AssumeRolePolicyDocument ))

					} catch (e) {
						r.policy = {}
					}
					return r;
				})
				.filter(function(r) {
					if (  ((((r.policy || {}).Statement || [])[0] || {}).Principal || {}).Service !== 'lambda.amazonaws.com'   )
						return false;

					return true;
				})


			ractive.set('roles', roles )
			console.log("roles=", roles )
		});
	},
	data: function() {
		return {
			function_name: '',
			runtime: 'nodejs10.x',
			role: null,
			timeout: 3,
			memory: 128,
		}
	},
	on: {
		init() {
			this.get_roles()
		},
		cancel() {
			this.parent.gotolist()
		},
		createfunction() {
			var ractive=this;

			var zip = new JSZip();
			zip.file("index.js",
`
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
`
);
			zip.generateAsync({type:"blob"})
			.then(function(content) {

				content.arrayBuffer().then(function(buff) {
					console.log('buff', buff ) // content is blob

					var params = {
						Code: {
							ZipFile: buff,
						},
						Description: "",
						FunctionName: ractive.get('function_name'),
						Handler: "index.handler",
						MemorySize: ractive.get('memory'),
						Publish: true,
						Role: ractive.get('role'),
						Runtime: ractive.get('runtime'),
						Timeout: ractive.get('timeout'),
						VpcConfig: {}
					};
					lambda.createFunction(params, function(err, data) {
						if (err)
							return alert('create failed')

						ractive.parent.gotolist()
					});
				})

			});


		}
	}
})
