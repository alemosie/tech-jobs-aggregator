function PlacesAdapter(feedItem, places, sectionLength, responseCount) {
  var textSearchRequest = { query: feedItem.company + " in " + feedItem.location};
  var service = new google.maps.places.PlacesService($('#google-map').get(0));
    console.log("calling places api for "+ feedItem.company + " - " + feedItem.index);
    service.textSearch(textSearchRequest, function(results, status) { // search for place IDs
      if (status == google.maps.places.PlacesServiceStatus.OK) { // begin callback
        feedItem.placeID = results[0].place_id;
        feedItem.googleName = results[0].name;
        places.push({placeId: results[0].place_id, index: feedItem.index});  // to store newly enriched feed items
      } else {
        feedItem.placeID = "ZERO_RESULTS";
        feedItem.googleName = "ZERO_RESULTS";
        places.push({placeId: "ZERO_RESULTS", index: feedItem.index});
      }
      if (places.length === responseCount){ // if all placeIDs retrieved
        new DistanceMatrixAdapter(places, feedItem.queryParams);
      }
    });
}
