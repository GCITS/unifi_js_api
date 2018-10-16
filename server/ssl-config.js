var path = require("path");
var fs = require("fs");

exports.privateKey = fs
  .readFileSync(path.join(__dirname, "./private/localhost.key.pem"))
  .toString();
exports.certificate = fs
  .readFileSync(path.join(__dirname, "./private/localhost.cert.pem"))
  .toString();
