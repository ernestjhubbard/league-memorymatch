$(document).ready(initializeApp);


function initializeApp() {
  let matchLayout = new MatchLayout()
  matchLayout.render();
}
class MatchLayout {
  constructor() {
    this.body = $('body');
    this.nav = $('<nav>').addClass('navbar');//
    this.statBox = $('<ul>').addClass('statbox');
    this.box = $('<ul>').addClass('box');
    this.ulBoxReset = $('<div>').addClass('ulbox ulreset');
    this.ulBoxDifficulty = $('<div>').addClass('ulbox uldifficulty');
    this.resetLi = $('<li>').addClass('resetli');
    this.resetButton = $('<button>').addClass('resetbutton');
    this.resetDropdown = $('<div>').addClass('resetdropdown');
    this.resetCurrent = $('<li>').addClass('reset resetcurrentgame hidden');
    this.resetFull = $('<li>').addClass('reset resetfullgame hidden');
    this.difficultyLi = $('<li>').addClass('difficultyli');
    this.difficultyButton = $('<button>').addClass('difficultybutton');
    this.difficultyDropdown = $('<div>').addClass('difficultydropdown');
    this.difficulty1 = $('<div>').addClass('difficulty1 difficulty hidden introbutton introbutton1');
    this.difficulty1 = $('<div>').addClass('difficulty2 difficulty hidden introbutton introbutton1');
    this.difficulty1 = $('<div>').addClass('difficulty3 difficulty hidden introbutton introbutton1');
    this.restContainer = $('<div>').addClass('restcontainer');
    this.main = $('<div>').addClass('main');
  }
  render() {
    let card = new Card
    this.body.append(this.nav);
    this.body.append(this.restContainer);
    this.restContainer.append(this.main);
    $('.card').on('click', function () {
      card.handleCardClick(event);
    });
    $('.navbar').append(this.statBox);
    for (var ulbox = 0; ulbox < 3; ulbox++) {
      $('.statbox').append($('<div>')
        .addClass('ulbox')
        .append($('<ul>')
          .addClass('box')
          .append($('<li><li>'))));
    }
    $('.ulbox:nth-of-type(1) li:nth-of-type(1)').text('GAMES');
    $('.ulbox:nth-of-type(1) li:nth-of-type(2)').addClass('gamesplayedli').text('0');
    $('.ulbox:nth-of-type(2) li:nth-of-type(1)').text('MATCHES')
    $('.ulbox:nth-of-type(2) li:nth-of-type(2)').addClass('matchesli').text('0')
    $('.ulbox:nth-of-type(3) li:nth-of-type(1)').text('ACCURACY');
    $('.ulbox:nth-of-type(3) li:nth-of-type(2)').addClass('accuracyli').text('0 %');
    //reset
    $('.statbox').append(this.ulBoxReset);
    $('.ulreset').append(this.box);
    $('.ulreset .box').append(this.resetLi);
    $('.resetli').text('RESET').append(this.resetButton)
    $('.resetbutton').append(this.resetDropdown);
    $('.resetdropdown').append(this.resetCurrent, this.resetFull);
    //difficulty
    $('.statbox').append(this.ulBoxDifficulty)
    $('.uldifficulty').append($('<div>').addClass('box'));
    $('.uldifficulty>.box').append(this.difficultyLi);
    $('.difficultyli').append(this.difficultyButton);
    $('.difficultybutton').append(this.difficultyDropdown).text('DIFFICULTY');
    $('.difficultydropdown').append(this.difficulty1, this.difficulty2, this.difficulty3)
  }
  resetClickHandler() {
  }
  difficultyClickHandler() {
  }

}



