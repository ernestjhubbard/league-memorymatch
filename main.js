$(document).ready(initializeApp);
//Global variables
var gamesPlayed = ('.gamesplayed');
var attempts = null;
var games_played = null;
var match_maxes = 2;
var matches = null;
var firstImage;
var imageSource;
var secondImage;
var secondImageSource;
var firstCardClicked = null;
var secondCardClicked = null;
var parent;
var child;
var child1;
var child2;
//Global Variables
function initializeApp() {
  $('.card').on('click', handleCardClick);
  $('#modalYouWon').hide();
}
function showCard() {
  firstCardClicked = null;
  secondCardClicked = null;
}
function handleCardClick(event) {
  console.log(event);
  parent = $(event.currentTarget);
  child = parent.find('.cardback');
  child.removeClass('hidden');
  if (firstCardClicked === null && secondCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    firstImage = firstCardClicked.find('.cardback');
    imageSource = firstImage.css('background-image');
    child1 = child;
  }
  else if (firstCardClicked !== null && secondCardClicked !== null) {
    secondCardClicked = $(event.currentTarget);
    secondImage = secondCardClicked.find('.cardback');
    secondImageSource = secondImage.css('background-image');
    child2 = child;
    if (imageSource === secondImageSource) {
      console.log('match');
      matches++;
      if (matches === maxMatches) {
        $("#modalYouWon").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
      }
    } else if (imageSource !== secondImageSource) {
      setTimeout(function(){
        child1.addClass('hidden');
        child2.addClass('hidden');
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
  }
};
function calculateAccuracy(){
var accuracy = matches / attempts;
return accuracy;
}
function displayStats(){
  var newAccuracy = calculateAccuracy()
  newAccuracy *= 100;
  var accuracyClass = $('.accuracy')
  accuracyClass.text(newAccuracy.toFixed(0) + '%');
  $('.attempts').text(attempts.toString());
}
