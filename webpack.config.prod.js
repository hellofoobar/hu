var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'source-map',
    entry: [
        './components/App.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
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