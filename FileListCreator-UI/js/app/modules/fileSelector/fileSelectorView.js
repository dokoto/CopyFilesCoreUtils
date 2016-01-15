define(['jquery', 'underscore', 'helpers/table', 'text!./templates/fileSelectorContentTpl.html', 'text!./templates/fileSelectorFootTpl.html'],
function($, _, table, fileSelectorContentTpl, fileSelectorFootTpl) {
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

    fileSelectorView.prototype.showFileList = function(datas) {
      if (datas === undefined) {
        this._renderFileList([]);
      } else {
        this._renderFileList(datas);
      }
    };

    fileSelectorView.prototype._renderFileBrowser = function(datas) {
      this._fileBrowser.fill(datas);
      this._fileBrowser.dblclick(this._controller._handleFileBrowserNavigation.bind(this._controller));
      this._fileBrowser.rightClick(this._controller._handleFileBrowserSelect.bind(this._controller));
    };

    fileSelectorView.prototype._renderFileList = function(datas) {
      this._fileList.fill(datas);
      this._fileList.dblclick(this._controller._handleFileListActions.bind(this._controller));
    };

    fileSelectorView.prototype._setEventFooter = function(datas) {
      var self = this;      
      $('#save').click(function(ev){
        self._controller._handleSaveList.call(self._controller, ev);
      });
    };

    fileSelectorView.prototype._initFileLists = function() {
      this._fileBrowser = table.create('grid-local-files', 'local-files', 'scroll');
      this._fileList = table.create('grid-file-list', 'file-list', 'scroll');
      var contentTplCompiled = _.template(fileSelectorContentTpl);
      var footTplCompiled = _.template(fileSelectorFootTpl);
      $('#content').append(contentTplCompiled());
      $('#footer').append(footTplCompiled());
      this._setEventFooter();
      this._fileBrowser.setHeader([{
        id: 'filename',
        value: 'File Name'
      }]);
      this._fileList.setHeader([{
        id: 'targetName',
        value: 'Target Name'
      }, {
        id: 'filePath',
        value: 'File Path'
      }]);
      $('#container').addClass('container');
      $('#grid-local-files').addClass('left-side');
      $('#grid-file-list').addClass('right-side');
    };

    return fileSelectorView;

  })();


  return {
    create: function(controller) {
      return new FileSelectorView(controller);
    }

  };

});
