define(['jquery', 'datagrid'], function($) {
  'use strict';

  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;

  function transform(files) {
    var result = {
      data: [],
      total: 100
    };

    result.data.push({ filename : '..' });
    for(var i = 0; i < files.length; i++) {
      result.data.push({ filename : files[i] });
    }

    return result;
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var MainHandler = (function() {
    function mainHandler() {
      _self = this;
    }

    mainHandler.prototype.run = function() {

      Log.info.v1('MainHandler Run()');
      var fs = require('fs');
      var files = transform( fs.readdirSync('c:\\') );

      var datagrid = $('#grid-local-files').datagrid({
        col: [{
          field: "filename",
          title: "File Name"
        }],
        pagerPosition : false,
        render: files
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
