define([], function() {
  'use strict';


  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;
  var _data = {};

  function _insert(data) {
    for (var prop in data) {
      if (!data.hasOwnProperty(prop)) continue;
      _set(prop, data[prop]);
    }
  }

  function _detete(prop) {
    return delete _data[prop];
  }

  function _get(prop) {
    if (_data[prop] === undefined) {
      console.warn('property ' + prop + ' does not exist in this model');
      return null;
    } else {
      return _data[prop];
    }
  }

  function _set(prop, value) {
    if (_data[prop] === undefined) {
      console.warn('property ' + prop + ' does not exist in this model');
    } else {
      _data[prop] = value;
    }
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ModelBase = (function() {
    function modelBase(model) {
      _self = this;
      if (model !== undefined) {
        _data = model;
      }
    }

    modelBase.prototype.insert = function(data) {
      _insert(data);
    };

    modelBase.prototype.delete = function(prop) {
      return _delete(prop);
    };

    modelBase.prototype.get = function(prop) {
      return _get(prop);
    };

    modelBase.prototype.set = function(prop, value) {
      _set(prop, value);
    };

    return modelBase;

  })();


  return {
    create: function(model) {
      return new ModelBase(model);
    },
    this: ModelBase

  };

});
