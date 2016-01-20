define([], function() {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARE MEMORY OBJECTS
  //*****************************************************

  const connection = {
    local: {
      host: "127.0.0.1",
      port: 46969,
      protocol: "https://"
    },
    remote: {
      host: "83.36.48.112",
      port: 46969,
      protocol: "https://"
    }
  };


  //*****************************************************
  // PUBLIC
  //*****************************************************
  var UrlGenerator = (function() {

    function urlGenerator(env) {
      this.env = env || 'local';
      this.endPoint = {
        INFO: '/rfs/info',
        FILES: '/rfs/files',
        GOTO: '/rfs/goto',
        MOVE: "/rfs/move"
      };
    }

    urlGenerator.prototype.get = function(endpoint) {
      return connection[this.env].protocol + connection[this.env].host + ':' + connection[this.env].port + this.endPoint[endpoint];
    };


    return urlGenerator;

  })();


  return {
    create: function(env) {
      return new UrlGenerator(env);
    }

  };

});
