var http = require('http');
var app = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('OK');
});

console.log('starting node app on port: 80');
app.listen(80);