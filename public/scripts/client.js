/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  $('#tweets-container').empty()
  // loops through tweets
  for (let item of tweets) {
    // calls createTweetElement for each tweet
    let newTweet = createTweetElement(item)
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(newTweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}


const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function (tweetData) {

  const oneDay = 24 * 60 * 60 * 1000;
  const tweetDate = new Date(tweetData["created_at"]);
  const secondDate = new Date();
  const diffDays = Math.round(Math.abs((tweetDate - secondDate) / oneDay));

  const tweet = `<article class="tweet">
        <header>
          <section class="flexbox">
            <div class="container1">
              <img  src=${tweetData['user']['avatars']}>
              <span class="name">${escape(tweetData['user']['name'])}</span>
            </div>
            <div class="container2">
              <div>${tweetData['user']['handle']}</div>
            </div>
          </section>
          <span class="quote">${escape(tweetData['content']['text'])}</span>
        </header>
        <footer>
            <span class="date">${diffDays} days ago</span>
        </footer>
      </article>`
  return tweet;
}

const loadTweets = function () {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
    .then(function (data) {
      renderTweets(data);
    })
}

$(function(){
  loadTweets();
  $('form').on('submit', function(event){
    event.preventDefault()
   const serializedData = $(this).serialize()
  console.log(serializedData)
   if(serializedData === "text="){
     alert("You Should Type Something")
   }else if(serializedData.length > 145){
      alert("You Exceeded 140 Character")
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