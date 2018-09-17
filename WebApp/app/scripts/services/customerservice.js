'use strict';

/**
 * @ngdoc service
 * @name webAppApp.customerService
 * @description
 * # customerService
 * Service in the webAppApp.
 */
angular.module('webAppApp')
  .factory('customerService', ['$q','$http', function ($q,$http) {

    var customers = undefined;
    
    return {
      get :  function() {
 
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
         
        return $q.when(customers);
      },
  
      post : function(c) {
   
          var deferred = $q.defer();
   
          $http.post('http://localhost:5529/api/customer',c)
            .then(function(result) {
              customers = result.data;
              deferred.resolve(customers);
            }, function(error) {
              customers = error;
              deferred.reject(error);
            });
   
            customers = deferred.promise;
  
        return $q.when(customers);
      },

      update : function(c) {
   
        var deferred = $q.defer();
 
        $http.put('http://localhost:5529/api/customer',c)
          .then(function(result) {
            customers = result.data;
            deferred.resolve(customers);
          }, function(error) {
            customers = error;
            deferred.reject(error);
          });
 
          customers = deferred.promise;

        return $q.when(customers);
      },

      delete : function(id) {
   
        var deferred = $q.defer();
 
        $http.delete('http://localhost:5529/api/customer/'+id)
          .then(function(result) {
            customers = result.data;
            deferred.resolve(customers);
          }, function(error) {
            customers = error;
            deferred.reject(error);
          });
 
          customers = deferred.promise;

        return $q.when(customers);
      }

  };

  }]);
