$(document).ready(function(){
  addFormSubmitListener();
  preventForgetButtonPageRefresh();
})


function addFormSubmitListener(){
  $('#job-search').submit(renderJobData);
}


function preventForgetButtonPageRefresh(){
  $(":button.forget").click(function(e){
    e.preventDefault();
  })
}

function updateAgeInput(val) {
  document.getElementById('age').value=val;
}

function getTransMode(transitInput){
  if (transitInput === "Public transportation"){
    return google.maps.TravelMode.TRANSIT
  } else if (transitInput === "Driving") {
    return google.maps.TravelMode.DRIVING
  } else {
    return google.maps.TravelMode.DRIVING
  }
}

function renderJobData(e){
  e.preventDefault();
  e.stopPropagation();

  var skill = $("#skill").val()
  var zip = $("#zip").val()
  var age = $("#age").val();
  var trans = $("#mode-of-transit").val();
  var transMode = getTransMode(trans);

  var adapter = new DiceAdapter(skill, zip, age, transMode);

  $("#dice-feed").empty();
  adapter.getData();
}


// this function is called in DiceAdapter.getData
// where to save the job from the Dice results
function addFeedItemSaveButtonListener(){
  $(":button.save").click(saveAndRenderJob);
}

function saveAndRenderJob(e){
  e.preventDefault();
  e.stopPropagation();

  if ( $("#saved-jobs-list").length ) {

    var jobInfoDiv, newJob;
    jobInfoDiv = $(this).parent().siblings(".job")
    newJob = new Job(jobInfoDiv)
    newJob.save();

  } else {
    $(".select-categories").click();
  }
}
