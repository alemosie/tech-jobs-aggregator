function FeedItem(json){
  this.position   = json.jobTitle;
  this.url        = json.detailUrl;
  this.company    = json.company;
  this.datePosted = json.date;
  this.location   = json.location;
}

// this often chops off text that we want to keep
FeedItem.prototype.cleanPositionTitle = function(){
  return this.position.split(/-|\(/)[0].trim()
}

FeedItem.prototype.formatPosition = function(){
  return '<h3 class="job-title"><a target="_blank" href="' + this.url + '">' + this.cleanPositionTitle() + "</a></h3>";
}

FeedItem.prototype.formatCompany = function(){
  return '<h4 class="job-company">' + this.company + '</h4>';
}

FeedItem.prototype.formatLocation = function(){
  return '<p class="job-location">' + this.location + '</p>';
}

FeedItem.prototype.formatDatePosted = function(){
  return '<p class="job-date-posted">Posted: ' + this.datePosted + '</p>';
}

FeedItem.prototype.formatSaveButton = function(){
  return '<button class="save">Save</button>';
}

FeedItem.prototype.getLocationOfCompany = function(){
  var loc = new PlacesAdapter(this.company).getPlaceDetails();
  return loc;
}

FeedItem.prototype.formatDiv = function(){
  return '<div class="job">' +
         this.formatPosition() +
         this.formatCompany() +
         this.formatLocation() +
         this.formatDatePosted() +
         this.formatSaveButton() +
         '</div>' +
         '<br>'
}
