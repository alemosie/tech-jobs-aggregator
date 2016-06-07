$(document).ready(function(){
  addFormSubmitListener();
  preventForgetButtonPageRefresh();
})


function addFormSubmitListener(){
  $('#job-search').submit(renderJobData);
}

// this function is called in DiceAdapter.getData
function addFeedItemSaveButtonListener(){
  $(":button.save").click(saveAndRenderJob);
}

function preventForgetButtonPageRefresh(){
  $(":button.forget").click(function(e){
    e.preventDefault();
  })
}

function getTransMode(transitInput){
  if (transitInput === "transit"){
    return google.maps.TravelMode.TRANSIT
  } else if (transitInput === "driving") {
    return google.maps.TravelMode.DRIVING
  }
}

function renderJobData(e){
  e.preventDefault();
  e.stopPropagation();

  var skill = $("#skill").val();
  var zip = $("#zip").val();
  var trans = $("#mode-of-transit").val();
  var transMode = getTransMode(trans);
  var adapter = new DiceAdapter(skill, zip, transMode);

  $("#dice-feed").empty();
  adapter.getData();
}


function saveAndRenderJob(e){
  e.preventDefault();
  e.stopPropagation();

  if ( $("#saved-jobs-list").length ) {
    $(this).addClass("clicked");
    var jobInfoDiv = $(this).parent().siblings(".job")
    new Job(jobInfoDiv).save();
  } else {
    alert("You must be signed in to do that!");
  }
}
