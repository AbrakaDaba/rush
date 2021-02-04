var stepDuration = 300;
var myScroll = false;

function stepFourthCircle() {
  $(fourthCircle).animate({ width: "162px", height: "162px", opacity: 1 }, stepDuration, function() {
    $(lineGraph).animate({ width: "663px" }, 300);
  });
}

function stepThirdCircle() {
  $(thirdCircle).animate(
    { width: "130px", height: "130px", opacity: 1 },
    stepDuration,
    thenLineGraph.bind(this, { width: "450px" }, stepFourthCircle)
  );
}

function startNextSequence() {
  $(lines).animate({ width: "663px" }, 2000);
  $(secondCircle).animate(
    { width: "125px", height: "125px", opacity: 1 },
    stepDuration,
    thenLineGraph.bind(this, { width: "300px" }, stepThirdCircle)
  );
}

function thenLineGraph(_options, _nextSequence) {
  stepDuration -= 10;
  $(lineGraph)
    .stop()
    .animate(_options, stepDuration, _nextSequence);
}

function thenFirstCircle() {
  $(firstCircle).animate(
    { width: "109px", height: "109px", opacity: 1 },
    stepDuration,
    thenLineGraph.bind(this, { width: "260px" }, startNextSequence)
  );
}

function planetAnimation() {
  $(lines).animate({ width: "26px", height: "632px" }, 400);
  $(lineGraph).animate({ width: "140px", height: "688px" }, 400, thenFirstCircle);
}

$(window).on("scroll", function() {
  if ($("html, body").scrollTop() >= $(".join-box").offset().top && myScroll == true) {
    planetAnimation();
    myScroll = false;
  }
});
