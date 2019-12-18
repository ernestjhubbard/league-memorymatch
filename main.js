$(document).ready(initializeApp);
//Global variables
var gamesPlayed = ('.gamesplayedli');
var attempts = null;
var games_played = null;
var matches_max = 2;
var matches = null;
var firstCardClicked = null;
var secondCardClicked = null;
var cardDiv1;
var cardDiv2;
function initializeApp() {
  $('.card').on('click', handleCardClick);
  $('#modalYouWon').hide();
}
function showCard() {
  firstCardClicked = null;
  secondCardClicked = null;
}
function handleCardClick(event) {
  var found = $(event.currentTarget).find('.disableclick').hasClass('disableclick');
  if(found === true){
    return;
  }
  if (firstCardClicked !== null && secondCardClicked !== null) {
    return
  }
  if (firstCardClicked === null && secondCardClicked === null) {
    cardDiv1 = $(event.currentTarget).find('.cardfront');
    firstCardClicked = $(event.currentTarget).find('.cardback');
    firstImage = firstCardClicked.css('background-image');
    firstCardClicked.removeClass('hidden');
    attempts++;
  }
  else if (firstCardClicked !== null) {
    displayStats()
    cardDiv2 = $(event.currentTarget).find('.cardfront');
    secondCardClicked = $(event.currentTarget).find('.cardback')
    secondImage = secondCardClicked.css('background-image');
    secondCardClicked.removeClass('hidden');
    if (secondCardClicked.is(firstCardClicked)) {
      secondCardClicked = null;
      return;
    }
    if (firstImage === secondImage) {
      console.log('match');
      matches++;
      setTimeout(function () {
        secondCardClicked.addClass('disableclick');
        firstCardClicked.addClass('disableclick');
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
      if (matches === matches_max) {
        $("#modalYouWon").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
      }
    } setTimeout(function () {
      firstCardClicked.addClass('hidden');
      secondCardClicked.addClass('hidden');
      firstCardClicked = null;
      secondCardClicked = null;

    }, 1500);
  }
};
function calculateAccuracy() {
  var accuracy = matches / attempts;
  return accuracy;
}
function displayStats() {
  var newAccuracy = calculateAccuracy()
  newAccuracy *= 100;
  var accuracyClass = $('.accuracyli')
  accuracyClass.text(" " + newAccuracy.toFixed(0) + ' %');
  $('.attemptsli').text(attempts.toString());
}
