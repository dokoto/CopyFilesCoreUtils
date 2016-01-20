var router = require('express').Router();
var tools = {
  pathBrowser: require('../../utils/pathBrowser').create(),
  response: require('../../utils/response').create()
};



router.get('/rfs/init', function (request, response) {
  tools.pathBrowser.init( Config.fetch('rfs', 'path.root') );
  tools.response.standardWithValue(response, '200', 'OK', {info: 'Init finished'});
});

router.get('/rfs/goto', function (request, response) {
  var ret = tools.pathBrowser.goto( request.query['file'] );
  tools.response.standardWithValue(response, '200', 'OK', {didMovement: ret});
});

router.get('/rfs/files', function (request, response) {
  var files = tools.pathBrowser.getFiles();
  tools.response.standardWithValue(response, '200', 'OK', {files: files});
});

router.get('/rfs/info', function (request, response) {
  var info = tools.pathBrowser.info();
  tools.response.standardWithValue(response, '200', 'OK', {info: info});
});

router.get('/rfs/move', function (request, response) {
  if (tools.pathBrowser._currentPath === null && tools.pathBrowser._rootPath === null) {
    tools.pathBrowser.init( Config.fetch('rfs', 'path.root') );
  }
  var _didMovement = tools.pathBrowser.goto( request.query['file'] );
  var _files = tools.pathBrowser.getFiles();
  var _info = tools.pathBrowser.info();
  tools.response.standardWithValue(response, '200', 'OK', {didMovement: _didMovement, files: _files, info: _info});
});

module.exports = router;
