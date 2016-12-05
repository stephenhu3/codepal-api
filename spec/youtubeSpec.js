describe("integrateYouTube", function () {
    var mvcTestArray, model, controller, view, testObject;

    beforeEach(function (done) {
        setTimeout(function() {
        $.getScript( "https://apis.google.com/js/client.js", function(  ) {});

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

    // following is the added support for asynchrous parts of the youtube testing
    // waiting for 9 seconds each for 2 tests to make sure google api is loaded
    // before running the following tests 
    describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function(done) {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;done();
    });

    it("takes a long time", function(done) {
      setTimeout(function() {
            init();
            videoClick();
        done();
      }, 9000);
    });
    it("takes a long time", function(done) {
      setTimeout(function() {
          spyOn(view, 'init');
          spyOn(model, 'init');
          controller.setUpYoutubeAPI();
        done();
      }, 9000);
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });
});
