import path from 'path';
import replace from 'replace';
import task from './lib/task';
import Promise from 'bluebird';
import copy from './lib/copy';
import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copyTask() {

  await Promise.all([
    copy('package.json', 'build/package.json'),
    copy('src/manifest.json', 'build/manifest.json'),
    copy('src/index.html', 'build/index.html'),
    copy('src/images', 'build/images'),
    copy('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'build/fonts'),
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
      await copy(`src/${relPath}`, `build/src/${relPath}`);
    });
  }
}

export default copyTask;
