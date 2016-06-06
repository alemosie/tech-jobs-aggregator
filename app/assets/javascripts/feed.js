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

    $("#dice-feed").empty();
    adapter.getData();
  })
}

// this function is called in DiceAdapter.getData(),
// defined in dice_adapter.js
function addFeedItemSaveButtonListener(){
  $(":button.save").click(function(e){
    e.preventDefault();
    e.stopPropagation();

    // change this to check for cookie in browser?
    if ( $("#saved-jobs-list").length ) {

      var jobInfoDiv = $(this)
      new Job(jobInfoDiv).save();

    } else {
      alert("You must be signed in to do that!");
    }

  })
}
