define(['./base/containerBase'], function(containerBase) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var List = (function() {

    function list() {
      this._model = {
        filePath: null,
        targetName: null
      };
      containerBase.this.call(this);
    }

    list.prototype = containerBase.create(this._model);
    list.prototype.constructor = list;

    return list;

  })();


  return {
    create: function() {
      return new List();
    }

  };

});
