define(['jquery', 'underscore', 'helpers/table', 'text!./templates/fileSelectorTpl.html'], function($, _, table, fileSelectorTpl) {
  'use strict';


  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var FileSelectorView = (function() {
    function fileSelectorView(controller) {
      this._fileBrowser = null;
      this._fileList = null;
      this._controller = controller;
      this._initFileLists();
    }

    fileSelectorView.prototype.showFileBrowser = function(datas) {
      this._renderFileBrowser(datas);
    };

    fileSelectorView.prototype.showFileList = function() {
      this._renderFileList([]);
    };

    fileSelectorView.prototype._renderFileBrowser = function(datas) {
      this._fileBrowser.fill(datas);
      this._fileBrowser.activeNavigation(this._controller._handleFileBrowserNavigation.bind(this._controller));
    }

    fileSelectorView.prototype._renderFileList = function(datas) {
      this._fileList.fill(datas);
      this._fileList.activeNavigation(this._controller._handleFileListActions);
    }

    fileSelectorView.prototype._initFileLists = function() {
      this._fileBrowser = table.create('grid-local-files', 'local-files', 'scroll');
      this._fileList = table.create('grid-file-list', 'file-list', 'scroll');
      var tplCompiled = _.template(fileSelectorTpl);
      $('#content').append(tplCompiled());
      this._fileBrowser.setHeader([{
        id: 'filename',
        value: 'File Name'
      }]);
      this._fileList.setHeader([{
        id: 'filename',
        value: 'File Name'
      }]);
    }

    return fileSelectorView;

  })();


  return {
    create: function(controller) {
      return new FileSelectorView(controller);
    }

  };

});
