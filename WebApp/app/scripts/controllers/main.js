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
    
    // GET CUSTOMERS DATA

    $scope.customers = [];

    customerService.get()
      .then(function (customers) {

        $scope.customers = customers;

    });

    // ADD CUSTOMER LOGIC

    $scope.customerAdd = 
    {
      name : "",
      surname : "",
      telephoneNumber : "",
      address : ""
    }

    $scope.openAddCustomerModal = function(){
      $('#addCustomerModal').modal('show');

      $scope.customerAdd = 
      {
        name : "",
        surname : "",
        telephoneNumber : "",
        address : ""
      }
    }

    $scope.addCustomerFunction = function(){
      customerService.post($scope.customerAdd)
      .then(function (customer) {

        $scope.customers.push(customer);
        $('#addCustomerModal').modal('hide');

      });
    }

    // UPDATE CUSTOMER LOGIC 

    $scope.customerUpdate = 
    {
      id : 0,
      name : "",
      surname : "",
      telephoneNumber : "",
      address : ""
    }

    $scope.updatedCustomerIndex = -1;

    $scope.openUpdateCustomerModal = function(item){
      $('#updateCustomerModal').modal('show');

      $scope.customerUpdate = 
      {
        id : item.id,
        name : item.name,
        surname : item.surname,
        telephoneNumber : item.telephoneNumber,
        address : item.address
      }
   
      $scope.updatedCustomerIndex = $scope.findIndex($scope.customers,item.id);
    }

    $scope.updateCustomerFunction = function(){
      customerService.update($scope.customerUpdate)
      .then(function (customer){

        $scope.customers[$scope.updatedCustomerIndex] = customer;

        $('#updateCustomerModal').modal('hide');

      });
    }

    // DELETE CUSTOMER LOGIC 

    $scope.deletedCustomerId = -1;

    $scope.deletedCustomerIndex = -1;

    $scope.openDeleteCustomerModal = function(item){

      $('#deleteCustomerModal').modal('show');

       $scope.deletedCustomerId = item.id;

       $scope.deletedCustomerIndex = $scope.findIndex($scope.customers,item.id);
    }

    $scope.deleteCustomerFunction = function(){
      customerService.delete($scope.deletedCustomerId)
      .then(function (customer){

        $scope.customers.splice($scope.deletedCustomerIndex);

        $('#deleteCustomerModal').modal('hide');

      });
    }

    // SORT VARIABLES

    $scope.sortType = 'name';
    $scope.sortReverse = false;  

    // FINDING INDEX OF ELEMENT IN ARRAY

    $scope.findIndex = function(array,id) {
      return array.findIndex(item => item.id == id);
    }

  }]);
