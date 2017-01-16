var webpack = require('webpack');
var path = require('path');
var PathRewriter = require('webpack-path-rewriter');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/app/index.js',
  module : {
    loaders : [
      {
        test: /[.]html$/,
        loader: PathRewriter.rewriteAndEmit({
          name: '[name].html'
        })
      }
    ]
  },
  performance: { hints: false },
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new PathRewriter(),
    new webpack.ProvidePlugin({
      //$: 'jquery'
    })
  ],
  devServer: {
        port: 8080,
        host: 'localhost',
        historyApiFallback: {
            index: 'index.html'
        }
  },
};

module.exports = config;