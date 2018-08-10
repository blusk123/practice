'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const prodWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',  
    devtool: 'cheap-module-source-map',
    plugins: [
        // 清除dist文件夹
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new CleanWebpackPlugin('../dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
})

module.exports = prodWebpackConfig;