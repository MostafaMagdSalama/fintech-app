import createError from 'http-errors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import { handleError } from './helpers/error';
import httpLogger from './middlewares/httpLogger';
import UserRouter from './routes/user.router';
import accountRouter from './routes/account.router';
import swaggerDoc from './swagger';

const app = express();

dotenv.config({ path: path.join(__dirname, '../.env') });

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', UserRouter);
app.use('/account', accountRouter);
swaggerDoc(app, '8000');

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};
app.use(errorHandler);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

export default app;
