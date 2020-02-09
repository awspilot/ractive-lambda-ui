const sizes = [
	 128, 192, 256, 320, 384, 448, 512,
	 576, 640, 704, 768, 832, 896, 960,
	1024,1088,1152,1216,1280,1344,1408,
	1472,1536,1600,1664,1728,1792,1856,
	1920,1984,2048,2112,2176,2240,2304,
	2368,2432,2496,2560,2624,2688,2752,
	2816,2880,2944,3008
]

export default Ractive.extend({
	template: `

		<!-- env -->
		<div style="width: min-height: 300px;padding: 10px;">
			<div style="background-color: #fff;height: 100%;padding: 10px;">
				<h3>Environment variables</h3>

				<table>
				{{#each updateFunctionConfiguration.Configuration.Environment.Variables:key }}
					<tr>
						<td> <input value={{key}} /></td>
						<td> <input value={{.}}   /></td>
						<td></td>
					</tr>
				{{/each}}
				</table>
			</div>
		</div>

		<div style="width: 50%;float: left;height: 300px;padding: 10px;">
			<div style="background-color: #fff;height: 100%;padding: 10px;">
				<h3>Execution role</h3>

				{{getFunction.Configuration.Role}}
			</div>
		</div>

		<div style="width: 50%;float: left;height: 300px;padding: 10px;">
			<div style="background-color: #fff;height: 100%;padding: 10px;">
				<h3>Basic Settings</h3>

				<label>Description</label>
				<div style="margin-bottom: 15px;">
					<input type="text" class="input-text" style="width: 100%;" value={{updateFunctionConfiguration.Configuration.Description}} />
				</div>

				<label>Memory (MB) - {{updateFunctionConfiguration.Configuration.MemorySize}}</label>
				<div style="margin-bottom: 15px;">
					<input type="range" value={{memsize}} style="width: 100%;" min="0" max={{sizes.length-1}}>
				</div>

				<label>Timeout (sec) - {{updateFunctionConfiguration.Configuration.Timeout}}</label>
				<div style="margin-bottom: 15px;">
					<input type="number" value={{updateFunctionConfiguration.Configuration.Timeout}} style="width: 100%;">
				</div>

				<a class="btn btn-sm btn-primary {{#if dirty_mem || dirty_desc || dirty_timeout }}{{else}}disabled{{/if}}" on-click='save-desc-mem-timeout'>Save</a>

			</div>
		</div>
		<div style="clear: both"></div>

		<table>
			<tr>
				<td>FunctionName</td>
				<td>{{getFunction.Configuration.FunctionName}}</td>
			</tr>
			<tr>
				<td>FunctionArn</td>
				<td>{{getFunction.Configuration.FunctionArn}}</td>
			</tr>
			<tr>
				<td>Runtime</td>
				<td>{{getFunction.Configuration.Runtime}}</td>
			</tr>
			<tr>
				<td>Handler</td>
				<td>{{getFunction.Configuration.Handler}}</td>
			</tr>
			<tr>
				<td>CodeSize</td>
				<td>{{getFunction.Configuration.CodeSize}}</td>
			</tr>
			<tr>
				<td>LastModified</td>
				<td>{{getFunction.Configuration.LastModified}}</td>
			</tr>
			<tr>
				<td>CodeSha256</td>
				<td>{{getFunction.Configuration.CodeSha256}}</td>
			</tr>
			<tr>
				<td>Version</td>
				<td>{{getFunction.Configuration.Version}}</td>
			</tr>
			<tr>
				<td>RevisionId</td>
				<td>{{getFunction.Configuration.RevisionId}}</td>
			</tr>
			<tr>
				<td>VpcConfig</td>
				<td>{{ stringify(getFunction.Configuration.VpcConfig) }}</td>
			</tr>
			<tr>
				<td>KMSKeyArn</td>
				<td>{{ stringify(getFunction.Configuration.KMSKeyArn) }}</td>
			</tr>
			<tr>
				<td>TracingConfig</td>
				<td>{{ stringify(getFunction.Configuration.TracingConfig) }}</td>
			</tr>
			<tr>
				<td>MasterArn</td>
				<td>{{ stringify(getFunction.Configuration.MasterArn) }}</td>
			</tr>
		</table>


	`,
	on: {
		'save-desc-mem-timeout': function() {

			var ractive=this;

			lambda.updateFunctionConfiguration({
				FunctionName: this.get('getFunction.Configuration.FunctionArn'),
				Description: this.get('updateFunctionConfiguration.Configuration.Description'),
				MemorySize: this.get('updateFunctionConfiguration.Configuration.MemorySize'),
				Timeout: this.get('updateFunctionConfiguration.Configuration.Timeout'),
			}, function(err,data) {
				if (err)
					return alert('Update Failed')

				ractive.get_function()
			})
		},

		init() {
			var ractive=this;

			this.get_function()

			this.observe('memsize', function( n ) {
				this.set('updateFunctionConfiguration.Configuration.MemorySize', sizes[n])
			})
			this.observe('updateFunctionConfiguration', function(n) {
				this.set({dirty_mem:  this.get('updateFunctionConfiguration.Configuration.MemorySize')  !== this.get('getFunction.Configuration.MemorySize') })
				this.set({dirty_desc: this.get('updateFunctionConfiguration.Configuration.Description') !== this.get('getFunction.Configuration.Description') })
				this.set({dirty_timeout: this.get('updateFunctionConfiguration.Configuration.Timeout') !== this.get('getFunction.Configuration.Timeout') })
			})



		},
	},
	data: function() {
		return {
			sizes: sizes,
			dirty_mem: false,
			dirty_desc: false,
			dirty_timeout: false,

			stringify( v ) {
				return JSON.stringify( v, null, "\t" )
			}
		}
	},
	get_function() {
		var ractive=this;

		var params = {
			FunctionName: this.get('function.name'),
			//Qualifier: "1"
		};
		lambda.getFunction(params, function(err, data) {
			if (err)
				return alert('failed getting function');

			ractive.set('getFunction', data )

			ractive.set('updateFunctionConfiguration', {
					Configuration: {
						// FunctionName: 'STRING_VALUE', /* required */
						// DeadLetterConfig: {
						// TargetArn: 'STRING_VALUE'
						// },
						Description: data.Configuration.Description,
						Environment: {
							Variables: data.Configuration.Environment.Variables,
						},
						// Handler: 'STRING_VALUE',
						// KMSKeyArn: 'STRING_VALUE',
						// Layers: [
						// 'STRING_VALUE',
						// /* more items */
						// ],
						MemorySize: data.Configuration.MemorySize,
						// RevisionId: 'STRING_VALUE',
						// Role: 'STRING_VALUE',
						// Runtime: nodejs | nodejs4.3 | nodejs6.10 | nodejs8.10 | nodejs10.x | nodejs12.x | java8 | java11 | python2.7 | python3.6 | python3.7 | python3.8 | dotnetcore1.0 | dotnetcore2.0 | dotnetcore2.1 | nodejs4.3-edge | go1.x | ruby2.5 | provided,
						Timeout: data.Configuration.Timeout,
						// TracingConfig: {
						// Mode: Active | PassThrough
						// },
						// VpcConfig: {
						// SecurityGroupIds: [
						// 'STRING_VALUE',
						// /* more items */
						// ],
						// SubnetIds: [
						// 'STRING_VALUE',
						// /* more items */
						// ]
						// }
					}
			} )


			sizes.map(function(v,idx,arr) {
				if (v === data.Configuration.MemorySize )
					ractive.set('memsize', idx )
			})


			var dump = JSON.parse(JSON.stringify(data.Configuration))
			delete dump.FunctionName;
			delete dump.FunctionArn;
			delete dump.Runtime;
			delete dump.Role;
			delete dump.Handler;
			delete dump.CodeSize;
			delete dump.Description;
			delete dump.Timeout;
			delete dump.MemorySize;
			delete dump.LastModified;
			delete dump.CodeSha256;
			delete dump.Version;
			delete dump.Environment;
			delete dump.MasterArn;
			delete dump.RevisionId;
			delete dump.VpcConfig;
			delete dump.KMSKeyArn;
			delete dump.TracingConfig;

			ractive.set('dump', JSON.stringify( dump, null, "\t") )


			console.log(err,data)
		})

	},
})
