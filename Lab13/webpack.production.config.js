// Lab11 updates:
//     adds process environment variable for “production” mode.
//     removes hot module replacement.
//     adds occurence order, uglification, extract text and auto-prefixing.

// exercise 9.3
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        __dirname + '/app/scripts/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: '/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/,  loader: 'style!css?modules!postcss' }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    // Use the template html file in /app
    // This plugin instructs Webpack to inflate the template with an import of the bundle..
    // ..it creates and to load the result in the output directory, dist/.
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // exercise 9.3
        // This new plugin instructs Webpack to rebundle the application when source files are edited and refresh the browser
        // automatically. The devserver specification runs the server on port 3001 and diverts all data API request through to
        // server.js, which is assumed to be running on port 3000. See Webpack Development Server.
        new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ]
};

//     This specifies the application’s source code modules (i.e., entry),
//     the destination for the bundle (i.e., output) and the code pre-processors
//     (i.e., loaders). The pre-processors grab all code files with JS, JSX and CSS extensions.
//     For details on this configuration, see Configuring Webpack.