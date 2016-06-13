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

  this.allJobs = [];
}

DiceAdapter.prototype.getData = function() {
  var _this = this;
  $.getJSON(this.searchUrl, this.appendFeedItems.bind(this))
  .done(function(response){ // hit when 50 items are successfully process
    if (response.nextUrl !== undefined) {
      _this.searchUrl = "http://service.dice.com/" + response.nextUrl;
      _this.getData();
    } else {
      $('#results-count').append("<h4><i>Found " + response.count + " results</i></h4><br>")
      addFeedItemSaveButtonListener();

      var jobs = _this.allJobs;
      var sections = _this.sectionizeResults(jobs);

      // iterate through sections
      sections.forEach(function(section){
        setTimeout(function() {
          var sectionPlaceIds = [];
          // create an array of promises of placeId call for each section to execute once completed
          var sectionPromises = section.map(function(job){
            return new Promise(function(resolve, reject){
              // the placeId call, where we will resolve the promises
              new PlacesAdapter(job, sectionPlaceIds, section.length, resolve)
            });
          });
          Promise.all(sectionPromises).then(function(){
            new DistanceMatrixAdapter(sectionPlaceIds, _this.params)
          });
        }, sections.indexOf(section)*2000);
      });
    }
  });
}



DiceAdapter.prototype.sectionizeResults = function(allJobs){
  var sections = [];
  while (allJobs.length > 0){
    sections.push(allJobs.splice(0,5)); // split into max-10 sections to avoid Places 5ps rate limit
  }
  return sections;
}


// this callback is hit for every 50 results we get back from Dice
DiceAdapter.prototype.appendFeedItems = function(response) {
  var _this = this;
  if (response.count > 0) {
    var jobs = response.resultItemList;
    jobs.forEach(function(job){
      var indexInJobsList = _this.allJobs.length; // anticipate position of newJob in allJobs
      var newJob = new FeedItem(job, indexInJobsList, _this.params);
      _this.allJobs.push(newJob);
      $('#dice-feed').append(newJob.formatDiv())
    });

  } else {
    $('#results-count').append("<h4><i>No results found</i></h4>")
  }
}

DiceAdapter.prototype.slugify = function(str) {
  return str.toLowerCase().split(" ").join("-");
}
