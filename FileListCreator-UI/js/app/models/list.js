define(['./base/containerBase'], function(containerBase) {
  'use strict';


  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;
  var _model = {
    filePath: null,
    targetName: null
  };

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var List = (function() {

    function list() {
      _self = this;
      containerBase.this.call(this);
    }

    list.prototype = containerBase.create(_model);
    list.prototype.constructor = list;

    return list;

  })();


  return {
    create: function() {
      return new List();
    }

  };

});
