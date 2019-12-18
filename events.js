
class Events {
  constructor(button) {
    this.startDifficulty = this.startDifficulty.bind(this);
    switch (button) {
      case 'intro1':
        this.startDifficulty('illaoi');
        break;
      case 'intro2':
        this.startDifficulty('swain');
        break;
      case 'intro3':
        this.startDifficulty('darius');
        break;
    }
  }
  resetCurrentGame() {
  }
  startDifficulty(difficulty) {
    this.gamesPlayed = null;
    switch (difficulty) {
      case 'illaoi':
        $('.jquery-modal').hide();
        this.startIllaoiGame();
        break;
      case 'swain':
        $('.jquery-modal').hide();
        this.startSwainGame();
        break;
      case 'darius':
        $('.jquery-modal').hide();
        this.startDariusGame();
        break;
    }
  }
  startIllaoiGame() {
    $('.jquery-modal').hide();
    new Card('illaoi');
  }
  startSwainGame() {
    $('.jquery-modal').hide();
    new Card('swain');
  }
  startDariusGame() {
    $('.jquery-modal').hide();
    new Card('darius')
  }
}