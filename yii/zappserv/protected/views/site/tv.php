<?php 
$base = Yii::app()->getBaseUrl();
$cs = Yii::app()->getClientScript();
$cs->registerScriptFile($base . '/js/tv.js', CClientScript::POS_END);
?>

<div id="bubbleby">
  Bubbles by: <span class="name"></span>
</div>

<<<<<<< HEAD
<div id="comments" class="comment"></div>
=======
<div id="comments" class="comment" style="position: absolute; z-index: 2;">
  <div class="top-left">
  </div>
  <div class="top-right">
  </div>
  <div class="bottom">
  </div>
</div>
>>>>>>> nest comments

<video width="100%" height="100%" controls>
  <source src="<?php print $base ?>/shows/DragonsDenS7E12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<div id="comment-template" style="display: none;">
  <span class="msg"></span>
</div>