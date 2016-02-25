import path from 'path';
import replace from 'replace';
import task from './lib/task';
import Promise from 'bluebird';
import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('package.json', 'build/package.json'),
    ncp('src/index.html', 'build/index.html'),
    ncp('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'build/fonts'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });

  if (global.WATCH) {
    const watcher = await watch('src/**/*.*');
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/').length);
      await ncp(`src/${relPath}`, `build/src/${relPath}`);
    });
  }
}

export default copy;
