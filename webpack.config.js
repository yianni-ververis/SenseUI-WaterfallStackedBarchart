const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
    entry: './src/index',
	output: {
        path: path.resolve(__dirname, 'dist'),
		filename: 'SenseUI-WaterfallStackedBarchart.js',
	},
	module: {
		loaders: [
			{
        		enforce: "pre",
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: [/node_modules/]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/],
				query: {
					presets: ['es2015'],
				},
			},
			// {
			// 	test: /\.css$/,
			// 	loader: 'raw-loader'
			// },
			// {
			// 	test: /\.json$/,
			// 	loader: 'json-loader'
            // },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }
		],
	},
	plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false
            }
        })
    ]
};
