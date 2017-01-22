'use strict';

console.log('in');


$.ajax({
  url:'http://pokeapi.co/api/v2/pokemon/1',
  method: 'GET'
})
.then( function(response) { console.log(response); } );

var yelpRequest = function() {
  console.log('in yelp request');
  $.ajax({
    url:'/yelp/',
    method: 'GET'
  })
  .this( function(response) {
    console.log(response);
  });
  console.log('end of yelpRequest client');
};


page('/yelp', yelpRequest);
page();
