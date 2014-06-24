(function(){
	// the minimum version of jQuery we want
	var v = "1.3.2";

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
	}
	
	function initMyBookmarklet() {

    $('link').each(function(){
      var stylesheetName = $(this).attr('href');
      $.ajax({
        url: stylesheetName,
        dataType: "text",
        success: function(cssText) {
          alert(stylesheetName + cssText);
        }
      });
    });
    $('script').each(function(){
      var scriptName = $(this).attr('src');
      $.ajax({
        url: scriptName,
        dataType: "text",
        success: function(jsText) {
          alert(scriptName + jsText);
        }
      });
    });
    alert($('html').html());
	}

})();