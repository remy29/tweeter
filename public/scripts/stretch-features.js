/* This code handles jQuery for animations and function of up-toggle and write new tweet buttons */
$(document).ready(function() {
  
  $(".new-tweet").hide();
  $("#up-toggle").hide();
  
  
  $('#right-nav').on('click', () => { //
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  });

  $('#right-nav').on('mouseover', () => {
    $('#right-nav').css('cursor', 'pointer');
  });

  $(window).on('scroll', () => {
    if ($(window.innerWidth)[0] < 1024) {
      if ($(window).scrollTop() > 399) {
        $('#right-nav').hide();
        $("#up-toggle").show();
      }
      if ($(window).scrollTop() < 399) {
        $('#right-nav').show();
        $("#up-toggle").hide();
      }
    }
    if ($(window.innerWidth)[0] > 1024) {
      if ($(window).scrollTop() > 199) {
        $("#up-toggle").show();
      }
      if ($(window).scrollTop() < 199) {
        $("#up-toggle").hide();
      }
    }
  });

  $(window).on('resize', () => {
    if ($(window.innerWidth)[0] > 1024) {
      $('#right-nav').show();
    }
    if ($(window.innerWidth)[0] < 1024 && $(window).scrollTop() > 399) {
      $('#right-nav').hide();
    }
  });

  $("#up-toggle").on('click', () => {
    $(window).scrollTop(0);
  });

  setInterval(function() {
    $('#arrows').animate({opacity: '0.8'});
    $('#arrows').animate({opacity: '0.4'});
    $('#arrows').animate({opacity: '0.8'});
    $('#arrows').animate({opacity: '1'});
  }, 2500);

});



