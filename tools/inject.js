import task from './lib/task';
import fs from 'fs';
import del from 'del';

import injectScripts from 'html-inject-script';
import path from 'path';
import glob from "glob";

const DEBUG = !process.argv.includes('release');

async function injectTask(){
  await glob("**/*.js", {cwd:'build/'}, function (er, files) {
    var stream = fs.createReadStream(path.resolve(__dirname, '../build/index.tmp'))
      .pipe(injectScripts(files))
      .pipe(fs.createWriteStream(path.resolve(__dirname, '../build/index.html')));
      del(['build/index.tmp'], {dot: true});
  });
}

export default injectTask;
