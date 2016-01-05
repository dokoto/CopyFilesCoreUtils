define(['jquery'], function($) {
  'use strict';


  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;


  //*****************************************************
  // PUBLIC
  //*****************************************************
  var MainHandler = (function() {
    function mainHandler() {
      _self = this;
    }

    mainHandler.prototype.run = function() {

      Log.info.v1('MainHandler Run()');
      requirejs(['modules/fileSelector/fileSelectorController'], function(fileSelectorController) {
        var controller = fileSelectorController.create();
        controller.show();
      });

    };

    return mainHandler;

  })();


  return {
    create: function() {
      return new MainHandler();
    }

  };

});
