function DistanceMatrixAdapter(places, queryParams){
  var placeIds = [];

  places.forEach(function(place){ // create place ID objects for distance query
    placeIds.push({placeId: place.placeId});
  });

  var realPlaces = [];
  placeIds.forEach(function(place){
    if (place.placeId !== "ZERO_RESULTS" || place.placeId !=="OVER_QUERY_LIMIT") {
      realPlaces.push(place);
    }
  });

  var placeIDSections = splitItemsForDistanceQuery(realPlaces); // create sections max 25 for distance query
  var distanceService = new google.maps.DistanceMatrixService();

  placeIDSections.forEach(function(section){
    distanceService.getDistanceMatrix({
      origins: [queryParams.zip],
      destinations: section,
      travelMode: queryParams.transit,
    }, callback.bind(places));
  });
}

function splitItemsForDistanceQuery(places){
  var sections = [];
  while (places.length > 0){
    sections.push(places.splice(0,25)); // extract max-25 sections
  }
  return sections;
}

function callback(response, status){
  if (status == google.maps.DistanceMatrixStatus.OK) {
    var feedItemIndex = 0;
    var places = this;
    var results = response.rows[0].elements
    var durationIndex = 0;
    var placesIndex = 0;
    while (placesIndex < places.length && durationIndex < results.length) {
      if (places[placesIndex].placeId != "ZERO_RESULTS") {
        var duration = results[durationIndex].duration.text
        $("#feed-item-" + placesIndex).find(".job-distance").append(duration);
        durationIndex++;
      } else {
        $("#feed-item-" + placesIndex).find(".job-distance").append("No route available");
      }
      placesIndex++;
    }

    /*for (var destinationAddressIndex = 0; destinationAddressIndex < response.destinationAddresses.length; destinationAddressIndex++){
      var destination = response.destinationAddresses[destinationAddressIndex]
      var duration = response.rows[0].elements[destinationAddressIndex].duration.text
      if (_this[feedItemIndex].googleName === destination.split(/ \d+/)[0].replace(/,/g, '')){
        _this[feedItemIndex].distance = duration + " away"
      } else {
        _this[feedItemIndex].distance = "No route available"
      }
      $("#feed-item-" + feedItemIndex).find(".job-distance").append(_this[feedItemIndex].distance);
      feedItemIndex++;
    }*/
  }
}
