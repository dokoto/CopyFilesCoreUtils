define(['./base/containerBase'], function(containerBase) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  var _model  = {
    filePath: null,
    targetName: null
  };

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var List = (function() {
    function list() {
      containerBase.this.call(this);
    }

    // No hay problema con la comparticion de memoria de "_model" ya que baseModel
    // clona el objeto es si mismo. "_model" solo se usa como patron de estructura
    // no para contener datos, los datos se continene por instancia dentro de baseModel
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
