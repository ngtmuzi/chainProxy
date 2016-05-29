/**
 * Created by ngtmuzi on 2016/5/29.
 */
'use strict';
var receiveFn = (...args) => args;

var handle = {
  get: function (target, property, receiver) {
    //set prototype to base Proxy Object _
    if (property === 'prototype') return _;

    //is number
    if (!isNaN(+property)) return new Proxy(target.bind(null, `[${property}]`), handle);
    //return a new Proxy, go on
    return new Proxy(target.bind(null, '.' + property), handle);
  },

  apply: function (target, thisArg, argumentsList) {
    //if method calling on Proxy Object
    if (thisArg && thisArg.prototype === _) {
      //save arguments to chain, and go on
      return new Proxy(target.bind(null, argumentsList), handle);

    } else {  //calling on outside

      //get the calling chain
      var chains = target();
      //pick arguments
      var args = [].concat(...chains.filter(Array.isArray));

      //make function body
      var argNum = 0;
      var fnStr = chains.reduce(function (a, b) {
        if (typeof b === 'string') return a + b;
        else if (Array.isArray(b)) return a + `(${b.map(()=> `args[${argNum++}]`)})`;
      }, 'return _');

      var finalFn = new Function(['args', '_'], fnStr);

      return finalFn(args, argumentsList[0]);
    }
  }
};

/**
 * @type {Function}
 */
var _ = module.exports = new Proxy(receiveFn, handle);