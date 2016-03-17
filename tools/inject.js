import task from './lib/task';
import fs from 'fs';

import injectScripts from 'html-inject-script';
import path from 'path';
import glob from "glob";

async function injectTask(){
  await glob("**/*.js", {cwd:'build/'}, function (er, files) {
    console.log("HEY",files);
    var stream = fs.createReadStream(path.resolve(__dirname, '../build/index.html'))
      .pipe(injectScripts(files))
      .pipe(fs.createWriteStream(path.resolve(__dirname, '../build/bla.html')));
    ;
  });
}

export default injectTask;
