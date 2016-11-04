$(function(){
	
	//load youtube API scripts
	loadScripts(); 
	
	//rest of the work
	rest();
});

function loadScripts() {
	
	// Load the IFrame Player API code
	if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
		
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
	
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}

function rest() {
	
	//search button function
	$('#search-string').submit(function(event){
		event.preventDefault();
		var searchTerm = $('#query').val();
		search(searchTerm);
	});
}
	
function search(string){
	//submit button was clicked
	
	// setUp parameters to be sent to youtube API
	var params = {
				part:'snippet',
				key: "AIzaSyCGO6aUgvp2QoGw5Gw16uItLy1MBnRQF1E",
				q:string
			  };
	url = 'https://www.googleapis.com/youtube/v3/search';
	
	//send request to youtube API
	$.getJSON(url, params, function(dataJSON)
		var videos = dataJSON.items;
		alert("videos");
	});
	
	
}