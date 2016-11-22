integrateStackOverflow = function (container){
container.getElement().html(
'	<div class="input-group">' +
'		<span class="input-group-btn">' +
'			<button class="btn btn-default">Back</button>' +
'		</span>' +
'		<input id="query1" type="text" class="form-control" placeholder="Search for..."></input>' +
'		<span class="input-group-btn">' +
'			<button id="soSearch" onclick="myFunction()" class="btn btn-default" type="submit">Go!</button>' +
'		</span>' +
'	</div>' +
'	<p id="listOfQ"></p>'+
'	<ol id="show-data"></ol>');
}
function myFunction() {
	console.log("hello1");
	var originalLink = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&site=stackoverflow";
	var query = $('#query1').val();
	var urlToAPI = originalLink + '&q=' + query;
  	$.getJSON(urlToAPI, function (data) {
  		console.log("hello");
  		if(data.items.length == 0){
  			$('#show-data').empty();
  			$('#show-data').append("Oops! We can't find your query!");
  		}
  		else if(data.items.length >= 10){
	  		$('#show-data').empty();
	  		$('#listOfQ').empty();
	  		$('#listOfQ').append('List of questions:');
	    	for(i = 0; i < 10; i++){
	    		var link = "<a target='_blank' id='questionFont' href='" + data.items[i].link +"'>";
	    		$('#show-data').append("<li id='questionFont' >" + link + data.items[i].title + '</a>' + '</li>');
	    		$('#show-data').append('</br>');
	    	}
    	}
    	else{
    		$('#show-data').empty();
    		$('#listOfQ').empty();
	  		$('#listOfQ').append('List of questions:');
	  		$('#show-data').append('</br>');
	    	for(i = 0; i < data.items.length; i++){
	    		var link = "<a id='questionFont' href='" + data.items[i].link +"'>";
	    		$('#show-data').append('<li>' + link + data.items[i].title + '</a>' + '</li>');
	    		$('#show-data').append('</br>');
	    	}
    	}
	});
}