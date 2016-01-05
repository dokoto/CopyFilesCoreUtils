define(['./fileSelectorView', 'models/list', 'helpers/pathBrowser'], function(fileSelectorView, listModel, pathBrowser) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var FileSelectorController = (function() {
    function fileSelectorController() {
      this._view = fileSelectorView.create(this);
      this._list = listModel.create();
      this._pathBrowser = pathBrowser.create();
      this._pathBrowser.init('c:\\');
    }

    fileSelectorController.prototype.show = function() {

      Log.info.v1('fileSelectorController show()');
      this._view.showFileBrowser(this._pathBrowser.goto());
      this._view.showFileList();
    };

    fileSelectorController.prototype._handleFileBrowserNavigation = function(e) {
      var files = this._pathBrowser.goto($(e.target).text());
      this._view.showFileBrowser(files);
    };

    fileSelectorController.prototype._handleFileListActions = function(e) {

    };

    return fileSelectorController;

  })();


  return {
    create: function() {
      return new FileSelectorController();
    }

  };

});
