function slugify(value){
  return value.toLowerCase().split(" ").join("-")
}

function getJobsData(url){
  if (url !== "http://service.dice.com/undefined") {
    $.getJSON(url, appendFeedItems).done(function(data){
      getJobsData("http://service.dice.com/" + data.nextUrl) // recursively fetch Dice data that meets criteria
    })
  }
}

function appendFeedItems(response) {
  var jobs = response.resultItemList
  jobs.forEach(function(job, index){
    var item = new FeedItem(job).formatLi()
    $('#dice-feed').append(item)
  })
}

$(function(){
  addFormSubmitListener();
})


function addFormSubmitListener() {
  $('#job-search').submit(function(e){
    e.preventDefault();
    e.stopPropagation();

    var skill = $("#skill").val()
    var zip = $("#zip").val()
    var adapter = new DiceAdapter(skill, zip);
    // getJobsData(url)
    $("#dice-feed").empty();
    adapter.getData();
  })
}
