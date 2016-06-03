function slugify(value){
  return value.toLowerCase().split(" ").join("-")
}

$(function(){
  $(':submit').click(function(){
    var skill = slugify($("#skill").val())
    var zip = $("#zip").val()
    var url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?skill=" + skill + "&city=" + zip + "&sort=1"

    $.getJSON("http://service.dice.com/api/rest/jobsearch/v1/simple.json?skill=ruby&city=10023&sort=1", function(response){
      debugger
    })

    // $.ajax({
    //   url: url,
    //   type: 'get',
    //   dataType: 'json',
    //   success: function(){
    //     debugger
    //   }
    // })
  })
})
