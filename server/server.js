"use strict";

var loopback = require("loopback");
var boot = require("loopback-boot");

var http = require("http");
var https = require("spdy");
var httpsRedirect = require("./middleware/https-redirect");
var sslConfig = require("./ssl-config");

var app = (module.exports = loopback());

app.use(httpsRedirect());

app.start = function() {
  var httpsOptions = {
    key: sslConfig.privateKey,
    cert: sslConfig.certificate
  };
  // start the HTTP web server so that we can redirect HTTP traffic to HTTPS
  http.createServer(app).listen(app.get("httpPort"), function() {
    var baseUrl = "http://" + app.get("host") + ":" + app.get("httpPort");
    app.emit("started HTTP web server", baseUrl);
    console.log("LoopBack server listening @ %s%s", baseUrl, "/");
  });
  // start the HTTPS web server
  return https
    .createServer(httpsOptions, app)
    .listen(app.get("port"), function() {
      var baseUrl = "https://" + app.get("host") + ":" + app.get("port");
      app.emit("started HTTPS web server", baseUrl);
      console.log("LoopBack server listening @ %s%s", baseUrl, "/");
      if (app.get("loopback-component-explorer")) {
        var explorerPath = app.get("loopback-component-explorer").mountPath;
        console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
      }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
