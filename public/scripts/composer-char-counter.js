$(document).ready(function(){
  const maxLength = 140;
  const $form = $('form');
  const $counter = $('.counter');
  $form.find('textarea')
  .on("keyup", function(){
    const character = maxLength - $(this).val().length
    if($(this).val().length > maxLength){
      $counter.css('color', '#FF0000')
      // $counter.addClass('red-color')
    } else {
      $counter.css('color', '#545149')
    }
    $counter.text(character)
  })
});

// function at(strSelector) {
//   return document.querySelector(strSelector)
// }