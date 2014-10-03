require("pz-stringutils");
var fs      = require("fs");
var moment  = require("moment");
var _       = require("underscore");

var levels  = {
  error     : 0,
  info      : 1,
  debug     : 2
}

module.exports = function Logger(options) {
  var path          = options.path || options;
  var consoleLevel  = options.console || 'info';

  function formatLogMessage(level, message) {
    return "[ " + level.toUpperCase().pad(5) + " ] [ " + moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + " ] " + message;
  }

  function doLog(level, message) {
    if (levels[level] <= levels[consoleLevel]) { console.log(formatLogMessage(level, message)); }
    fs.appendFile(path, formatLogMessage(level, message) + "\n");
  }

  var methods = {};
  _.each(_.keys(levels), function(level) {
    methods[level] = function(message) { doLog(level, message); }
  });
  return methods;
}