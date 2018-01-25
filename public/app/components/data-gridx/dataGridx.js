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

                    $('#example').DataTable({
                        "lengthChange": false,
                        "processing": true,
                        "serverSide": true,
                        "ajax": {
                          "url": '/table/tabledata2',
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