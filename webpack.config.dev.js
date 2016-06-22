var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './components/App.jsx',
        'webpack-hot-middleware/client'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            // js
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            // css
            {
                test: /\.styl$/, 
                include: path.join(__dirname, 'client'),
                loader: 'style-loader!css-loader'
            }
        ]
    }
};

module.exports = config;