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
    webpackConfig.entry.app = ['webpack-hot-middleware/client', ...webpackConfig.entry.app];

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
              proxyMiddleware('/api', {target: 'http://localhost:8080/'}),
              proxyMiddleware('/signin', {target: 'http://localhost:8080/'})
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
