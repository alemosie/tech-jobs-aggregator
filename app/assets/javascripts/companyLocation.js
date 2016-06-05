var placeIDs = [];

function CompanyLocation(term){
  var nyc = new google.maps.LatLng(40.730610,	-73.935242);

  this.placeIDRequest = {
    location: nyc,
    radius: '2000',
    query: term
  };
}

CompanyLocation.prototype.getPlaceID = function(){
  var service = new google.maps.places.PlacesService($('#google-places').get(0));
  service.textSearch(this.placeIDRequest, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach(function(result){
      placeIDs.push({ placeId: result.place_id })
    });
  }
  debugger
}

CompanyLocation.prototype.getPlaceDetails = function(){
  this.getPlaceID();
  placeIDs.forEach(function(placeID){
    var detailsService = new google.maps.places.PlacesService($('#google-places').get(0));
    detailsService.getDetails(request, placeDetailsCallback);
  });
}
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

// CompanyLocation.prototype.getDetails = function(){
//   service = new google.maps.places.PlacesService(map);
//   service.getDetails(request, callback);
// }

// CompanyLocation.prototype.getLocationData = function(){
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
