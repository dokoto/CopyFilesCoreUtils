define(['jquery', './fileSelectorView', 'models/list'], function($, fileSelectorView, listModel) {
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
    }

    fileSelectorController.prototype.show = function() {
      Log.info.v1('fileSelectorController show()');
      var self = this,
        INIT, GOTO, FILES, INFO;
      $.ajax('https://127.0.0.1:46969/rfs/init').then(function(init) {
        INIT = init;
        return $.ajax('https://127.0.0.1:46969/rfs/goto');
      }).then(function(goto) {
        GOTO = goto;
        return $.ajax('https://127.0.0.1:46969/rfs/files');
      }).then(function(files) {
        FILES = files;
        return $.ajax('https://127.0.0.1:46969/rfs/info');
      }).then(function(info) {
        INFO = info;
        self._view.showFileBrowser(FILES.value.files);
        self._view.showFileList();
        $('#local-files thead th:first').text(INFO.value.info.currentPath);
      });
    };

    fileSelectorController.prototype._handleFileBrowserNavigation = function(e) {
      var fileName = $(e.target).text();
      var self = this,
        GOTO, FILES, INFO;
      $.ajax({
        url: 'https://127.0.0.1:46969/rfs/goto',
        data: {
          file: fileName
        }
      }).then(function(goto) {
        GOTO = goto;
        return $.ajax('https://127.0.0.1:46969/rfs/files');
      }).then(function(files) {
        FILES = files;
        return $.ajax('https://127.0.0.1:46969/rfs/info');
      }).then(function(info) {
        INFO = info;
        self._view.showFileBrowser(FILES.value.files);
        $('#local-files thead th:first').text(INFO.value.info.currentPath);
        if (GOTO.value.didMovement === false) {
          self._list.append(self._convertPathToModel(INFO.value.info.currentPath, fileName));
          self._view.showFileList(self._list.toObject());
        }
      });
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
