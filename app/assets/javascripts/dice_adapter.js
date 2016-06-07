function DiceAdapter(skill, zip) {
  this.skill = skill;
  this.zip   = zip;
  this.skillQuery = "skill=" + this.slugify(skill);
  this.zipQuery   = "city=" + this.zip;
  this.ageQuery   = "age=30";
  this.baseUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?";
  this.searchUrl = this.baseUrl + this.skillQuery + "&" + this.zipQuery + "&sort=1&" + this.ageQuery;
}

DiceAdapter.prototype.getData = function() {
  var _this = this;
  $.getJSON(this.searchUrl, this.appendFeedItems)
  .done(function(response){
    if (response.nextUrl !== undefined) {

      _this.searchUrl = "http://service.dice.com/" + response.nextUrl;
      _this.getData();

    } else {

      addFeedItemSaveButtonListener();

    }
  })
}

DiceAdapter.prototype.appendFeedItems = function(response) {
  // 1. Make all the FeedItems, when you make a given feed item, make the call to
          // google places and get the place ID, assoc. it to the item. i.e.
          // one of the attrs of feed item is 'googlePlaceId'
  // 2. Now you have a collection of FeedItem objects,
         // 2a. iterate over the collection and collect their place IDs
         // 2b. iterate over the response and store the distance as an attr of the appropriate feed item
               // match response to feed item using index number of each in feed item collection vs. response collectio
  // 3. Then, as a result of the above, you should end up with a collection of FeedItem objects, each of which have
        // a googlePlaceID attribute AND a distanceFromOrigin attribute
  // 4. Then, append them to the page with the code below
  $('#dice-feed').append("<h4><i>Found " + response.count + " results</i></h4><br>")
  if (response.count > 0) {
    response.resultItemList.forEach(function(job){
      $('#dice-feed').append( new FeedItem(job).formatDiv() )
    })
  }
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-");
}
