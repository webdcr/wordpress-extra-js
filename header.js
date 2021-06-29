// start AJAX functions below: 
var radioChecked = false;

function modifyJOAN() {
	joanScript = $( "script[src*='joan']" );
	joanScriptSrc = joanScript.attr("src");
	joanScript.remove();
	newScript = document.createElement("SCRIPT");
	console.log(joanScriptSrc);
	newScript.src = joanScriptSrc;
	modifyJOAN()
}

function checkJoan() {
	nowPlaying = $( ".joan-now-playing h3").html()
	nowPlayingImg = $( ".joan-image-thumbnail").attr("src")
	if (nowPlaying !== undefined) {
		$("#title").html(nowPlaying);
		$(".albumCover > img").attr("src",nowPlayingImg);
	} else {
		$("#title").html("Dartmouth 20Zoom")
		$(".albumCover > img").attr("src","https://webdcr.com/wp-content/uploads/blank-04.png")
	} 
}

function addSameSiteLinkClickEvent() {
	$("body").on("click", "a:not(.noAJAX)", function(clickEvent){
		console.log("Clicked! " + this.pathname);
		
		var path = this.pathname;
  
		if (this.hostname == window.location.hostname && !path.includes("wp-admin")) {
			clickEvent.preventDefault(); // don't do what normally happens when link gets clicked
			
			newEntryContent = path + " .site-content";
			ran = false;
			$(".site-content").load(newEntryContent, function() {
				if (!ran) {
					console.log(arguments);
					actionsOnLoad(path);
					ran = true;
				}
			});
		}
	})
}

// when back button clicked, triggers AJAX for prior page.
function sameSiteLinkPopstate() {
	console.log("starting sameSiteLinkPopstate()");
	newEntryContent = window.location.pathname + " .site-content";
	$(".site-content").load(newEntryContent, function() {
		console.log(arguments);
		actionsOnLoad();
	})
}

// some pages have a '.posts-navigation' div outside '.site-content'
// this checks for that, adds if needed.
function managePostsNavigation(linkPath) {
	console.log("starting managePostsNavigation("+linkPath+")");
	var postsNav = document.getElementsByClassName("posts-navigation")[0];
	if (!postsNav) {
		$( "<div class='posts-navigation'></div>" ).insertAfter( ".site-content" );
	} else {
		$(".posts-navigation").html("");
		$(".posts-navigation").load(linkPath + " .posts-navigation");
	}
}

function actionsOnLoad(linkPath) {
	console.log("starting ActionsOnLoad("+linkPath+")" + " with arguments:");
	console.log(arguments);
	window.scrollTo(0, 0);
  	document.title = $(".entry-title:first a:first").html();
	if (linkPath) {
		history.pushState(null, null, linkPath); // make it look like we changed pages in page history
		managePostsNavigation(linkPath);
  }
	setTimeout(checkJoan, 3000);
}


// attaches all AJAX functions to the page
$(document).ready(function(){
	addSameSiteLinkClickEvent();
	window.addEventListener('popstate', function() {
		sameSiteLinkPopstate();
	});
	setInterval(checkJoan, 30 * 1000)
});

