const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  // loops through tweets
  for (let item of tweets) {
    // calls createTweetElement for each tweet
    let newTweet = createTweetElement(item);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(newTweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};


const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetData) {

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
                      <div class="icons">
                        <i class="fas fa-flag-checkered"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-thumbs-up"></i>
                      </div>
                    </footer>
                  </article>`;
  return tweet;
};

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
    .then(function(data) {
      renderTweets(data);
    });
};