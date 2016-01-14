'use strict';

var Test = (function () {

  //*****************************************************
  // PRIVATE AND SHARED OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  function test() {
  }

  test.prototype.f1 = function () {
  };

  test.prototype._f1 = function(funcNode) {
  };

  return test;

})();


module.exports = {
  create: function () {
    return new Test();
  }

};
