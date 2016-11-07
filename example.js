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

