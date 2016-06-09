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
  switch(transitInput) {
    case "Public transportation":
      return google.maps.TravelMode.TRANSIT;
      break;
    case "Driving":
      return google.maps.TravelMode.DRIVING
      break;
    case "Bicycling":
      return google.maps.TravelMode.BICYCLING;
      break;
    case "Walking":
      return google.maps.TravelMode.WALKING;
      break;
    default:
      return google.maps.TravelMode.DRIVING;
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
