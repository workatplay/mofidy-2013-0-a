var comments = {
  serverUrl: "http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php",
  userName: '',
  timer: null,
  showTitle: '',
  comments: [],
  maxId: 0,
  intervalTimer: null,

  addComments: function (comments) {
    var self = this;

    _.each(comments, function (comment) {
      comment.id = parseInt(comment.id);
      comment.time = parseInt(comment.time);

      self.comments.push(comment);

      if (comment.id > self.maxId) {
        self.maxId = comment.id;
      }
    });
  },
  sendComment: function (msg, position) {
    var self = this;
    var comment = {
      user: self.userName,
      data: {
        msg: msg,
        position: position
      },
      time: self.timer.time,
      video: self.showTitle
    };

    $.ajax({
      type: 'post',
      dataType: "json",
      url: self.serverUrl + '?r=site/commentSave',
      data: comment,
      success: function (data) {
        self.addComment([data]);
      }    
    });
  },
  init: function (newTimer, newShowTitle) {
    var self = this;

    if (self.intervalTimer) {
      clearInterval(self.intervalTimer);
    }

    self.timer = newTimer;
    self.showTitle = newShowTitle;
    self.userName = 'Ronn';
    $('#myname').html(self.userName);
    self.comments = [];

    // self.commentList = $('#commentList');

    self.poll();
    self.intervalTimer = setInterval(_.bind(self.poll, self), 5000);
  },
  poll: function () {
    var self = this;

    $.ajax({
      dataType: "json",
      url: self.serverUrl + '&video=' + self.showTitle + '&lastId=' + self.maxId + '&startTime=' + self.showTime,
      data: {
        r: 'site/commentList',
        video: self.showTitle,
        lastId: self.maxId,
        startTime: self.showTime
      },

      success: function (data) {
        self.addComments(data);
      }
    });
  }
};