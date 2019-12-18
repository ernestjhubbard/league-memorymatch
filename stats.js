$(document).ready(startStats);

function startStats() {
  let card = new Card;
}
class Stats {
  constructor(stats) {
    this.stats = stats;
    this.attempts = 0;
    this.gamesPlayed = null;
    this.matchesMax = 14;
    this.matches = 0;
    switch (stats) {
      case 'display':
        this.displayStats();
        break;
      case 'calculate':
        this.calculateAccuracy();
        break;
      case 'reset':
        this.resetStats();
        break;
    }
  }
  displayStats() {
    let newAccuracy = this.calculateAccuracy();
    if (isNaN(newAccuracy)) {
      newAccuracy = 0;
    }
    let percent = newAccuracy * 100;
    let accuracyClass = $('.accuracyli')
    accuracyClass.text(" " + percent.toFixed(0) + ' %');
    $('.attemptsli').text(this.attempts);
    $('.matchesli').text(this.matches);
    $('.gamesplayedli').text(this.games_played);
  }
  calculateAccuracy() {
    return this.matches / this.attempts;
  }
  resetStats() {
    $('.attemptsli').text('0');
    $('.attemptsli').text('0');
    $('.attemptsli').text('0');
    this.attempts = 0;
    this.matches = 0;
    $('.attemptsli').text('0');
    $('.cardback').removeClass('disableclick');
  }
}