var https = require("https");
var sslConfig = require("./ssl-config");
////////////////////
// INIT GREENLOCK //
////////////////////

var greenlock = require("greenlock").create({
  version: "draft-12",
  server: "https://acme-v02.api.letsencrypt.org/directory",
  configDir: "~/.config/acme",

  email: "dion@gcits.com", // IMPORTANT: Change email and domains
  agreeTos: true, // Accept Let's Encrypt v2 Agreement
  communityMember: true, // Get (rare) non-mandatory updates about cool greenlock-related stuff (default false)
  securityUpdates: true, // Important and mandatory notices related to security or breaking API changes (default true)

  approveDomains: approveDomains
});
/////////////////////
// APPROVE DOMAINS //
/////////////////////

function approveDomains(opts, certs, cb) {
  // check for domains you want to receive certificates for
  if ("unifi.gcits.com" === opts.domain) {
    cb(null, { options: opts, certs: certs });
    return;
  }

  // return error otherwise
  cb(new Error("bad domain"));
}
var options = {
  key: sslConfig.privateKey,
  cert: sslConfig.certificate
};
("use strict");

var loopback = require("loopback");
var boot = require("loopback-boot");

var app = (module.exports = loopback());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit("started");
    var baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
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
