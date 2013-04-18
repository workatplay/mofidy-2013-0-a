var comments = {
  userName: '',
  timer: null,
  showTitle: '',
  comments: [],
  maxId: 0.

  addComments: function (comments) {
  },
  sendComment: function (msg) {
    var self = this;
    var comment = {
      user: self.userName,
      data: {
        msg: msg,
        position: 'bottom'
      },
      time: self.timer.time,
      video: self.showTitle
    };
    self.addComment([comment]);

    $.ajax({
      type: 'post',
      dataType: "json",
      url: serverUrl + 'site/commentSave',
      data: comment,
      success: function (data) {
        console.log('data', data);
      }    
    });
  },
  init: function (newTimer, newShowTitle) {
    var self = this;

    self.timer = newTimer;
    self.showTitle = newShowTitle;
    self.userName = 'user' + Math.round(Math.random()*100);
    $('#myname').html(self.userName);
    self.comments = [];

    // self.commentList = $('#commentList');

    self.poll();
  },
  poll: function () {
    $.ajax({
      dataType: "json",
      url: serverUrl + 'site/commentList&video=' + self.showTitle + '&lastId=' self.maxId + '&startTime=' + self.showTime,

      success: function (data) {
console.log(data);
        // self.comments = {};
        // for (var i = 0; i < data.length; i++) {
        //   var comment = data[i];
        //   if (!self.comments[comment.time]) {
        //     self.comments[comment.time] = [];
        //   }
        //   self.comments[comment.time].push(comment);
        // }
      }
    });
  }
};