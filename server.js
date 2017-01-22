'use strict';

var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 7777,
  app = express(),
  Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '0EgAPVpt4RJkGzk77Kf8dg',
  consumer_secret: 'a9H3FnRW62PkcIkFUrNBLkaTLy8',
  token: 'C4FF1in5QgB4aOM-L-Q67utk8ySR0aFQ',
  token_secret: 'FK6E-2Stow-DB4VG4xkpKjOJs6I',
});

app.use(express.static('./public'));

app.get('/yelp', function(request, response) {
  yelp.search({term: 'food', location: 'Seattle'})
    .then(data => response.send(data.businesses[0]));
});



// app.get('*', function(request, response) {
//   console.log('New request:', request.url);
//   response.sendFile('index.html', { root: '.' });
// });

app.listen(port, function(){
  console.log(`Server locked and loaded @${port}`);
});
