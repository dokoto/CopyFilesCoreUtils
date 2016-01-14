'use strict';

var Configurator = (function() {

  //*****************************************************
  // PRIVATE
  //*****************************************************
  var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    log4js = require('log4js'),
    fs = require('fs'),
    path = require('path'),
    app = require('./utils/app').create();


  //*****************************************************
  // PUBLIC
  //*****************************************************
  /*
   * collections = {collectionKey, pathConfigFile}
   */
  function configurator(collections) {
    this._rest = null;
    this._options = {};
    this._Global();
  };

  configurator.prototype.generate = function() {
    this._Options();
    this._Express();
    this._log4js();
    this._Definitions();

    return {
      app: this._rest,
      options: this._options
    }
  };

  configurator.prototype._Global = function() {
    global.Base = process.cwd();
    global.Config = require('./utils/Config').create([{
      collectionKey: 'connection',
      pathConfigFile: '/config/connection.json'
    }, {
      collectionKey: 'https',
      pathConfigFile: '/config/https.json'
    }, {
      collectionKey: 'rfs',
      pathConfigFile: '/config/rfs.json'
    }]);
  };

  configurator.prototype._Options = function() {
    /*
     * ALERTA !!! HAY QUE REGENERAR LAS KEYS
     * - openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
     * - openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem
     */
    this._options.key = fs.readFileSync(path.join(Base, Config.fetch('https', 'https.pathToKey')));
    this._options.cert = fs.readFileSync(path.join(Base, Config.fetch('https', 'https.pathToCert')));

    // ARGUMENTS
    if (process.argv.indexOf("--help") != -1) {
      this._showHelp();
      process.exit();
    }

    this._options.nocluster = false;
    if (process.argv.indexOf("--nocluster") != -1) {
      this._options.nocluster = true;
    }

    this._options.nohttps = false;
    if (process.argv.indexOf("--nohttps") != -1) {
      this._options.nohttps = true;
    }

    // Take value from argument key=val :. -c paco
    //city = process.argv[process.argv.indexOf("-c") + 1];
  }

  configurator.prototype._showHelp = function() {
    console.log('$> restestd [options]');
    console.log('--nocluster [default cluster is on]');
    console.log('--nohttps [default is https]');
  };

  configurator.prototype._log4js = function() {
    var log4js = require('log4js');
    fs.existsSync('log') || fs.mkdirSync('log')
    log4js.configure('./config/log4js.json');

    global.Logger = log4js.getLogger(app.info().name.toUpperCase());

  };

  configurator.prototype._Express = function() {
    this._rest = express();

    this._rest.use(bodyParser.urlencoded({
      extended: true
    }));
    this._rest.use(methodOverride('X-HTTP-Method-Override'));
    this._rest.use(express.static(__dirname + '/public'));
  };

  configurator.prototype._Definitions = function() {
    var definitions = require('./definitions');
    this._rest.use('/', definitions);
  };



  return configurator;

})();


module.exports = {
  create: function() {
    return new Configurator();
  }

};
