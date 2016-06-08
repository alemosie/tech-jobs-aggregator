function FeedItem(json){
  this.position   = json.jobTitle;
  this.url        = json.detailUrl;
  this.company    = json.company;
  this.datePosted = json.date;
  this.location   = json.location;
  this.placeID    = "";
  this.googleName = "";
  this.distance   = "";
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
  return '<i class="link-spacer"></i> <i class="fa fa-bookmark"></i> Posted on ' + formattedDate;
}

FeedItem.prototype.formatSaveButton = function(){
  return '<div class=" col-xs-2 no-gutter"><button class="save btn btn-primary btn-circle">+</button></div>'
}

FeedItem.prototype.getDistance = function(diceResponse, queryItems){
  new PlacesAdapter(this, diceResponse, queryItems)
  // return loc;
}

FeedItem.prototype.formatDiv = function(){
  // this.location = this.getLocationOfCompany();
  return '<article class="post">' +
         '<div class="job post-preview col-xs-10 no-gutter">' +
         this.formatPosition() +
         this.formatCompany() +
         this.formatLocation() +
         this.formatDatePosted() +
         '</div>' +
         this.formatSaveButton() +
         '</article>' +
         '<br>'
}
