'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf.js');

const localIp = (() => {
	let ips = [];
	let os = require('os');
	let ntwk = os.networkInterfaces();
	for (let k in ntwk) {
		for (let i = 0; i < ntwk[k].length; i++) {
			let _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
})();
const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        // 友好提示
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`Dev Server: http://${localIp}:8080`],
				notes: [`Success!`]
			},
			onErrors: function (severity, errors) {
			},
			clearConsole: true,
			additionalFormatters: [],
			additionalTransformers: []
        }),
    ],
    // 控制台输出日志控制
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
    },
    //开发服务器配置项
    devServer: {
        host: localIp,
        port: 8080,
        // 代理到后端服务接口
        // proxy: { 
        //   '/api': 'http://localhost:3000'
        // },
        // 配置 DevServer HTTP 服务器的文件根目录
        // contentBase: path.join(__dirname, 'public'), 
        // 是否开启 gzip 压缩
        // compress: true, 
        // 是否开发 HTML5 History API 网页
        historyApiFallback: true,
        // 是否开启模块热替换功能
        hot: true,
        // 是否开启 HTTPS 模式
        // https: false,
    },
    // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳
    profile: true,
    // 是否启用缓存提升构建速度
    cache: false,
    // 监听模式选项
    watchOptions: {
        // 不监听的文件或文件夹，支持正则匹配。默认为空
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        // 默认为300ms 
        aggregateTimeout: 300,
        // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
        poll: 1000
    }, 
})

module.exports = devWebpackConfig;