const path = require("path");
const jsonfile = require('jsonfile');
const tabledata = path.join(__dirname, '../data/tabledata.json');
const async = require('async');




exports.tabledata = function(err) {
	
    let userData = jsonfile.readFileSync(tabledata);
    console.log('userData',userData);
    return userData;
}