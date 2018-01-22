var express = require('express');
var router = express.Router();
const users = require('../controller/table');
const load = require('lodash');
var fs = require('fs');
/* GET home page. */

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('table');
});


/*router.get('/', function(req, res) {
	
	//res.send({status:'success',data:tabledata});
    //return res.json({status:'success',data:tabledata});
    return res.render('/table');
}); 
*/

router.get('/table', function(req, res) {
   
   let tabledata=users.tabledata();
   console.log("tabledata",tabledata);
    //return res.json({status:'success',data:tabledata});
    fs.writeFile('file.csv', csv, function(err) {
	  if (err) throw err;
	  console.log('file saved');
	});

});

router.post('/tabledata', function(req, res,err) {
	console.log('body',req.body);
    let body = req.body;
    let userCountDetails = users.getdatatable(body);
/*    let userCountDetails = users.getdatatable(body,function(err,result){
        if(err){
        	errorMessage = 'Please Try Again';
        	return res.json({
                status: "error",
                message: errorMessage,
            })
        }
       return res.json(userCountDetails);
    });
*/        
  return res.json(userCountDetails);
});

router.post('/tabledata1', function(req, res) {
    
    let userCountDetails = users.getdatatable();
        return res.json(userCountDetails);

});        


module.exports = router;


