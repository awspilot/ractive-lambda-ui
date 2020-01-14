
export default Ractive.extend({
	template: `
		<pre>
{{  debug }}
		</pre>
	`,
	on: {
		init() {
			var ractive=this;
			var params = {
				FunctionName: this.get('function.name'),
				//Qualifier: "1"
			};
			lambda.getFunction(params, function(err, data) {
				if (err)
					return;

				ractive.set('debug', JSON.stringify(data.Configuration, null, "\t") )
				console.log(err,data)
			})

		}
	}
})
