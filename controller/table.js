const path = require("path");
const jsonfile = require('jsonfile');
const tabledata = path.join(__dirname, '../data/tabledata.json');
const async = require('async');
//var do_sort = require('sort-object-properties');
const load = require('lodash');
var _ = require('underscore');
var moment = require('moment');
var json2csv = require('json2csv');
var orderBy = require('lodash.orderby');
var fs = require('fs');

exports.tabledata = function (err) {

    let userData = jsonfile.readFileSync(tabledata);
    let userslist = usersdata.data;
    console.log('userData', userData);

    var fields = ['first_name', 'last_name', 'position', 'office', 'start_date', 'salary'];
    //var fieldNames = ['Name', 'Phone', 'Mobile', 'Email', 'Address', 'Notes'];
    //var data = json2csv({ data: userslist, fields: fields, fieldNames: fieldNames });

    var csv = json2csv({ data: myCars, fields: fields });



    return {

        draw: 1,
        recordsTotal: 10,
        recordsFiltered: 10,
        userData,
        csv


    };
}




exports.getdatatable = function (body) {
    //{params: colName-as defined in data,order-'asc' or 'desc',search-any keyword,sort-'true',pageNo-current page no.}
    var keyword = '';
    var colName = '';
    var page = 1;
    var sort = '';
    var order = 'asc';
    if (body.search) {
        keyword = body.search;

    }

    if (body.pageNo) {
        page = body.draw;
    }

    if (body.sort && body.colName) {
        sort = body.sort;
        colName = body.colName;
    }

    if (body.sort && body.order) {
        order = body.order;
    }
    /*query db */
    let usersdata = jsonfile.readFileSync(tabledata);
    let userslist = usersdata.data;
    let listLength = userslist.length;
    /*search*/
    if (keyword) {
        var search_data = filterRecords(keyword, userslist);
        userslist = search_data;
    }
    /*Sort Data */
    if (colName != '') {
        var sort_data = sort_by_colName(colName, order, userslist);
        userslist = sort_data;
    }
    /*pagination*/
    var perPageRecords = body.length;
    if (page != 0) {
        var pagination = getPaginatedItems(userslist, page, perPageRecords);
        userslist = pagination;
    }
    return {
        draw: body.draw,
        recordsTotal: listLength,
        recordsFiltered: listLength,
        data: userslist
    };

}

function filterRecords(keyword, records) {
    var patt = new RegExp(keyword, 'i')
    var newRecords = _.filter(records, function (obj) {

        if (patt.test(obj.first_name) || patt.test(obj.last_name) || patt.test(obj.position) || patt.test(obj.office) || patt.test(obj.start_date) || patt.test(obj.salary)) {
            return obj;
        }

    });
    return newRecords;
}

function sort_by_colName(colName, order, userslist) {
    if (order == 'asc') {
        if (colName == 'salary') {

            var salary = load.sortBy(userslist, [function (o) { return parseInt(o[colName].replace(/\,/g, '').replace(/\$/g, '')); }]);
            return salary;

        }
        else if (colName == 'start_date') {
            var start_date = load.sortBy(userslist, [function (o) { return new Date(moment(o[colName], "Do MMM YY").format('L')); }]);
            return start_date;

        }
        else {
            var sort_data = load.sortBy(userslist, function (i) { return i[colName].toLowerCase(); });
            return sort_data;
        }
    }
    if (order == 'desc') {
        if (colName == 'salary') {
            var colName = (load.sortBy(userslist, [function (o) { return parseInt(o[colName].replace(/\,/g, '').replace(/\$/g, '')); }])).reverse();
            return colName;

        }
        else if (colName == 'start_date') {
            var colName = (load.sortBy(userslist, [function (o) { return new Date(moment(o[colName], "Do MMM YY").format('L')); }])).reverse();
            return colName;
        }
        else {
            var sort_data = (load.sortBy(userslist, function (i) { return i[colName].toLowerCase(); })).reverse();
            return sort_data;
        }
    }
}

function getPaginatedItems(items, pageNo, perPageRecords) {
    let page = pageNo || 1;
    let recPerPage = perPageRecords || 5;
    // Use Math.max to ensure that we at least start from record 0
    let startRec = Math.max(page - 1, 0) * recPerPage;
    // The end index of Array.splice doesn't have to be within boundaries,
    let endRec = startRec + recPerPage;
    let paginatedItems = items.slice(startRec, endRec);
    return userslist = paginatedItems;
    let totalPages = Math.ceil(items.length / recPerPage);

}