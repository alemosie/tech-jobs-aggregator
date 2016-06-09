function PlacesAdapter(feedItem, places, diceResponse, queryParams, i) {
  var textSearchRequest = { query: feedItem.company + " near " + feedItem.location};
  var service = new google.maps.places.PlacesService($('#google-map').get(0));
  setTimeout(function() {
    console.log("calling places api");
    service.textSearch(textSearchRequest, function(results, status) { // search for place IDs
      if (status == google.maps.places.PlacesServiceStatus.OK) { // begin callback
        feedItem.placeID = results[0].place_id;
        feedItem.googleName = results[0].name;
        places.push({placeId: results[0].place_id, index: i});  // to store newly enriched feed items
      } else {
        feedItem.placeID = "ZERO_RESULTS";
        feedItem.googleName = status;
        places.push({placeId: "ZERO_RESULTS", index: i});
      }
      if (places.length === diceResponse.count){ // if all placeIDs retrieved
        new DistanceMatrixAdapter(places, diceResponse, queryParams);
      }
    })}, 200*i);
}
