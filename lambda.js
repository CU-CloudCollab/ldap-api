'use strict';

var aws = require('aws-sdk');
aws.config.region = 'us-east-1';
var ec2Client = new aws.EC2();

exports.myhandler = (event, context, callback) => {

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log("\n\nInside handler\n\n");

  var ldap = require('ldapjs');
  var client = ldap.createClient({
    url: 'ldap://test.directory.cornell.edu:389',
    timeout: 5000
  });

  var opts = {
    filter: '(uid='+event.netid+')',
    scope: 'sub',
    attributes: ['dn', 'sn', 'cn', 'givenname']
  };

  client.search('ou=People,o=Cornell University, c=US', opts, function(err, res) {
    res.on('searchEntry', function(entry) {
      console.log('entry: ' + entry.object);
      callback(null, entry.object);
    });
    res.on('searchReference', function(referral) {
      console.log('referral: ' + referral.uris.join());
    });
    res.on('error', function(err) {
      console.error('error: ' + err.message);
    });
    res.on('end', function(result) {
      console.log('status: ' + result.status);
      console.log("The end is nigh!");
  	  client.unbind(function(err) {});
    });
    console.log("fin");
  });
};
