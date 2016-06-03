function slugify(value){
  return value.toLowerCase().split(" ").join("-")
}

function getData(url){
  if (url !== "http://service.dice.com/undefined") {
    $.getJSON(url, appendFeedItems).done(function(data){
      getData("http://service.dice.com/" + data.nextUrl) // recursively fetch Dice data that meets criteria
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

    getData(url)
    // $.getJSON(url, function(response){
    //   var count = response.count
    //   var goOn = response.nextUrl
    //   var jobs = response.resultItemList
    //   jobs.forEach(function(job){
    //     item = new FeedItem(job).formatLi()
    //     $('#dice-feed').append(item)
    //   })
    // })
    //
    // $.ajax({
    //   url: url,
    //   type: 'get',
    //   dataType: 'json',
    //   success: function(){
    //     debugger
    //   }
    //   error: function(){
    //
    //   }
    // })
  })
})
