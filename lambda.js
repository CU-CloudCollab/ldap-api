'use strict';

var aws = require('aws-sdk');
aws.config.region = 'us-east-1';
var ec2Client = new aws.EC2();

exports.myhandler = (event, context, callback) => {

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log("\n\nInside handler\n\n");

  // var ec2Params = {
  //   Filters: [
  //     {Name: 'instance-state-name', Values: ['running']}
  //   ]
  // };

  // ec2Client.describeInstances( ec2Params, function(err, data) {
  //   console.log("\nIn describe instances:\n");
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else {
  //     for (var i = 0; i < data.Reservations.length; i++) {
  //       var r = data.Reservations[i]
  //       for (var j = 0; j < r.Instances.length; j++) {
  //           var instance = r.Instances[j];
  //           console.log(JSON.stringify(instance, null, 2));
  //       }
  //     }
  //    }
  // });


var ldap = require('ldapjs');
var client = ldap.createClient({
  url: 'ldap://test.directory.cornell.edu:389',
  timeout: 5000
});

var opts = {
  filter: '(uid=kps1)',
  scope: 'sub',
  attributes: ['dn', 'sn', 'cn', 'givenname']
};

client.search('ou=People,o=Cornell University, c=US', opts, function(err, res) {
  //assert.ifError(err);

  res.on('searchEntry', function(entry) {
    console.log('entry: ' + JSON.stringify(entry.object));
    callback(null, {"hello ": JSON.stringify(entry.object)});
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
  });
});



};
