const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "unifi-test";

const getDevices = function(db, callback, site) {
  // Get the documents collection
  const collection = db.collection("device");
  // Find some documents
  collection.find({ site_id: site }).toArray(function(err, docs) {
    assert.equal(err, null);

    const result = [];
    docs.forEach(element => {
      result.push({
        DeviceType: element.type,
        DeviceName: element.name
      });
    });
    callback(result);
    console.log("Found the following records");
    console.log(result);
  });
};
const getPortforward = function(db, callback, site) {
  // Get the documents collection
  const collection = db.collection("portforward");
  // Find some documents
  collection.find({ site_id: site }).toArray(function(err, docs) {
    assert.equal(err, null);
    const result = [];
    docs.forEach(element => {
      result.push({
        Name: element.name,
        SourceAddress: element.src,
        DestinationIP: element.fwd,
        ExternalPort: element.dst_port,
        InternalPort: element.fwd_port,
        Protocol: element.proto
      });
    });
    callback(result);
    console.log("Found the following port forwards records");
    console.log(result);
  });
};

function callMongo(actor, database, site) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      const db = client.db(database);

      actor(
        db,
        function() {
          client.close();
        },
        site
      );
    }
  );
}

// Use connect method to connect to the server
callMongo(getDevices, dbName, "59cb0368e4b0fb3f5ada7440");
callMongo(getPortforward, dbName, "59cb0368e4b0fb3f5ada7440");
