var path = require('path');

var script = process.argv[2];
if(!script) {
  console.error('Starting Script is not provided');
  process.exit(1);
}

script = path.resolve(script);

var uid = process.env.USERDOWN_UID;
var gid = process.env.USERDOWN_GID;

//cleaning un environment
process.argv.splice(2, 1);
delete process.env.USERDOWN_UID;
delete process.env.USERDOWN_GID;

require('../lib/userdown')(script, uid, gid);
