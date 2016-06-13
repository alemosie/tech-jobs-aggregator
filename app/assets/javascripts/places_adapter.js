function PlacesAdapter(feedItem, places, sectionLength, resolve) {
  var textSearchRequest = { query: feedItem.company + " in " + feedItem.location};
  var service = new google.maps.places.PlacesService($('#google-map').get(0));
    service.textSearch(textSearchRequest, function(results, status) { // search for place IDs
      if (status == google.maps.places.PlacesServiceStatus.OK) { // begin callback
        feedItem.placeId = results[0].place_id;
        feedItem.googleName = results[0].name;
        places.push({placeId: feedItem.placeId, index: feedItem.index});  // to store newly enriched feed items
      } else {
        feedItem.placeID = "ZERO_RESULTS";
        feedItem.googleName = "ZERO_RESULTS";
        places.push({placeId: "ZERO_RESULTS", index: feedItem.index});
      }

      resolve();
    });
}
