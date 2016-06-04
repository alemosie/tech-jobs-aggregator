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
  $.getJSON(this.searchUrl, this.appendFeedItems)
  .done(function(response){
    if (response.nextUrl !== undefined) {
      this.searchUrl = "http://service.dice.com/" + response.nextUrl;
      this.getData();
    }
  }, this)
}

DiceAdapter.prototype.appendFeedItems = function(response) {
  response.resultItemList.forEach(function(job){
    $('#dice-feed').append( new FeedItem(job).formatLi() )
  })
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-")
}
