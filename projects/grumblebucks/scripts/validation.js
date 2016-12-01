(function(window) {
  'use strict';

  var App = window.App || {};

  var Validation = {
    isValidEmail: function (email) {
      return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
