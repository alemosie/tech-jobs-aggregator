function FeedItem(json){
  this.position   = json.jobTitle;
  this.url        = json.detailUrl;
  this.company    = json.company;
  this.datePosted = json.date;
  this.location   = json.location;
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
  return '<i class="link-spacer"></i> <i class="fa fa-bookmark"></i> Posted on ' + this.datePosted + '</p>';
}

FeedItem.prototype.formatSaveButton = function(){
  return '<button class="save">Save</button>';
}

FeedItem.prototype.getLocationOfCompany = function(){
  var loc = new PlacesAdapter(this.company).getPlaceID();
  return loc;
}

FeedItem.prototype.formatDiv = function(){
  // this.location = this.getLocationOfCompany();
  return '<article class="post"><div class="job post-preview col-xs-10 no-gutter">' +
         this.formatPosition() +
         this.formatCompany() +
         this.formatLocation() +
         this.formatDatePosted() +
         this.formatSaveButton() +
         '</div>' +
         '</article>' +
         '<br>'
}

// <p class="meta">
//     <a href="author.html">Sarah Smith</a> in <a href="category.html">Adventure</a> <i class="link-spacer"></i> <i class="fa fa-bookmark"></i> 5 minute read
// </p>
// </div>
//
// <div class=" col-xs-2 no-gutter">
//     <img src="img/profile-4.jpg" class="user-icon user-1" alt="user-image">
// </div>
// </article>
