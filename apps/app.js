$(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });
  $('#outDIV').on('click', 'a', function(event) {
		event.stopPropagation();
	//event.preventDefault();
    getIframe($().id);
  });
});

function getRequest(searchTerm){
  var params = {
    part:'snippet',
	key: "AIzaSyCGO6aUgvp2QoGw5Gw16uItLy1MBnRQF1E",
    q:searchTerm
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
  });
}

function showResults(results){
  var html = "";
  $.each(results, function(index,value){
	  var eachURL = value.snippet.thumbnails.medium.url;
	  var eachID = value.id.videoId;
	html += '<p><a id = "' + eachID + '">'+'<img src="' + eachURL + '" alt="some_text"></a></p>';
    console.log(value.snippet.thumbnails.medium.url);
  });
  $('#search-results').html(html);
}

function getIframe(id){
	var html = "";
		html += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + id + ' frameborder="0" allowfullscreen></iframe>';
	$('#video').html(html);
}