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

  function mkTable(tagID, tableID, header, datas) {
    var $table = $('#' + tagID);

    $table.empty();
    $table.append('<table id="' + tableID +'"><thead><tr></tr></thead><tbody></tbody></table>');

    var $head = $table.find('thead tr');
    for (var i = 0; i < header.length; i++) {
      $head.append('<th>' + header[i].title);
    }

    var tbody = $table.find('tbody');
    for (var i = 0; i < datas.length; i++) {
       
    }
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
