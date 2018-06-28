var path = require('path');
var webpack = require('webpack');
module.exports = {
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
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "assets")
                ]
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};