var express = require('express');
var router = express.Router();
const users = require('../controller/index');


/* GET home page. */


router.get('/', function(req, res) {
	
	//res.send({status:'success',data:tabledata});
    //return res.json({status:'success',data:tabledata});
    return res.sendfile('index.html');
});

router.post('/register', function(req, res) {
   let tabledata=users.tabledata();
   console.log("tabledata",tabledata);
    return res.json({status:'success',data:tabledata});

});

module.exports = router;


