$(document).ready(function() {
  var curVideoTime = 0;
  var intervalDur = 1;
  var lastId = 0;
  var comments = [];
 
  var getComments = function () {
    $.ajax({
//      url: app.basePath,
      url: 'http://tvhackfest.workatplay.com/zapp/yii/zappserv',
      data: {
        rand: Math.random(),
        r: 'site/commentList',
//        video: "",
        lastId: lastId
      },
      success: function (data) {
        console.log('data', data);
        
        $.each(data, function(i, comment) {
          comments.push(comment);
          if (comment.id > lastId) {
            lastId = comment.id;
          }
        });
      }
    });
  };
  
//  $.ajax({
//    type: 'post',
//    dataType: "json",
////    url: app.basePath+'/index.php?r=site/commentSave',
//    url: 'http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php?r=site/commentSave',
//    data: {
//      user: 'ronn',
//      data: {
//        message: 'hi',
//        position: 'bottom'
//      },
//      time: 30, // in s
//      video: 'den_s7e1' // unique identifier for show/episode
//    },
//    success: function (data) {
//      console.log('data', data);
//    }    
//  });
//  $.ajax({
//    dataType: "json",
//    url: 'http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php?r=site/commentList&video=&lastId=0&startTime=0',
//    success: function (data) {
//      console.log('ajax', data);
//    }    
//  });
  
  var showComment = function (comment) {
    if (!comment.data) {
      return;
    }
    console.log('showComment', comment);
    var $comment = $('#comment-template').clone();
    $comment.attr('id', '');
    $comment.find('.msg').html(comment.data.msg);
    $comment.appendTo($('.comments'));
//    $('<div>')
//    .addClass('comment')
//    .addClass(comment.position)
//    .
  };
  var showComments = function () {
    var putBack = [];
    
    while (comments.length > 0) {
      var comment = comments.shift();
      comment.time = parseInt(comment.time);
      
      if (comment.time < curVideoTime) {
        showComment(comment);
      } else {
        putBack.push(comment);
      }
    }
    comments = putBack.slice(0);
  };
  
  setInterval(function () {
    getComments();
    showComments();
    curVideoTime += intervalDur;
  }, intervalDur*1000);
//  var $video = $('video');
//  $video.css({
//    width: $(window).width()
//  })
});