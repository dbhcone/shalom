var createError = require('http-errors');

import path from 'path';
var cookieParser = require('cookie-parser');
var logger = require('morgan');

import { indexRouter } from './routes/index';
import mongoose from 'mongoose';
import config from 'config';
import express, { NextFunction, Request, Response } from 'express';
import { authRouter } from './routes/auth';
import cors from 'cors';
import { duesRouter } from './routes/dues';

var app = express();
app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/dues', duesRouter);

// serve only the static files from the dist directory
// const statdir = path.join(__dirname, 'dist');
// console.log('static', statdir);
// app.use(express.static(statdir));

// serve only the static files from the dist directory
app.use(express.static(path.join(__dirname, '../../dist/fe')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/fe/' ));
});

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
app.listen(port);
app.on('listening', () => {
  console.log('App has started on port: ', port);
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(
  (
    err: { message: any; status: any },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    // res.sendFile(path.join(__dirname, 'fe/index.html'));
    console.log('Error thrown by our error handler');
    res.sendFile('index.html', { root: '../../dist/fe/' });
  }
);

// DB Connection
try {
  mongoose.connect(
    config.get('CONN_STR'),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log({ error: err.message });
      } else {
        console.log('Database connection successful');
      }
    }
  );
} catch (error) {
  console.log('Error', error);
}

module.exports = app;
