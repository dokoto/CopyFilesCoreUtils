define(['jquery', 'helpers/UUID'], function($, UUID) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARE MEMORY OBJECTS
  //*****************************************************

  var _uuid = null;

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
      this._setHeader(header);
    };

    /*
     * datas = [{filename ='Desarrollo', type='folder'}, {filename ='Mis Documentos', type='folder'}, {filename ='miWord.doc', type='file'}]
     */
    table.prototype.fill = function(datas) {
      this._fill(datas);
    };

    table.prototype.dblclick = function(callback) {
      this._dblclick(callback);
    };

    table.prototype.rightClick = function(callback) {
        this._rightClick(callback);
    };

    table.prototype._fill = function(datas) {
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

      // Fixing cell width
      this._fixColsWidth();
    };

    table.prototype._fixColsWidth = function() {
      //var cellWidth = $('#' + this.tableId + ' tbody tr:first').children().width();
      //$('#' + this.tableId + ' thead th:first').width(cellWidth);
      var cellsWidth = $('#' + this.tableId + ' tbody tr:first').children().map(function() {
        return $(this).width();
      }).get();

      $('#' + this.tableId + ' thead th:first').map(function(index) {
        $(this).width(cellsWidth[index]);
      }).get();

    };

    table.prototype._setHeader = function(header) {
      this.header = header;
    };

    table.prototype._dblclick = function(callback) {
      $('#' + this.tableId + ' tbody tr').dblclick(function(event) {
        callback(event);
      })
    };

    table.prototype._rightClick = function(callback) {
      $('#' + this.tableId + ' tbody tr').mousedown(function(event) {
        if (event.button === 2) {
          callback(event);
        }
      })
    };

    return table;

  })();


  return {
    create: function(containerId, tableId, tabletClass) {
      return new Table(containerId, tableId, tabletClass);
    }

  };

});
