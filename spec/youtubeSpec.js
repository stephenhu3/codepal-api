describe("integrateYouTube", function () {
    var mvcTestArray, model, controller, view,
        testObject;
    beforeEach(function () {
        localStorage.clear();
        mvcTestArray = [];
        this.result = fixture.load('youtubeFixture.html');
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
    }
  );
    it(
        "should have localStorage be undefined before it starts",
        function () {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            expect(localStorage.videos)
                .toEqual(undefined); //testing the state of localStorage before anything is called
        });
    it(
        "should have localStorage be '[]' {testing: model.localStorageReset()}",
        function () {
            model.add(testObject1);
            model.localStorageReset(); //model.localStorageReset() being tested
            expect(localStorage.videos)
                .toEqual('[]');
        });
    it(
        "should have localStorage be populated with test testobject1 {testing: model.add()}",
        function () {
            model.add(testObject1); //model.add() being tested
            expect(localStorage.videos)
                .toEqual(JSON.stringify([testObject1]));
        });

    it(
        "should have localStorage consist of an array of testObject1 and testObject2 {testing: model.getAllVideos()}",
        function () {
            model.add(testObject1);
            model.add(testObject2);
            expect(model.getAllVideos())
                .toEqual([testObject1, testObject2]); //model.getAllVideos() being tested
        });
    it(
        "should have localStorage consist of an empty array {testing: model.getAllVideos()}",
        function () {
            model.getAllVideos();
            expect(localStorage.videos)
                .toEqual('[]');
        });
    it(
        "should have localStorage be '[]' {testing: model.init()}",
        function () {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            model.init(); //model.init() being tested
            expect(localStorage.videos)
                .toEqual('[]');
            expect(localStorage.selectedVideoNumber)
                .toEqual('{}');
        });
    it(
        "should have localStorage.selectedVideoNumber be '{}' {testing: model.init()}",
        function () {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            localStorage.videos = JSON.stringify([]);
            model.init(); //model.init() being tested
            expect(localStorage.selectedVideoNumber)
                .toEqual('{}');
        });
    it(
        "should return the list of added test objects  {testing: controller.getVideos()}",
        function () {
            spyOn(controller,'init');
            controller.init();
            expect(controller.init).toHaveBeenCalled();
        });
    it(
        "should set up YoutubeAPI {testing: controller.setUpYoutubeAPI()}",
        function () {
            localStorage.clear(); //resetting the changes to localStorage by previous calls
            //TO-do
        });

    it(
        "should add the correct test object {testing: controller.addVideo()}",
        function () {
          controller.addVideo("Video #1", "test/url1.html", "12345", "This is a test video 1");
          expect(localStorage.videos)
              .toEqual(JSON.stringify([testObject1]));
        });

    it(
        "should return the list of added test objects  {testing: controller.getVideos()}",
        function () {
          model.add(testObject1);
          expect(controller.getVideos())
              .toEqual([testObject1]);
        });
    it(
        "should have localStorage equal to '[]'  {testing: controller.clearLocalStorage()}",
        function () {
          model.add(testObject1);
          expect(localStorage.videos)
              .toEqual(JSON.stringify([testObject1]));
          controller.clearLocalStorage();
          expect(localStorage.videos)
              .toEqual('[]');
        });
    it(
        "should have the videos div populated {testing: view.render()}",
        function () {
          model.add(testObject1);
          view.render();
          expect($('#videos').html).not.toBe('');
        });
    it(
        "should have search-button attribute set to false {testing: view.init()}",
        function () {
          view.init();
          expect($('#search-button').attr).not.toBe(true);
        });
    it(
        "should have search-button attribute set to false {testing: view.init()}",
        function () {
          view.init();
          expect($(".dropdown-toggle")).not.toBeUndefined();
        });
    it(
        " should call init {testing: init()}",
        function () {
          init();
          expect(init).toHaveBeenCalled();
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
            console.log($('.video-image'));
            $('.video-image').trigger( "click" );
            expect('click').toHaveBeenTriggeredOn('.video-image');
            expect(spyEvent).toHaveBeenTriggered();
        });

});
