'use strict';

const path = require('path');
const HappyPack = require('happypack');

// 构造出共享进程池，进程池中包含8个子进程
const tsHappyThreadPool = HappyPack.ThreadPool({ size: 3 });
const cssHappyThreadPool = HappyPack.ThreadPool({ size: 3 });
const babelHappyThreadPoll = HappyPack.ThreadPool({ size: 3 });

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['happypack/loader?id=babel', 'happypack/loader?id=ts'],
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                //?minimize压缩css文件,生产环境配置 
                use: ['happypack/loader?id=css'],
                exclude: '/node_modules/'
            },
            {
                test: /\.less$/, 
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: '/node_modules/'
            }/*解析less, 把less解析成浏览器可以识别的css语言*/
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            // 启用编译缓存
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: babelHappyThreadPoll,
        }),
        new HappyPack({
            id: 'ts',
            // 支持 happypack
            loaders: [{
                path: 'ts-loader',
                query: { happyPackMode: true }
            }],
            threadPool: tsHappyThreadPool,
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader', 'postcss-loader'],
            threadPool: cssHappyThreadPool,
        })
    ],
}


