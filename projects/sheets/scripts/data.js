(function(window) {
  'use strict';
  var App = window.App || {};

  var headers = [
    'Name', 'Year', 'Min-Players', 'Max-Players', 'Time', 'Weight', 'Rating', 'BGG Rank'
  ];

  var data = [
    ['Twilight Struggle', '2005', '2', '2', '180', '3.52', '8.4', '3'],
    ['Terra Mystica', '2012', '2', '5', '60-150', '3.93', '8.3', '4'],
    ['Puerto Rico', '2002', '2', '5', '90-150', '3.29', '8.1', '7'],
    ['Castles of Burgundy', '2011', '2', '4', '30-90', '3.05', '8.1', '9'],
    ['Agricola', '2007', '1', '5', '20-150', '3.63', '8.1', '10'],
    ['Eclipse', '2011', '2', '6', '60-200', '3.67', '8', '18'],
    ['7 Wonders', '2010', '2', '7', '30', '2.34', '7.8', '28'],
    ['Patchwork', '2014', '2', '2', '15-30', '1.72', '7.9', '37'],
    ['Race for the Galaxy', '2007', '2', '4', '30-60', '2.97', '7.8', '41'],
    ['Dominion (Rod)', '2008', '2', '4', '30', '2.38', '7.7', '46'],
    ['Star Realms', '2014', '2', '2', '20', '1.97', '7.7', '74'],
    ['Splendor', '2014', '2', '4', '30', '1.85', '7.6', '85'],
    ['Ticket to Ride', '2004', '2', '5', '30-60', '1.88', '7.5', '102'],
    ['The Resistance', '2009', '5', '10', '30', '1.64', '7.5', '117'],
    ['Carcassonne', '2000', '2', '5', '30-45', '1.94', '7.4', '123'],
    ['Dixit', '2008', '3', '6', '30', '1.27', '7.4', '141'],
    ['Isle of Skye', '2015', '2', '5', '30-50', '2.27', '7.5', '155'],
    ['Flash Point', '2011', '1', '6', '45', '2.21', '7.3', '206'],
    ['Innovation', '2010', '2', '4', '45-60', '2.71', '7.3', '226'],
    ['Bohnanza', '1997', '2', '7', '45', '1.68', '7.1', '320'],
    ['X-Com', '2015', '1', '4', '90', '2.89', '7.3', '361'],
    ['Qwirkle', '2006', '2', '4', '45', '1.66', '6.8', '568'],
    ['Bang!', '2002', '4', '7', '20-40', '1.64', '6.6', '858'],
    ['Illuminati', '1987', '2', '8', '60-180', '2.65', '6.5', '1149'],
    ['Rummikub', '1977', '2', '4', '60', '1.78', '6.3', '1476'],
    ['Apples to Apples', '1999', '4', '10', '30', '1.17', '6', '2354'],
    ['Munchkin', '2001', '2', '6', '60-120', '1.79', '6', '2804'],
    ['Buzzword', '2003', '4', '12', '45', '1.21', '5.8', '5882'],
  ];

  window.headers = headers;
  window.data = data;
  window.App = App;
})(window);