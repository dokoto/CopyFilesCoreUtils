define(function() {
  'use strict';

  //*****************************************************
  // PRIVATE
  //*****************************************************
  function _generate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function(match) {
        /*
         * Create a random nibble. The two clever bits of this code:
         *
         * - Bitwise operations will truncate floating point numbers
         * - For a bitwise OR of any x, x | 0 = x
         *
         * So:
         *
         * Math.random * 16
         *
         * creates a random floating point number
         * between 0 (inclusive) and 16 (exclusive) and
         *
         * | 0
         *
         * truncates the floating point number into an integer.
         */
        var randomNibble = Math.random() * 16 | 0;

        /*
         * Resolves the variant field. If the variant field (delineated
         * as y in the initial string) is matched, the nibble must
         * match the mask (where x is a do-not-care bit):
         *
         * 10xx
         *
         * This is achieved by performing (where x is an intermediate
         * result):
         *
         * - x & 0x3, which is equivalent to x % 3
         * - x | 0x8, which is equivalent to x + 8
         *
         * This results in a number between 8 and 11, exclusive, all which
         * satisfy the variant field mask in binary.
         */
        var nibble = (match == 'y') ?
          (randomNibble & 0x3 | 0x8) :
          randomNibble;

        return nibble.toString(16);
      }
    );
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var UUID = (function() {

    function uuid() {}

    uuid.prototype.generate = function() {
      return _generate.call(this);
    };

    return uuid;

  })();


  return {
    create: function() {
      return new UUID();
    }

  };

});
