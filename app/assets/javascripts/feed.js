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

  $(':submit').click(function(e){
    e.preventDefault();
    e.stopPropagation();

    var skill = slugify($("#skill").val())
    var zip = $("#zip").val()
    var url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?skill=" + skill + "&city=" + zip + "&sort=1&age=30"

    getJobsData(url)
  })
})
