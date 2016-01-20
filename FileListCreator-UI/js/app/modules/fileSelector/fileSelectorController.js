define(['jquery', './fileSelectorView', 'models/list', 'helpers/urlGenerator'], function($, fileSelectorView, listModel, urlGenerator) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  var _path = require('path');
  var _mkUrl = urlGenerator.create('local');

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
      var self = this;

      $.when( $.ajax(_mkUrl.get('MOVE')) ).done(function(response){
        console.log(response);
        self._view.showFileBrowser(response.value.files);
        self._view.showFileList();
        $('#local-files thead th:first').text(response.value.info.currentPath);
      });
    };


    fileSelectorController.prototype._handleFileBrowserNavigation = function(e) {
      var fileName = $(e.target).text();
      var self = this;

      $.when( $.ajax({
        url: _mkUrl.get('MOVE'),
        data: {
          file: fileName
        }
      }) ).done( function(response) {
        self._view.showFileBrowser(response.value.files);
        $('#local-files thead th:first').text(response.value.info.currentPath);
      } );

    };

    fileSelectorController.prototype._handleFileBrowserSelect = function(e) {
      var fileName = $(e.target).text();
      var self = this;

      $.when($.ajax(_mkUrl.get('INFO'))).done(function(INFO) {
        self._list.append(self._convertPathToModel(INFO.value.info.currentPath, fileName));
        self._view.showFileList(self._list.toObject());
      });
    };

    fileSelectorController.prototype._handleFileListActions = function(e) {
      var file = $(e.target).text();
      var position = $(e.target).parent().attr('data-pos');
      this._list.delete(position);
      this._view.showFileList(this._list.toObject());
    };

    fileSelectorController.prototype._handleSaveList = function(e) {
      console.log('Saving file list...');
      var path = $('#fileDialog').val();
      if (path) {
        var csv = this._convertCsv(this._list.toObject());
        var fs = require('fs');
        fs.writeFile(path, csv, 'utf8', function(err) {
          if (err) {
            console.error('Error saving file: ' + err);
          } else {
            alert('It\'s saved!');
          }
        });
      }
    };

    fileSelectorController.prototype._convertCsv = function(jsonModel) {
      var csv = [];

      for (var i = 0; i < jsonModel.length; i++) {
        csv.push(jsonModel[i].filePath + ';' + jsonModel[i].targetName);
      }

      return csv.join('\n');
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
