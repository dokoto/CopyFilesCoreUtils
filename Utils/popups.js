var colors = require('colors');

module.exports = {
  alert: function(text, colorText, colorFrame) {
    var cf = colorFrame || 'red';
    var ct = colorText || 'black';
    console.log(' ');
    console.log(colors[cf]('*************************************************************************************************************************'));
    console.log(colors[ct](text));
    console.log(colors[cf]('*************************************************************************************************************************'));
    console.log(' ');
  }
}
