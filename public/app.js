'use strict';

function yelpRequest() {
  console.log('in client yelp');
  $.getJSON('/yelp')
  .then( data => console.log(data.businesses.map(business => business.name)) );
}

$('#ajax-target').on('click', yelpRequest);
