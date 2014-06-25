(function(){
	// the minimum version of jQuery we want
	var v = "2.1.1";

	// check for jQuery. if it exists, verify it's not too old.
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	};


  var initMyBookmarklet = function() {
    // on click display modal which has add job form (three fields)
    // on save, send that information, along with user id---> ajax post
    // append to user's page
    
    // var html = 'hello';
    var html = '<style>#bookmarklet-modal-job-ferret{ z-index:10000;padding-bottom:65%;padding-top:35%;position:absolute; width:100%; top:0%; background-color:rgba(32,10,24,0.5);}#bookmarklet-modal-job-ferret-content{background-color:white; width:70%;margin-left:auto;margin-right:auto;padding:100px;}</style><div id="bookmarklet-modal-job-ferret"><div id="bookmarklet-modal-job-ferret-content"><p> Save this job to your jobs list</p><input id="bookmarklet-modal-job-ferret-company" type="text" placeholder="Company"/><input id="bookmarklet-modal-job-ferret-title" type="text" placeholder="Position Title"/><input id="bookmarklet-modal-job-ferret-link" type="text" placeholder="Link"/><button type="button" class="btn btn-default" id="bookmarklet-modal-job-ferret-cancel">Cancel</button><button id="bookmarklet-add-job" type="button" class="btn btn-primary">Save</button></div></div>';
    $("body").append(html);

    $('#bookmarklet-add-job').on('click', function(){
      sendData();
      $('#bookmarklet-modal-job-ferret').remove(); //should really put this in the function on line 38 as a callback rather than here
    });
    var sendData = function() {
      //http://whatever.meteor.com/api/
      $.post( "http://final-project-job-app.meteor.com/api/", {title: $("#bookmarklet-modal-job-ferret-title").val(), company: $("#bookmarklet-modal-job-ferret-company").val(), link: $("#bookmarklet-modal-job-ferret-link").val(), userId: $('body').attr('data-job-ferret-user-id')}, function() { 
      });
    };
    // .on click for Cancel
    $('#bookmarklet-modal-job-ferret-cancel').on('click', function(){
    	$('#bookmarklet-modal-job-ferret').remove(); //need to reset other things other than clearing the modal 
    });
	};

})();