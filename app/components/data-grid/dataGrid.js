(function () {
    angular.module('appDataGrid', []);
    angular.module('appDataGrid').component('appDataGrid', {
        bindings: {
            id: '@'
        },
        transclude: true,
        templateUrl: 'app/components/data-grid/dataGrid.html',
        controller: function ($scope, $timeout) {
            this.name = 'Anup saw';
            var id = this.id;
            $timeout(function () {
                $('#' + id).DataTable();
                $scope.$digest();
            }, 1000)
            // angular.element('#example').DataTable();

        }
    })
})()