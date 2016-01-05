define(['./modelBase'], function(modelBase) {
  'use strict';


  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;
  var _container = [];
  var _model = null;

  function _append(data) {
    for (var i = 0; i < data.length; i++) {
      _model.insert(data[i]);
      _container.push(_model);
    }
  }

  function get(position) {
    if (position > _container.length) {
      console.warn('Position is too longer... container has : ' + _container.length + ' length');
      return null;
    }
    return _container[position];
  }

  function _delete(position) {
    _container.splice(position, 1);
  }

  function _empty() {
    _container = [];
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var ContainerBase = (function() {
    function containerBase(model) {
      _self = this;
      _model = modelBase.create(model);
    }

    containerBase.prototype.append = function(data) {
      _append(data);
    };

    containerBase.prototype.delete = function(position) {
      return _delete(position);
    };

    containerBase.prototype.empty = function() {
      return _empty();
    };

    containerBase.prototype.get = function(position) {
      return _get(position);
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
