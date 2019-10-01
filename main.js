$(document).ready(initializeApp);

function initializeApp() {
  $('.card').on('click', handleCardClick);
  $('#modalYouWon').hide();
}
function showCard() {
  $('.cardfront').removeClass('hidden')
}
function handleCardClick(event) {
  console.log(event);
  var parent = $(event.currentTarget);
  var child = parent.find('.cardfront');
  child.addClass('hidden');
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    firstImage = firstCardClicked.find('.cardback');
    imageSource = firstImage.css('background-image');
  }
  else if (firstCardClicked !== null) {
    secondCardClicked = $(event.currentTarget);
    secondImage = secondCardClicked.find('.cardback');
    secondImageSource = secondImage.css('background-image');
    if (imageSource === secondImageSource) {
      console.log('match');
      matches = matches + 1;
      firstCardClicked = null;
      if (matches === maxMatches) {
        $("#modalYouWon").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
      }
    } else if (imageSource !== secondImageSource) {
      setTimeout(showCard, 1500);
      firstCardClicked = null;
    }
  }
};
var firstImage;
var imageSource;
var secondImage;
var secondImageSource;
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 1;
