var daysContainer = document.querySelector('#days');
var hoursContainer = document.querySelector('#hours');
var minutesContainer = document.querySelector('#minutes');
var secondsContainer = document.querySelector('#seconds');

var eventDate = new Date('Jan 8, 2023 07:00:00').getTime();

function timer() {
  var currentDate = new Date().getTime();
  var difference = eventDate - currentDate;

  if (difference > 0) {
    var daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hoursDifference = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutesDifference = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    var secondsDifference = Math.floor((difference % (1000 * 60)) / 1000);

    daysContainer.textContent =
      daysDifference > 9 ? daysDifference : '0' + daysDifference;
    hoursContainer.textContent =
      hoursDifference > 9 ? hoursDifference : '0' + hoursDifference;
    minutesContainer.textContent =
      minutesDifference > 9 ? minutesDifference : '0' + minutesDifference;
    secondsContainer.textContent =
      secondsDifference > 9 ? secondsDifference : '0' + secondsDifference;
  }
}

timer();
var inteval = setInterval(timer, 1000);
