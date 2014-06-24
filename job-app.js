Jobs = new Meteor.Collection("jobs");

// Jobs.remove({});
// Jobs.insert({title: 'engineer', company: 'twitter', link: 'http://twitter.com/jobs', pursuing:true, min_salary: "$80,000"});
// Jobs.insert({title: 'engineer', company: 'twitter', link: 'http://twitter.com/jobs', pursuing:false, min_salary: "$80,000"});

if (Meteor.isClient) {

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
      Jobs.update({_id: jobId}, {$set: data})
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
        //???same as below??? dom node/jquery object------- title: $(template.find("input[name=title]")).val(),
        title: template.find("input[name=title]").value,
        company: template.find("input[name=company]").value,
        pursuing: false
      };
      Jobs.insert(data);
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
    'click .update' : function(event, template) {
      event.preventDefault();
      var jobId = $(event.target).attr('data-id');
      console.log("update clicked");
    }
  });

  Template.jobOverview.jobs = function(){
    var jobs = Jobs.find({pursuing:true}).fetch();
    return jobs;
  }

  Template.jobOverview.events({
    'click .add_note' : function(event, template){
      event.preventDefault();
      var jobId = $(event.target).attr('data-id');
      var data = {
        note: template.find("input[name=note]").value,
      };
      console.log(data);
      console.log(jobId);
      Jobs.update({_id: jobId}, {$push: data})
    }, 
    'click .add_next_step' : function(event, template){
      event.preventDefault();
      var jobId = $(event.target).attr('data-id');
      
      var text = template.find("input[name=next_step]").value;
      
      var data = {
        nextStep: {text: text}
      };
      console.log(data);
      console.log(jobId);
      Jobs.update({_id: jobId}, {$push: data})
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup

  });
}
  