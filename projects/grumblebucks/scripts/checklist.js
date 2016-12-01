(function() {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }



  CheckList.prototype.addRow = function (coffeeOrder) {
    // Remove duplicate order (one order per person)
    this.removeRow(coffeeOrder.emailAddress);

    var rowElement = new Row(coffeeOrder);

    this.$element.append(rowElement.$element);
  }

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  }

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;
      fn(event.target.value)
      .then(function () {
        this.removeRow(event.target.value);
      }.bind(this));
    }.bind(this));
  };

  String.prototype.cap = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function Row(coffeeOrder) {
    var shotColor = '';
    var stVal = coffeeOrder.strength;
    var strength = '';

    switch (coffeeOrder.flavor) {
      case 'caramel':
        shotColor = 'caramel';
        break;
      case 'almond':
        shotColor = 'almond';
        break;
      case 'mocha':
        shotColor = 'mocha';
        break;
      default:
        '';
    }
    if (stVal < 10) {
      strength = 'Decaf';
    } else if (stVal > 30 && stVal <= 50) {
      strength = 'Strong';
    } else if (stVal > 50 && stVal <= 75) {
      strength = 'Super Strong';
    } else if (stVal > 75) {
      strength = 'Epic';
    } else {
      strength = '';
    }

    var $div = $('<div/>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox btn btn-default btn-lg btn-block ' + shotColor
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });


    var description = strength + ' ' + coffeeOrder.size.cap() + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor.cap() + ' ';
    }
    description += coffeeOrder.coffee.cap() + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }
  App.CheckList = CheckList;
  window.App = App;
})();
