'use strict';

var port = process.env.PORT || 1337;
var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
//const Routes = require('./routes/');

app.use(express.static('./web')); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


app.get('*', function (req, res) {
    res.sendFile(__dirname + '../web/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
console.log("App listening on port " + port);