// cartService.js
angular.module("app").service("CartService", function () {
  var cart = [];

  function addToCart(product) {
    cart.push(product);
  }

  function getCart() {
    return cart;
  }

  return {
    addToCart: addToCart,
    getCart: getCart,
  };
});
