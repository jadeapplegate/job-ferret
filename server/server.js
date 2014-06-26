Jobs = new Meteor.Collection("jobs");
Meteor.publish('Jobs', function(subsargs) {
  //subsargs are args passed in the next section
  return Jobs.find();
  // // //or 

  // return Jobs.find({}, {userId});
})

Router.map(function () {
  this.route("apiRoute", {path: "/api/",
    where: "server",
    action: function(){
      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      if (this.request.method == 'GET') {
        // LIST

      }else if (this.request.method == 'POST') {
        // INSERT
   
      var linkText = this.request.body.link;
      var link = /http/.test(linkText) ? linkText : "http://" + linkText;

        Jobs.insert({title: this.request.body.title, company: this.request.body.company, link: link, pursuing: false, userId: this.request.body.userId});
        // this.response.end(JSON.stringify(
        //   Posts.insert(this.request.body)
        // ));
      }
    }
  });
});

Jobs.allow({ 
  insert:function(userId, document) {  
    // if (userId) {  //e.g check if admin
    //   return true;
    // }
    // return false;
    return true;
  },
  update: function(userId,doc,fieldNames,modifier) {
    // if (fieldNames.length === 1 && fieldNames[0] === "job") { //they are only updating the post
    //   return true;
    // }
    return true;
  },
  remove: function(userId, doc) {
    if (doc.userId === userId) {  //if the creator is trying to remove it
      return true;
    }
    return false;
  }
});