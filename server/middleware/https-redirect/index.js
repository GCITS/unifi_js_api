/**
 * Middleware to redirect HTTP requests to HTTPS
 * @param {Object} options Options
 * @returns {Function} The express middleware handler
 */
module.exports = function(options) {
  return function httpsRedirect(req, res, next) {
    var app = req.app;
    if (!req.secure) {
      return res.redirect('https://' + app.get('host') + ':' + app.get('port') + req.url);
    }
    next();
  };
};
