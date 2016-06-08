function DiceAdapter(skill, zip, age, trans) {
  this.params = {} // gathering query items
  this.params["skill"] = skill;
  this.params["zip"] = zip;
  this.params["transit"] = trans;
  this.params["age"] = age;

  this.skillQuery = "skill=" + this.slugify(skill);
  this.zipQuery   = "city=" + zip;
  this.ageQuery   = "age=" + age;
  this.baseUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?";
  this.searchUrl = this.baseUrl + this.skillQuery + "&" + this.zipQuery + "&sort=1&" + this.ageQuery;
}

DiceAdapter.prototype.getData = function() {
  var _this = this;
  $.getJSON(this.searchUrl, this.appendFeedItems.bind(this))
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
  var _this = this;
  if (response.count > 0) {
    $('#dice-feed').append("<h4><i>Found " + response.count + " results</i></h4><br>")
    var itemsWithPlaceID = []; // to store feed items with place ids outside of calls
    var i = 0
    response.resultItemList.forEach(function(job){
      var item = new FeedItem(job, i);
      i++;
      new PlacesAdapter(item).findPlaceIDs(item, itemsWithPlaceID, response, _this.params)
      $('#dice-feed').append(item.formatDiv())
    })
  } else {
    $('#dice-feed').append("<h4><i>No results found</i></h4>")
  }
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-");
}
