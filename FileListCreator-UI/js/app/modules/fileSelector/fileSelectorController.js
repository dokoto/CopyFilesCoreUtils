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
      var file = $(e.target).text();
      var files = this._pathBrowser.goto(file);
      this._view.showFileBrowser(files);
      if (this._pathBrowser.isFile(file) === true) {
        this._list.append();
        this._view.showFileList.show(this._list.toObject());
      }
    };

    fileSelectorController.prototype._handleFileListActions = function(e) {

    };

    fileSelectorController.prototype._convertPathToModel(path) = function(path) {
      if (path[path.length - 1] === path.sep) {
        path = path.substr(0, path.length - 1);
      }
      var name = path.substr(path.lastIndexOf(path.sep) + 1);
      name = name.replace(/ /gm, '_');
      var model = this._list.createModel();
      model.insert({
        filePath: path,
        targetName: name
      });

      return model;
    };

    return fileSelectorController;

  })();


  return {
    create: function() {
      return new FileSelectorController();
    }

  };

});
