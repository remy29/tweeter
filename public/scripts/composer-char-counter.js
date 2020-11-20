// DOM event listener that changes the value assigned to counter HTML element and turns it red if val < 0
$(document).ready(function() {

  $('textarea').on('input', () => {
  
    const $value = $('#tweet-text').val();
    const remainingChar = 140 - $value.length;

    $('.container').find('#counter')[0]['innerHTML'] = remainingChar; //updates char counter value

    if (remainingChar < 0) { // changes counters class when below a certain value
      $('#counter').removeClass('counterB').addClass('counterR');
    }
    
    if (remainingChar >= 0 && $('#counter').attr('class') === 'counterR') {
      $('#counter').removeClass('counterR').addClass('counterB');
    }
  });

  
});