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

var commentData = {};

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
        $('#myshow').text(programTitle);
      } else if (attr.name === 'reference_offset') {
        window.referenceOffset = parseInt(pair.value[0], 10);
      }
    });

    server.init('http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php');
    user.init('Ronn');
    timer.init(window.referenceOffset);
    comments.init(server, user, timer, window.programTitle);
  });

  setTimeout(function() {
    if (!myShowIsSet) {
      $('#myshow').text(programTitle);

      server.init('http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php');
      user.init('Ronn');
      timer.init(window.referenceOffset);
      comments.init(server, user, timer, window.programTitle);
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

$('#trigger-add').click(function () {
  window.commentData['time'] = timer.time;
});

$('#trigger-placement').click(function () {
  window.commentData['message'] = $('textarea[name=message]').val();
  $('textarea[name=message]').val('');
});

$('.placement').click(function () {
  var self = this;

  if (self.id === 'place-top-left') {
    window.commentData['position'] = 'top-left';
  }
  else if (self.id === 'place-top-right') {
    window.commentData['position'] = 'top-right';
  }
  else if (self.id === 'place-bottom') {
    window.commentData['position'] = 'bottom';
  }

  comments.sendComment(commentData['message'], commentData['position'], commentData['time']);
});

$('.feed-selector').on('change', 'input', function (e) {
  var self = this;

  if ($(self).val() === 'on') {
    var command = null;
    var data = null;

    if (self.id === 'feed-dd') {
      command = 'changeFeed';
      data = {user: 'Official'};
    }
    else if (self.id === 'feed-me') {
      command = 'changeFeed';
      data = {user: window.user.name};
    }
    else if (self.id === 'feed-friends') {
      command = 'changeFeed';
      data = {user: 'Friends'};
    }

    if (command) {
      window.server.post('site/commandSend', {user: window.user.name, command: command, data: data}, function (data) {
        console.log('success');
      });
    }
  }
});