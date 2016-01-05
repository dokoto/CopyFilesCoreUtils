define(['./modelBase'], function(modelBase) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ContainerBase = (function() {
    function containerBase(model) {
      this._container = [];
      this._model = modelBase.create(model);
    }

    containerBase.prototype.append = function(data) {
      this._append(data);
    };

    containerBase.prototype.delete = function(position) {
      return this._delete(position);
    };

    containerBase.prototype.empty = function() {
      return this._empty();
    };

    containerBase.prototype.get = function(position) {
      return this._get(position);
    };

    containerBase.prototype._append = function(data) {
      for (var i = 0; i < data.length; i++) {
        this._model.insert(data[i]);
        this._container.push(this._model);
      }
    };

    containerBase.prototype.get = function(position) {
      if (position > this._container.length) {
        console.warn('Position is too longer... container has : ' + this._container.length + ' length');
        return null;
      }
      return this._container[position];
    };

    containerBase.prototype._delete = function(position) {
      this._container.splice(position, 1);
    };

    containerBase.prototype._empty = function() {
      this._container = [];
    };

    return containerBase;

  })();


  return {
    create: function(model) {
      return new ContainerBase(model);
    },
    this: ContainerBase
  };

});
