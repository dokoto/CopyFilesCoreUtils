define([], function() {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARE MEMORY OBJECTS
  //*****************************************************

  const host = "83.36.48.112",
    port = 46969,
    protocol: "https://";


  //*****************************************************
  // PUBLIC
  //*****************************************************
  var UrlGenerator = (function() {

    function urlGenerator() {
      this.endPoint = {
        GOTO: "/rfs/goto",
        INIT: "/rfs/init",
        INFO: "/rfs/info",
        FILES: "/rfs/files"
      };
    }

    urlGenerator.prototype.get = function(endpoint) {
      return protocol + ':' + port + this.endPoint[endpoint];
    };


    return urlGenerator;

  })();


  return {
    create: function() {
      return new UrlGenerator();
    }

  };

});
