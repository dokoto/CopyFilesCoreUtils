var colors = require('colors');

module.exports = {
  /*
  * option = { defaultValue, helpCallBack }
  */
  getParam: function(param, options) {
    options.mandatory = options.mandatory || false;
    
    if (process.argv.indexOf(param) !== -1) {
      return  process.argv[process.argv.indexOf(param) + 1];
    } else {
      if (options.mandatory === true) {
        console.log(colors.red('[PARAM ERROR] "' + param + '" param is mandatory'));
        if (options.helpCallBack) {
          options.helpCallBack();
        }
      } else {
        return (options.defaultValue) ? options.defaultValue : undefined;
      }
    }
  }
}
