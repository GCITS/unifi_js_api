# UniFi REST API

This is a RESTful API built in JavaScript to run on your UniFi controller.

A couple of important notes:

1. I have not tested this for security, I recommend firewalling it off from the world or extending the built-in security
2. Unifi have their own shell API, which I do not use. This applications talks directly with your MongoDB database
3. Becuase of point 2, I recommend using this only for reading data

I am looking for help with the following:

1. Automatic deploying of TLS certificates via letsencrypt. Cert location is referenced in /server/ssl-config.js
2. Extended authentication, perhaps using Oauth with loopback

Todo:

1. The ability to remove CUD functions by configuration from the API so it is readonly
2. Add all models
3. Add all model properties
4. Document
