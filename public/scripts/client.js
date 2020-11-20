$(document).ready(function() {
  $( "#alert-boxA" ).hide();
  $( "#alert-boxB" ).hide();

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
  
  const escape =  function(str) { // used to make sure user's input is using only safe encoded chars - i.e protects from code injection attack
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweet) { // fills out html form with elements of the tweet, and returns it
    const $user = tweet['user'];
    const $tweet = $(`
    <article class="tweet">
          <header>
            <img src="${$user['avatars']}">    
            <span>${$user['name']}</span>
            <div>${$user['handle']}</div>
          </header>
          <span>${escape(tweet['content']['text'])}</span>
          <footer>
            <span>${timeAgo(tweet['created_at'])}</span>
            <div class="icons">
              <img class="icon1" src="/images/icons/flag-clear.png"></img>
              <img class="icon2" src="/images/icons/retweet-clear.png"></img>
              <img class="icon3" src="/images/icons/heart-clear.png"></img>
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
      const $tweet = createTweetElement(tweets[tweet]);
      $('#tweets-container').prepend($tweet);
    }
  };

  $('#tweet-text').on('focus', () => {
    $( "#alert-boxA" ).slideUp('slow');
    $( "#alert-boxB" ).slideUp('slow');
  });
  
  $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    let error = false; 
    const $input = $('#tweet-text');

      if ($input.val().length === 0) {
        $( "#alert-boxA" ).slideDown('slow');
        error = true;
      } 
      if ($input.val().length > 140) {
        $( "#alert-boxB" ).slideDown('slow');
        error = true;
      } 

      if (error === false) {
        $.ajax(`/tweets`, {method: "POST", data: $input.serialize()})
        .then(() => {
          $('#counter').val(140)
          $input.val('')
        })
        .then(() => loadTweets(false))
        .fail((err) => console.log('invalid request'))
      }
  });

  loadTweets(true);

});



