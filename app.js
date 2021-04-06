/**
 * @author YsnIrix
 * @email ysn4irix@inilogic.com
 * @create date 30-03-2021
 * @modify date 31-03-2021
 * @desc Entry Point
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const expressSession = require('express-session');
require('dotenv').config();

const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const signupRouter = require('./routes/signup');
const logoutRouter = require('./routes/logout');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(flash());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 6000
    },
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', signupRouter)
app.use('/news', newsRouter);
app.use('/logout', logoutRouter);

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Connected To Database');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;