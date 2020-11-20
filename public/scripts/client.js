$(document).ready(function() {

  $( "#alert-boxA" ).hide();
  $( "#alert-boxB" ).hide();

  const arrowAnimation = function() { // animates arrows in nav bar
    $('#arrows').animate({opacity: '0.8'});
    $('#arrows').animate({opacity: '0.4'});
    $('#arrows').animate({opacity: '0.8'});
    $('#arrows').animate({opacity: '1'});
    arrowAnimation();
  };

  const timeAgo = function(time) { // function enabling live created x time ago feature
  
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
  
  const escape =  function(str) { // makes sure user's input is using only safe encoded chars 
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

  const loadTweets = function(initial) { //fetches database of tweets wit ajax and calls back renderTweets with results
    $.ajax(`/tweets`, {method: "GET"})
      .then((res) => {
        if (initial) { 
          renderTweets(res); // loads all tweets in database
        } 
        if (!initial) {
          renderTweets([res.pop()]) // loads only the most recent tweet to avoid duplicates
        }
      });
  };

  const renderTweets = function(tweets) { // loops through database array and calls createTweetElement on each tweet then prepends the result
    for (const tweet in tweets) {
      const $tweet = createTweetElement(tweets[tweet]);
      $('#tweets-container').prepend($tweet);
    }
  };

  $('#tweet-text').on('focus', () => { //hides error messages after user refocuses on textbox
    $( "#alert-boxA" ).slideUp('slow');
    $( "#alert-boxB" ).slideUp('slow');
  });
  
  $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    let error = false; 
    const $input = $('#tweet-text');

    if ($input.val().length === 0) { // catches if user is trying to submit blank tweet triggers warning
      $( "#alert-boxA" ).slideDown('slow');
      error = true;
    } 
    if ($input.val().length > 140) { // same as line 100, but for over 140 chars
      $( "#alert-boxB" ).slideDown('slow');
      error = true;
    } 

    if (error === false) {
      $.ajax(`/tweets`, {method: "POST", data: $input.serialize()}) // ajax post request to database, 
      .then(() => { // clears text box, resets char counter
        $('#counter').val(140)
        $input.val('')
      })
      .then(() => loadTweets(false)) // loads new tweet
      .fail((err) => console.log('invalid request'))
    }
  });

  loadTweets(true);
  arrowAnimation();

});



