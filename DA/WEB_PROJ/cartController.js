angular
  .module("app")
  .controller("CartController", function ($scope, $rootScope) {
    $scope.cart = $rootScope.cart || [];
  });
