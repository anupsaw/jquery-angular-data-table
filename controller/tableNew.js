const path = require("path");
const jsonfile = require('jsonfile');
const tabledata = path.join(__dirname, '../data/tabledata.json');
const tabledata2 = path.join(__dirname, '../data/candidate-guru-data.json');
const async = require('async');
//var do_sort = require('sort-object-properties');
const load = require('lodash');
var _ = require('underscore');
var moment = require('moment');
var json2csv = require('json2csv');
var orderBy = require('lodash.orderby');
var fs = require('fs');
var lodash = require('lodash');


exports.get_datatable = function (req, res) {
    var correlation_id, body, draw, search, colName, order, pageNo, perPageRecords, usersdata, userslist, search_data, sort_data,
        pagination, filtered, recordsTotal, recordsFiltered, data, agent, correlation_id, criteria, self, size;
    usersdata = jsonfile.readFileSync(tabledata2);
    userslist = usersdata.data;
    logger(JSON.stringify(req.body));
    if (req.body != null) {
        body = req.body;
        draw = body.draw;
        search = body['search[value]'] || '';
        colName = body['order[0][column]'] || '';
        order = body['order[0][dir]'] || 'asc';
        pageNo = body.draw || 1;
        startRecord = body.start;
        perPageRecords = body.length;

        if (search) {
            search_data = filterRecords(search, userslist);
            userslist = search_data;
        }
        if (colName) {
            if (colName == 0) { colName = 'PersonID'; }
            if (colName == 1) { colName = 'FirstName'; }
            if (colName == 2) { colName = 'MI'; }
            if (colName == 3) { colName = 'LastName'; }
            if (colName == 4) { colName = 'Title'; }
            if (colName == 5) { colName = 'Company'; }
            if (colName == 6) { colName = 'Street'; }
            if (colName == 7) { colName = 'City'; }
            if (colName == 8) { colName = 'State'; }
            if (colName == 9) { colName = 'Zip'; }
            if (colName == 10) { colName = 'Country'; }
            if (colName == 11) { colName = 'Phone1'; }
            if (colName == 12) { colName = 'Email1'; }

            sort_data = sort_by_colName(colName, order, userslist);
            userslist = sort_data;
        }
        if (startRecord) {
            pagination = getPaginatedItems(userslist, startRecord, perPageRecords);
            userslist = pagination;
        }
        if (search) {
            filtered = search_data.length;
        } else {
            filtered = usersdata.data.length;
        }

    }

    return res.send({
        draw: body.draw || 1,
        recordsTotal: filtered,
        recordsFiltered: filtered,
        data: userslist
    });
};


var filterRecords = function (keyword, userslist) {
    var patt, newRecords;
    patt = new RegExp(keyword, 'i')
    newRecords = _.filter(userslist, function (obj) {

        for (var prop in obj) {
            if (patt.test(obj[prop].toString().toLowerCase())) {
                return obj;
            }
        }


        //   if (patt.test(obj.PersonID) || patt.test(obj.FirstName) || patt.test(obj.MI) || patt.test(obj.LastName) || patt.test(obj.Title) || patt.test(obj.Company) || patt.test(obj.Street) || patt.test(obj.City) || patt.test(obj.State) || patt.test(obj.Zip) || patt.test(obj.Country) || patt.test(obj.Phone1) || patt.test(obj.Email1)) {
        //     return obj;
        //   }

    });
    return newRecords;
};


var sort_by_colName = function (colName, order, userslist) {
    var sort_data;
    if (order == 'asc') {
        var sort_data = lodash.sortBy(userslist, function (i) {
            return i[colName].toString().toLowerCase();
        });
        return sort_data;
    }
    if (order == 'desc') {
        var sort_data = (lodash.sortBy(userslist, function (i) {
            return i[colName].toString().toLowerCase();
        })).reverse();
        return sort_data;
    }
};


var getPaginatedItems = function (items, startRecord, perPageRecords) {
    var page, recPerPage, startRec, endRec, paginatedItems, totalPages;
    // page = pageNo || 1;
    recPerPage = perPageRecords || 5;
    // Use Math.max to ensure that we at least start from record 0
    startRec = startRecord || 0;
    // The end index of Array.splice doesn't have to be within boundaries,
    endRec = Number(startRec) + Number(recPerPage);
    paginatedItems = items.slice(startRec, endRec);
    totalPages = Math.ceil(items.length / recPerPage);
    return paginatedItems;
};


function logger(data) {

    var file = './request_body.log';
    if (fs.existsSync(file)) {
        var dateTime  = new Date()
       // var timeStamp = dateTime.toDateString() + ' ' + dateTime.toTimeString();
        fs.appendFileSync(file, ("\n" + dateTime + ' : ' + data));
    } else { 
        fs.writeFileSync(file, data);
    }


}