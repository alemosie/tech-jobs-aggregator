function DiceAdapter(skill, zip) {
  this.skill = skill;
  this.zip   = zip;
  this.skillQuery = "skill=" + this.slugify(skill);
  this.zipQuery   = "city=" + this.zip;
  this.ageQuery   = "age=30";
  this.baseUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?";
  this.searchUrl = this.baseUrl + this.skillQuery + "&" + this.zipQuery + "&sort=1&" + this.ageQuery;
  this.jobsCount = 0;
}

DiceAdapter.prototype.getData = function() {
  var _this = this;
  $.getJSON(this.searchUrl, this.appendFeedItems)
  .done(function(response){
    _this.jobsCount = response.count
    debugger
    if (response.nextUrl !== undefined) {
      _this.searchUrl = "http://service.dice.com/" + response.nextUrl;
      _this.getData();
    } else {
      addFeedItemSaveButtonListener();
    }
  })
}

DiceAdapter.prototype.appendFeedItems = function(response) {
  var jobsCount = this.jobsCount;
  response.resultItemList.forEach(function(job){
    $('#dice-feed').append(new FeedItem(job, jobsCount).formatDiv() )
  })
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-")
}
