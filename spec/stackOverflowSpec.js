describe('stackOverflowKarma', function() {
	beforeEach(function() {
    fixture.load('stackOverflow.fixture.html');

    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
  	});

	it('should not find any results with given query', function() {
    	spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "items":[]
            });
            return {
                fail: function() {}
            }
        });
    	document.getElementById('query1').value = "h1312312asdasdasdasd1";
    	document.getElementById('soSearch').click();
    	expect(document.getElementById('show-data').innerHTML).toBe("Oops! We can't find your query!");
  	});

	it('should return 2 questions and display it', function() {
    	spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "items":[
                	{"is_answered": true, "question_id": 87654321, "title": "Title 1"},
                	{"is_answered": true, "question_id": 12345678, "title": "Title 2"}
                ]
            });
            return {
                fail: function() {}
            }
        });
    	document.getElementById('query1').value = "How to debug in C more effectively";
    	document.getElementById('soSearch').click();
    	expect(document.getElementById('listOfQ').innerHTML).toBe('List of questions:');
  	});

  	it('should show the list of 10 questions', function() {
    	spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "items":[
                	{"is_answered": true, "question_id": 87654321, "title": "Title 1"},
                	{"is_answered": true, "question_id": 12345178, "title": "Title 2"},
                	{"is_answered": true, "question_id": 41145678, "title": "Title 3"},
                	{"is_answered": true, "question_id": 63445678, "title": "Title 4"},
                	{"is_answered": true, "question_id": 61225678, "title": "Title 5"},
                	{"is_answered": true, "question_id": 14645678, "title": "Title 6"},
                	{"is_answered": true, "question_id": 16445678, "title": "Title 7"},
                	{"is_answered": true, "question_id": 12234678, "title": "Title 8"},
                	{"is_answered": true, "question_id": 41246678, "title": "Title 9"},
                	{"is_answered": true, "question_id": 65124678, "title": "Title 10"}
                ]
            });
            return {
                fail: function() {}
            }
        });
    	document.getElementById('query1').value = "How to code?";
    	document.getElementById('soSearch').click();
    	expect(document.getElementById('listOfQ').innerHTML).toBe('List of questions:');
  	});

  	it('should show the questions in details along with its answers (3 questions and 3 answers)', function() {
  		var questionId = 87654321;
  		var title = "Title 1";
  		var num = 1;
  		spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "items":[
                	{"is_accepted": true,"body":"This is a body of the answer1"},
                	{"is_accepted": false,"body":"This is a body of the answer2"},
                	{"is_accepted": false,"body":"This is a body of the answer3"}
                ]
            });
            return {
                fail: function() {}
            }
        });
        getAnswerBody(questionId,title,num);
        expect($("#show-data .count").length).toBe(1);
        expect(document.getElementById("question1").innerHTML).toBe(" Title 1 ");
        expect(document.getElementById("answer1").innerHTML).toBe(" This is a body of the answer1 ");
  	});

  	it('should show the questions in details along with its answers (10 questions and 10 answers)', function() {
  		var questionId = 87654321;
  		spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "items":[
                	{"is_accepted": true,"body":"This is a body of the answer1"},
                	{"is_accepted": false,"body":"This is a body of the answer2"},
                	{"is_accepted": false,"body":"This is a body of the answer3"}
                ]
            });
            return {
                fail: function() {}
            }
        });
        for(num = 1; num <= 10; num++){
        	questionId++;
        	title = `Title${num}`;
        	getAnswerBody(questionId,title,num);
        	toggleAns(num);
    	}
        expect($("#show-data .count").length).toBe(10);
        expect(document.getElementById("question1").innerHTML).toBe(" Title1 ");
        expect(document.getElementById("question2").innerHTML).toBe(" Title2 ");
        expect(document.getElementById("question3").innerHTML).toBe(" Title3 ");
        expect(document.getElementById("question4").innerHTML).toBe(" Title4 ");
        expect(document.getElementById("question5").innerHTML).toBe(" Title5 ");
        expect(document.getElementById("question6").innerHTML).toBe(" Title6 ");
        expect(document.getElementById("question7").innerHTML).toBe(" Title7 ");
        expect(document.getElementById("question8").innerHTML).toBe(" Title8 ");
        expect(document.getElementById("question9").innerHTML).toBe(" Title9 ");
        expect(document.getElementById("question10").innerHTML).toBe(" Title10 ");
  	});

  	it('should not find any results with given query', function() {
    	spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({
                "items":[]
            });
            return {
                fail: function() {}
            }
        });
    	document.getElementById('query1').value = "h1312312asdasdasdasd1";
    	document.getElementById('soSearch').click();
    	expect(document.getElementById('show-data').innerHTML).toBe("Oops! We can't find your query!");
  	});
});
