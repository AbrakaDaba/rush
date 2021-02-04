(function() {
  if (typeof window.CustomEvent === "function") return false; //If not IE

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

var symbols = [
    "ABBV",
    "TAP",
    "WEED.TO",
    "TLRY",
    "CGC",
    "ACB.TO",
    "ACBFF",
    "APG",
    "RFW",
    "GEMC",
    "AXRFW",
    "ASCW",
    "ACOEG"
  ],
  companies = ["Company 1", "Company 2", "Company 3", "Company 4", "Company 5", "Company 6", "Company 7", "Company 8"],
  tBodyEl,
  _dateToday = moment().format("DD/MM/YYYY"),
  cryptoCurrencyList = ["EOS/ETH", "LTC/EOS", "ETH/LTC", "BTC/ETH", "XLM/BTC"],
  translations;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandom() {
  var rSymbol = getRandomInt(cryptoCurrencyList.length - 1);
  var rCompany = getRandomInt(companies.length - 1);
  var rValue = getRandomInt(1000);
  var rValue3 = getRandomInt(100);
  var isNegative = rValue % 2 === 0 ? "red_alert" : "";

  return (
    '<div class="user-card"><div><div class="user-name heading-type3">' +
    companies[rCompany] +
    '</div><div><span class="user-data">' +
    cryptoCurrencyList[rSymbol] +
    '</span> <span class="user-date">' +
    _dateToday +
    '</span></div><div class="user-profit">€' +
    rValue +
    "." +
    rValue3 +
    "</div></div></div>"
  );
}

function setupWhatPeopleSaying() {
  var _currentActive = 1;
  $(".previous").click(function() {
    var _currentSelector = ".customer-" + _currentActive;
    var _currentImgSelector = ".customer-img-" + _currentActive;
    var _currentSISel = ".customer-img-fw-" + _currentActive;
    _currentActive = _currentActive == 1 ? 5 : _currentActive - 1;

    var _selector = ".customer-" + _currentActive;
    var _imgSelector = ".customer-img-" + _currentActive;
    var _currentSel = ".customer-img-fw-" + _currentActive;
    $(_currentSelector).fadeOut("fast", function() {
      $(_currentImgSelector).css("opacity", 0.5);
      $(_imgSelector).css("opacity", 1);
      $(_currentSISel).hide();
      $(_currentSel).show();
      $(_selector).fadeIn("fast");
    });
  });

  $(".next").click(function() {
    var _currentSelector = ".customer-" + _currentActive;
    var _currentImgSelector = ".customer-img-" + _currentActive;
    var _currentSISel = ".customer-img-fw-" + _currentActive;
    _currentActive = _currentActive == 5 ? 1 : _currentActive + 1;

    var _selector = ".customer-" + _currentActive;
    var _imgSelector = ".customer-img-" + _currentActive;
    var _currentSel = ".customer-img-fw-" + _currentActive;
    $(_currentSelector).fadeOut("fast", function() {
      $(_currentImgSelector).css("opacity", 0.5);
      $(_imgSelector).css("opacity", 1);
      $(_currentSISel).hide();
      $(_currentSel).show();
      $(_selector).fadeIn("fast");
    });
  });
}

var _marginLeft = 0;
var _offsetLeft = 0;
function startIntervalForTrade() {
  $(tBodyEl.children()[0]).remove();

  $(tBodyEl)
    .css("marginLeft", _offsetLeft + "px")
    .animate({ marginLeft: _marginLeft }, 3000, "linear", startIntervalForTrade);

  var _newRandom = generateRandom();
  $(tBodyEl).append(_newRandom);
}

function setupTableContent() {
  for (var i = 0; i < 10; i++) {
    tBodyEl.append(generateRandom());
  }
  _offsetLeft = parseInt(tBodyEl.css("marginLeft"));
  _marginLeft = _offsetLeft - $(tBodyEl.children()[0]).width() - 30 + "px";
  startIntervalForTrade();
}

function setupHeaderWarning() {
  $(".todayDate").html(_dateToday);

  var eventTime = moment()
    .add(6, "minutes")
    .add(38, "seconds");
  var currentTime = moment();
  var diffTime = eventTime.diff(currentTime);
  var duration = moment.duration(diffTime, "milliseconds");
  var interval = 100;

  var _counterInterval = setInterval(function() {
    duration = moment.duration(duration - interval, "milliseconds");
    if (duration > 0) {
      var _sec = duration.seconds().toString().length == 2 ? duration.seconds() : "0" + duration.seconds();
      $(".runningOutTime").text(
        "0" +
          duration.minutes() +
          ":" +
          _sec +
          "." +
          duration
            .milliseconds()
            .toString()
            .slice(0, 1)
      );
    } else {
      $(".runningOutTime").text("00:00.0");
      clearInterval(_counterInterval);
      _counterInterval = null;
    }
  }, interval);
}

function startLoadingModal() {
  $("#loadingModal")
    .addClass("show")
    .css("display", "block");
  $("body").addClass("modal-open");

  var _percentCount = 0;
  var _intervalGen = setInterval(function() {
    _percentCount++;
    if (_percentCount < 100) {
      $(".loader-number").html(_percentCount + "%");
    } else {
      $("#loadingModal")
        .removeClass("show")
        .css("display", "none");
      $("#congratulations")
        .addClass("show")
        .css("display", "block");
      clearInterval(_intervalGen);
      _intervalGen = 0;
    }
  }, 15);
}

function setupFormFlow() {
  var _activeStep = 0;
  var _activeStep1 = 0;
  var _activeStep2 = 0;

  var _formModel = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: ""
  };

  var _defaultHeight = $(".form-trade-now:visible:first > .small-form-text:first").height() + 10 + "px";

  $(".form_submit_btn2").click(function(e) {
    e.preventDefault();
    var _currentFormLeftOffset =
      ($("form.small-form-text").outerWidth() - $("form.small-form-text:first-child").outerWidth()) / 2 + "px";
    var _widthParent = $("#first-form2").width() + "px";
    var _marginLeftToHide = "-" + _widthParent;
    _activeStep2 += 1;
    switch (_activeStep2) {
      case 1:
        $("#first-form2")
          .width(_widthParent)
          .animate({ marginLeft: _marginLeftToHide }, "fast", function() {
            $(this).hide();
            $("#second-form2")
              .height(_defaultHeight)
              .removeClass("hidden")
              .addClass("active")
              .animate({ marginLeft: _currentFormLeftOffset }, "fast");
          });

        $("#step2").html("2");
        $(this).text("Next");
        break;
      case 2:
        $("#second-form2")
          .width(_widthParent)
          .animate({ marginLeft: _marginLeftToHide }, "fast", function() {
            $(this).hide();
            $("#third-form2")
              .height(_defaultHeight)
              .removeClass("hidden")
              .addClass("active")
              .animate({ marginLeft: _currentFormLeftOffset }, "fast");
          });
        $("#step2").html("3");
        $(this).text("Join now and start winning");
        break;
      case 3:
        startLoadingModal();
        break;
      default:
        $("#first-form2").show();
        $(".first-form-step").addClass("active_span");
        $("#second-form2").hide();
        $("#third-form2").hide();
    }
  });

  $(".form_submit_btn1").click(function(e) {
    e.preventDefault();
    var _currentFormLeftOffset =
      ($("form.small-form-text").outerWidth() - $("form.small-form-text:first-child").outerWidth()) / 2 + "px";
    var _widthParent = $("#first-form1").width() + "px";
    var _marginLeftToHide = "-" + _widthParent;
    _activeStep1 += 1;
    switch (_activeStep1) {
      case 1:
        $("#first-form1")
          .width(_widthParent)
          .animate({ marginLeft: _marginLeftToHide }, "fast", function() {
            $(this).hide();
            $("#second-form1")
              .height(_defaultHeight)
              .removeClass("hidden")
              .addClass("active")
              .animate({ marginLeft: _currentFormLeftOffset }, "fast");
          });
        $("#step1").html("2");
        $(this).text("Next");
        break;
      case 2:
        $("#second-form1")
          .width(_widthParent)
          .animate({ marginLeft: _marginLeftToHide }, "fast", function() {
            $(this).hide();
            $("#third-form1")
              .height(_defaultHeight)
              .removeClass("hidden")
              .addClass("active")
              .animate({ marginLeft: _currentFormLeftOffset }, "fast");
          });
        $("#step1").html("3");
        $(this).text("Join now and start winning");
        break;
      case 3:
        startLoadingModal();
        break;
      default:
        $("#first-form1").show();
        $(".first-form-step").addClass("active_span");
        $("#second-form1").hide();
        $("#third-form1").hide();
    }
  });

  $(".form_submit_btn").click(function(e) {
    e.preventDefault();
    var _currentFormLeftOffset =
      ($("form.small-form-text").outerWidth() - $("form.small-form-text:first-child").outerWidth()) / 2 + "px";
    var _widthParent = $("#first-form").width() + "px";
    var _marginLeftToHide = "-" + _widthParent;
    _activeStep += 1;
    switch (_activeStep) {
      case 1:
        $("#first-form")
          .width(_widthParent)
          .animate({ marginLeft: _marginLeftToHide }, "fast", function() {
            $(this).hide();
            $("#second-form")
              .height(_defaultHeight)
              .removeClass("hidden")
              .addClass("active")
              .animate({ marginLeft: _currentFormLeftOffset }, "fast");
          });
        $("#step").html("2");
        $(this).text("Next");
        break;
      case 2:
        $("#second-form")
          .width(_widthParent)
          .animate({ marginLeft: _marginLeftToHide }, "fast", function() {
            $(this).hide();
            $("#third-form")
              .height(_defaultHeight)
              .removeClass("hidden")
              .addClass("active")
              .animate({ marginLeft: _currentFormLeftOffset }, "fast");
          });
        $("#step").html("3");
        $(this).text("Join now and start winning");
        break;
      case 3:
        startLoadingModal();
        break;
      default:
        $("#first-form").show();
        $(".first-form-step").addClass("active_span");
        $("#second-form").hide();
        $("#third-form").hide();
    }
  });
}
document.addEventListener("visitorLocated", function(e) {
  $('[data-init="country-flag"]').each(function() {
    var obj = $(this);
    var imgurl = "img/flags/" + ipdata.isoCode.toUpperCase() + ".png";
    obj.css("backgroundImage", imgurl);
  });

  var region = ipdata.country;
  var url = "api/uinames.php?";

  $.ajax({
    type: "get",
    url: url + "&region=" + region,
    success: function(response) {
      $("#exampleNames").removeClass("hidden");
      loopPeople(response);
      populatePeopleInTable(response);
    },
    error: function(response) {
      region = "England";
      $.ajax({
        type: "get",
        url: url + "&region=" + region,
        success: function(response) {
          $("#exampleNames").removeClass("hidden");
          loopPeople(response);
        }
      });
    }
  });
});

document.addEventListener("translationsApplied", function(e) {
  $('[data-i18n="country-name-custom"]').each(function() {
    var obj = $(this);

    if (typeof translations["country-name-custom"] == "undefined") {
      var cc = ipdata.country;
    } else {
      var cc = translations["country-name-custom"];
    }

    if (typeof countryColors[ipdata.isoCode.toUpperCase()] != "undefined") {
      words = cc.split(/ (.+)/);
      if (words.length < 2) {
        words[0] = cc.substring(0, cc.length / 2);
        words[1] = cc.substring(cc.length / 2);
      } else {
        words[0] += " ";
      }
      var word = $("<span/>")
        .css("color", countryColors[ipdata.isoCode.toUpperCase()][0])
        .text(words[0].toUpperCase())[0].outerHTML;
      word += $("<span/>")
        .css("color", countryColors[ipdata.isoCode.toUpperCase()][1])
        .text(words[1].toUpperCase())[0].outerHTML;
      obj.html(word);
    }
  });
});

var applyTranslations = function() {
  $("[data-i18n]").each(function() {
    var key = $(this).attr("data-i18n");
    if (typeof translations[key] !== "undefined") {
      switch ($(this).prop("tagName")) {
        case "INPUT":
          $(this).attr("placeholder", translations[key]);
          break;
        default:
          $(this).text(translations[key]);
      }
    }
  });
  var d = new CustomEvent("translationsApplied", { detail: translations });
  document.dispatchEvent(d);
};

var setupVideos = function() {
  var myVideo1 = document.getElementById("video1");
  var myVideo2 = document.getElementById("video2");

  $(".play-1").click(function() { 
    $("#video1").attr("controls","true");
    myVideo1.play();
    $(this).parent().hide();

  });

  $(".play-2").click(function() { 
    $("#video2").attr("controls","true");
    myVideo2.play();
    $(this).parent().hide(); 
  });

  myVideo1.addEventListener("play", function() {
    $(".play-1").hide();
  });

  myVideo1.addEventListener("pause", function() {
    $(".play-1").show();
  });

  myVideo1.addEventListener("ended", function() {
    $(".play-1").show();
  });

  myVideo2.addEventListener("play", function() {
    $(".play-2").hide();
  });

  myVideo2.addEventListener("ended", function() {
    $(".play-2").show();
  });

  myVideo2.addEventListener("pause", function() {
    $(".play-2").show();
  });
};

$(document).ready(function() {
  setupHeaderWarning();
  tBodyEl = $(".users-scrolling-wrapper");
  setupTableContent();
  setupFormFlow();

  setupWhatPeopleSaying();

  setupVideos();

  ipdata.isoCode = ipdata.country_code.toLowerCase();

  $(".phoneNumber").each(function() {
    $(this).intlTelInput({
      autoHideDialCode: true,
      autoPlaceholder: "polite",
      initialCountry: ipdata.isoCode,
      nationalMode: true,
      separateDialCode: false,
      utilsScript: "js/intl-tel-input-12.3.0/js/utils.js"
    });
  });

  $("body")
    .find(".move-to-top")
    .each(function() {
      $(this).click(function() {
        var _offsetTop = $(".video-form-container:visible").offset().top - 60;

        $("html,body")
          .stop()
          .animate(
            {
              scrollTop: _offsetTop
            },
            "fast"
          );
      });
    });

  var n = new CustomEvent("visitorLocated", { detail: ipdata });
  document.dispatchEvent(n);

  $.ajax({
    // url: "/api/i18n/" + ipdata.isoCode + ".json",
    url: "en.json",
    type: "get",
    success: function(e) {
      translations = e;

      var t = new CustomEvent("translationsLoaded", { detail: e });
      document.dispatchEvent(t);

      applyTranslations();
    },
    error: function(e) {
      translations = e;

      var t = new CustomEvent("translationsLoaded", { detail: e });
      document.dispatchEvent(t);

      applyTranslations();
    },
    complete: function() {}
  });

  myScroll = true;

  planet = $(".planet")[0];
  lines = $(".lines")[0];
  lineGraph = $(".line-graph")[0];
  firstCircle = $(".first-circle")[0];
  secondCircle = $(".second-circle")[0];
  thirdCircle = $(".third-circle")[0];
  fourthCircle = $(".fourth-circle")[0];
});

var planet = $(".planet")[0];
var lines = $(".lines")[0];
var lineGraph = $(".line-graph")[0];
var firstCircle = $(".first-circle")[0];
var secondCircle = $(".second-circle")[0];
var thirdCircle = $(".third-circle")[0];
var fourthCircle = $(".fourth-circle")[0];
