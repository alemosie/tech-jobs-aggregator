var placeIDs = [];

function PlacesAdapter(company, zip){
  this.textSearchRequest = {
    query: company + " near " + zip
  }
}

PlacesAdapter.prototype.getPlaceID = function(){
  service = new google.maps.places.PlacesService($('#google-places').get(0));
  service.textSearch(this.textSearchRequest, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      debugger
    }
  }
}

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     results.forEach(function(result){
//       placeIDs.push({ placeId: result.place_id })
//     });
//   }
//   debugger
// }
//
// PlacesAdapter.prototype.getPlaceDetails = function(){
//   this.getPlaceID();
//   placeIDs.forEach(function(placeID){
//     var detailsService = new google.maps.places.PlacesService($('#google-places').get(0));
//     detailsService.getDetails(request, placeDetailsCallback);
//   });
// }
//
// var placeDetailsRequest = {
//   placeId: results[0].place_id
// }
// var detailsService = new google.maps.places.PlacesService($('#google-places').get(0));
// detailsService.getDetails(placeDetailsRequest, placeDetailsCallback);
//
// function placeDetailsCallback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//    debugger
//   }
// }

// PlacesAdapter.prototype.getDetails = function(){
//   service = new google.maps.places.PlacesService(map);
//   service.getDetails(request, callback);
// }

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
