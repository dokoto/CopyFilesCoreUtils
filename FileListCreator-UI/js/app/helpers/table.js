define(['jquery', './pathBrowser'], function($, PathBrowser) {
  'use strict';

  //*****************************************************
  // PRIVATE
  //*****************************************************
  var _self = null;
  var _containerId = null;
  var _tableId = null;
  var _tabletClass = null;
  var _header = null;
  var _pathBrowser = null;

  function _fill(datas) {
    if (!_header) {
      console.error('Header must be setted, plese user method "setHeader()"');
    }

    var $table = $('#' + _containerId);

    $table.empty();
    $table.append('<table id="' + _tableId + '" class="' + _tabletClass + '"><thead><tr></tr></thead><tbody></tbody></table>');

    var $head = $table.find('thead tr');
    for (var i = 0; i < _header.length; i++) {
      $head.append('<th id="' + _header[i].id + '">' + _header[i].value);
    }

    var $tbody = $table.find('tbody');
    for (var i = 0; i < datas.length; i++) {
      $tbody.append('<tr data-pos="' + i + '"></tr>');
      var $tr = $tbody.children('tr').last();
      for (var x = 0; x < _header.length; x++) {
        $tr.append('<td data-header-id="' + _header[x].id + '">' + datas[i][_header[x].id] + '</td>');
      }
    }

  }

  function _setHeader(header) {
    _header = header;
  }

  function _setDblClickListner() {
    $('#' + _tableId + ' tbody tr').dblclick(function(e) {
      console.log('DOUBLE CLICK !');
      var files = _pathBrowser.goto($(e.target).text());
      mkTable(_containerId, _tableId, 'scroll', _header, files);
    })
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var Table = (function() {

    function table(containerId, tableId, tabletClass) {
      _self = this;
      _containerId = containerId;
      _tableId = tableId;
      _tabletClass = tabletClass;
      _pathBrowser = PathBrowser.create();
    }

    /*
     * header = [{id='filename', value='File Name'}, {id='type', value='File Type'}]
     */
    table.prototype.setHeader = function(header) {
      _setHeader(header);
    };

    /*
     * datas = [{filename ='Desarrollo', type='folder'}, {filename ='Mis Documentos', type='folder'}, {filename ='miWord.doc', type='file'}]
     */
    table.prototype.fill(datas) = function(datas) {
      _fill(datas);
    };

    table.prototype.setDblClickListner = function() {
      _setDblClickListner();
    };


    return table;

  })();


  return {
    create: function() {
      return new Table();
    }

  };

});
