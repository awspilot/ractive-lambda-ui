const webpack = require('webpack');
const path = require('path');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // support for ES6+ (succesor of uglify-es)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	node: false,
	node: {
		fs: 'empty'
	},
	mode: 'production',









	performance: {
		hints: false,
	},
	target: 'web',
	context: path.resolve(__dirname, 'src'),
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: false,
				//test: /\.js(\?.*)?$/i,
				test: /\.min\.js$/
			}),
		],
	},

	entry: {
		'ractive-lambda-ui': path.resolve(__dirname, './src/index.ractive.html'),
		'ractive-lambda-ui.min': path.resolve(__dirname, './src/index.ractive.html')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: '@awspilot/ractive-lambda-ui',

		// var, this, window, umd
		libraryTarget: 'umd',
		umdNamedDefine: true,   // Important
		libraryExport: 'default',
		globalObject: 'this',
	},
	externals: {
		ractive: {
			commonjs: 'ractive',
			commonjs2: 'ractive',
			amd: 'ractive',
			root: 'Ractive'
		},
		"aws-sdk": {
				commonjs: 'aws-sdk',
				commonjs2: 'aws-sdk',
				root: 'AWS'
		},
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "[name].css" }) // { filename: "[name].[contentHash].css" }
	],
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader, // extract css into files
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'less-loader', // compiles Less to CSS
						// options: {
						//	paths: [path.resolve(__dirname, 'node_modules')],
						// 	strictMath: true,
						// 	noIeCompat: true,
						// },
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
					test: /\.ractive\.html$/,
					use: 'babel-loader'
			},
			{
				test: /\.ractive\.html$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'ractive-bin-loader'
					}
				]
			}
		]
	}
}
