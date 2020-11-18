$(document).ready(function() { 
  const $username = $('article').children().first().children().first().next()
  const $usertag = $('article').children().first().children().last()
  const $tweetText = $('article').children().first().next()
  const $footerInfo = $('article').children().last().children().first()
  $('article').on('mouseover', () => {
    $('article').addClass('hover');
    $username.addClass('hover');
    $usertag.addClass('hover');
    $tweetText.addClass('hover');
    $footerInfo.addClass('hover');
  });

  $('article').on('mouseout', () => {
    $('article').removeClass('hover');
    $username.removeClass('hover');
    $usertag.removeClass('hover');
    $tweetText.removeClass('hover');
    $footerInfo.removeClass('hover');
  
  });

  
});