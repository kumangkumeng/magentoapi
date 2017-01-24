// external dependencies
var events = require('events');
var util = require('util');

// internal dependencies
var prototypeBase = require('../prototype_base.js');
var curry = require('../curry.js');

/**
  Allows you to manage products.
*/
function GitsRest() {
  this.prefix = 'rest_product.';
}
util.inherits(GitsRest, events.EventEmitter);


// prototypes we will be applying
var protos = {
  /**
    Allows you to create a new product and return ID of the created product.
  */
  getAssociatedProducts: {
    mandatory: 'productId'
  }
};

// function to turn a native date object into something like '2013-07-08 23:57:28'
var iso8601Match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/;
function dateToISO8601Time(d) {
  return d.toISOString().replace(iso8601Match, '$1 $2');
}

// creating prototypes using curry func
for (var key in protos) {
  GitsRest.prototype[key] = curry(prototypeBase, key, protos[key]);
}
protos = undefined;

module.exports = GitsRest;
