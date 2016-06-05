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

$(document).ready(function(){
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

// this function is called on line 19 of dice_adapter.js
function addFeedItemSaveButtonListener(){
  $(":button.save").click(function(e){
    e.preventDefault();
    e.stopPropagation();

    if ( $("#saved-jobs-list").length ) {

      var jobInfoDiv = $(this)
      var job = new Job(jobInfoDiv);
      job.populateFields();
      job.save();

    } else {
      alert("You must be signed in to do that!");
    }

  })
}
