var timer = {
  server: null,
  user: null,
  time: 0,
  totalLength: 2613,
  intervalTimer: null,

  init: function (newServer, newUser, startTime) {
    var self = this;

    if (self.intervalTimer) {
    	clearInterval(self.intervalTimer);
    }

    self.server = newServer;
    self.user = newUser;
    self.time = Math.floor(startTime / 5) * 5;
    self.intervalTimer = setInterval(_.bind(self.timer, self), 1000);
  },
  timer: function () {
    var self = this;

    self.server.get('site/variableRetrieve', {name: 'currentTime.' + self.user.name }, function (data) {
      var newTime = 0;
      if (data && data.data) {
        newTime = data.data;
      }
      else {
        newTime = Math.min(self.time + 5, self.totalLength);
      }

      self.time = Math.floor(newTime / 5) * 5;
    });

    // var completion = (self.time / self.totalLength) * 100;
    // $('#timeline').attr('value', completion).slider();
  }
};