var timer = {
  time: 0,
  totalLength: 2613,
  intervalTimer: null,

  init: function (startTime) {
    var self = this;

    if (self.intervalTimer) {
    	clearInterval(self.intervalTimer);
    }

    self.time = Math.round(startTime / 5) * 5;;
    self.intervalTimer = setInterval(_.bind(self.timer, self), 5000);
  },
  timer: function () {
    var self = this;
    
    self.time = Math.min(self.time + 5, self.totalLength);

    // var completion = (self.time / self.totalLength) * 100;
    // $('#timeline').attr('value', completion).slider();
  }
};