var timer = {
  time: 0,
  intervalTimer: null,

  init: function (startTime) {
    var self = this;

    if (intervalTimer) {
    	clearInterval(self.intervalTimer);
    }

    self.time = Math.round(startTime / 5) * 5;;
    self.intervalTimer = setInterval(_.bind(self.timer, self), 5000);
  },
  timer: function () {
    var self = this;
    
    self.time = self.time + 5;
  }
};