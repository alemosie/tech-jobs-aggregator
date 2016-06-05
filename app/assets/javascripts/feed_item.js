function FeedItem(json){
  // distance-from-home
  // summary
  // salary
  // skill-button

  // from AJAX request
  this.position = json.jobTitle;
  this.url = json.detailUrl;
  this.company = json.company;
  this.datePosted = json.date;
  this.location = json.location;
}

// this often chops off text that we want to keep
FeedItem.prototype.cleanPositionTitle = function(){
  return this.position.split(/-|\(/)[0].trim()
}

FeedItem.prototype.formatPosition = function(){
  return '<h3><a target="_blank" href="' + this.url + '">' + this.cleanPositionTitle() + "</a></h3>"
}

FeedItem.prototype.formatCompany = function(){
  return '<h4>' + this.company + "</h4>"
}

FeedItem.prototype.formatLocation = function(){
}

FeedItem.prototype.formatDiv = function(){
  return "<div>" + 
         this.formatPosition() +
         this.formatCompany() +
         this.location +
         "</div>"
}
