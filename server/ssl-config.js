var path = require("path");
var fs = require("fs");

exports.privateKey = fs
  .readFileSync(path.join(__dirname, "private/privkey.pem"))
  .toString();
exports.certificate = fs
  .readFileSync(path.join(__dirname, "/private/cert.pem"))
  .toString();
