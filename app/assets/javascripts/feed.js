
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

// this function is called on line 19 of dice_adapter.js
function addFeedItemSaveButtonListener(){
  $(":button.save").click(function(e){
    e.preventDefault();
    e.stopPropagation();

    var jobInfoDiv = $(this)
    var job = new Job(jobInfoDiv);

    job.populateFields();
    job.save();
  })
}
