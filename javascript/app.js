$(document).ready(function(){

  var turnCounter = 0;
  var endOfGameCounter = 0;
  var shakaScore = 0;
  var broScore = 0;
  var waitTime = 1000;
  var shakaMoves = [];
  var broMoves = [];
  var shaka = '<img src="images/shaka.png">';
  var bro = '<img src="images/bro.png">';
  var positions = ['left', 'top', 'right', 'horizontal', 'vertical', 'diagonal-left', 'diagonal-right'];
  var timer;
  var avoidCorners;

  function myTurn(shakaOrBro, movesArray, scoreClass, myTurnClass, theirTurnClass, that) {
    stopTimer();
    $(that).addClass('clicked');
    $(that).html(shakaOrBro);
    newMove = $(that).attr('data').split(' ');
    movesArray = $.merge(movesArray, newMove);
    console.log(movesArray);
    if (hasThreeInARow(movesArray)) {
      var score = Number($(scoreClass).html());
      $(scoreClass).html(score + 1);
      reset();
    }
    $(theirTurnClass).slideDown('fast');
    $(myTurnClass).css('display', 'none');
    endOfGameCounter++;
    turnCounter++;
    switchTurnsCountdown();
    if (endOfGameCounter === 9){
      reset(); 
    }
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
    turnCounter = 0 ;
    endOfGameCounter = 0;
    $('img').remove();
    $('.grid').removeClass('clicked');
  }

  function switchTurnsCountdown(){
    function switchTurn(myTurnClass, theirTurnClass){
      timer = setTimeout(function(){
        turnCounter++;
        $(theirTurnClass).slideDown('fast');
        $(myTurnClass).css('display', 'none');
      }, waitTime)
    }
    if (turnCounter % 2 === 0){
      switchTurn('.shaka-turn', '.bro-turn');
    } else {
      switchTurn('.bro-turn', '.shaka-turn');
    }
  }

  function stopTimer(){
    clearTimeout(timer);
  }

  function computerLogic(humanMoves, computerMoves){
    var availableSpaces = $('.grid').not('.clicked');
    function winOrBlock(movesArray){
      for (var i=0;i<availableSpaces.length;i++){
        var possibleMove = $(availableSpaces[i]).attr('data').split(' ');
        if (hasThreeInARow(movesArray.concat(possibleMove))){
          console.log('returned '+ movesArray)
          return availableSpaces[i];
        }
      }
    }
    if(winOrBlock(broMoves)) { return winOrBlock(broMoves) };
    if (winOrBlock(shakaMoves)) { return winOrBlock(shakaMoves) };

    if (avoidCorners){
      var notACorner = $(availableSpaces).not('.top-left, .top-right, .bottom-left, .bottom-right');
      avoidCorners = false;
      console.log('avoided corners')
      return notACorner[0];
    }
    if (!$('.middle-center').hasClass('clicked') && endOfGameCounter == 1){
      avoidCorners = true;
      return $('.middle-center');
    }
    var pickAny = Math.floor(Math.random() * availableSpaces.length)
      return availableSpaces[pickAny];
  }

  function computersTurn(){
    $('.grid').off('click');
      setTimeout(function(){
        myTurn(bro, broMoves, '.bro', 'shaka-turn', 'bro-turn', computerLogic());
        turnCounter--;
        $('.grid').on('click', function(){
          var that = this;
          play(that);
        });
        return 'nothing';
      }, waitTime);
  }

  function play(thatSquare){
    if ($(thatSquare).hasClass('clicked')){ 
      return 'nothing';
    }
    myTurn(shaka, shakaMoves, '.shaka', '.shaka-turn', '.bro-turn', thatSquare);
    computersTurn();
    console.log(endOfGameCounter);
    
  }

  $('.grid').on('click', function(){
    var that = this;
    play(that);
  });
});













