var model = {
    localStorageReset: function () {
        localStorage.userId = JSON.stringify([]);
    },
    init: function () {
        if (!localStorage.userId) {
            model.localStorageReset();
        }
    },
    add: function (obj) {
        var data = JSON.parse(localStorage.userId);
        data.push(obj);
        localStorage.userId = JSON.stringify(data);
    },
    getAllVideos: function () {
        return JSON.parse(localStorage.userId);
    }
}
