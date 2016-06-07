function PlacesAdapter(feedItem){
  this.feedItem = feedItem
  this.textSearchRequest = {
    query: feedItem.company + " near " + feedItem.location
  }
}

PlacesAdapter.prototype.getPlaceID = function(){
  feedItem = this.feedItem
  var service = new google.maps.places.PlacesService($('#google-places').get(0));
  service.textSearch(this.textSearchRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      feedItem.placeID = results[0].place_id;
      console.log(feedItem.company + ": " + feedItem.placeID);
    } else {
      console.log(feedItem.company + "-- request failed " + status)
    }
  });
}

// PlacesAdapter.prototype.getLocationData = function(){
  // url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + this.company + "&key=#{ENV["places_api_key"]}"
//   $.ajax({
//     url: url,
//     type: 'get',
//     dataType: 'json',
//     success: function(response){
//       // response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//       debugger
//     }
//   })
// }
