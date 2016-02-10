'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('ContactCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.sendMessage = function() {
    	var dataObj = {
				emailContact : $scope.emailContact,
				messageContact : $scope.messageContact
		}
		
		var res = $http.post('/contact', dataObj);
		res.success(function(data, status, headers, config) {
			alert("ça marche");
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
    	window.location.assign("#/");
    }; 
  }]);
 