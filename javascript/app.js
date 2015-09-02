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
  var timer;
  var isPlayingAgainstComputer = (prompt('Do you want to play against a computer? YES or NO').toLowerCase() === 'yes');

  function myTurnBro(shakaOrBro, movesArray, scoreClass, myTurnClass, theirTurnClass, that) {
    stopTimer();
    $(that).html(shakaOrBro);
    newMove = $(that).attr('data').split(' ');
    $.merge(movesArray, newMove);
    if (hasThreeInARow(movesArray)) {
      var score = Number($(scoreClass).html());
      $(scoreClass).html(score + 1);
      reset();
      turnCounter++;
    }
    $(theirTurnClass).slideDown('fast');
    $(myTurnClass).css('display', 'none');
    endOfGameCounter++;
    turnCounter++;
    switchTurnsCountdown();
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
    turnCounter -= 1;
    endOfGameCounter = -1;
    $('img').remove();
    $('.grid').removeClass('clicked');
  }

  function switchTurnsCountdown(){
    function switchTurn(myTurnClass, theirTurnClass){
      timer = setTimeout(function(){
        turnCounter++;
        $(theirTurnClass).slideDown('fast');
        $(myTurnClass).css('display', 'none');
      }, 5000)
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

  function computerTurn(){
    var randomClick = Math.floor(Math.random() * 9);
    var grid = $('.grid');
    if ($(grid[randomClick]).hasClass('clicked')){
      computerTurn();
    } else {
      myTurnBro(bro, broMoves, '.bro', 'shaka-turn', 'bro-turn', $(grid[randomClick]));
    }
  }

  function play(context){
    //Prevents double clicks
    if ($(context).hasClass('clicked')){ 
      return 'nothing';
    }
    $(context).addClass('clicked');
    if (turnCounter % 2 === 0){
      var that = context;
      console.log(context);
      myTurnBro(shaka, shakaMoves, '.shaka', '.shaka-turn', '.bro-turn', that);
      if(isPlayingAgainstComputer){
        $('.grid').off('click');
        setTimeout(function(){
          computerTurn();
          turnCounter -= 1;
          $('.grid').on('click', function(){
            var that = this;
            play(that);
          });
          return 'nothing';
        }, 5000);
      }
    } else {
      var that = context;
      myTurnBro(bro, broMoves, '.bro', '.bro-turn', '.shaka-turn', that);
    }
    if (endOfGameCounter === 9){
      reset();
    }
  }

  $('.grid').on('click', function(){
    var that = this;
    play(that);
  });
  
});














