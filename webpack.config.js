const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
    	new HtmlWebpackPlugin({
			title: 'Bitpanda Example App',
			template: './src/listTemplate.hbs',
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
				description: 'A quick example app with Handlebars and Webpack'
			}
    	})
	],
	module: {
		rules: [
			{
		        test: /\.hbs$/,
		        loader: 'handlebars-loader'
	    	},
	    	{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			}
		]
	},
	devServer: {
		watchContentBase: true,
    	compress: true
	}
}