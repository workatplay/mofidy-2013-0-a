$(document).ready(function() {
  
  
  var curVideoTime = 0;
  var intervalDur = 1;
  var lastId = 0;
  var comments = [];
 
  var getComments = function () {
    $.ajax({
      url: app.server,
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
  
  var showComment = function (comment) {
    if (!comment.data || !comment.data.msg) {
      return;
    }
    var $comment = $('#comment-template').clone();
    $comment.removeAttr('id', '');
    $comment.addClass(comment.position);
    $comment.find('.msg').html(comment.data.msg);
    $comment.appendTo($('#comments'));
    
    setTimeout(function () {
      $comment.remove();
    }, 5000);
    
    console.log('$comment', $comment);
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