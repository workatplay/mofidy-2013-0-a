$(document).ready(function() {
  var curVideoTime = 0;
  var intervalDur = 1;
  var lastId = 0;
  var comments = [];
  var filterUser = false;
  var $player = $('video');
 
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
        console.log(curVideoTime, data);
        
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
    $comment.addClass(comment.data.position);
    $comment.find('.msg').html(comment.data.msg);
    $comment.appendTo($('#comments'));
    $comment.fadeIn();
      
    setTimeout(function () {
//      $comment.remove();
    }, 5000);
    
    console.log('$comment', $comment);
  };
  var showComments = function () {
    var putBack = [];
    
    while (comments.length > 0) {
      var comment = comments.shift();
      comment.time = parseInt(comment.time);
      
      
      if (curVideoTime-1 < comment.time && comment.time < curVideoTime) {
        var show = true;
        if (filterUser) {
          show = false;
          if (filterUser == 'Friends') {
            if (app.user == comment.user || 'Official' == comment.user) {
              show = false;
            } else {
              show = true;
            }
          } else {
            show = filterUser == comment.user;
          }
        }
          console.log('filter by', filterUser, show);
        if (show) {
          showComment(comment);
        }
      }
      putBack.push(comment);
    }
    comments = putBack.slice(0);
  };
  var saveCurrentTime = function () {
    $.ajax({
      type: 'post',
      url: app.server,
      data: {
        r: 'site/variableSend',
        name: 'currentTime.'+app.user,
        data: curVideoTime 
      }
    });    
  };
  var applyCommand = function () {
    $.ajax({
      url: app.server,
      data: {
        r: 'site/commandRetrieve',
        user: app.user 
      },
      success: function (data) {
        if (data && data.command) {
          console.log('applyCommand', data);
          if (data.command == 'changeFeed') {
            filterUser = data.data.user;
          }
        }
      }
    });    
  };
  
  var interval;
  $player.on('play', function() {
    var video = this;
    clearInterval(interval);
    
    interval = setInterval(function () {
      curVideoTime = video.currentTime;
      
      getComments();
      showComments();
      applyCommand();
      saveCurrentTime();
    }, intervalDur*1000);
  })
});