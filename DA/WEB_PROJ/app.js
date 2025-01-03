angular
  .module("app", [])
  .controller("MainController", function ($scope, $http, $window) {
    $scope.products = [];

    // Function to fetch products based on the category
    $scope.fetchProducts = function (category) {
      $http
        .get("http://localhost:3000/api/" + category + "products")
        .then(function (response) {
          $scope.products = response.data.map(function (product) {
            // Assign a unique identifier (GUID) to each product
            product.id = generateUUID();
            return product;
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    // Get the category from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    // Fetch products based on the category
    if (category) {
      $scope.fetchProducts(category);
    } else {
      // Fetch default products if no category specified
      $scope.fetchProducts("products");
    }

    $scope.addToCart = function (product) {
      let cart = JSON.parse($window.localStorage.getItem("cart"));
      cart = cart ? cart : [];

      let existingProductIndex = cart.findIndex((p) => p._id === product._id);

      if (existingProductIndex !== -1) {
        // Product already exists in cart, update its quantity
        cart[existingProductIndex].quantity += 1;
      } else {
        // Product does not exist in cart, add it
        cart.push({ ...product, quantity: 1 });
      }

      $window.localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Function to generate a GUID (Globally Unique Identifier)
    function generateUUID() {
      var d = new Date().getTime();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now(); //use high-precision timer if available
      }
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    }
  })
  .controller(
    "CartController",
    function ($scope, $window, $rootScope, $interval) {
      $scope.cart = JSON.parse($window.localStorage.getItem("cart")) || [];

      function updateCart() {
        $scope.cart = JSON.parse($window.localStorage.getItem("cart")) || [];
      }

      updateCart();

      var intervalPromise = $interval(updateCart, 100);

      $scope.$on("$destroy", function () {
        if (intervalPromise) {
          $interval.cancel(intervalPromise);
        }
      });

      $rootScope.$on("cartUpdated", function (event, cart) {
        $scope.cart = cart;
      });

      $scope.removeFromCart = function (product) {
        var index = $scope.cart.findIndex((p) => p.id === product.id);

        if (index !== -1) {
          $scope.cart.splice(index, 1);
          $window.localStorage.setItem("cart", JSON.stringify($scope.cart));
          $rootScope.$emit("cartUpdated", $scope.cart);
        }
      };
      $scope.goToPayment = function () {
        $window.location.href = "payment.html";
      };
    }
  )
  .controller("PaymentController", function ($scope, $window, $http) {
    // Fetch cart details from localStorage
    $scope.cart = JSON.parse($window.localStorage.getItem("cart")) || [];

    // Function to calculate total amount
    $scope.getTotal = function () {
      return $scope.cart.reduce(function (total, product) {
        return total + product.price * product.quantity;
      }, 0);
    };

    $scope.paymentDetails = {
      fullName: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      total: 0,
      // Add other fields as needed
    };

    // Function to submit payment
    $scope.submitPayment = function () {
      $scope.paymentDetails.total = $scope.getTotal();
      $http
        .post("http://localhost:5000/api/payments", $scope.paymentDetails)
        .then(function (response) {
          console.log("Payment details saved successfully:", response.data);
          // Clear payment form fields after submission
          $scope.paymentDetails = {
            fullName: "",
            email: "",
            cardNumber: "",
            expiryDate: "",
            // Add other fields as needed
          };
        })
        .catch(function (error) {
          console.error("Error saving payment details:", error);
          // Handle error
        });
    };
  });
