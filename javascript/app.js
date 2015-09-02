$(document).ready(function(){

  var turnCounter = 0;
  var endOfGameCounter = 0;
  var shakaScore = 0;
  var broScore = 0;
  var shakaMoves = [];
  var broMoves = [];
  var shaka = '<img src="images/shaka.png">';
  var bro = '<img src="images/bro.png">';
  var positions = ['left', 'top', 'right', 'horizontal', 'vertical', 'diagonal-left', 'diagonal-right'];

  function myTurnBro(teamName, movesArray, score, className, that) {
    $(that).html(teamName);
    newMove = $(that).attr('data').split(' ');
    $.merge(movesArray, newMove);
    if (hasThreeInARow(movesArray)) {
      score += 1;
      $(className).html(score);
      reset();
      turnCounter += 1;
    }
    endOfGameCounter += 1
    turnCounter += 1;
  }

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
    endOfGameCounter = 0;
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
      var that = this;
      myTurnBro(shaka, shakaMoves, shakaScore, '.shaka', that);

    //Bro turn
    } else {
      var that = this;
      myTurnBro(bro, broMoves, broScore, '.bro', that);
    }

    //Need to add popup somewhere
    if (endOfGameCounter === 9){
      reset();
    }
  });
});














