function Job(infoDiv){
  this.infoDiv = infoDiv;
}

Job.prototype.save = function(){
  var data = this.dataObj();
  $.ajax({
    type: 'POST',
    url: '/jobs',
    data: data,
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
      "original_search_term": this.findOriginalSearchTerm()
    }
  }
}

Job.prototype.findPosition = function(){
  var positionElement = this.infoDiv.siblings('.job-title');
  return $(positionElement).children('a').text();
}

Job.prototype.findUrl = function(){
  return this.infoDiv.siblings('.job-title').children('a').attr('href');
}

Job.prototype.findCompany = function(){
  var companyElement = this.infoDiv.siblings('.job-company');
  return $(companyElement).text();
}

Job.prototype.findLocation = function(){
  var locationElement = this.infoDiv.siblings('.job-location');
  return $(locationElement).text();
}

Job.prototype.findDatePosted = function(){
  var datePostedElement = this.infoDiv.siblings('.job-date-posted');
  return $(datePostedElement).text().slice(8);
}

Job.prototype.findOriginalSearchTerm = function(){
  return $('#skill').val();
}
