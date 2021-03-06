define(['jquery', 'helpers/UUID'], function($, UUID) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARE MEMORY OBJECTS
  //*****************************************************
    
  var _uuid = null;

  function _fill(datas) {
    if (!this.header) {
      console.error('Header must be setted, plese user method "setHeader()"');
    }

    var $table = $('#' + this.containerId);

    $table.empty();
    $table.append('<table id="' + this.tableId + '" class="' + this.tabletClass + '"><thead><tr></tr></thead><tbody></tbody></table>');

    var $head = $table.find('thead tr');
    for (var i = 0; i < this.header.length; i++) {
      $head.append('<th id="' + this.header[i].id + '">' + this.header[i].value);
    }

    var $tbody = $table.find('tbody');
    for (var i = 0; i < datas.length; i++) {
      $tbody.append('<tr data-pos="' + i + '"></tr>');
      var $tr = $tbody.children('tr').last();
      for (var x = 0; x < this.header.length; x++) {
        $tr.append('<td data-header-id="' + this.header[x].id + '">' + datas[i][this.header[x].id] + '</td>');
      }
    }

  }

  function _setHeader(header) {
    this.header = header;
  }

  function _activeNavigation(callback) {
    $('#' + this.tableId + ' tbody tr').dblclick(function(event) {
      callback(event);
    })
  }

  //*****************************************************
  // PUBLIC
  //*****************************************************
  var Table = (function() {

    function table(containerId, tableId, tabletClass) {
      _uuid = UUID.create();
      this.uuid = _uuid.generate();
      this.containerId = containerId;
      this.tableId = tableId;
      this.tabletClass = tabletClass;
      this.header = null;
    }

    /*
     * header = [{id='filename', value='File Name'}, {id='type', value='File Type'}]
     */
    table.prototype.setHeader = function(header) {
      _setHeader.call(this, header);
    };

    /*
     * datas = [{filename ='Desarrollo', type='folder'}, {filename ='Mis Documentos', type='folder'}, {filename ='miWord.doc', type='file'}]
     */
    table.prototype.fill = function(datas) {
      _fill.call(this, datas);
    };

    table.prototype.activeNavigation = function(callback) {
      _activeNavigation.call(this, callback);
    };

    return table;

  })();


  return {
    create: function(containerId, tableId, tabletClass) {
      return new Table(containerId, tableId, tabletClass);
    }

  };

});
