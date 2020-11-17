// DOM event listener that changes the value assigned to counter HTML element
$(document).ready(function() {
  $('textarea').on('input', () => {
    const $input = $('#tweet-text');
    const value = $input.val();
    const remainingChar = 140 - value.length
    $('.container').find('#counter')[0]['innerHTML'] = remainingChar;
  })
});