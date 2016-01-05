define([], function() {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************


  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ModelBase = (function() {
    function modelBase(model) {
      this._data = {};
      if (model !== undefined) {
        this._data = model;
      }
    }

    modelBase.prototype.insert = function(data) {
      this._insert(data);
    };

    modelBase.prototype.delete = function(prop) {
      return this._delete(prop);
    };

    modelBase.prototype.get = function(prop) {
      return this._get(prop);
    };

    modelBase.prototype.set = function(prop, value) {
      this._set(prop, value);
    };

    modelBase.prototype._insert = function(data) {
      for (var prop in data) {
        if (!data.hasOwnProperty(prop)) continue;
        _set(prop, data[prop]);
      }
    };

    modelBase.prototype._detete = function(prop) {
      return delete this._data[prop];
    };

    modelBase.prototype._get = function(prop) {
      if (this._data[prop] === undefined) {
        console.warn('property ' + prop + ' does not exist in this model');
        return null;
      } else {
        return this._data[prop];
      }
    };

    modelBase.prototype._set = function(prop, value) {
      if (this._data[prop] === undefined) {
        console.warn('property ' + prop + ' does not exist in this model');
      } else {
        this._data[prop] = value;
      }
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
