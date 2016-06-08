function DistanceMatrixAdapter(itemsWithPlaceID, diceResponse, queryParams){
  var places = [];
  console.log(itemsWithPlaceID);
  itemsWithPlaceID.forEach(function(item){ // create place ID objects for distance query
    if (item.placeID) {
      places.push({placeId: item.placeID});
    }
  });

  var realPlaces = [];
  places.forEach(function(place){
    if (place.placeId !== "ZERO_RESULTS" || place.placeId !=="OVER_QUERY_LIMIT") {
      realPlaces.push(place);
    }
  });
  var placeIDSections = splitItemsForDistanceQuery(realPlaces); // create sections max 25 for distance query
  var distanceService = new google.maps.DistanceMatrixService();
  var i = 0;
  placeIDSections.forEach(function(section){
    distanceService.getDistanceMatrix({
      origins: [queryParams.zip],
      destinations: section,
      travelMode: queryParams.transit,
    }, callback.bind(itemsWithPlaceID))
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
    var _this = this;

    for (var destinationAddressIndex = 0; destinationAddressIndex < response.destinationAddresses.length; destinationAddressIndex++){
      var destination = response.destinationAddresses[destinationAddressIndex]
      var duration = response.rows[0].elements[destinationAddressIndex].duration.text
      if (_this[feedItemIndex].googleName === destination.split(/ \d+/)[0].replace(/,/g, '')){
        _this[feedItemIndex].distance = duration + " away"
      } else {
        _this[feedItemIndex].distance = "No route available"
      }
      $("#feed-item-" + feedItemIndex).find("p").append('<br>' + _this[feedItemIndex].distance);
      feedItemIndex++;
    }
  }
}
