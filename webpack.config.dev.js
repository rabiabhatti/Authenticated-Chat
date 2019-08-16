import path from 'path'
import webpack from 'webpack'

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared/')
        ],
        loaders: [ 'react-hot-loader', 'babel-loader' ]
      },
      {test: /\.json$/, loader: "json-loader"}
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.json' ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
}
