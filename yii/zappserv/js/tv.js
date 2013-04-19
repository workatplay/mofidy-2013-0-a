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
    var $container = $('#comments');
    var $comment = $('#comment-template').clone();
    $comment.removeAttr('id', '');
    $comment.find('.msg').html(comment.data.msg);
    $comment.appendTo($container.find('.'+comment.data.position));
    $comment.fadeIn();
      
    setTimeout(function () {
      $comment.slideUp();
    }, 10000);
    
    console.log('$comment', comment, $comment);
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
  var setBubblesBy = function () {
    var name = filterUser;
    if (name == 'Official') {
      name = "Dragon's Den";
    } else if (name === false) {
      name = 'Everyone';
    }
    $('#bubbleby').find('.name').html(name);
  }
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
            setBubblesBy();
          }
          if (data.command == 'goTo') {
            filterUser = app.user;
            $player[0].currentTime = data.data.time;
            var $playerHud = $('#playerhud').addClass('rewind');
            setTimeout(function () {
              $playerHud.removeClass('rewind');
            }, 2000);
          }
        }
      }
    });    
  };
  
  var interval;
  $player.on('play', function() {
    var video = this;
    clearInterval(interval);
    
    setBubblesBy();
    interval = setInterval(function () {
      curVideoTime = video.currentTime;
      
      getComments();
      showComments();
      applyCommand();
      saveCurrentTime();
    }, intervalDur*1000);
  })
});