# UniFi REST API

This is a RESTful API built in JavaScript to run on your UniFi controller.

A couple of important notes:

1. I have not tested this for security, I recommend firewalling it off from the world or extending the built-in security
2. Unifi have their own shell API, which I do not use. This applications talks directly with your MongoDB database
3. Becuase of point 2, I recommend using this only for reading data
4. A new database called auth will be made on your MongoDB server which is used for authentication

I am looking for help with the following:

1. Automatic deploying of TLS certificates via letsencrypt. Cert location is referenced in /server/ssl-config.js
2. Extended authentication, perhaps using Oauth with loopback

Todo:

1. The ability to remove CUD functions by configuration from the API so it is readonly
2. Add all models
3. Add all model properties
4. Document

Requirements:

1. Node
2. UniFi Controller 5.9.x or later (Or a more current version of Mongo than the builtin version on 5.8.x)
3. OpenSSL installed and added to path if you are on Windows

Installation:

```bash
git clone https://github.com/GCITS/unifi_js_api.git
cd unifi_js_api
```

Edit server/config.json and change the "host" field to your controller hostname or desired URL

```bash
npm install
npm run generate-key
npm run generate-cert
npm run generate-csr
node .
```

Browse to https://CONTROLLERNAMEHERE:9443/explorer

Make a POST call with the following JSON to /Users/ to create a new user making calls

```JSON
{
"email": "user@email.com",
"password": "chooseApassword"
}
```

Make a POST call with the same JSON to /User/Login/ to be returned an access token

```JSON
{
  "id": "VERYLONGGENERATEDACCESSTOKEN",
  "ttl": 1209600,
  "created": "2018-10-17T00:56:33.569Z",
  "userId": "5bc688b6296e8f006d70cfe5"
}
```

You can use your access token to make queries in the format of

```curl
https://localhost:9443/api/devices?access_token=VERYLONGGENERATEDACCESSTOKEN
```

Any feedback I would love to hear, info@gcits.com
