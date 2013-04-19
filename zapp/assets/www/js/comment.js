var comments = {
  serverUrl: "http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php",
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

    $.ajax({
      type: 'post',
      dataType: "json",
      url: self.serverUrl + '?r=site/commentSave',
      data: comment,
      success: function (data) {
        self.addComments([data]);
      }    
    });
  },
  init: function (newUser, newTimer, newShowTitle) {
    var self = this;

    if (self.intervalTimer) {
      clearInterval(self.intervalTimer);
    }

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

    $.ajax({
      dataType: "json",
      url: self.serverUrl,
      data: {
        r: 'site/commentList',
        video: self.showTitle,
        lastId: self.maxId,
        startTime: self.timer.time
      },

      success: function (data) {
        self.addComments(data);
      }
    });
  }
};