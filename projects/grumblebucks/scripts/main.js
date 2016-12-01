(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Cart = App.Cart;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myCart = new Cart('Grumblebucks Cart #1', remoteDS);

  $.get(SERVER_URL)
    .success(function() {
      console.log('Connection Successful');
    })
    .fail(function () {
      console.log('Offline Mode');
      myCart = new Cart('Training Cart', new DataStore());
    });

  window.myCart = myCart;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myCart.deliverOrder.bind(myCart));

  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function (data) {
    return myCart.createOrder.call(myCart, data)
      .then(function () {
        checkList.addRow.call(checkList, data);
      });
  });

  formHandler.addInputHandler(Validation.isValidEmail);
  myCart.printOrders(checkList.addRow.bind(checkList));

})(window);
