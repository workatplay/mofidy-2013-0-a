var comments = {
  server: null,
  user: null,
  timer: null,
  showTitle: '',
  comments: [],
  maxId: 0,
  intervalTimer: null,

  addComments: function (comments) {
    var self = this;

    _.each(comments, function (comment) {
      self.comments.push(comment);

      if (comment.id > self.maxId) {
        self.maxId = comment.id;
      }
    });
  },
  sendComment: function (msg, position, time) {
    var self = this;

    if (!time) {
      time = self.timer.time;
    }

    var comment = {
      user: self.user.name,
      data: {
        msg: msg,
        position: position
      },
      time: time,
      video: self.showTitle
    };

    self.server.post('site/commentSave', comment, function (data) {
      self.addComments([data]);
    });
  },
  init: function (newServer, newUser, newTimer, newShowTitle) {
    var self = this;

    if (self.intervalTimer) {
      clearInterval(self.intervalTimer);
    }

    self.server = newServer;
    self.user = newUser;
    self.timer = newTimer;
    self.showTitle = newShowTitle;
    self.comments = [];

    // self.commentList = $('#commentList');

    self.poll();
    self.intervalTimer = setInterval(_.bind(self.poll, self), 5000);
  },
  poll: function () {
    var self = this;
    var query = {
      video: self.showTitle,
      lastId: self.maxId,
      startTime: self.timer.time
    };

    self.server.get('site/commentList', query, function (data) {
      self.addComments(data);
    });
  }
};