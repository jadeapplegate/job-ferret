Router.map(function () {
  this.route("apiRoute", {path: "/api/",
    where: "server",
    action: function(){
      console.log('################################################');
      console.log(this.request.method);
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

      }else if (this.request.method == 'POST') {
        // INSERT
        Jobs.insert({title: this.request.body.title, company: this.request.body.company, link: this.request.body.link, pursuing: false});
        // this.response.end(JSON.stringify(
        //   Posts.insert(this.request.body)
        // ));
      }
    }
  });
});