// import browserSync from 'browser-sync';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import task from './lib/task';
// import build from './build';
// import serve from './serve';
// import webpackConfig from './webpack.config';
// import proxyMiddleware from 'http-proxy-middleware';

// global.WATCH = true;
// const bundler = webpack(webpackConfig);

// /**
//  * Launches a development web server with "live reload" functionality -
//  * synchronizing URLs, interactions and code changes across multiple devices.
//  */
// export default async () => {
//   await build();
//   await serve();

//   console.log('webpack public path', webpackConfig.output.publicPath)
//   browserSync({
//     proxy: {

//       target: 'localhost:5000',

//       middleware: [
//         webpackDevMiddleware(bundler, {
//           // IMPORTANT: dev middleware can't access config, so we should
//           // provide publicPath by ourselves
//           publicPath: webpackConfig.output.publicPath,

//           // Pretty colored output
//           stats: webpackConfig.stats,

//           // For other settings see
//           // http://webpack.github.io/docs/webpack-dev-middleware.html
//         }),

//         // bundler should be the same as above
//         webpackHotMiddleware(bundler),
//         proxyMiddleware('/api', {target: 'http://localhost:8080/'}),
//       ],
//     },

//     // no need to watch '*.js' here, webpack will take care of it for us,
//     // including full page reloads if HMR won't work
//     files: [
//       'build/**/*.css',
//       'build/**/*.html',
//     ],
//   });
// };





import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';
import proxyMiddleware from 'http-proxy-middleware';

const DEBUG = !process.argv.includes('release');

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy.bind(undefined, { watch: true }));
  await new Promise(resolve => {
    // Patch the client-side bundle configurations
    // to enable Hot Module Replacement (HMR) and React Transform
    // if (Array.isArray(webpackConfig.entry)) {
    //   webpackConfig.entry.unshift('webpack-hot-middleware/client');
    // } else {
      /* eslint-disable no-param-reassign */
    webpackConfig.entry.app = ['webpack-hot-middleware/client', ...webpackConfig.entry.app];
    // }

    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
    webpackConfig
      .module
      .loaders
      .filter(x => x.loader === 'babel-loader')
      .forEach(x => (x.query = { // eslint-disable-line no-param-reassign
        // Wraps all React components into arbitrary transforms
        // https://github.com/gaearon/babel-plugin-react-transform
        plugins: [
          ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              },
            ],
          },
          ],
        ],
      }));

    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackMiddleware(bundler, {

      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: webpackConfig.output.publicPath,

      // Pretty colored output
      stats: webpackConfig.stats,

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    });
    const hotMiddleware = webpackHotMiddleware(bundler);

    let handleServerBundleComplete = () => {
      runServer()
      .then(host => {
        const bs = Browsersync.create();
        console.log('Start BS')
        bs.init({
          ...(DEBUG ? {} : { notify: false, ui: false }),

          proxy: {
            target: host,
            middleware: [
              wpMiddleware,
              hotMiddleware,
              proxyMiddleware('/api', {target: 'http://localhost:8080/'})
            ],
          },

          // no need to watch '*.js' here, webpack will take care of it for us,
          // including full page reloads if HMR won't work
          files: ['build/**/*.*'],
        }, () => {
          console.log('BS started')
          resolve()
        });
      });
      handleServerBundleComplete = () => console.log('Bundle complete');
    };

    bundler.plugin('done', () => handleServerBundleComplete());
  });
}

export default start;