function Job(infoDiv){
  this.infoDiv = infoDiv;
}

Job.prototype.save = function(){
  $.ajax({
    type: 'POST',
    url: '/jobs',
    data: this.dataObj(),
    dataType: 'script'
  })
}

Job.prototype.dataObj = function(){
  return { "job":
    {
      "position": this.findPosition(),
      "url": this.findUrl(),
      "company": this.findCompany(),
      "location": this.findLocation(),
      "date_posted": this.findDatePosted(),
      "distance": this.findDistance(),
      "original_search_term": this.findOriginalSearchTerm()
    }
  }
}

Job.prototype.findPosition = function(){
  return this.infoDiv
           .children(".job-title")
           .children("a")
           .text();
}

Job.prototype.findUrl = function(){
  return this.infoDiv
           .children(".job-title")
           .children("a")
           .attr("href");
}

Job.prototype.findCompany = function(){
  return this.infoDiv
           .children(".job-company")
           .text();
}

Job.prototype.findLocation = function(){
  return this.infoDiv
           .children(".job-location")
           .text()
           .split("Posted on ")[0]
           .trim();
}

Job.prototype.findDatePosted = function(){
  return this.infoDiv
           .children(".job-location")
           .text()
           .split("Posted on ")[1];
}

Job.prototype.findDistance = function(){
  return this.infoDiv.children(".job-distance").text()
}

Job.prototype.findOriginalSearchTerm = function(){
  return $('#skill').val();
}
