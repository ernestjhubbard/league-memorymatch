
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
    this.timeoutCard = this.timeoutCard.bind(this);
    this.timeoutCardMatch = this.timeoutCardMatch.bind(this);
    this.render(this.difficulty);
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    this.firstCardSibling = null;
    this.secondCardSibling = null;
    this.firstImage = null;
    this.secondImage = null;
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
        Stats.matchesMax = 12;
        classArray.length = classArray.length - 8;
        while (classArray.length) {
          let randomChamp = Math.floor(Math.random() * classArray.length);
          let classChosen = classArray.splice(randomChamp, 1);
          $('.main').append
            ($('<div>').addClass('carddiv').delegate('.card', 'click', this.handleCardClick).append
              ($('<div>').addClass('card').append
                ($('<div>').addClass('cardfront cardfrontillaoi'),
                  ($('<div>').addClass(`cardback hidden ${classChosen}`)))
              ))
        } $('.carddiv').css({ 'width': '16%', 'height': '29%' });
        break;
      case 'swain':
        $('li').css('color', 'rgb(243, 105, 105)');
        Stats.matchesMax = 14;
        classArray.length = classArray.length - 4;
        while (classArray.length) {
          let randomChamp = Math.floor(Math.random() * classArray.length);
          let classChosen = classArray.splice(randomChamp, 1);
          $('.main').append
            ($('<div>').addClass('carddiv').delegate('.card', 'click', this.handleCardClick).append
              ($('<div>').addClass('card').append
                ($('<div>').addClass('cardfront cardfrontswain'),
                  ($('<div>').addClass(`cardback hidden ${classChosen}`)))
              ))
        } $('.carddiv').css({ 'width': '14%', 'height': '25%' })
        break;
      case 'darius':
        $('li').css('color', '#ccc3c3');
        Stats.matchesMax = 16;
        while (classArray.length) {
          let randomChamp = Math.floor(Math.random() * classArray.length);
          let classChosen = classArray.splice(randomChamp, 1);
          $('.main').append
            ($('<div>').addClass('carddiv').delegate('.card', 'click', this.handleCardClick).append
              ($('<div>').addClass('card').append
                ($('<div>').addClass('cardfront cardfrontdarius'),
                  ($('<div>').addClass(`cardback hidden ${classChosen}`)))
              ))
        } $('.carddiv').css({ 'height': '26%' })
        break;
    }
  }
  handleCardClick(event) {
    let gamesPlayed = ('.gamesplayedli');
    let found = $(event.currentTarget).find('.disableclick').hasClass('disableclick'); //prevent multiple clicks begin
    if (found === true) {
      return;
    }
    if (this.firstCardClicked !== null && this.secondCardClicked !== null) {
      return
    }
    //---------------------------------------------------------------------------------prevent multiple clicks end
    if (this.firstCardClicked === null && this.secondCardClicked === null) {//--------------------first card check
      // $('audio#selection')[0].currentTime = 0;
      // $('audio#selection')[0].play();
      this.firstCardClicked = $(event.currentTarget).find('.cardback');
      this.firstCardSibling = $(event.currentTarget).find('.cardfront');
      this.firstImage = this.firstCardClicked.css('background-image');
      this.firstCardClicked.removeClass('hidden');
      Stats.attempts++;
    }
    else if (this.firstCardClicked !== null) {//--------------------------------------------second card check
      // $('audio#selection')[0].currentTime = 0;
      // $('audio#selection')[0].play();
      this.secondCardClicked = $(event.currentTarget).find('.cardback')
      this.secondCardSibling = $(event.currentTarget).find('.cardfront')
      this.secondImage = this.secondCardClicked.css('background-image');
      this.secondCardClicked.removeClass('hidden');
      Stats.attempts++;
      if (this.secondCardClicked.is(this.firstCardClicked)) {//----------------------------------prevent clicking same card
        this.secondCardClicked = null;
        return;
      }
      if (this.firstImage === this.secondImage) {//----------------------------------------------check if match
        // $('audio#matchedcard')[0].pause();
        // $('audio#matchedcard')[0].currentTime = 0;
        // $('audio#matchedcard')[0].play();
        ++Stats.matches;
        this.secondCardClicked.addClass('disableclick');
        this.firstCardClicked.addClass('disableclick');
        new Stats('display');
        setTimeout(this.timeoutCardMatch, 1500);
        if (Stats.matches === Stats.matchesMax) {//-----------------------------------------------match win
          stopAndPlaySoundsAndVideo('victory');
          $('.victory').modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
          });
          ++Stats.gamesPlayed;
          new Stats('reset');
        }
      } else {//-----------------------------------------------------------------------failed match
        setTimeout(this.timeoutCard, 1500);
        new Stats('display');
      }
    }
  }
  timeoutCard() {
    this.firstCardClicked.addClass('hidden');
    this.secondCardClicked.addClass('hidden');
    this.firstCardClicked = null;
    this.secondCardClicked = null;
  }
  timeoutCardMatch() {
    this.firstCardClicked.addClass('hidden');
    this.firstCardSibling.addClass('hidden');
    this.secondCardClicked.addClass('hidden');
    this.secondCardSibling.addClass('hidden');
    this.firstCardClicked = null;
    this.secondCardClicked = null;
  }
}