var http = require('http');

module.exports = function(script, uid, gid) {
  //hijack http.createServer
  var createServer = http.createServer;
  http.createServer = function() {
    var server = createServer.apply(http, arguments);

    //hijack server.listen
    var listen = server.listen;
    server.listen = function() {
      hijackCallback(arguments, afterBound);
      return listen.apply(server, arguments);
    };
    return server;
  };

  function afterBound() {
    if(gid) {
      process.setgid(gid);
      console.info(' >> stepping down to gid: ' + gid);
    }

    if(uid) {
      process.setuid(uid);
      console.info(' >> stepping down to uid: ' + uid);
    }
  }

  function hijackCallback(args, callback) {
    var lastArg = args[args.length - 1];
    if(typeof(lastArg) == 'function') {
      args[args.length -1] = function() {
        lastArg.apply(null, arguments);
        callback();
      };
    } else {
      Array.prototype.push.call(args, callback);
    }
  }

  require(script);  
};