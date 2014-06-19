Jobs = new Meteor.Collection("jobs");

if (Meteor.isClient) {
  // Template.hello.greeting = function () {
  //   return "Welcome to job-app.";
  // };

  // Template.hello.events({
  //   'click input': function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined'){
  //       alert("You pressed the button");
  //     }
  //   }
  // });

  Template.jobsList.jobs = function () {
    return Jobs.find();
  };
 
  Template.jobsList.events({
    'click .delete' : function(event, template) {
      event.preventDefault();
      var jobId = $(event.target).attr('data-id');
      Jobs.remove({_id: jobId});
    },
    'click .pursue' : function(event, template) {
      event.preventDefault();
      var jobId = $(event.target).attr('data-id');
      Jobs.update({_id: jobId}, {$set: {pursuing: true}})
      console.log(Jobs.findOne({}))
    }
  });

  Template.addJob.events({
    'click #addJob' : function(event, template) {
      event.preventDefault();
      var data = {
        link: template.find("input[name=link]").value,
        title: template.find("input[name=title]").value,
        company: template.find("input[name=company]").value,
        pursuing: false
      };

      Jobs.insert(data);
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup

  });
}
  