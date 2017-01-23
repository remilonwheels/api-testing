'use strict';

var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 7777,
  app = express(),
  Yelp = require('yelp');
  var oauthSignature = require('oauth-signature');
  var n = require('nonce')();
  var request = require('request');
  var qs = require('querystring');
  var _ = require('lodash');

var yelp = new Yelp({
  consumer_key: '0EgAPVpt4RJkGzk77Kf8dg',
  consumer_secret: 'a9H3FnRW62PkcIkFUrNBLkaTLy8',
  token: 'C4FF1in5QgB4aOM-L-Q67utk8ySR0aFQ',
  token_secret: 'FK6E-2Stow-DB4VG4xkpKjOJs6I',
});

app.use(express.static('./public'));

app.get('/yelp', function(request, response) {
  request_yelp({location: 'Seattle'}, function(error, resp, body) {
    response.send(body);
  });
});

var request_yelp = function(set_parameters, callback) {

  console.log('in server side yelp');
  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    location: 'Seattle',
    sort: '2'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : '0EgAPVpt4RJkGzk77Kf8dg', //process.env.oauth_consumer_key,
    oauth_token : 'C4FF1in5QgB4aOM-L-Q67utk8ySR0aFQ', //process.env.oauth_token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  /* We set our secrets here */
  var consumerSecret = 'a9H3FnRW62PkcIkFUrNBLkaTLy8'; //process.env.consumerSecret;
  var tokenSecret = 'FK6E-2Stow-DB4VG4xkpKjOJs6I'; //process.env.tokenSecret;

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    // console.log(body);
    return callback(error, response, body);
  });

};


app.listen(port, function(){
  console.log(`Server locked and loaded @${port}`);
});
