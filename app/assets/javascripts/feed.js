
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

    $("#dice-feed").empty();
    adapter.getData();
  })
}

// function addFeedItemSaveButtonListener()
//   $("the-button-id").click(function(e){
//     e.preventDefault();
//     e.stopPropagation();

//     // get all the Job info

//     // make a new Job object with that info

//     // post it to our application
//   })
