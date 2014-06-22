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

  Template.interestList.jobs = function () {
    return Jobs.find({pursuing: false});
  };
 
  Template.interestList.events({
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

  Template.addJobModal.events({
    'click #addJob' : function(event, template) {
      event.preventDefault();
      var linkText = template.find("input[name=link]").value;
      var link = /http/.test(linkText) ? linkText : "http://" + linkText;
      var data = {
        link: link,
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

}



if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup

  });
}
  