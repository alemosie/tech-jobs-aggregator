function DiceAdapter(skill, zip, trans) {
  this.skill = skill;
  this.zip   = zip;
  this.transit = trans;
  this.skillQuery = "skill=" + this.slugify(skill);
  this.zipQuery   = "city=" + this.zip;
  this.ageQuery   = "age=30";
  this.baseUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?";
  this.searchUrl = this.baseUrl + this.skillQuery + "&" + this.zipQuery + "&sort=1&" + this.ageQuery;
  // this.feedItems = []
}


DiceAdapter.prototype.getData = function() {
  var _this = this;
  $.getJSON(this.searchUrl, this.formatListData.bind(this)).done(function(response){
    // done - once the 50 have executed and rendered; get more data if necessary
      if (response.nextUrl !== undefined) {
        _this.searchUrl = "http://service.dice.com/" + response.nextUrl;
        _this.getData();
      } else {
        $('#dice-feed').append("<h4><i>Found " + response.count + " results</i></h4><br>")
          addFeedItemSaveButtonListener();
        // execute distance matrix
      }
  })
}

DiceAdapter.prototype.formatListData = function(response){
  var feedItems = []
  var feedItemsToAppend = []
  var _this = this;

  // make new feed items, push into feed items array
  // var feedItems = response.resultItemList.map(function(job) {
  //   return new FeedItem(job);
  // });

  // getPlaceIdForFeedItem(feedItem, feedItems, response.count, _this.zip);
  if (response.resultItemList !== undefined) {
    response.resultItemList.forEach(function(job) {
      var feedItem = new FeedItem(job);
      getPlaceIdForFeedItem(feedItem, feedItems, response.count, _this.zip, _this.transit);
    });
  } else {
    $('#dice-feed').append("<h4><i>Found 0 results</i></h4><br>")
  }
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-");
}
