integrateStackOverflow = function (container){
container.getElement().html('<form id="myForm">'+
'	<input type="search" id="mySearchBox" placeholder="Search here">' +
'	<button onclick="myFunction()">Search</button>'+
'    </form>' +
'<ol id="show-data"></ol>');

	$(function(){
		//StackOverFLow JS stuff
		function myFunction() {
			var originalLink = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&site=stackoverflow";
			var query = $('#mySearchBox').val();
			var urlToAPI = originalLink + '&q=' + query;
			$.getJSON(urlToAPI, function (data) {
				if(data.items.length == 0){
					$('#show-data').empty();
					$('#show-data').append("Oops! We can't find your query!");
				}
				else if(data.items.length >= 10){
					$('#show-data').empty();
					$('#show-data').append('List of questions:');
					for(i = 0; i < 10; i++){
						var link = "<a href='" + data.items[i].link +"'>";
						$('#show-data').append('<li>' + link + data.items[i].title + '</a>' + '</li>');
						$('#show-data').append('</br>');
					}
				}
				else{
					$('#show-data').empty();
					$('#show-data').append('List of questions:');
					for(i = 0; i < data.items.length; i++){
						var link = "<a href='" + data.items[i].link +"'>";
						$('#show-data').append('<li>' + link + data.items[i].title + '</a>' + '</li>');
						$('#show-data').append('</br>');
					}
				}
			});
		}
	});
}