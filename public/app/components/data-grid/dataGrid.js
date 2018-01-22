(function () {
    angular.module('appDataGrid', []);
    angular.module('appDataGrid').component('appDataGrid', {
        // bindings: {
        //     id: '@'
        // },
        transclude: true,
        templateUrl: 'public/app/components/data-grid/dataGrid.html',
        controller: function ($scope, $timeout) {
            this.name = 'Anup saw';
            var id = this.id;


            this.loadTable = function () {
                $timeout(function () {
                    $('#example').DataTable();
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