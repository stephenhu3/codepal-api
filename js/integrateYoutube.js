integrateYoutube = function (container){
	
container.getElement().html(
    '<form id="search-string">' +
          '<div class="input-group">' +
          '<span id="back-search" class="input-group-btn">' +
            '<button class="btn btn-default">Back</button>' +
          '</span>' +
            '<input id="query" type="text" class="form-control" placeholder="Search for..."></input>' +
	          '<span class="input-group-btn">' +
              '<button class="btn btn-default" type="submit">Go!</button>' +
            '</span>' +
          '</div>' +
    '</form>' +
    '<div class="media" id="ytPlayerDiv"></div>' +
    '<div id="searchResultsDiv"></div>');

	$(function(){
		//load youtube API scripts
		loadScripts();
		//rest of the work
		initSearch();
	});

	function loadScripts() {
		// Load the IFrame Player API code
		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			//find the first script in the html document
			var firstScriptTag = document.getElementsByTagName('script')[0];

			//inserting youtube API scripts in html
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
	}

	function initSearch() {
    //$('#back-search').hide();

		//search button function
		$('#search-string').submit(function(event){
			//button is pressed

			event.preventDefault();

			$('#ytPlayerDiv').hide();
      //$('#back-search').hide();
			$('#searchResultsDiv').show();

			// prevents the default action of submit button
			// and instead executes the commands below it
			var searchTerm = $('#query').val();
			search(searchTerm);
		});
	}

	function search(string){

		// setUp parameters to be sent to youtube API
		var params = {
					part:'snippet',
					key: "AIzaSyCGO6aUgvp2QoGw5Gw16uItLy1MBnRQF1E",
					q:string
				  };
		url = 'https://www.googleapis.com/youtube/v3/search';

		//send request to youtube API
		$.getJSON(url, params, function(dataJSON){

			//5 videos(on object form) were returned in an array
			var videos = dataJSON.items;

			//over-write the last search results
			$('#searchResultsDiv').html('<div id="eachResultDiv"></div>');

			// loop over the videos returned by API
			for (var i = 0; i < videos.length; i++) {

				var video = videos[i];
				var videoURL = video.snippet.thumbnails.medium.url;
				//TODO var desc = video.snippet.description;
				var videoID = video.id.videoId;

				// We're creating a DOM element for the object
				var img = document.createElement('img');
				img.content = video;
				img.setAttribute("id", videoID); //attaching youtube videoID to img
				img.setAttribute("src", videoURL);
				img.setAttribute("class", "img-rounded");

				// ... and when we click, load the respective video
				img.addEventListener('click', (function(clickEvent) {
					return function() {

						//retrieving videoID from the id attribute of img
						var YoutubeVideoID = $(this).attr('id');

						// Replace the 'ytPlayerDiv' element with an <iframe> and
						// YouTube player after the API code downloads.
						var player = new YT.Player('ytPlayerDiv', {
							height : '85%',
							width : '100%',
							videoId : YoutubeVideoID
						});


						$('#ytPlayerDiv').show();
            //$('#back-search').show();
						$('#searchResultsDiv').hide();
					};
				})(video));

				//add thumbnails of the videos returned
				$(img).appendTo("#eachResultDiv");
			}
		});
	}
}