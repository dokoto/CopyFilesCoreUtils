'use strict';

var PathBrowser = (function() {

  //*****************************************************
  // PRIVATE AND SHARE MEMORY OBJECTS
  //*****************************************************
  var _fs = require('fs');
  var _path = require('path');

  //*****************************************************
  // PUBLIC
  //*****************************************************

  function pathBrowser() {
    this._currentPath = null;
    this._rootPath = null;
    this._files = [];
  }

  pathBrowser.prototype.init = function(rootPath) {
    this._currentPath = this._rootPath = rootPath;
    this._files = [];
  };

  pathBrowser.prototype.goto = function(file) {
    return this._goto((file === undefined) ? this._currentPath : file);
  };

  pathBrowser.prototype.getFiles = function() {
    return this._files;
  };

  pathBrowser.prototype.info = function() {
    return {
      currentPath: this._currentPath,
      rootPath: this._rootPath
    }
  };

  pathBrowser.prototype._down = function() {
    if (this._rootPath == this._currentPath) {
      return false;
    }

    var newPath = '';
    var lastSepPos = this._currentPath.lastIndexOf(_path.sep);

    if (lastSepPos === -1) {
      console.warn('Filepath separator no found');
      return false;
    }

    if (lastSepPos === this._currentPath.length - 1) {
      newPath = _this.currentPath.substr(0, this._currentPath.lastIndexOf(_path.sep));
      newPath = newPath.substr(0, newPath.lastIndexOf(_path.sep) + 1);
    } else {
      newPath = this._currentPath.substr(0, this._currentPath.lastIndexOf(_path.sep) + 1);
    }

    if (_fs.existsSync(newPath) === false) {
      console.warn('Filepath not exist: ' + newPath);
      return false;
    }

    this._currentPath = newPath;

    return true;
  };

  pathBrowser.prototype._up = function(file) {
    var newPath = _path.join(this._currentPath, file);
    if (_fs.existsSync(newPath) === false) {
      console.warn('Filepath not exist: ' + newPath);
      return false;
    }

    this._currentPath = newPath;

    return true;
  };

  pathBrowser.prototype._format = function(data) {
    var result = [];
    result.push({
      filename: '..'
    });
    for (var i = 0; i < data.length; i++) {
      result.push({
        filename: data[i]
      });
    }

    return result;
  };

  pathBrowser.prototype._open = function(path) {
    try {
      this._files = this._format(_fs.readdirSync(path));
    } catch (e) {
      console.error(e);
    }
  };

  pathBrowser.prototype._goto = function(file) {
    var currentPath = this._currentPath;
    if (this._currentPath === file) {
      if (!this._files || this._files.length === 0) {
        this._open(this._currentPath);
        return true;
      }
      return false;
    } else if (file === '..') {
      if (this._down() === true) {
        this._open(this._currentPath);
        return true;
      } else {
        return false;
      }
    } else {
      if (this._up(file) === true) {
        if (_fs.lstatSync(this._currentPath).isDirectory() === true) {
          this._open(this._currentPath);
          return true;
        } else if (_fs.lstatSync(this._currentPath).isSymbolicLink() === true) {
          this._open(this._currentPath);
          return true;
        } else if (_fs.lstatSync(this._currentPath).isFile()) {
          this._currentPath = currentPath;
          return false;
        } else {
          console.warn('File type not resolve');
          return false;
        }
      } else {
        return false;
      }

    }
  };

  return pathBrowser;

})();

module.exports = {
  create: function() {
    return new PathBrowser();
  }

};
