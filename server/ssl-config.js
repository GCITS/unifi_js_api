var path = require("path");
var fs = require("fs");

exports.privateKey = fs
  .readFileSync(
    path.join(__dirname, "/etc/letsencrypt/live/inform.gcits.com/privkey.pem")
  )
  .toString();
exports.certificate = fs
  .readFileSync(
    path.join(__dirname, "/etc/letsencrypt/live/inform.gcits.com/fullchain.pem")
  )
  .toString();
