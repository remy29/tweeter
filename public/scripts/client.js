$(document).ready(function() {

  const timeAgo = function(time) {
  
    const date = new Date();  // Gets the current time
    const currentTime = date.getTime(); // getTime() returns milliseconds
    const seconds = (currentTime - time) / 1000; // assigns time difference in seconds

    // series of if statements returning 'time ago' phrase
    if (seconds > 30 * 24 * 3600) {
      return "over a year ago";
    }
    if (seconds > 30 * 24 * 3600) {
      return "over a month ago";
    }
    if (seconds > 7 * 24 * 3600) {
      return "over a week ago";
    }
    if (seconds > 2 * 24 * 3600) {
      return "a few days ago";
    }
    if (seconds > 24 * 3600) {
      return "yesterday";
    }
    if (seconds > 3600) {
      return "a few hours ago";
    }
    if (seconds > 1800) {
      return "Half an hour ago";
    }
    if (seconds > 60) {
      return Math.floor(seconds / 60) + " minutes ago";
    }
    if (seconds < 60) {
      return Math.floor(seconds) + " seconds ago";
    }
  };
  

  const createTweetElement = function(tweet) { // fills out html form with elements of the tweet, and returns it
    const $user = tweet['user'];
    const $tweet = $(`
    <article class="tweet">
          <header>
            <img src="${$user['avatars']}">    
            <span>${$user['name']}</span>
            <div>${$user['handle']}</div>
          </header>
          <span>${tweet['content']['text']}</span>
          <footer>
            <span>${timeAgo(tweet['created_at'])}</span>
            <div class="icons">
              <img src="/images/icons/flag-clear.png"></img>
              <img src="/images/icons/retweet-clear.png"></img>
              <img src="/images/icons/heart-clear.png"></img>
            </div>
          </footer>
        </article>
    `);
    return $tweet;
  };

  const loadTweets = function(initial) { //fetches database of tweets and calls back renderTweets
    $.ajax(`/tweets`, {method: "GET"})
      .then((res) => {
        if (initial) {
          renderTweets(res);
        } 
        if (!initial) {
          renderTweets([res.pop()])
        }
      });
  };

  const renderTweets = function(tweets) { // loops through database array and calls createTweetElement on each tweet then renders the result
    for (const tweet in tweets) {
      console.log(tweets[tweet])
      const $tweet = createTweetElement(tweets[tweet]);
      $('#tweets-container').prepend($tweet);
    }
  };
  
  $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    const $input = $('#tweet-text');
    if ($input.val().length === 0) {
      return alert('oops, seems you forgot to write a tweet');
    }

    if ($input.val().length > 140) {
      return alert('Brevity is the heart of wit. 140 characters or less.');
    }

    $.ajax(`/tweets`, {method: "POST", data: $input.serialize()})
        .then(() => loadTweets(false))
  });

  loadTweets(true);
});


