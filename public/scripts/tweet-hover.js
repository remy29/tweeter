$(document).ready(function() { 

// adds and removes .hover class to various html elements to change styling when mouse enters tweet
  $('article').on('mouseover', function() { 
    const $username = $(this).children().first().children().first().next()
    const $usertag = $(this).children().first().children().last()
    const $tweetText = $(this).children().first().next()
    const $footerInfo = $(this).children().last().children().first()
    $(this).addClass('hover');
    $username.addClass('hover');
    $usertag.addClass('hover');
    $tweetText.addClass('hover');
    $footerInfo.addClass('hover');
  });

  $('article').on('mouseout', function() {
    const $username = $(this).children().first().children().first().next()
    const $usertag = $(this).children().first().children().last()
    const $tweetText = $(this).children().first().next()
    const $footerInfo = $(this).children().last().children().first()
    $(this).removeClass('hover');
    $username.removeClass('hover');
    $usertag.removeClass('hover');
    $tweetText.removeClass('hover');
    $footerInfo.removeClass('hover');
  });

  
});