serverUrl = "http://localhost:8888/zappserve/index.php?r=";

ready = false;

window.result = function(callback) {
  if (cordova && cordova.exec) {
    cordova.exec(callback, $.noop, "ZappTV", "result", []);
  }
};

var resultObject;
// Default result values
var contentId = "5a7780f2-a676-11e2-ae21-22000af492d5";
var programTitle = "Dragons' Den Season 7, Episode 12";
var referenceOffset = 0;

var seconds = '0';

function onDeviceReady() {
  ready = true;
  var myShowIsSet = false;

  window.result(function (jsonString) {
    resultObject = jQuery.parseJSON(jsonString);

    if (resultObject.content_id) {
      window.contentId = resultObject.content_id;
    }

    _.each(resultObject.content_attrs, function (attr) {
      if (attr.name === 'program_title') {
        window.programTitle = attr.value;
      } else if (attr.name === 'reference_offset') {
        window.referenceOffset = parseInt(pair.value[0], 10);
      }
    });

    timer.init(window.referenceOffset);
    comments.init(timer, window.programTitle);

    window.seconds = referenceOffset.toString();
  });

  setTimeout(function() {
    if (!myShowIsSet) {
      $('#myshow').text(programTitle);
      comments.init();
    }
  }, 2000);
}

// If not PhoneGap device, then run onload.
window.onload = function () {
	if(!window.device) {
		onDeviceReady();
	}
};

// If PhoneGap, run when ready.
document.addEventListener('deviceready', onDeviceReady, false);

setInterval(function() {
  seconds = (parseInt(seconds, 10) + 5).toString();
}, 5000);