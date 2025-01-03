// controllers/MainController.js

angular
  .module("clothingApp")
  .controller("HomeController", function ($scope, $http) {
    // Fetch products from JSON file
    $http
      .get("products.json")
      .then(function (response) {
        $scope.products = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching products:", error);
      });

    // Function to add product to cart
    $scope.addToCart = function (product) {
      // Implement add to cart functionality here
    };
  });
