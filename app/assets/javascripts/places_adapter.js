function PlacesAdapter(feedItem){
  this.textSearchRequest = {
    query: feedItem.company + " near " + feedItem.location
  }
  this.service = new google.maps.places.PlacesService($('#google-map').get(0));
}

PlacesAdapter.prototype.findPlaceIDs = function(feedItem, itemsWithPlaceID, diceResponse, queryParams) {
  setTimeout(function(){
    this.service.textSearch(this.textSearchRequest, function(results, status) { // search for place IDs
      if (status == google.maps.places.PlacesServiceStatus.OK) { // begin callback
        feedItem.placeID = results[0].place_id;
        feedItem.formattedAddress = results[0].formatted_address;
        feedItem.googleName = results[0].name;
        console.log(item);
        itemsWithPlaceID.push(feedItem);  // to store newly enriched feed items
      } else {
        feedItem.placeID = status;
        feedItem.googleName = status;
        itemsWithPlaceID.push(feedItem);
      }

      if (itemsWithPlaceID.length === diceResponse.count){ // if all placeIDs retrieved
        new DistanceMatrixAdapter(itemsWithPlaceID, diceResponse, queryParams);
      }
    });
  }, 200);
}
