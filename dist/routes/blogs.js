'use strict';

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _models = require('../models/');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var config = require('../config');
var kind = "Blog";
/*const Datastore = require('@google-cloud/datastore');*/

var router = express.Router();

router.get('/', function (req, res, next) {
	try {
		// Instantiates a client
		/*const datastore = Datastore();
  const query = datastore.createQuery(kind);
  		return datastore.runQuery(query, function(err, blogs) {
  	if (err) {
      	res.status(500);
  		return res.send("Internal Server Error Blogs");
      }
      return res.send(blogs);
  });   */
	} catch (err) {
		res.status(500);
		return res.send("Internal Server Error Blogs");
	}
});

router.post('/', function (req, res, next) {
	try {} catch (err) {
		res.status(500);
		return res.send("Internal Server Error");
	}
});

router.put('/', function (req, res, next) {
	try {} catch (err) {
		res.status(500);
		return res.send("Internal Server Error");
	}
});

router.delete('/', function (req, res, next) {
	try {} catch (err) {
		res.status(500);
		return res.send("Internal Server Error");
	}
});

module.exports = router;