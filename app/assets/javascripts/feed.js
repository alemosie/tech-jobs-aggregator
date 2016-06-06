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


function renderJobData(e){
  e.preventDefault();
  e.stopPropagation();

  var skill = $("#skill").val()
  var zip = $("#zip").val()
  var adapter = new DiceAdapter(skill, zip);

  $("#dice-feed").empty();
  adapter.getData();
}

function saveAndRenderJob(e){
  e.preventDefault();
  e.stopPropagation();

  if ( $("#saved-jobs-list").length ) {
    var jobInfoDiv = $(this)
    new Job(jobInfoDiv).save();
  } else {
    alert("You must be signed in to do that!");
  }
}
