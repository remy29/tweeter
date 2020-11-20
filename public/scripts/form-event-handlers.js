$(document).ready(function() {
  
  $( "#alert-boxA" ).hide();
  $( "#alert-boxB" ).hide();

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


});