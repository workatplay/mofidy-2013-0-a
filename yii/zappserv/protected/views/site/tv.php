<?php 
$base = Yii::app()->getBaseUrl();
$cs = Yii::app()->getClientScript();
$cs->registerScriptFile($base . '/js/tv.js', CClientScript::POS_END);
?>

<div id="bubbleby">
  Bubbles by: <strong class="name">Hang on a second...</strong>
</div>

<div id="comments">
  <div class="region top-left">
  </div>
  <div class="region top-right">
  </div>
  <div class="region bottom">
  </div>
</div>

<div id="playerhud">Rewind</div>

<video width="100%" height="100%" controls autoplay>
  <source src="<?php print $base ?>/shows/DragonsDenS7E12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<div id="comment-template" class="comment" style="display: none;">
  <span class="msg"></span>
  <span class="dot dot-a"></span>
  <span class="dot dot-b"></span>
  <span class="dot dot-c"></span>
</div>