function integrateYoutube(container){
	var lastSearch ="";
	var printingLog = true;
	var value_of_print;
	console.log(errorCheckingSetUp());
	print = createDOM(container);
	print = loadScripts();

	function errorCheckingSetUp() {
		Object.defineProperty(window, "print", { 
			get:function(){
				return value_of_print;
			},
			set: function(printValue) { 
				/* this is run every time print is assigned a value: 
		     the value being assigned can be found in printValue */
				value_of_print = printValue;
				if(printingLog)
					console.log(printValue);
			}
		});
		return "Done: errorSetUp";
	}
}

function createDOM (container){
	container.getElement().html(''); //clear the dom
	container.getElement().html(
		/*'<span id="back-search" class="input-group-btn">' +
			'<button class="btn btn-default" style="visibility: hidden;" onClick="backFunction()">Back</button>' +
			'</span>' +
		 */
		'<form id="search-string">' +
			'<div class="input-group">' +
				'<input id="query" type="text" class="form-control" placeholder="Search for...">' + '</input>' +
				'<span class="input-group-btn">' +
					'<button class="btn btn-default" onClick="search()" type="button">Go!' + '</button>' +
				'</span>' +
			'</div>' +
		'</form>' +
		'<div class="media" id="ytPlayerDiv">' + '</div>' +
		'<div id="searchResultsDiv">' + '</div>');
	return "Done: createDOM";
}

function loadScripts() {
	// Load the IFrame Player API code
	if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
		$('#back-search').hide();
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		//find the first script in the html document
		var firstScriptTag = document.getElementsByTagName('script')[0];
		//inserting youtube API scripts in html
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		return "new YT scripts loaded";
	}
	return "YT scripts already exist";
}

search(); //testing puroposes

function search(){
	print = "search()";
	$('#searchResultsDiv').show();
	var searchTerm = $('#query').val();

	lastSearch = searchTerm;
	// setUp parameters to be sent to youtube API
	var params = {
			part:'snippet',
			key: "AIzaSyCGO6aUgvp2QoGw5Gw16uItLy1MBnRQF1E",
			q:searchTerm
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
			//print = "a";
			// ... and when we click, load the respective video
			img.addEventListener('click', (function(clickEvent) {
				return function() {
					//print = "b";
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
					$('#back-search').show();
					$('#searchResultsDiv').hide();
				};
			})(video));

			//add thumbnails of the videos returned
			$(img).appendTo("#eachResultDiv");
		}
	});

	return "end of Search";
}