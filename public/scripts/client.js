/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
$(document).ready(function() {

  const createTweetElement = function (tweetData) { //remember to add template literals and create random pic picker
    const randomNum = Math.ceil(Math.random()*59);
    const $tweet = $(`
    <article class="tweet">
          <header>
            <img src="${tweetData['user']['avatars']}">    
            <span>${tweetData['user']['name']}</span>
            <div>${tweetData['user']['handle']}</div>
          </header>
          <span>${tweetData['content']['text']}</span>
          <footer>
            <span>${randomNum} minutes ago</span>
            <div class="icons">
              <img src="/images/icons/flag-clear.png"></img>
              <img src="/images/icons/retweet-clear.png"></img>
              <img src="/images/icons/heart-clear.png"></img>
            </div>
          </footer>
        </article>
    `)
    return $tweet
  };

})


