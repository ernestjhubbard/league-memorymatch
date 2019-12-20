$(document).ready(initializeApp);
var gamesPlayed = ('.gamesplayedli');
var attempts = 0;
var games_played = null;
var matches_max = 14;
var matches = 0;
var firstCardClicked = null;
var secondCardClicked = null;
var cardDiv1;
var cardDiv2;
//--------------------------GLOBAL VARIABLES END--------------------------

//--------------------------INITIALIZE APP BEGIN--------------------------
function initializeApp() {
  var difficulty;//----------------------------------------------------------------store difficulty for switch
  $("#myModal").modal({//----------------------------------------------------------initial modal
    escapeClose: false,
    clickClose: false,
    showClose: false
  });
  $('#playagain').on('click', function () {
    $("#myModal").modal({
      escapeClose: false,
      clickClose: false,
      showClose: false
    });
  })
  $('.resetcurrentgame').on('click', function () {//-------------------------------reset current
    ++games_played;
    resetStats();
    switch (difficulty) {
      case 'illaoi':
        shuffleAndAppend('illaoi');
        break;
      case 'swain':
        shuffleAndAppend('swain');
        break;
      case 'darius':
        shuffleAndAppend('darius');
        break;
    }
  });
  $('.resetfullgame').on('click', function () {
    resetStats();
    $('.card').remove();
    $("#myModal").modal({
      escapeClose: false,
      clickClose: false,
      showClose: false
    });
  });
  $('.uldifficulty').on('mouseenter', function () {
    $('.difficulty').removeClass('hidden');
    $('.carddiv').addClass('z-low');
  })
  $('.uldifficulty').on('mouseleave', function () {
    $('.difficulty').addClass('hidden');
    $('.carddiv').removeClass('z-low');
  })
  $('.ulreset').on('mouseenter', function () {
    $('.reset').removeClass('hidden');
    $('.carddiv').addClass('z-low');
  })
  $('.ulreset').on('mouseleave', function () {
    $('.reset').addClass('hidden');
    $('.carddiv').removeClass('z-low');
  })
  $('.difficulty').on('click', function () {
    ++games_played;
    displayStats();
  })
  $('.introbutton1').on('click', function () {//------------------------------------modal buttons
    games_played = 0;
    resetStats();
    displayStats();
    difficulty = 'illaoi'; //sets correct amount for reset button
    addAndRemoveBackgrounds('illaoi');
    $('.jquery-modal').hide();
    setTimeout(shuffleAndAppend('illaoi'), 1500);
  })
  $('.introbutton2').on('click', function () {
    games_played = 0;
    resetStats();
    displayStats();
    difficulty = 'swain';
    addAndRemoveBackgrounds('swain');
    $('.jquery-modal').hide();
    setTimeout(shuffleAndAppend('swain'), 1500);
  })
  $('.introbutton3').on('click', function () {
    games_played = 0;
    resetStats();
    displayStats();
    difficulty = 'darius';
    addAndRemoveBackgrounds('darius');
    $('.jquery-modal').hide();
    setTimeout(shuffleAndAppend('darius'), 1500);
  })
}
function showCard() {
  firstCardClicked = null;
  secondCardClicked = null;
}
function addAndRemoveBackgrounds(champion) {
  $('body').removeClass('dariusbackground');
  $('body').removeClass('illaoibackground');
  $('body').removeClass('swainbackground');
  switch (champion) {
    case 'illaoi':
      $('body').addClass('illaoibackground');
      break;
    case 'swain':
      $('body').addClass('swainbackground');
      break;
    case 'darius':
      $('body').addClass('dariusbackground');
      break;
    case 'victory':
      $('audio#victory')[0].play();
      break;
  }
}
function handleCardClick(event){
  var found = $(event.currentTarget).find('.disableclick').hasClass('disableclick');
  if (found === true) {
    return;
  }
  if (firstCardClicked !== null && secondCardClicked !== null) {
    return
  }//---------------------------------------------------------------------------------prevent multiple clicks end
  if (firstCardClicked === null && secondCardClicked === null) {//--------------------first card check
    cardDiv1 = $(event.currentTarget).find('.cardfront');
    firstCardClicked = $(event.currentTarget).find('.cardback');
    firstCardSibling = $(event.currentTarget).find('.cardfront');
    firstImage = firstCardClicked.css('background-image');
    firstCardClicked.removeClass('hidden');
    attempts++;
  }
  else if (firstCardClicked !== null) {//--------------------------------------------second card check
    cardDiv2 = $(event.currentTarget).find('.cardfront');
    secondCardClicked = $(event.currentTarget).find('.cardback')
    secondCardSibling = $(event.currentTarget).find('.cardfront')
    secondImage = secondCardClicked.css('background-image');
    secondCardClicked.removeClass('hidden');
    if (secondCardClicked.is(firstCardClicked)) {//----------------------------------prevent clicking same card
      secondCardClicked = null;
      return;
    }
    if (firstImage === secondImage) {
      ++matches;
      secondCardClicked.addClass('disableclick');
      firstCardClicked.addClass('disableclick');
      displayStats();
      setTimeout(function () {
        firstCardClicked.addClass('hidden');
        firstCardSibling.addClass('hidden');
        secondCardClicked.addClass('hidden');
        secondCardSibling.addClass('hidden');
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
      if (matches === matches_max) {//-----------------------------------------------match win
        $('.victory').modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
        ++games_played;
        resetStats();
      }
    } else {//-----------------------------------------------------------------------failed match
      setTimeout(function () {
        displayStats();
        firstCardClicked.addClass('hidden');
        secondCardClicked.addClass('hidden');
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
  }
}
//--------------------------CARD CLICK END--------------------------

//--------------------------STATS FUNCTIONS BEGIN--------------------------
function displayStats() {//---------------------------------------------------------update score banner
  function calculateAccuracy() {
    return matches / attempts;
  }
  var newAccuracy = calculateAccuracy();//------------------------------------------accuracy
  if (isNaN(newAccuracy)) {
    newAccuracy = 0;
  }
  var percent = newAccuracy * 100;
  var accuracyClass = $('.accuracyli')
  accuracyClass.text(" " + percent.toFixed(0) + ' %');
  $('.attemptsli').text(attempts);
  $('.matchesli').text(matches);
  $('.gamesplayedli').text(games_played);
}
function resetStats() {//-----------------------------------------------------------reset stats
  $('.attemptsli').text('0');
  $('.accuracyli').text('0');
  $('.matchesli').text('0');
  attempts = 0;
  matches = 0;
  $('.gamesplayedli').text(games_played);
  var returnCards = $('.cardback');
  returnCards.removeClass('disableclick');
}

//--------------------------STATS FUNCTIONS END--------------------------

//--------------------------DYNAMIC AND SHUFFLE BEGIN--------------------------
function shuffleAndAppend(difficulty) {
  $('.carddiv').remove();
  var classArray = [
    'illaoi', 'illaoi',
    'darius', 'darius',
    'riven', 'riven',
    'ziggs', 'ziggs',
    'mordekaiser', 'mordekaiser',
    'vi', 'vi',
    'kayn', 'kayn',
    'shyvana', 'shyvana',
    'teemo', 'teemo',
    'lux', 'lux',
    'vayne', 'vayne',
    'annie', 'annie',
  ];
  matches_max = 16;
  switch (difficulty) {
    case 'illaoi':
      $('li').css('color', 'rgb(221, 243, 124)');
      while (classArray.length) {
        var randomChamp = Math.floor(Math.random() * classArray.length);
        var classChosen = classArray.splice(randomChamp, 1);
        $('.main').append($(`<div class="carddiv"><div class="card" onclick="handleCardClick(event)"><div class="cardfront cardfrontillaoi"></div><div class="${classChosen} cardback hidden">`));
      }
      break;
    case 'swain':
      $('li').css('color', 'rgb(243, 105, 105)');
      while (classArray.length) {
        var randomChamp = Math.floor(Math.random() * classArray.length);
        var classChosen = classArray.splice(randomChamp, 1);
        $('.main').append($(`<div class="carddiv"><div class="card" onclick="handleCardClick(event)"><div class="cardfront cardfrontswain"></div><div class="${classChosen} cardback hidden">`));
      }
      break;
    case 'darius':
      $('li').css('color', '#ccc3c3');
      while (classArray.length) {
        var randomChamp = Math.floor(Math.random() * classArray.length);
        var classChosen = classArray.splice(randomChamp, 1);
        $('.main').append($(`<div class="carddiv"><div class="card" onclick="handleCardClick(event)"><div class="cardfront cardfrontdarius"></div><div class="${classChosen} cardback hidden">`));
      }
      break;
  }
}
//--------------------------DYNAMIC AND SHUFFLE END--------------------------
//--------------------------DEBUGGING FUNCTIONS--------------------------
function cardReveal() {
  $('.cardback').removeClass('hidden');
}
function cardOpacity() {
  $('.cardback').removeClass('hidden');
  $('.cardback').css('opacity', '.4');
}
