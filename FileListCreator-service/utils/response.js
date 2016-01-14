'use strict';

var tpl = require('./tpl').create();

var Response = (function () {

  //*****************************************************
  // PRIVATE
  //*****************************************************

  //*****************************************************
  // PUBLIC
  //*****************************************************
  function response() {
  } 

  response.prototype.standard = function (res, status, message) {

    var params = {
      status: status,
      message: message
    };

    res.status(status).json( tpl.fromFile('../templates/responses/standard.json', params) );

  };

  response.prototype.standardWithValue = function (res, status, message, value) {
    var params = {
      status: status,
      message: message,
      value: ((value===undefined)?'null':value)
    };

    //res.status(status).json( tpl.fromFile('../templates/responses/standardWithValue.json', params) );
    res.status(status).json( params );

  };

  return response;

})();


module.exports = {
  create: function () {
    return new Response();
  }

};
