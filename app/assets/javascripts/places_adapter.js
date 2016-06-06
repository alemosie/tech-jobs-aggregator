function PlacesAdapter(company, zip){
  this.textSearchRequest = {
    query: company + " near " + zip
  }
}

PlacesAdapter.prototype.getPlaceID = function(){
  var service = new google.maps.places.PlacesService($('#google-places').get(0));
  service.textSearch(this.textSearchRequest, callback);
}

function callback(results, status) {
  var placeIDs = []
  var numFeedItems = feedItemsCreated
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    placeIDs.push(results[0].place_id);
    debugger
    if (placeIDs.length === numFeedItems) {
       console.log("finished loading!")
    }
  }
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
