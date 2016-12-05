function integrateYoutube (container) {
    // Load HTML
    $.ajax({
            type: 'GET',
            url: 'html/youtube.html'
        })
        .done(function (data, textStatus, jqXHR) {
            container.getElement().html(data);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            throw 'Youtube module could not be loaded.';
        });
}
