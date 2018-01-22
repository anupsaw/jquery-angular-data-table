(function () {
    angular.module('app', ['jqTableX']);
    angular.module('app').component('appRoot', {
        transclude: true,
        template: '<div class="app-root" ng-transclude></div>',
        controller: function () { 
            this.tableId = 'example1'
        }
    })
})()