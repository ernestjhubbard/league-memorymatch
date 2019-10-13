$(document).ready(initializeApp);

function initializeApp() {
  let card = new Card;
}
class Card {
  constructor(difficulty) {
    this.attempts = 0;
    this.gamesPlayed = null;
    this.matchesMax = 14;
    this.matches = 0;
    this.difficulty = difficulty;
    this.cardDiv = $('<div>').addClass('carddiv');
    this.card = $('<div>').addClass('card');
    this.cardFront = $('<div>').addClass('cardfront');
    this.cardBack = $('<div>').addClass('cardback');
    this.allLis = $('li');
    this.main = $('.main');
    this.handleCardClick = this.handleCardClick.bind(this);
    this.render(this.difficulty);
  }
  render(difficulty) {
    let classArray = [
      'illaoi', 'illaoi',
      'darius', 'darius',
      'riven', 'riven',
      'veigar', 'veigar',
      'ziggs', 'ziggs',
      'mordekaiser', 'mordekaiser',
      'vi', 'vi',
      'kayn', 'kayn',
      'shyvana', 'shyvana',
      'teemo', 'teemo',
      'caitlyn', 'caitlyn',
      'lux', 'lux',
      'masteryi', 'masteryi',
      'vayne', 'vayne',
      'annie', 'annie',
      'twitch', 'twitch'
    ];
    $('.carddiv').remove();
    switch (difficulty) {
      case 'illaoi':
        $('li').css('color', 'rgb(221, 243, 124)');
        this.matchesMax = 12;
        classArray.length = classArray.length - 8;
        while (classArray.length) {
          let randomChamp = Math.floor(Math.random() * classArray.length);
          let classChosen = classArray.splice(randomChamp, 1);
          $('.main').append
            ($('<div>').addClass('carddiv').append
              ($('<div>').addClass('card').append
                ($('<div>').addClass('cardfront cardfrontillaoi'),
                  ($('<div>').addClass(`cardback hidden ${classChosen}`)))
              ))
        } $('.carddiv').css({ 'width': '16%', 'height': '29%' });
        break;
      case 'swain':
        $('li').css('color', 'rgb(243, 105, 105)');
        this.matchesMax = 14;
        classArray.length = classArray.length - 4;
        while (classArray.length) {
          let randomChamp = Math.floor(Math.random() * classArray.length);
          let classChosen = classArray.splice(randomChamp, 1);
          $('.main').append
            ($('<div>').addClass('carddiv').append
              ($('<div>').addClass('card').append
                ($('<div>').addClass('cardfront cardfrontswain'),
                  ($('<div>').addClass(`cardback hidden ${classChosen}`)))
              ))
        } $('.carddiv').css({ 'width': '14%', 'height': '25%' })
        break;
      case 'darius':
        $('li').css('color', '#ccc3c3');
        this.matchesMax = 16;
        while (classArray.length) {
          let randomChamp = Math.floor(Math.random() * classArray.length);
          let classChosen = classArray.splice(randomChamp, 1);
          $('.main').append
            ($('<div>').addClass('carddiv').append
              ($('<div>').addClass('card').append
                ($('<div>').addClass('cardfront cardfrontdarius'),
                  ($('<div>').addClass(`cardback hidden ${classChosen}`)))
              ))
        } $('.carddiv').css({ 'height': '26%' })
        break;
    }
  }
  handleCardClick(event) {
    debugger;
    console.log($(event.currentTarget));
    let gamesPlayed = ('.gamesplayedli');
    let firstCardClicked = null;
    let secondCardClicked = null;
    let firstCardSibling = null;
    let secondCardSibling = null;
    let found = $(event.currentTarget).find('.disableclick').hasClass('disableclick'); //prevent multiple clicks begin
    if (found === true) {
      return;
    }
    if (this.firstCardClicked !== null && this.secondCardClicked !== null) {
      return
    }//---------------------------------------------------------------------------------prevent multiple clicks end
    if (firstCardClicked === null && secondCardClicked === null) {//--------------------first card check
      $('audio#selection')[0].currentTime = 0;
      $('audio#selection')[0].play();
      firstCardClicked = $(event.currentTarget).find('.cardback');
      firstCardSibling = $(event.currentTarget).find('.cardfront');
      firstImage = firstCardClicked.css('background-image');
      firstCardClicked.removeClass('hidden');
      attempts++;
    }
    else if (firstCardClicked !== null) {//--------------------------------------------second card check
      $('audio#selection')[0].currentTime = 0;
      $('audio#selection')[0].play();
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
        ++this.matches;
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
        if (this.matches === this.matchesMax) {//-----------------------------------------------match win
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
          this.firstCardClicked.addClass('hidden');
          secondCardClicked.addClass('hidden');
          this.firstCardClicked = null;
          secondCardClicked = null;
        }, 1500);
      }
    }
  }
}