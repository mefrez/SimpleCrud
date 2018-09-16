'use strict';

/**
 * @ngdoc service
 * @name webAppApp.customerService
 * @description
 * # customerService
 * Service in the webAppApp.
 */
angular.module('webAppApp')
  .service('customerService', ['$q','$http', function ($q,$http) {

    var customers = undefined;
    
    this.get = function() {
 
      if (!customers) {
 
        var deferred = $q.defer();
 
        $http.get('http://localhost:5529/api/customer')
          .then(function(result) {
            customers = result.data;
            deferred.resolve(customers);
          }, function(error) {
            customers = error;
            deferred.reject(error);
          });
 
          customers = deferred.promise;
      }

      return $q.when(customers);
    };

  }]);
