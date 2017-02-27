'use strict';
//import { Comments, Blogs, Images, Admin, Sitemap, Robot } from './routes/';

var Routes = require('./routes/');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

app.use(express.static('./web')); // set the static files location /public/img will be /img for users
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//Routing
//require('./routes.js')(app);

//REST API - COMMENTS
//app.use('/comments', Routes.Comments);

//REST API - BLOGS
app.use('/blogData', Routes.Blogs);

//REST API - IMAGES
//app.use('/images', Routes.Images);

//REST API - ADMIN
//app.use('/admin', Routes.Admin);

//REST API - SITEMAP
//app.use('/sitemap', Routes.Sitemap);

//REST API - ROBOT
//app.use('/robots.txt', Routes.Robot);


//Angular Application
app.get('*', function (req, res) {
  res.sendFile(__dirname + '../web/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/

//Starting the application
app.listen(config.port);
console.log("App listening on port " + config.port);