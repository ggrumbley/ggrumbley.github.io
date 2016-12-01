(function(window) {
  'use strict';
  var App = window.App || {};

  function Cart(cartId, db) {
    this.cartId = cartId;
    this.db = db;
  }

  Cart.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order);
  }

  Cart.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  }

  Cart.prototype.printOrders = function (printFn) {
    return this.db.getAll()
      .then(function (orders) {
        var customerIdArray = Object.keys(orders);

        console.log(this.cartId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
          console.log(orders[id]);
          if (printFn) {
            printFn(orders[id]);
          }
        }.bind(this));
      }.bind(this));
  };

  App.Cart = Cart;
  window.App = App;
})(window);
