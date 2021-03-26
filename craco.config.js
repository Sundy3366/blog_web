// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require('webpack')
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' )
const path = require('path')
module.exports = {
	webpack: {
		alias: {
			"@": path.resolve("src"),
			"@components": path.resolve("src/components"),
			"@contexts": path.resolve("src/contexts"),
			"@css": path.resolve("src/css"),
			"@hooks": path.resolve("src/hooks"),
			"@images": path.resolve("src/images"),
			"@json": path.resolve("src/json"),
			"@request": path.resolve("src/request"),
			"@locales": path.resolve("src/locales"),
			"@requests": path.resolve("src/requests"),
			"@utils": path.resolve("src/utils"),
			"@defs": path.resolve("src/defs"),
			"@history": path.resolve("src/history"),
			"@pages": path.resolve("src/pages"),
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			// 打压缩包
			/*new CompressionWebpackPlugin({
				algorithm: 'gzip',
				test: new RegExp(
					'\\.(' +
					['js', 'css'].join('|') +
					')$'
				),
				threshold: 1024,
				minRatio: 0.8
			}),*/
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			// new SimpleProgressWebpackPlugin()

],
		//抽离公用模块
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						chunks: 'initial',
						minChunks: 2, maxInitialRequests: 5,
						minSize: 0
					},
					vendor: {
						test: /node_modules/,
						chunks: 'initial',
						name: 'vendor',
						priority: 10,
						enforce: true

					}
				}
			}
		}
	},
	babel: {
		plugins: [
			['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
			['@babel/plugin-proposal-decorators', { legacy: true }]
		]
	}
};
