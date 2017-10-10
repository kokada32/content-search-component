(function () {
    angular.module('BlakWealth')
        .factory('contentSearchFactory', contentSearchFactory);

    contentSearchFactory.$inject = ['$http', '$q'];

    function contentSearchFactory($http, $q) {

        function _get(search) {
            settings = {
                url: '/api/contentsearch?search=' + encodeURIComponent(search),
                cache: false,
                method: 'GET',
                responseType: 'json',
            }

            return $http(settings)
                .then(_getSuccess, _getError);
        };

        function _getSuccess(response) {
            return response;
        };

        function _getError(error) {
            return $q.reject("this is a get error");
        };

        return {
            get: _get
        };
    }
})();

(function () {
    angular.module('BlakWealth')
        .controller('contentSearchController', contentSearchController);

    contentSearchController.$inject = ['contentSearchFactory', '$scope', 'alertService'];

    function contentSearchController(contentSearchFactory, $scope, alertService) {
        var vm = this;
        vm.contentSearchFactory = contentSearchFactory;
        vm.get = _getData;

        function _getData(search) {
            return vm.contentSearchFactory.get(search)
                .then(_getDataSuccess, _getDataError);
        }

        function _getDataSuccess(response) {
            return response.data.items;
        }

        function _getDataError(error) {
            alertService.error("There an error in retrieving the data")
        }

        //Have to use $scope with angulars typeahead
        $scope.onSelect = function ($model) {
            contentId = $model.id
            vm.onSelect({ contentId: $model.id });
        };
    }
})();


(function () {
    "use strict";

    var app = angular.module("BlakWealth");

    app.component("contentSearch", {
        templateUrl: "contentsearchwidget/contentsearchwidget.html",
        controller: 'contentSearchController',
        bindings: {
            content: '<',
            onSelect: '&'
        }
    });
})();
