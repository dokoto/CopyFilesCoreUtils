define(['./modelBase'], function(modelBase) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ContainerBase = (function() {
    function containerBase() {
      this._container = [];
      this._model = modelBase.create();
    }

    containerBase.prototype.appendContainer = function(data) {
      this._appendContainer(data);
    };

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

    containerBase.prototype.toObject = function() {
      return this._toObject();
    };

    containerBase.prototype.cloneModel = function() {
      return modelBase.create(this._model._data);
    };

    containerBase.prototype._appendContainer = function(data) {
      if (data instanceof ContainerBase) {
        for (var i = 0; i < data._container.length; i++) {
          this._append(data._container[i]);
        }
      } else {
        console.error('"data" parameter must be a "ContainerBase" object');
      }

    };

    containerBase.prototype._append = function(data) {
      if (!data) {
        console.error('"data" parameter must be a "modelBase" object');
      }
      if (data instanceof modelBase.this) {
        this._container.push(data);
      } else {
        console.error('"data" parameter must be a "modelBase" object');
      }
    };

    containerBase.prototype.get = function(position) {
      if (position > this._container.length) {
        console.warn('Position is too longer... container has : ' + this._container.length + ' length');
        return null;
      }
      return this._container[position];
    };

    containerBase.prototype._toObject = function(position) {
      var result = [];
      for (var i = 0; i < this._container.length; i++) {
        result.push(this._container[i]._data);
      }
      return result;
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
    create: function() {
      return new ContainerBase();
    },
    this: ContainerBase
  };

});
