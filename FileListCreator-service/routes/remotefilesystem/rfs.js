var router = require('express').Router();
var tools = {
  pathBrowser: require('../../utils/pathBrowser').create(),
  response: require('../../utils/response').create()
};


/*
 * POST /rfs/init
 */
router.get('/rfs/init', function (request, response) {
  tools.pathBrowser.init( Config.fetch('rfs', 'path.root') );
  tools.response.standardWithValue(response, '200', 'OK', {info: tools.pathBrowser.info()});
});

/*
 * GET /rfs/goto?file=fileName.ext
 */
router.get('/rfs/goto', function (request, response) {
  var ret = tools.pathBrowser.goto( request.query['file'] );
  tools.response.standardWithValue(response, '200', 'OK', {didMovement: ret});
});

/*
 * GET /rfs/files
 */
router.get('/rfs/files', function (request, response) {
  var files = tools.pathBrowser.getFiles();
  tools.response.standardWithValue(response, '200', 'OK', {files: files});
});

/*
 * GET /rfs/info
 */
router.get('/rfs/info', function (request, response) {
  var info = tools.pathBrowser.info();
  tools.response.standardWithValue(response, '200', 'OK', {info: info});
});

module.exports = router;
