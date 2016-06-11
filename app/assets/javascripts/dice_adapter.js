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
      var sections = splitItemsForPlacesQuery(allJobs);
      var places = [];
      var i = 0;
      while (i < sections.length){
      	callPlacesForSections(sections[i], sections[i].length, places, i, response.count)
      	i++;
      }
    }
  })
}

// create pages of 10 items
var allJobs = [];

function splitItemsForPlacesQuery(allJobs){
  var sections = [];
  while (allJobs.length > 0){
    sections.push(allJobs.splice(0,10));
  }
  return sections;
}

function callPlacesForSections(section, sectionLength, places, i, responseCount){
  section.forEach(function(feedItem){
    setTimeout(function() {
      PlacesAdapter(feedItem, places, sectionLength, responseCount);
    }, i*3000);
  });
}


DiceAdapter.prototype.appendFeedItems = function(response) {
  var _this = this;
  if (response.count > 0) {
    $('#dice-feed').append("<h4><i>Found " + response.count + " results</i></h4><br>")
    // var places = []; to store feed items with place ids outside of calls
    var feedIndex = 0
    response.resultItemList.forEach(function(job, i){
      var item = new FeedItem(job, feedIndex, _this.params);
      allJobs.push(item);
      $('#dice-feed').append(item.formatDiv())
      feedIndex++;
    })
  } else {
    $('#dice-feed').append("<h4><i>No results found</i></h4>")
  }
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-");
}
