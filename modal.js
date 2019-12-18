

class Modal {
  constructor() {
    var layout = new MatchLayout;
    let events = new Events;
    this.startDifficulty = events.startDifficulty.bind(this);
    this.body = layout.body;
    //initial modal
    this.modal = $('<div>').attr({
      'id': 'myModal',
      'class': 'modal thismodal modalagain',
      escapeClose: false,
      clickClose: false,
      showClose: false
    })
    this.modalContent = $('<div>').addClass('modal-content');
    this.buttonContainer = $('<div>').addClass('buttoncontainer');
    this.intro1 = $('<button>').addClass('introbutton introbutton1').text("ILLAOI");
    this.intro1p = $('<p>').addClass('smalltext');
    this.intro2 = $('<button>').addClass('introbutton introbutton2').text("SWAIN");
    this.intro2p = $('<p>').addClass('smalltext');
    this.intro3 = $('<button>').addClass('introbutton introbutton3').text("DARIUS");
    this.intro3p = $('<p>').addClass('smalltext');
    //victory modal
    this.modalVictory = $('<div>').attr({
      'id': 'victory',
      'class': 'victory modal thismodal modalagain',
      escapeClose: false,
      clickClose: false,
      showClose: false
    })
    this.buttonContainer = $('<div>').addClass('playagainbuttoncontainer buttoncontainer');
    this.playAgain = $('<div>').attr({
      'id': 'playagain',
      'class': 'introbutton'
    }).text("CONTINUE");
  }
  render() {
    this.body.append(this.modal)
    this.modal.append(this.modalContent);
    this.modalContent.append(this.buttonContainer);
    this.buttonContainer.append(this.intro1, this.intro2, this.intro3);
    this.intro1.text("ILLAOI").append(this.intro1p.text("EASY"));
    this.intro2.text("SWAIN").append(this.intro2p.text("MEDIUM"));
    this.intro3.text("DARIUS").append(this.intro3p.text("HARD"));
    this.callModal('intro');
    $('.introbutton1').on('click', function () {
      console.log(Card.attempts)
      new Events('intro1');
    });
    $('.introbutton2').on('click', function () {
      new Events('intro2');
    });
    $('.introbutton3').on('click', function () {
      new Events('intro3');
    });
  }
  callModal(type) {
    switch (type) {
      case 'intro':
        $("#myModal").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
        break;
      case 'victory':
        $("#victory").modal({
          escapeClose: false,
          clickClose: false,
          showClose: false
        });
    }
  }
}