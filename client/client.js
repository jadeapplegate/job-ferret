Jobs = new Meteor.Collection("jobs");

UI._allowJavascriptUrls();

// Meteor.subscribe('Jobs', subsargs) //here is where you can pass arguments
Meteor.subscribe('Jobs');

UI.registerHelper('format_position_requirements', function(job) {
  if(job)
  {
    var requirements = [];
    if(job.resume) { requirements.push('Resume'); }
    if(job.cover_letter) { requirements.push('Cover Letter'); }
    if(job.portfolio) { requirements.push('Portfolio'); }
    if(job.code_sample) { requirements.push('Code Sample'); }

    if(requirements.length < 1)
    {
      requirements.push("None");
    }
    return requirements.join(', ');
  }
});


Template.interestList.jobs = function () {
  return Jobs.find({pursuing: false});
};

Template.interestList.events({
  'click .delete' : function(event, template) {
    event.preventDefault();
    var jobId = $(event.target).attr('data-id');
    Jobs.remove({_id: jobId});
  },
  'click .pursue_job': function(event, template){
    event.preventDefault();
    var jobId = $(event.target).attr('data-id');
    var linkText = template.find("input[name=link]").value;
    var link = /http/.test(linkText) ? linkText : "http://" + linkText;

    var data = {
      link: link,
      //???same as below??? dom node/jquery object------- title: $(template.find("input[name=title]")).val(),
      title: template.find("input[name=title]").value,
      company: template.find("input[name=company]").value,
      contact_name: template.find("input[name=contact_name]").value,
      contact_email: template.find("input[name=contact_email]").value,
      contact_phone: template.find("input[name=contact_phone]").value,
      min_salary: template.find("input[name=min_salary]").value,
      max_salary: template.find("input[name=max_salary]").value,
      resume: $(template.find("input[name=resume]")).is(':checked'),
      cover_letter: $(template.find("input[name=cover_letter]")).is(':checked'),
      portfolio: $(template.find("input[name=portfolio]")).is(':checked'),
      code_sample: $(template.find("input[name=code_sample]")).is(':checked'),
      pursuing: true,
    };
    console.info(data); 
    Jobs.update({_id: jobId}, {$set: data});
    // ("input[name=title]").value,
    // ("input[name=company]").value,
    // ("input[name=contact_name]").value,
    // ("input[name=contact_email]").value,
    // ("input[name=contact_phone]").value,
    //   min_salary: template.find("input[name=min_salary]").value,
    //   max_salary: template.find("input[name=max_salary]").value,
    //   resume: $(template.find("input[name=resume]")).is(':checked'),
    //   cover_letter: $(template.find("input[name=cover_letter]")).is(':checked'),
    //   portfolio: $(template.find("input[name=portfolio]")).is(':checked'),
    //   code_sample: $(template.find("input[name=code_sample]")).is(':checked'),

  },
  'click .min_salary_dropdown li a' : function(event, template) {
    event.preventDefault();
    var minSalaryDropdown = $(event.target).text();
    $('#min_salary').val(minSalaryDropdown);
  },
  'click .max_salary_dropdown li a' : function(event, template) {
    event.preventDefault();
    var maxSalaryDropdown = $(event.target).text();
    $('#max_salary').val(maxSalaryDropdown);
  }
});

Template.addJobModal.events({
  'click #addJob' : function(event, template) {
    event.preventDefault();
    var linkText = template.find("input[name=link]").value;
    var link = /http/.test(linkText) ? linkText : "http://" + linkText;
    var data = {
      link: link,
      userId: Meteor.userId(),
      title: template.find("input[name=title]").value,
      company: template.find("input[name=company]").value,
      pursuing: false
    };
    Jobs.insert(data);
    $('#addJobModal input[name=title]').val('');
    $('#addJobModal input[name=company]').val('');
    $('#addJobModal input[name=link]').val('');
  }
})

Template.pursuingList.jobs = function () {
  return Jobs.find({pursuing: true});
};

Template.pursuingList.events({
  'click .delete' : function(event, template) {
    event.preventDefault();
    var jobId = $(event.target).attr('data-id');
    Jobs.remove({_id: jobId});
  },
  'click .details' : function(event, template) {
    event.preventDefault();
    var jobId = $(event.target).attr('data-id');
    $('#details-'+jobId).removeClass('hidden').show();
    $('#dashboard').hide();
    $('.back').removeClass('hidden').show();
    console.log("update clicked");
  }
});

Template.navbar.events({
  'click .brand' : function(event, template){
    event.preventDefault();
    $('#dashboard').show();
    $('.job-details').hide();
    $('.back').hide();
  },

// when signout in navbar clicked, rely on functionality from accounts-ui for signout
  'click #navbar-sign-out': function() {                                                                          
    Meteor.logout(function () {                                                                               
    });      
  }                                                                                                                    
});

Template.jobOverview.jobs = function(){
  var jobs = Jobs.find({pursuing:true}).fetch();
  return jobs;
}


Template.jobOverview.events({
  'click .back' : function(event, template){
    event.preventDefault();
    $('#dashboard').show();
    $('.job-details').hide();
    $('.back').hide();
  },
  'click .add_note' : function(event, template){
    event.preventDefault();
    var jobId = $(event.target).attr('data-id');
    var data = {
      note: template.find("#details-" + jobId + " input[name=note]").value,
    };
    Jobs.update({_id: jobId}, {$push: data})
  }, 
  'click .add_next_step' : function(event, template){
    event.preventDefault();
    var jobId = $(event.target).attr('data-id');
    
    var text = template.find("#details-" + jobId + " input[name=next_step]").value;
    
    var data = {
      nextStep: {text: text}
    };
    Jobs.update({_id: jobId}, {$push: data})
  }
});
