$(function() {
  $('.toggle').on('click', function() {
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  });
});