const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = env => ({
	entry: {
		'index': path.join(__dirname, '../', 'index'),
		'test': path.join(__dirname, '../', 'test', 'test'),
		'main': path.join(__dirname, '../', 'test', 'main')
	},
	output: {
		path: path.join(__dirname, '../', 'build'),
		publicPath: '/build/',
		filename: "[name].js",
		sourceMapFilename: '[file].map',
		chunkFilename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/u,
				use: [ "source-map-loader" ],
				enforce: "pre",
			},
		 ]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../', '/build/'),
		inline: true,
		host: 'localhost',
		port: 5000,
	},
	plugins: [
		new HtmlWebPackPlugin({
			filename: "test.html",
			template: "./test/test.html",
			chunks: [ "test" ]
		}),
		new HtmlWebPackPlugin({
			filename: "index.html",
			template: "./test/index.html",
			chunks: [ "main" ]
		}),
	  ],
});
