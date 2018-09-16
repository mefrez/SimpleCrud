'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('MainCtrl', ['customerService', '$scope', function (customerService, $scope) {
    
    $scope.customers = [];

    customerService.get()
      .then(function (customers) {

        $scope.customers = customers;

      });

  }]);
