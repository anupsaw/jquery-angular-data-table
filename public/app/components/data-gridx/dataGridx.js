(function () {
    angular.module('jqTableX', []);
    angular.module('jqTableX').component('jqTable', {
        // bindings: {
        //     id: '@'
        // },
        transclude: true,
        templateUrl: 'public/app/components/data-gridx/dataGridx.html',
        controller: function ($scope, $timeout) {
            this.name = 'Anup saw';
            var id = this.id;


            this.loadTable = function () {
                $timeout(function () {
                    $(document).ready(function () {
                        // $('#jqTable').DataTable({
                        //     "processing": true,
                        //     "serverSide": true,
                        //     "ajax": {
                        //         "url": "/table/tabledata",
                        //         "type": "POST",
                        //         'beforeSend': function (request) {
                        //             request.setRequestHeader('x-csrf-token', 'anup');
                        //           }
                        //     },
                        //     "columns": [
                        //         { "data": "first_name", "searchable": false, "orderable": false, "search": { "value": true } },
                        //         { "data": "last_name" },
                        //         { "data": "position" },
                        //         { "data": "office" },
                        //         { "data": "start_date" },
                        //         { "data": "salary" }
                        //     ]
                        // });
                        var v_token = 'anup'
                        //     $('#example').DataTable({
                        //         "processing": true,
                        //         "serverSide": true,
                        //         "ajax": {
                        //           "url": "/table/tabledata2",
                        //           "type": "POST",
                        //           'beforeSend': function (request) {
                        //             request.setRequestHeader('x-csrf-token', v_token);
                        //           }
                        //         },
                        //         "columns": [
                        //           { "data": "PersonID" },
                        //           { "data": "FirstName" },
                        //           { "data": "MI" },
                        //           { "data": "LastName" },
                        //           { "data": "Title" },
                        //           { "data": "Company" },
                        //           { "data": "Street" },
                        //           { "data": "City" },
                        //           { "data": "State" },
                        //           { "data": "Zip" },
                        //           { "data": "Country" },
                        //           { "data": "Phone1" },
                        //           { "data": "Email1" }
                        //         ]
                        //       });
                        // });

                        var myTable = $('#example').DataTable({
                            "lengthChange": false,
                            "processing": true,
                            "serverSide": true,
                            "dom": 'Bfrtip',
                            "buttons": [{
                                extend: 'csv',
                                text: 'Copy all data',
                                exportOptions: {
                                    modifier: {
                                        search: 'none'
                                    }
                                },
                                'action': function (e, dt, button, config) {
                                    console.log(e, dt, button, config);
                                    dt.ajax.params().length = -1;

                                    $.ajax({
                                        "url": '/table/get_datatable',
                                        "type": 'POST',
                                        data: dt.ajax.params(),
                                        'beforeSend': function (request) {
                                            request.setRequestHeader('x-csrf-token', v_token);
                                        },
                                        success: function (result) {
                                            var items = result.data;
                                            var replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
                                            var header = Object.keys(items[0])
                                            var csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
                                            csv.unshift(header.join(','))
                                            csv = csv.join('\r\n')
                                            console.log(result);
                                            var csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                                            var csvURL = null;
                                            if (navigator.msSaveBlob) {
                                                csvURL = navigator.msSaveBlob(csvData, 'download_test.csv');
                                            } else {
                                                csvURL = window.URL.createObjectURL(csvData);
                                            }
                                            var tempLink = document.createElement('a');
                                            tempLink.href = csvURL;
                                            tempLink.setAttribute('download', 'download_test.csv');
                                            tempLink.click();
                                        }
                                    });

                                }
                            }],
                            "ajax": {
                                "url": '/table/get_datatable',
                                "type": 'POST',
                                'beforeSend': function (request) {
                                    request.setRequestHeader('x-csrf-token', v_token);
                                }
                            },
                            "columns": [
                                { "data": "PersonID", "searchable": false, "orderable": false, },
                                { "data": "FirstName" },
                                { "data": "MI" },
                                { "data": "LastName" },
                                { "data": "Title" },
                                { "data": "Company" },
                                { "data": "Street" },
                                { "data": "City" },
                                { "data": "State" },
                                { "data": "Zip" },
                                { "data": "Country" },
                                { "data": "Phone1" },
                                { "data": "Email1" },
                            ]
                        });
                    });
                    // $scope.$digest();
                }, 1000)
            };

            this.activate = function () {
                this.loadTable();
            };

            this.activate();
            // angular.element('#example1').DataTable();

            //$('#example').DataTable();

        }
    })
})();