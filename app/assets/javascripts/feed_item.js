function FeedItem(json){
  this.position   = json.jobTitle;
  this.url        = json.detailUrl;
  this.company    = json.company;
  this.datePosted = json.date;
  this.location   = json.location;
  this.placeID    = "";
}

// this often chops off text that we want to keep
FeedItem.prototype.cleanPositionTitle = function(){
  return this.position
}

FeedItem.prototype.formatPosition = function(){
  return '<h2 class="job-title"><a target="_blank" href="' + this.url + '">' + this.cleanPositionTitle() + "</a></h2>";
}

FeedItem.prototype.formatCompany = function(){
  return '<h4 class="job-company">' + this.company + '</h4>';
}

FeedItem.prototype.formatLocation = function(){
  return '<p class="meta job-location">' + this.location;
}

FeedItem.prototype.formatDatePosted = function(){
  var dates = this.datePosted.split("-")
  var monthConversion = { "01": "January", "02": "Feburary", "03": "March", "04": "April", "05": "May", "06": "June", "07": "July", "08": "August", "09": "September", "10": "October", "11": "November", "12": "December" }
  var month = monthConversion[dates[1]]
  var formattedDate = month + " " + dates[2]
  return '<i class="link-spacer"></i> <i class="fa fa-bookmark"></i> Posted on ' + formattedDate + '</p>';
}

FeedItem.prototype.formatSaveButton = function(){
  return '<div class=" col-xs-2 no-gutter"><button class="save btn btn-primary btn-circle">+</button></div>'
}

function getPlaceIdForFeedItem(feedItem, feedItems, totalCount, originalZip) {
  var textSearchRequest = {
    query: feedItem.company + " near " + feedItem.location
  }

  var service = new google.maps.places.PlacesService($('#google-places').get(0));
  service.textSearch(textSearchRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      feedItem.placeID = results[0].place_id;
      console.log(feedItem.company + ": " + feedItem.placeID)
    } else {
      console.log(feedItem.company + "-- request failed " + status)
    }

    feedItems.push(feedItem);
    if (feedItems.length == totalCount) {
      var places = [];
      feedItems.forEach(function(item){
        places.push({placeId: item.placeID});
      })
      // If we got here, we just processed the last feedItem
      // So now, for each feedItem in feedItems, do the matrix.
      var service = new google.maps.DistanceMatrixService();
      debugger
      service.getDistanceMatrix(
        {
          origins: [originalZip],
          destinations: places,
          travelMode: google.maps.TravelMode.TRANSIT,
        }, callback);
    }
  });
}

function callback(response, status) {
   if (status == google.maps.DistanceMatrixStatus.OK) {
     debugger
   } else {
     console.log(status) + "sadness"
   }
}


FeedItem.prototype.formatDiv = function(){
  // this.location = this.getLocationOfCompany();
  return '<article class="post"><div class="job post-preview col-xs-10 no-gutter">' +
         this.formatPosition() +
         this.formatCompany() +
         this.formatLocation() +
         this.formatDatePosted() +
         '</div>' +
         this.formatSaveButton() +
         '<div id="map">Map here!</div>' +
         '</article>' +
         '<br>'
}
