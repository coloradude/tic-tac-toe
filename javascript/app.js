$(document).ready(function(){

  var turnCounter = 0;
  var shakaScore = 0;
  var broScore = 0;
  var shakaMoves = [];
  var broMoves = [];
  var shaka = '<img src="images/shaka.png">';
  var bro = '<img src="images/bro.png">';
  var positions = ['left', 'top', 'right', 'horizontal', 'vertical', 'diagonal-left', 'diagonal-right'];

  function hasThreeInARow(playerMoves){
    var recurrences = playerMoves.reduce(function(obj, val){
      obj[val] = obj[val] + 1 || 1;
      return obj;
    },{});
    for (anyMove in recurrences){
      if (recurrences[anyMove] === 3) {
        return true;
      }
    }
  }

  function reset(){
    shakaMoves = [];
    broMoves = [];
    turnCounter = -1;
    $('img').remove();
    $('.grid').removeClass('clicked');
  }

  $('.grid').on('click', function(){
    
    //Prevents double clicks
    if ($(this).hasClass('clicked')){
      return 'nothing';
    }
    $(this).addClass('clicked');

    //Shaka turn
    if (turnCounter % 2 === 0){
      $(this).html(shaka);
      shakaMoves = $(this).attr('data').split(' ').concat(shakaMoves);
      if (hasThreeInARow(shakaMoves)) { 
        shakaScore += 1;
        $('.shaka').html(shakaScore);
        reset();
        turnCounter +=1
      }
      turnCounter += 1;

    //Bro turn
    } else {
      broMoves = $(this).attr('data').split(' ').concat(broMoves);
      $(this).html(bro);
      if (hasThreeInARow(broMoves)){
        broScore += 1;
        $('.bro').html(broScore);
        reset();
        turnCounter += 1;
      }
      turnCounter += 1;
    }
  });
});










