var seconds = 0;
var timerObject;

var startButton, stopButton, resetButton, indicators;
var minutesLabel, collonLabel, secondsLabel;

window.addEventListener("load", function (e) {
  startButton = $("#startButton");
  stopButton = $("#stopButton");
  resetButton = $("#resetButton");
  minutesLabel = $("#minutesLabel");
  secondsLabel = $("#secondsLabel");

  startButton.bind("click", startCountdown);
  stopButton.bind("click", stopCountdown);
  resetButton.bind("click", resetTime)

  $(".js-settime").bind("click", function (element) {
    setRemainTime(element);
    updateTime();
  });
}, false);

function setRemainTime(tag) {
  var absValue = parseInt(tag.target.getAttribute("data-time-value"));
  var direction = tag.target.getAttribute("data-time-dir");
  if (direction == "minus") absValue *= -1;

  seconds += absValue;
  if (seconds <= 0) {
    seconds = 0;
    //$(".js-buttons-minus").attr("disabled", "disabled");
    startButton.attr("disabled", "disabled");
  } else {
    startButton.removeAttr("disabled");
  }
}

function toggleIndicatorsVisibility(hidden) {
  if (hidden) {
    $(".tInd").addClass("js-hidden");
  } else {
    $(".tInd").removeClass("js-hidden")
  }
}

function startCountdown() {
  timerObject = setInterval(onTimerTick, 1000);
  startButton.attr("disabled", "disabled");
  stopButton.removeAttr("disabled");
}

function stopCountdown() {
  clearInterval(timerObject);
  updateTime();
  prepareForRestart();
}

function onTimerTick() {
  if (seconds == 0) {
    clearInterval(timerObject);
    prepareForRestart();
  } else {
    seconds--;
    updateTime();
    toggleIndicatorsVisibility(seconds % 2 == 0);
  }
}

function updateTime() {
  minutesLabel.text(Math.floor(seconds / 60));
  secondsLabel.text(("0" + (seconds % 60)).slice(-2));
  document.title = minutesLabel.text() + ":" + secondsLabel.text();
}

function resetTime() {
  clearInterval(timerObject);
  seconds = 0;
  updateTime();
  startButton.attr("disabled", "disabled");
  stopButton.attr("disabled", "disabled");
}

function prepareForRestart() {
  stopButton.attr("disabled", "disabled");
  startButton.removeAttr("disabled");
}