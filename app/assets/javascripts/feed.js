
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
