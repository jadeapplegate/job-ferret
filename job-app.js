Jobs = new Meteor.Collection("jobs");
// Jobs.remove({});


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
        resume: template.find("input[name=resume]").value,
        cover_letter: template.find("input[name=cover_letter]").value,
        portfolio: template.find("input[name=portfolio]").value,
        code_sample: template.find("input[name=code_sample]").value,
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

  Template.jobOverview.job = function(){
    var jobItem = Jobs.find({}, {limit: 1}).fetch()[0];
    return jobItem;
 
    Template.jobOverview.events({
    'click .add_note' : function(event, template){
      event.preventDefault();
      var jobId = $(event.target).attr('data-id');
      var data = {
        note: template.find("input[name=note]").value,
      };
      console.log(data);
      Jobs.insert(data)
      } 
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup

  });
}
  