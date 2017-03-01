import * as express from 'express';
import { Blog } from '../models/';
const config = require('../config');
const kind = "Blog";
/*const Datastore = require('@google-cloud/datastore');*/

const router = express.Router();

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
	} catch (err){
		res.status(500);
		return res.send("Internal Server Error Blogs");
	}
});

router.post('/', function (req, res, next) {
	try {

	} catch (err){
		res.status(500);
		return res.send("Internal Server Error");
	}
});

router.put('/', function (req, res, next) {
	try {

	} catch (err){
		res.status(500);
		return res.send("Internal Server Error");
	}
});


router.delete('/', function (req, res, next) {
	try {

	} catch (err){
		res.status(500);
		return res.send("Internal Server Error");
	}
});

module.exports = router;