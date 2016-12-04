integrateStackOverflow = function (container){
  $.ajax({
    type: 'GET',
    url: 'html/stackoverflow.html'
  })
  .done(function (data, textStatus, jqXHR) {
    container.getElement().html(data);
  })
  .fail(function (jqXHR, textStatus, errorThrown) {
    throw 'Stackoverflow module could not be loaded.';
  });
}