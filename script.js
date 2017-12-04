var seconds = 0;
var timerObject, blinkTimer;

var startButton, stopButton, resetButton, indicators;
var minutesLabel, collonLabel, secondsLabel;
var modalBox, modalDialog;
var endSound, endSoundSrc;
var title = "カウントダウン タイマー";

window.addEventListener("load", function (e) {
  startButton = $("#startButton");
  stopButton = $("#stopButton");
  resetButton = $("#resetButton");
  minutesLabel = $("#minutesLabel");
  collonLabel = $("#collonLabel");
  secondsLabel = $("#secondsLabel");
  modalBox = $(".modal");
  modalDialog = $("#modalDialog");
  endSound = $("#endSound").get(0);
  endSoundSrc = endSound.src;

  startButton.bind("click", startCountdown);
  stopButton.bind("click", onStopbuttonClicked);
  resetButton.bind("click", resetTime)
  modalDialog.bind("click", stopSound);

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
    startButton.attr("disabled", "disabled");
  } else {
    startButton.removeAttr("disabled");
  }
}

function startCountdown() {
  timerObject = setInterval(onTimerTick, 1000);
  blinkTimer = setInterval(toggleIndicatorsVisibility, 500);
  startButton.attr("disabled", "disabled");
  stopButton.removeAttr("disabled");
}

function onStopbuttonClicked() {
  stopTimers();
  stopButton.attr("disabled", "disabled");
  startButton.removeAttr("disabled");
  collonLabel.removeClass("js-hidden");
}

function onTimerTick() {
  if (seconds == 0) {
    onFinish();
  } else {
    seconds--;
    updateTime();
  }
}

function toggleIndicatorsVisibility() {
  if (collonLabel.hasClass("js-hidden")) {
    collonLabel.removeClass("js-hidden");
  } else {
    collonLabel.addClass("js-hidden");
  }
}

function updateTime() {
  minutesLabel.text(Math.floor(seconds / 60));
  secondsLabel.text(("0" + (seconds % 60)).slice(-2));
  document.title = minutesLabel.text() + ":" + secondsLabel.text();
}

function onFinish() {
  stopTimers();
  collonLabel.removeClass("js-hidden");
  stopButton.attr("disabled", "disabled");
  modalBox.modal("show");
  endSound.play();
  document.title = title;
}

function stopTimers() {
  clearInterval(timerObject);
  clearInterval(blinkTimer);
}

function stopSound() {
  endSound.pause();
  endSound.src = endSoundSrc;
}

function resetTime() {
  stopTimers();
  seconds = 0;
  updateTime();
  startButton.attr("disabled", "disabled");
  stopButton.attr("disabled", "disabled");
}

function prepareForRestart() {
  stopButton.attr("disabled", "disabled");
  startButton.removeAttr("disabled");
}