serverUrl = window.location.href + 'server.php?_url=';
//
if (navigator.userAgent.indexOf('GoogleTV')>0 || navigator.userAgent.indexOf('Android')>0) {
  serverUrl = "http://tvhackfest.workatplay.com/server.php?_url=";
}

ready = false;

window.result = function(callback) {
  if (cordova && cordova.exec) {
    cordova.exec(callback, $.noop, "Echo", "result", []);
  }
};

var resultObject;
// Default result values
var contentId = "c04a2c84-6e8d-11e2-a9cd-fa163e53d66f";
var programTitle = "the_simpsons_s24_e9";
var referenceOffset = 0;

var seconds = 0;
var data = {
  '0': {
    claps: 0,
    comments: []
  }
};
var claps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var maxClaps = 0;

function onDeviceReady() {
  ready = true;

  window.result(function(jsonString) {
    resultObject = jQuery.parseJSON(jsonString);

    if (resultObject.content_id) {
      window.contentId = resultObject.content_id;
    }

    for(var i = 0; i < resultObject.content_attrs.length; i++) {
      var pair = resultObject.content_attrs[i];
      if (pair.name == "program_title" && pair.value) {
        window.programTitle = pair.value;
      } else if (pair.name == "reference_offset" && pair.value) {
        window.referenceOffset = parseInt(pair.value[0], 10);
      }
    }

    counter = referenceOffset;
  });

  // comments.init();
}

// If not PhoneGap device, then run onload.
window.onload = function () {
	if(!window.device) {
		onDeviceReady();
	}
};

// If PhoneGap, run when ready.
document.addEventListener('deviceready', onDeviceReady, false);

var plause = $('#plause');
plause.css({ opacity: '0.2' });

// Clapping
$('body').on('click', function() {
  // console.log('clap', data[seconds].claps++);
  data[seconds].claps++;
  claps[claps.length - 1]++;
  if (maxClaps < claps[claps.length - 1]) {
    maxClaps = claps[claps.length - 1];
    plause.css({ opacity: '1' });
  }
});
setInterval(function() {
  var lastClaps = data[seconds].claps;
  console.log('claps', lastClaps);

  seconds = (parseInt(seconds, 10) + 5).toString();
  // TODO: Extend previous data
  data[seconds] = {
    claps: 0,
    comments: []
  };
  claps = _.last(_.pluck(data, 'claps'), 10); // TODO: Use global points var
  while (claps.length < 10) {
    claps.unshift(0);
  }
  maxClaps = _.max(claps);

  plause.css({ opacity: 0.2 + (lastClaps / maxClaps) * 0.8 });
}, 5000);