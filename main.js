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
  $('.introbutton').hover(function () {//------------------------------------------hover sounds buttons
    $('audio#cardhover')[0].currentTime = 0;
    $('audio#cardhover')[0].play();
  })
  $('.introbutton').click(function () {
    $('audio#selection')[0].currentTime = 0;
    $('audio#selection')[0].play();
  })
  $('.reset').hover(function () {
    $('audio#cardhover')[0].currentTime = 0;
    $('audio#cardhover')[0].play();
  })
  $('.reset').click(function () {
    $('audio#selection')[0].currentTime = 0;
    $('audio#selection')[0].play();
  })
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
  $('.resetfullgame').on('click', function () {//-----------------------------------reset full
    resetStats();
    $('.card').remove();
    $("#myModal").modal({
      escapeClose: false,
      clickClose: false,
      showClose: false
    });
  });
  $('.uldifficulty').on('mouseenter', function () {//-------------------------------hover dropdown
    $('.difficulty').removeClass('hidden');
  })
  $('.uldifficulty').on('mouseleave', function () {
    $('.difficulty').addClass('hidden');
  })
  $('.ulreset').on('mouseenter', function () {
    $('.reset').removeClass('hidden');
  })
  $('.ulreset').on('mouseleave', function () {
    $('.reset').addClass('hidden');
  })
  $('.difficulty').on('click', function () {
    ++games_played;
    displayStats();
  })
  $('.introbutton1').on('click', function () {//------------------------------------modal buttons
    resetStats();
    displayStats();
    difficulty = 'illaoi'; //sets correct amount for reset button
    stopAndPlaySoundsAndVideo('illaoi');
    $('.jquery-modal').hide();
    setTimeout(shuffleAndAppend('illaoi'), 1500);
  })
  $('.introbutton2').on('click', function () {
    resetStats();
    displayStats();
    difficulty = 'swain';
    stopAndPlaySoundsAndVideo('swain');
    $('.jquery-modal').hide();
    setTimeout(shuffleAndAppend('swain'), 1500);
  })
  $('.introbutton3').on('click', function () {
    resetStats();
    displayStats();
    difficulty = 'darius';
    stopAndPlaySoundsAndVideo('darius');
    $('.jquery-modal').hide();
    setTimeout(shuffleAndAppend('darius'), 1500);
  })
}
function hoverSound() {//-------------------------------------------------------------sound on card hover
  $('.carddiv').hover(function () {
    $('audio#cardhover')[0].currentTime = 0;
    $('audio#cardhover')[0].play();
  })
}
//--------------------------INITIALIZE APP END--------------------------
function showCard() {
  firstCardClicked = null;
  secondCardClicked = null;
}
function stopAndPlaySoundsAndVideo(champion) {//--------------------------------------video and audio control
  $('.video1').addClass('hidden');
  $('.video2').addClass('hidden');
  $('.video3').addClass('hidden');
  $('audio#illaoitheme')[0].pause()
  $('audio#swaintheme')[0].pause()
  $('audio#dariustheme')[0].pause()
  $('audio#illaoitheme')[0].currentTime = 0;
  $('audio#swaintheme')[0].currentTime = 0;
  $('audio#dariustheme')[0].currentTime = 0;
  switch (champion) {
    case 'illaoi':
      $('audio#illaoitheme').prop('volume', 0.5);
      $('audio#illaoitheme')[0].play();
      $('.video1').removeClass('hidden');
      break;
    case 'swain':
      $('audio#swaintheme').prop('volume', 0.5);
      $('audio#swaintheme')[0].play();
      $('.video2').removeClass('hidden');
      break;
    case 'darius':
      $('audio#dariustheme').prop('volume', 0.5);
      $('audio#dariustheme')[0].play();
      $('.video3').removeClass('hidden');
      break;
    case 'victory':
      $('audio#victory')[0].play();
      break;
  }
}
//--------------------------CARD CLICK BEGIN--------------------------
function handleCardClick(event) {
  console.log(event.currentTarget)
  var found = $(event.currentTarget).find('.disableclick').hasClass('disableclick'); //prevent multiple clicks begin
  if (found === true) {
    return;
  }
  if (firstCardClicked !== null && secondCardClicked !== null) {
    return
  }//---------------------------------------------------------------------------------prevent multiple clicks end
  if (firstCardClicked === null && secondCardClicked === null) {//--------------------first card check
    $('audio#selection')[0].currentTime = 0;
    $('audio#selection')[0].play();
    cardDiv1 = $(event.currentTarget).find('.cardfront');
    firstCardClicked = $(event.currentTarget).find('.cardback');
    firstCardSibling = $(event.currentTarget).find('.cardfront');
    firstImage = firstCardClicked.css('background-image');
    firstCardClicked.removeClass('hidden');
    attempts++;
  }
  else if (firstCardClicked !== null) {//--------------------------------------------second card check
    $('audio#selection')[0].currentTime = 0;
    $('audio#selection')[0].play();
    cardDiv2 = $(event.currentTarget).find('.cardfront');
    secondCardClicked = $(event.currentTarget).find('.cardback')
    secondCardSibling = $(event.currentTarget).find('.cardfront')
    secondImage = secondCardClicked.css('background-image');
    secondCardClicked.removeClass('hidden');
    if (secondCardClicked.is(firstCardClicked)) {//----------------------------------prevent clicking same card
      secondCardClicked = null;
      return;
    }
    if (firstImage === secondImage) {//----------------------------------------------check if match
      $('audio#matchedcard')[0].pause();
      $('audio#matchedcard')[0].currentTime = 0;
      $('audio#matchedcard')[0].play();
      console.log('match');
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
        stopAndPlaySoundsAndVideo('victory');
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
};
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
    'illaoi',
    'illaoi',
    'darius',
    'darius',
    'riven',
    'riven',
    'veigar',
    'veigar',
    'ziggs',
    'ziggs',
    'mordekaiser',
    'mordekaiser',
    'vi',
    'vi',
    'kayn',
    'kayn',
    'shyvana',
    'shyvana',
    'teemo',
    'teemo',
    'caitlyn',
    'caitlyn',
    'lux',
    'lux',
    'masteryi',
    'masteryi',
    'vayne',
    'vayne',
    'annie',
    'annie',
    'twitch',
    'twitch'
  ];
  var newLength;
  switch (difficulty) {
    case 'illaoi':
      $('li').css('color', 'rgb(221, 243, 124)');
      matches_max = 12;
      newLength = classArray.length - 8;
      classArray.length = newLength;
      while (classArray.length) {
        var randomChamp = Math.floor(Math.random() * classArray.length);
        var classChosen = classArray.splice(randomChamp, 1);
        $('.main').append($(`<div class="carddiv"><div class="card" onmouseover="hoverSound()" onclick="handleCardClick(event)"><div class="cardfront cardfrontillaoi"></div><div class="${classChosen} cardback hidden">`));
      }
      $('.carddiv').css({ 'width': '16%', 'height': '29%' });
      break;
    case 'swain':
      $('li').css('color', 'rgb(243, 105, 105)');
      matches_max = 14;
      newLength = classArray.length - 4;
      classArray.length = newLength;
      while (classArray.length) {
        var randomChamp = Math.floor(Math.random() * classArray.length);
        var classChosen = classArray.splice(randomChamp, 1);
        $('.main').append($(`<div class="carddiv"><div class="card" onmouseover="hoverSound()" onclick="handleCardClick(event)"><div class="cardfront cardfrontswain"></div><div class="${classChosen} cardback hidden">`));
      }
      $('.carddiv').css({ 'width': '14%', 'height': '25%' })
      break;
    case 'darius':
      $('li').css('color', '#ccc3c3');
      matches_max = 16;
      while (classArray.length) {
        var randomChamp = Math.floor(Math.random() * classArray.length);
        var classChosen = classArray.splice(randomChamp, 1);
        $('.main').append($(`<div class="carddiv"><div class="card" onmouseover="hoverSound()" onclick="handleCardClick(event)"><div class="cardfront cardfrontdarius"></div><div class="${classChosen} cardback hidden">`));
      }
      $('.carddiv').css({ 'height': '26%' })
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