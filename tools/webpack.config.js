import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';

import bourbon from 'node-bourbon';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const htmlWebpackConf = {
  title: 'ZDemocracy',
  template: 'src/index.html',
};

const DEBUG = !process.argv.includes('release');
const VERBOSE = process.argv.includes('verbose');
const WATCH = global.WATCH === undefined ? false : global.WATCH;
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

const SASS_INCLUDES_PATHS = [
  ...bourbon.includePaths,
  'node_modules/bootstrap-sass/assets/stylesheets',
  'node_modules/react-datepicker/dist',
  'node_modules/mathsass/dist',
];

const outputPath = path.join(__dirname, '../build');

const appConfig = {

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },

  entry: {
    app: [
      './src/app/index.js',
    ],
  },
  output: {
    path: outputPath,
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    publicPath: '/',
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackConf),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loaders: [
          ...(DEBUG ? ['react-hot'] : []), 'babel-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /picto/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.css$/,
        loader: 'style-loader/useable!css-loader!postcss-loader',
      },
    ],
  },
  sassLoader: {
    includePaths: SASS_INCLUDES_PATHS,
  },
};

export default appConfig;
