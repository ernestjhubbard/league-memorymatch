$(document).ready(initializeApp);

function initializeApp() {
  $('.cardfront').on('click', handleCardClick);

}
function handleCardClick(event) {
  $('.cardfront').addClass('hidden')
  $('.cardback').show();
}
