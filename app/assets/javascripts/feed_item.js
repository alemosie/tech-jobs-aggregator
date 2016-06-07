function FeedItem(json){
  this.position   = json.jobTitle;
  this.url        = json.detailUrl;
  this.company    = json.company;
  this.datePosted = json.date;
  this.location   = json.location;
  this.placeID    = "";
  this.googleCompanyName = "";
  this.distance   = "";
  FeedItem.all.push(this);
}

FeedItem.all = [];

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
  return '<i class="link-spacer"></i> <i class="fa fa-bookmark"></i> Posted on ' + formattedDate;
}

FeedItem.prototype.formatDistance = function(){
  '<i class="link-spacer"></i> <i class="fa fa-bookmark"></i>' + this.distance + ' away</p>';
}

FeedItem.prototype.formatSaveButton = function(){
  return '<div class=" col-xs-2 no-gutter"><button class="save btn btn-primary btn-circle">+</button></div>'
}

function getPlaceIdForFeedItem(feedItem, feedItems, totalCount, originalZip, transitMode) {
  var textSearchRequest = {
    query: feedItem.company + " near " + feedItem.location
  }

  var placesService = new google.maps.places.PlacesService($('#google-places').get(0));
  placesService.textSearch(textSearchRequest, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      feedItem.placeID = results[0].place_id;
      feedItem.googleCompanyName = results[0].name;
    }

    feedItems.push(feedItem);

    // over query limit -- need to test code below
    
    if (feedItems.length == totalCount) {
      var places = [];
      feedItems.forEach(function(item){
        if (item.placeID) {
          places.push({placeId: item.placeID});
        }
      })

      console.log(feedItems)
      console.log(places)

      if (places.length > 25) {
        var itemCount = places.length
        while (itemCount > 0) {
          var section = items.slice(0,25);
          section.forEach(function(job) {
            var distanceService = new google.maps.DistanceMatrixService();
            distanceService.getDistanceMatrix(
              {
                origins: [originalZip],
                destinations: section,
                travelMode: transitMode,
              }, callback.bind(feedItems))
          }); // slicing when there aren't 25 is still okay!
          itemCount =- section.length;
          for (var index in section) {
            places.splice(index, 1)
          }
        }
      } else {
        // processed the last feedItem, so launch distance query
        var distanceService = new google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix(
          {
            origins: [originalZip],
            destinations: places,
            travelMode: transitMode,
          }, callback.bind(feedItems))
      }
    }
  });
}

function callback(response, status) {
  this.forEach(function(item){
    if (status == google.maps.DistanceMatrixStatus.OK) {
      var addressesWithDuration = []
      for (var index in response.destinationAddresses){
        if (response.rows[0].elements[index].status !== "ZERO_RESULTS") {
          var destination = response.destinationAddresses[index]
          var duration = response.rows[0].elements[index].duration.text
          var destinationObject = {}
          var sanitizedDestination = destination.split(/ \d+/)[0].replace(/,/g, '')
          destinationObject[sanitizedDestination] = duration + " away"
          addressesWithDuration.push(destinationObject);
        } else {
          item.distance = "No route available"
        }
      }
      addressesWithDuration.forEach(function(destinationObject){
        if (Object.keys(destinationObject)[0] === item.googleCompanyName){
          item.distance = destinationObject[item.googleCompanyName];
        }
      })

      // append feed items to div
      $('#dice-feed').append(
        '<article class="post"><div class="job post-preview col-xs-10 no-gutter">' +
               item.formatPosition() +
               item.formatCompany() +
               item.formatLocation() +
               item.formatDatePosted() + "<br>" +
               item.distance +
               '</div>' +
               item.formatSaveButton() +
               '<div id="map"></div>' +
               '</article>' +
               '<br>'
      );
    }
  })
}


// FeedItem.prototype.formatDiv = function(){
//   // this.location = this.getLocationOfCompany();
//   return '<article class="post"><div class="job post-preview col-xs-10 no-gutter">' +
//          this.formatPosition() +
//          this.formatCompany() +
//          this.formatLocation() +
//          this.formatDatePosted() + " "
//          this.distance +
//          '</div>' +
//          this.formatSaveButton() +
//          '<div id="map">Map here!</div>' +
//          '</article>' +
//          '<br>'
// }
