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
                        $('#jqTable').DataTable({
                            "processing": true,
                            "serverSide": true,
                            "ajax": {
                                "url": "../../../data/candidate-guru-data.json",
                            },
                            "columns": [
                                { "data": "first_name" },
                                { "data": "last_name" },
                                { "data": "position" },
                                { "data": "office" },
                                { "data": "start_date" },
                                { "data": "salary" }
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