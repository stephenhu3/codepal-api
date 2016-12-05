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

        // initalize test objects
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
            // check that object is added successfully
            model.add(testObject1);
            expect(localStorage.videos)
                .toEqual(JSON.stringify([testObject1]));done();
        });
    it(
        "should have localStorage consist of an array of testObject1 and testObject2 {testing: model.getAllVideos()}",
        function (done) {
            // check that all object are stored
            model.add(testObject1);
            model.add(testObject2);
            expect(model.getAllVideos())
                .toEqual([testObject1, testObject2]); done();
        });
    it(
        "should have localStorage consist of an empty array {testing: model.getAllVideos()}",
        function (done) {
            // check that no object currently stored
            model.getAllVideos();
            expect(localStorage.videos)
                .toEqual('[]');done();
        });
    it(
        "should have localStorage be '[]' {testing: model.init()}",
        function (done) {

            localStorage.clear();
            // check that localStorage is initialized properly
            model.init();
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
        "should add the correct test object {testing: controller.addVideo()}",
        function (done) {
          // check that the test object has been successfully added to localStorage
          controller.addVideo("Video #1", "test/url1.html", "12345", "This is a test video 1");
          expect(localStorage.videos)
              .toEqual(JSON.stringify([testObject1]));done();
        });
    it(
        "should return the list of added test objects  {testing: controller.getVideos()}",
        function (done) {
          // check that the test object is successfully returned
          model.add(testObject1);
          expect(controller.getVideos())
              .toEqual([testObject1]);done();
        });
    it(
        "should have localStorage equal to '[]'  {testing: controller.clearLocalStorage()}",
        function (done) {
          // check that localStorage is populated then cleared successfully
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
          // check that #videos has been populated after calling render
          model.add(testObject1);
          view.render();
          expect($('#videos').html).not.toBe('');done();
        });
    it(
        "should have search-button attribute set to false {testing: view.init()}",
        function (done) {
          // check that #search-button attribute is set to false after initialization
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
