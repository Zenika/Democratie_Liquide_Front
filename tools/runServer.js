import path from 'path';
import task from './lib/task';
import express from 'express';

/**
 * Launches Node.js/Express web server in a separate (forked) process.
 */
function runServer() {
  return new Promise((resolve, reject) => {
    
    const server = global.server = express();

    server.set('port', (process.env.PORT || 5000));
    console.log('express serve ', path.join(__dirname, '../build'));
    server.use(express.static(path.join(__dirname, '../build')));

    //
    // Launch the server
    // -----------------------------------------------------------------------------
    server.listen(server.get('port'), () => {
      /* eslint-disable no-console */
      const url = `http://localhost:${server.get('port')}`
      console.log('The server is running at', url);
      resolve(url);
      if (process.send) {
        process.send('online');
      }
    });
  });
}

export default runServer;