integrateStackOverflow = function (container){
container.getElement().html(
'	<div class="input-group">' +
'		<span class="input-group-btn">' +
'			<button class="btn btn-default">Back</button>' +
'		</span>' +
'		<input id="query1" type="text" class="form-control" placeholder="Search for..."></input>' +
'		<span class="input-group-btn">' +
'			<button id="soSearch" onclick="getQuestions()" class="btn btn-default" type="submit">Go!</button>' +
'		</span>' +
'	</div>' +
'	<p id="listOfQ"></p>'+
'	<ol id="show-data"></ol>');
}
function getQuestions() {
	var query = $('#query1').val();
	var urlToAPI = `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&accepted=True&site=stackoverflow&q=${query}`;
	//var urlToAPI = originalLink + '&q=' + query;
	var questData;
	var ansData = [];
	var num = 1;
  	$.getJSON(urlToAPI, function (data) {
  		questData = data;
  		if(data.items.length == 0){
  			$('#show-data').empty();
  			$('#show-data').append("Oops! We can't find your query!");
  		}
  		else if(data.items.length >= 10){
  			$('#show-data').empty();
	  		$('#listOfQ').empty();
	  		$('#listOfQ').append('List of questions:');
  			for(i = 0; i < 10; i++){
  				ansData[i] = getAnswerBody(data.items[i].question_id,data.items[i].title,num);
  				num++;
  			}
  		}
  		else {
  			$('#show-data').empty();
	  		$('#listOfQ').empty();
	  		$('#listOfQ').append('List of questions:');
  			for(i = 0; i < data.items.length; i++){
  				ansData[i] = getAnswerBody(data.items[i].question_id,data.items[i].title,num);
  				num++;
  			}
  		}
	});
}

function getAnswerBody(questionId,title,num){
	var urlToAPI = `https://api.stackexchange.com/2.2/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=!-.1*WTz0(T_D`;
	$.getJSON(urlToAPI, function (data) {
		for(i = 0; i < data.items.length; i++){
			if(data.items[i].is_accepted == true){
				$('#show-data').append(`<li><a onclick='toggleAns(${num})' value='hide/show' id='questionFont' href='#' class='question ${num}'> ${title} </a></li>`);
				$('#show-data').append(`<div class='hideAnswer answer${num}' style="display:none"> ${data.items[i].body} </div>`);
				$('#show-data').append('</br>');
			}
		}
	});
}

function toggleAns(num){
  $('.answer' + num).toggle();
}