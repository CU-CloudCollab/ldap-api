'use strict';

var aws = require('aws-sdk');
aws.config.region = 'us-east-1';
var ec2Client = new aws.EC2();

exports.myhandler = (event, context) => {

  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log("\n\nInside handler\n\n");

  var ec2Params = {
    Filters: [
      {Name: 'instance-state-name', Values: ['running']}
    ]
  };

  ec2Client.describeInstances( ec2Params, function(err, data) {
    console.log("\nIn describe instances:\n");
    if (err) console.log(err, err.stack); // an error occurred
    else {
      for (var i = 0; i < data.Reservations.length; i++) {
        var r = data.Reservations[i]
        for (var j = 0; j < r.Instances.length; j++) {
            var instance = r.Instances[j];
            console.log(JSON.stringify(instance, null, 2));
        }
      }
     }
  });
};
