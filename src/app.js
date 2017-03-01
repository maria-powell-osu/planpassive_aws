const port = process.env.PORT || 1337;
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/');

app.use(express.static('./web')); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

//REST API - BLOGS
//app.use('/blogData', routes.Blogs);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

//Angular Application
// app.get('*', function (req, res) {
//     res.sendFile(__dirname + '../web/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });




app.listen(port);
console.log("App listening on port " + port);


