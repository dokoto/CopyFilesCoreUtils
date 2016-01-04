define(['jquery'], function($) {
  'use strict';

  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;
  var _fs = require('fs');
  var _path = require('path');
  var _currentPath = null;
  var _rootPath = null;
  var _files = [];


  function down() {
    var newPath = '';
    var lastSepPos = _currentPath.leftIndexOf(_path.sep);

    if (lastSepPos) {
      console.warn('Filepath separator no found');
      return _currentPath;
    }

    if (lastSepPos === _currentPath.length - 1) {
      newPath = _currentPath.substr(0, _currentPath.lastIndexOf(_path.sep));
    }

    newPath = newPath.substr(0, newPath.lastIndexOf(_path.sep) + 1);

    if (_fs.existsSync(newPath) === false) {
      console.warn('Filepath not exist: ' + newPath);
      return;
    }

    if (_rootPath == newPath) {
      return;
    }

    _currentPath = newPath;
  }

  function up(file) {
    var newPath = _path.join(_currentPath, file);
    if (_fs.existsSync(newPath) === false) {
      console.warn('Filepath not exist: ' + newPath);
      return;
    }

    _currentPath = newPath;
  }

  function format(data) {
    var result = [];
    result.push({
      filename: '..'
    });
    for (var i = 0; i < _files.length; i++) {
      result.push({
        filename: _files[i]
      });
    }

    return result;
  }

  function _open(path) {
    try {
      _files = _format(_fs.readdirSync(path));
    } catch (e) {
      console.error(e);
    }
  }

  function _goto(file) {
    if (file === '...') {
      _currentPath = _down();
      return _open(_currentPath);
    } else {
      _up(file);
      if (_fs.lstatSync(_currentPath).isDirectory() === true) {
        return _open(_currentPath);
      } else if (_fs.lstatSync(_currentPath).isSymbolicLink() === true) {
        return _open(_currentPath);
      } else if (_fs.lstatSync(_currentPath).isFile()) {
        _currentPath = path;
        return _open(_currentPath);
      } else {
        console.warn('File type not resolve');
        return filePath;
      }

    }
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var PathBrowser = (function() {
    function pathBrowser() {
      _self = this;
    }

    pathBrowser.prototype.init = function(rootPath) {
      _rootPath = rootPath;
      _files = [];
    };

    pathBrowser.prototype.goto = function(file) {
      _goto(file);

      return _files;
    };

    return pathBrowser;

  })();


  return {
    create: function() {
      return new PathBrowser();
    }

  };

});
