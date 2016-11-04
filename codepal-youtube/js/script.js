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
	$.getJSON(url, params, function(dataJSON){

		//5 videos(on object form) were returned
		var videos = dataJSON.items;

		// loop over the videos returned by API
		for (var i = 0; i < videos.length; i++) {

			var video = videos[i];
			var videoURL = video.snippet.thumbnails.medium.url;
			var videoID = video.id.videoId;

			// We're creating a DOM element for the object
			var img = document.createElement('img');
			img.content = video;
			img.setAttribute("id", videoID);
			img.setAttribute("src", videoURL);

			// ... and when we click, load the respective video
			img.addEventListener('click', (function(clickEvent) {
				return function() {
					var YoutubeVideoID = $(this).attr('id');

					// Replace the 'ytplayer' imgent with an <iframe> and
					// YouTube player after the API code downloads.
					var player = new YT.Player('ytplayer', {
						height : '360',
						width : '640',
						videoId : YoutubeVideoID
					});
				};
			})(video));

			document.body.appendChild(img);

		}

	});
	
	
}