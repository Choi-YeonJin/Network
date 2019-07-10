var createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  session = require('express-session');
  MongoStore = require('connect-mongo')(session);
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  app = express();
  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  key:'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
      url: "mongodb://localhost:27017/Network",
      collection: "sessions"
  })
}));

app.use('/', usersRouter);
app.use('/index', indexRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;