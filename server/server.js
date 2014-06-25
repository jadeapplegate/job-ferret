Router.map(function () {
  this.route("apiRoute", {path: "/api/",
    where: "server",
    action: function(){
      console.log('################################################');
      console.log(this.request.method);
      console.log(this.request.headers);
      console.log('this.params.id: ' + this.params.id);

      console.log('------------------------------');
      console.log(this.request.body);
      console.log('------------------------------');

      this.response.statusCode = 200;
      this.response.setHeader("Content-Type", "application/json");
      this.response.setHeader("Access-Control-Allow-Origin", "*");
      this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      if (this.request.method == 'GET') {
        // LIST
        Statistics.update({_id: "configuration"},{$inc:{
          total_count: 1,
          list_count: 1
        }});
        this.response.end(JSON.stringify(
          Posts.find().fetch()
        ));
      }else if (this.request.method == 'POST') {
        // INSERT
        Statistics.update({_id: "configuration"},{$inc:{
          total_count: 1,
          insert_count: 1
        }});
        this.response.end(JSON.stringify(
          Posts.insert(this.request.body)
        ));
      }else if (this.request.method == 'OPTIONS') {
        // OPTIONS
        this.response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
        this.response.end("OPTIONS Response");
      }
    }
  });
});