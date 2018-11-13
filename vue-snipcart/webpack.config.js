var path = require('path')
var webpack = require('webpack')
var SitemapPlugin = require('SitemapPlugin')
var paths = [{path:""},{path:"/search"},{path:"/black-hill-roundabout-no-98"},{path:"/blackhill-roundabout-no-69"},
,{path:"came-view-roundabout-no-39"},
,{path:"castletown-roundabout-no-31"},
,{path:"champtoceaux-coopers-lane-roundabout-no-92"},
, {path:"chapel-gate-roundabout-no-99"},
, {path:"dorchester-on-street-car-parking-tickets"},
, {path:"enjoying-dorset-s-coast-and-countryside-enews"},
, {path:"gore-cross-roundabout-no-5"},
, {path:"great-field-roundabout-no-20"},
, {path:"king-s-statue-weymouth-bus-shelter-posters"},
, {path:"max-gate-roundabout-no-38"},
, {path:"northbrook-junction-south-roundabout-no-43"},
, {path:"pavilion-roundabout-no-29"},
, {path:"station-roundabout-no-63"},
, {path:"stour-roundabout-no-108"},
, {path:"troy-town-roundabout-no-41"},
,{path:"upton-gateway-roundabout-no-79"},
,{path:"woodlands-roundabout-no-68"},
,{path:"worgret-roundabout-no-62"}]

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(pdf|png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
  ,
    plugins: [
   new SitemapPlugin("https://web.dorsetcc.gov.uk/advertise/", paths)
     ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
