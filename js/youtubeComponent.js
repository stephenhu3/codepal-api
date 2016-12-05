function mvc() {
    var model = {
            localStorageReset: function () {
                localStorage.videos = JSON.stringify([]);
            },
            init: function () {
                // intializes localStorage to empty array
                if (!localStorage.videos) {
                    model.localStorageReset();
                }
                if (!localStorage.selectedVideoNumber) {
                    localStorage.selectedVideoNumber = JSON.stringify({});
                }
            },
            add: function (obj) {
                // store objects in localStorage
                var data = JSON.parse(localStorage.videos);
                data.push(obj);
                localStorage.videos = JSON.stringify(data);
            },
            getAllVideos: function () {
                // returns stored objects
                return JSON.parse(localStorage.videos);
            }
    };
    var controller = {
            setUpYoutubeAPI: function () {
                // sets up api key and intializes model and view
                gapi.client.setApiKey("AIzaSyDGHTYd59vSj48MyKPr5WPR19A1KxNyO90");
                gapi.client.load("youtube", "v3", function () {
                    model.init();
                    view.init();
                });
            },
            init: function () {
                controller.setUpYoutubeAPI();
            },
            addVideo: function (vTitle, vImage, vId, vDesc) {
                // sends data to model to store
                model.add({
                    title: vTitle,
                    image: vImage,
                    id: vId,
                    desc: vDesc
                });
            },
            getVideos: function () {
                // return objects from localStorage
                return model.getAllVideos();
            },
            clearLocalStorage: function () {
                // reset localStorage
                model.localStorageReset();
            }
    };
    var view = {
            init: function () {
                $('#search-button').attr('disabled', false);
                $('form#searchForm').on("submit", function (e) {
                    // sends query value as request to youtube api
                    e.preventDefault();
                    controller.clearLocalStorage();
                    var q = $('#query').val();
                    var request = gapi.client.youtube.search.list({
                        q: q,
                        part: 'snippet'
                    });
                    // stores the response data into localStorage
                    request.execute(function (response) {
                        response.items.forEach(function (video) {
                            var videoTitle = video.snippet.title;
                            var videoImage = video.snippet.thumbnails.default.url;
                            var videoIdentity =video.id.videoId;
                            var videoDesc = video.snippet.description;
                            controller.addVideo(
                                    videoTitle,
                                    videoImage,
                                    videoIdentity,
                                    videoDesc);
                            view.render();
                        });
                    });
                    // opens dropdown with returned search results
                    $(".dropdown-toggle").trigger("click");
                });
            },
            // populated video dropdown with title, id, and image
            render: function () {
                var htmlString = '';
                controller.getVideos().forEach(function (video) {
                    htmlString += '<li class="listedVideo">' +
                    '<span class="video-title">' + video.title +
                    '</span><br>' + '<img id="' + video.id +
                    '" class="video-image" src="' + video.image +
                    '">' + '</img>' + '</li>' +
                    '<li class="divider"></li>';
                });
                $('#videos').html(htmlString);
            }
    };
    var mvcArray = [model, controller, view];
    return mvcArray;
}

// initialize function for the whole youtube component
function init() {
    var mvcTestArray = mvc();
    mvcTestArray[1].init();
}
var player;

/*
 * setup a new youtube player object and play the video when laoded
 */
function videoClick(videoID) {
    player = new YT.Player('inside', {
        height: '100%',
        width: '100%',
        videoId: videoID,
        events: {
            'onReady': onPlayerReady
        }
    });

    function onPlayerReady(event) {
        event.target.playVideo();
    }
}

/*
 * if a youtube video is clicked from dropdown add DOM element for the
 * youtube video player and call videoClick function sending the
 * id of the clicked video
 */
$(document).click(function (event) {
    var clickedClassName = $(event.target)[0].className
    if (clickedClassName == 'listedVideo' || clickedClassName ==
        "video-title" || clickedClassName == "video-image") {
        $('#resultVideo').html('<div id="inside"></div>');
        videoClick($(event.target)[0].id);
    }
});
