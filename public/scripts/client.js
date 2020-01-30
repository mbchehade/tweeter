/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function(){
  loadTweets();
  $('form').on('submit', function(event){
    event.preventDefault()
   const serializedData = $(this).serialize()
  console.log(serializedData)
   if(serializedData === "text="){
     $(".error").text("Field Cannot be Empty")
   }else if(serializedData.length > 145){
      $(".error").text("Please Respect the Arbitrary Limit of 140 Chars")
   }else{
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serializedData
      }).then(function (testing) {
        console.log("success")
      });
  loadTweets();
   }
  })
});



//when we are wrting jquery functions we are giving it an extra one. 
//