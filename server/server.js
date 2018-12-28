import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressProxy from 'express-http-proxy'; // you can configure proxy server if it is needed
import { homepage, proxy } from '../package.json';

import loader from './loader';

console.log('launching site under: ', homepage);

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.Router().get(homepage, loader));
app.use(homepage, express.static(path.resolve(__dirname, '../build')));

if (proxy) {
  app.use('/api', expressProxy(proxy));
}
app.use(loader);

app.listen(PORT, console.log(`App listening on port ${PORT}!`));

app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
