const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = env => ({
	entry: {
		"index": path.join(__dirname, '../', 'index')
	},
	output: {
		path: path.join(__dirname, '../', 'dist'),
		publicPath: '/dist/',
		filename: "[name].js",
		chunkFilename: '[name].js'
	},
	optimization: {
		splitChunks: {
		  chunks: 'all'
		}
	},
	module: {
		rules: [
		  {
			 use: {
					loader: 'babel-loader',
					options: { presets: [ 'es2015' ] }
			 },
			 test: /\.js$/,
			 exclude: /node_modules/
		  }
		]
	  },
	plugins: [
		new UglifyJSPlugin({
			sourceMap: false
		}),
		new CleanWebpackPlugin({}),
	]
});
