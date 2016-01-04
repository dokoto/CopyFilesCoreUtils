'use strict';

requirejs.config({
  paths: {
    domReady: "../vendor/requirejs-domready/domReady",
    jquery: "../vendor/jquery/dist/jquery.min"
  }
});


requirejs.onResourceLoad = function(context, map, depMaps) {
  updateModuleProgress(context, map, depMaps);
};

var updateModuleProgress = function(context, map, depMaps) {
  var console = window.console;
  if (console && console.log) {
    console.log('[LOAD PHASE]  ' + map.name + ' at ' + map.url);
  }
};

requirejs(['jquery', 'domReady'], function($, domReady) {
  domReady(function() {
    updateModuleProgress = function(context, map, depMaps) {
      var loadingStatusEl = $('#loading-status');
      var loadingModuleNameEl = $('#loading-module-name');
      if (loadingStatusEl && loadingModuleNameEl) {
        loadingStatusEl.innerHTML = loadingStatusEl.innerHTML += '.';
        loadingModuleNameEl.innerHTML = map.name + (map.url ? ' at ' + map.url : '');
        console.log('[LOAD PHASE]  ' + map.name + ' at ' + map.url);
      }
    };
  });
});


window.onerror = function(message, file, line, col, error) {
  console.error(message);
  console.error(file + ' linea ' + line + ' - col ' + col);
};

requirejs(['jquery', 'helpers/Logger', 'index'], function($, Logger, index) {
  window.$ = window.jQuery = $;
  window.Log = Logger.create(Logger.priority.DEBUG);
  $('#loading-status').empty();
  Log.info.v0('START FileListCreator-UI');
  var mainHandler = index.create();
  mainHandler.run();

});
