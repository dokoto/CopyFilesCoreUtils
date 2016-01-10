define(['./fileSelectorView', 'models/list', 'helpers/pathBrowser'], function(fileSelectorView, listModel, pathBrowser) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  var _path = require('path');

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var FileSelectorController = (function() {
    function fileSelectorController() {
      this._view = fileSelectorView.create(this);
      this._list = listModel.create();
      this._pathBrowser = pathBrowser.create();
      this._pathBrowser.init('/Users/administrador/');
    }

    fileSelectorController.prototype.show = function() {
      Log.info.v1('fileSelectorController show()');
      this._pathBrowser.goto();
      this._view.showFileBrowser(this._pathBrowser.getFiles());
      this._view.showFileList();
      $('#local-files thead th:first').text(this._pathBrowser._currentPath);
    };

    fileSelectorController.prototype._handleFileBrowserNavigation = function(e) {
      var file = $(e.target).text();
      var hadMovement = this._pathBrowser.goto(file);
      this._view.showFileBrowser(this._pathBrowser.getFiles());
      $('#local-files thead th:first').text(this._pathBrowser._currentPath);
      if (hadMovement === false) {
        this._list.append(this._convertPathToModel(this._pathBrowser._currentPath, file));
        this._view.showFileList(this._list.toObject());
      }
    };

    fileSelectorController.prototype._handleFileListActions = function(e) {
      var file = $(e.target).text();
      var position = $(e.target).parent().attr('data-pos');
      this._list.delete(position);
      this._view.showFileList(this._list.toObject());
    };

    fileSelectorController.prototype._convertPathToModel = function(filePath, fileName) {
      var targetName = fileName.replace(/ /gm, '_');
      var model = this._list.cloneModel();
      filePath = _path.join(filePath, fileName);
      model.insert({
        filePath: filePath,
        targetName: targetName
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
