function DistanceMatrixAdapter(places, queryParams){
  var realPlaces = [];
  places.forEach(function(place){
    if (place.placeId !== "ZERO_RESULTS" || place.placeId !=="OVER_QUERY_LIMIT") {
      realPlaces.push({placeId: place.placeId});
    }
  });

  var distanceService = new google.maps.DistanceMatrixService();
  distanceService.getDistanceMatrix({
    origins: [queryParams.zip],
    destinations: realPlaces,
    travelMode: queryParams.transit,
  }, callback.bind(places));
}


function callback(response, status){
  if (status == google.maps.DistanceMatrixStatus.OK) {
    var places = this;
    var results = response.rows[0].elements
    var resultIndex = 0;
    console.log(results)
    for (var index = 0; index < places.length; index++) {
      // If the place exists, then we get the duration, append to the page, and increment the resultIndex
      var placeIndex = places[index].index
      // since we're passing places, we need to weed out the results that didn't get passed to the matrix call
      if (places[index].placeId !== "ZERO_RESULTS") {
        if (results[resultIndex].status == "OK") {
          var duration = results[resultIndex].duration.text
          $("#feed-item-" + placeIndex).find(".job-distance").append(duration);
        } else {
          $("#feed-item-" + placeIndex).find(".job-distance").append("No route available");
        }
        resultIndex++;
      } else {
        // Otherwise, we append 'no route', and *don't* increment the resultIndex
        $("#feed-item-" + placeIndex).find(".job-distance").append("No route available");
      }
    }
  }
}
