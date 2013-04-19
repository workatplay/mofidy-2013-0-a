$(document).ready(function() {
  var curVideoTime = 0;
  var intervalDur = 1000;
  var lastId = 0;
  var comments = [];
 
  var getComments = function () {
    $.ajax({
      url: '',
      data: {
        r: 'site/commentList',
        video: '',
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
    
  };
  var showComments = function () {
    var putBack = [];
    
    while (comments.length > 0) {
      var comment = comments.shift();
      comment.time = parseInt(comment.time);
    }
  };
  
  setInterval(function () {
    getComments();
    showComments();
    curVideoTime += intervalDur;
  }, intervalDur);
//  var $video = $('video');
//  $video.css({
//    width: $(window).width()
//  })
});