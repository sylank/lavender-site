var path = require('path');

module.exports = {
	module: {
		rules: [
			// Transform all ES6 files to plain old ES5.
			{
				test: /\.(js|jsx)$/,
				exclude: [/bower_components/, /node_modules/, /styles/],
				loader: 'babel-loader',
				include: path.resolve(__dirname, '../../src')
			},
			// Load images.
			{
				test: /\.(gif|jpe?g|png)$/,
				loader: 'url-loader?limit=25000',
				query: {
					limit: 10000,
					name: 'static/media/images/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader', 'resolve-url-loader?sourceMap', 'sass-loader?sourceMap'],
				include: path.resolve(__dirname, '../../')
			},
			{
				test: /\.css$/,
				loader: 'style!css?importLoaders=1'
			},
			// Fonts
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
				query: {
					name: 'static/media/files/[name].[hash:8].[ext]'
				}
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'babel-loader',
						query: {
							presets: ['airbnb'],
						},
					},
					{
						loader: 'react-svg-loader',
						query: {
							jsx: true,
						},
					},
				],
			},
		],
	},
	/**
	 * Resolve import paths from global.SRCDIR
	 * @see  http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
	 */
	resolve: {
		modules: [
			path.resolve(__dirname, '../../src'),
			path.resolve(__dirname, '../../node_modules'),
		],
		extensions: ['.js', '.jsx']
	}
};