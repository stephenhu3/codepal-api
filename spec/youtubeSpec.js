describe("integrateYouTube", function () {
    var mvcTestArray, model, controller, view, testObject;
        
    beforeEach(function (done) {
        setTimeout(function() {
        $.getScript( "https://apis.google.com/js/client.js", function( data, textStatus, jqxhr ) {
          console.log( data ); // Data returned
          console.log( textStatus ); // Success
          console.log( jqxhr.status ); // 200
          console.log( "Load was performed." );
        });

      value = 0;
      fixture.load('youtubeFixture.html');
        document.body.insertAdjacentHTML(
            'afterbegin', 
            fixture);

        localStorage.clear();
        mvcTestArray = [];
        mvcTestArray = mvc();
        model = mvcTestArray[0];
        controller = mvcTestArray[1];
        view = mvcTestArray[2];
        testObject1 = {
            title: "Video #1",
            image: "test/url1.html",
            id: "12345",
            desc: "This is a test video 1"
        };
        testObject2 = {
            title: "Video #2",
            image: "test/url1.html",
            id: "12345",
            desc: "This is a test video 2"
        };
        model.localStorageReset();
      done();
    }, 1);
        
    }
  );
    it(
        "should have localStorage be undefined before it starts",
        function (done) {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            expect(localStorage.videos)
                .toEqual(undefined); //testing the state of localStorage before anything is called
                done();
        });
    it(
        "should have localStorage be '[]' {testing: model.localStorageReset()}",
        function (done) {
            model.add(testObject1);
            model.localStorageReset(); //model.localStorageReset() being tested
            expect(localStorage.videos)
                .toEqual('[]');done();
        });
    it(
        "should have localStorage be populated with test testobject1 {testing: model.add()}",
        function (done) {
            model.add(testObject1); //model.add() being tested
            expect(localStorage.videos)
                .toEqual(JSON.stringify([testObject1]));done();
        });

    it(
        "should have localStorage consist of an array of testObject1 and testObject2 {testing: model.getAllVideos()}",
        function (done) {
            model.add(testObject1);
            model.add(testObject2);
            expect(model.getAllVideos())
                .toEqual([testObject1, testObject2]); done();//model.getAllVideos() being tested
        });
    it(
        "should have localStorage consist of an empty array {testing: model.getAllVideos()}",
        function (done) {
            model.getAllVideos();
            expect(localStorage.videos)
                .toEqual('[]');done();
        });
    it(
        "should have localStorage be '[]' {testing: model.init()}",
        function (done) {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            model.init(); //model.init() being tested
            expect(localStorage.videos)
                .toEqual('[]');
            expect(localStorage.selectedVideoNumber)
                .toEqual('{}');done();
        });
    it(
        "should have localStorage.selectedVideoNumber be '{}' {testing: model.init()}",
        function (done) {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            localStorage.videos = JSON.stringify([]);
            model.init(); //model.init() being tested
            expect(localStorage.selectedVideoNumber)
                .toEqual('{}');done();
        });
    it(
        "should return the list of added test objects  {testing: controller.getVideos()}",
        function (done) {
            spyOn(controller,'setUpYoutubeAPI');
            controller.init();
            expect(controller.setUpYoutubeAPI).toHaveBeenCalled();done();
        });
    it(
        "should set up YoutubeAPI {testing: controller.setUpYoutubeAPI()}",
        function (done) {
            localStorage.clear();done(); //resetting the changes to localStorage by previous calls
            //TO-do
        });

    it(
        "should add the correct test object {testing: controller.addVideo()}",
        function (done) {
          controller.addVideo("Video #1", "test/url1.html", "12345", "This is a test video 1");
          expect(localStorage.videos)
              .toEqual(JSON.stringify([testObject1]));done();
        });

    it(
        "should return the list of added test objects  {testing: controller.getVideos()}",
        function (done) {
          model.add(testObject1);
          expect(controller.getVideos())
              .toEqual([testObject1]);done();
        });
    it(
        "should have localStorage equal to '[]'  {testing: controller.clearLocalStorage()}",
        function (done) {
          model.add(testObject1);
          expect(localStorage.videos)
              .toEqual(JSON.stringify([testObject1]));
          controller.clearLocalStorage();
          expect(localStorage.videos)
              .toEqual('[]');done();
        });
    it(
        "should have the videos div populated {testing: view.render()}",
        function (done) {
          model.add(testObject1);
          view.render();
          expect($('#videos').html).not.toBe('');done();
        });
    it(
        "should have search-button attribute set to false {testing: view.init()}",
        function (done) {
          view.init();
          expect($('#search-button').attr).not.toBe(true);done();
        });
    it(
        "should have search-button attribute set to false {testing: view.init()}",
        function (done) {
          view.init();
          expect($(".dropdown-toggle")).not.toBeUndefined();done();
        });
    
    describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function(done) {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;done();
    });

    it("takes a long time", function(done) {
      setTimeout(function() {
          //spyOn(videoClick(),'onPlayerReady');
            init();
            videoClick();
            //onPlayerReady();
            //expect(videoClick().onPlayerReady).toHaveBeenCalled();
        done();
      }, 9000);
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });


    

    
    /*
    it("should submit the form when you press one of the update buttons", function(){
      var spyEvent = spyOnEvent('document', 'click');
      $('document').click();
      expect(spyEvent).toHaveBeenTriggered();
    });
    it(
        "should return the list of added test objects  {testing: controller.getVideos()}",
        function () {
            spyOn(controller,'setUpYoutubeAPI');
            window.init();

            expect(controller.setUpYoutubeAPI).toHaveBeenCalled();
            expect(mvcTestArray).toBe([model, controller, view]);
        });
    it('{testing: init()}', function() {
        
        integrateYoutube();
        expect(ajax.url).toBe("html/youtube.html");
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
        document.getElementById('search-button').click();
        expect(document.getElementById('resultVideo').innerHTML).toBe("Oops! We can't find your query!");
    });
    it(
        " should call videoClick {testing: videoClick()}",
        function () {
          videoClick();
          expect(videoClick).toHaveBeenCalled();
        });
    it (
        "should invoke the video-image click event.", function() {
            spyEvent = spyOnEvent('.video-image', 'click');
            //console.log($('.video-image'));
            $('.video-image').trigger( "click" );
            expect('click').toHaveBeenTriggeredOn('.video-image');
            expect(spyEvent).toHaveBeenTriggered();
        });
*/
});
