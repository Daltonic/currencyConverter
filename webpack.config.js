const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};