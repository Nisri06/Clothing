angular
  .module("app")
  .controller(
    "MainController",
    function ($scope, $http, $location, $rootScope) {
      $scope.products = [];

      // Fetch products from the server
      $http
        .get("http://localhost:3000/api/products")
        .then(function (response) {
          $scope.products = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      // Function to add a product to the cart
      $scope.addToCart = function (product) {
        $rootScope.cart = $rootScope.cart || [];
        $rootScope.cart.push(product);
      };
    }
  );
