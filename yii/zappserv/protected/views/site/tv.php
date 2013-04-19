<?php 
$base = Yii::app()->getBaseUrl();
$cs = Yii::app()->getClientScript();
$cs->registerScriptFile($base . '/js/tv.js', CClientScript::POS_END);  
?>

<div id="comments" style="position: absolute; z-index: 2;">
</div>

<video width="100%" height="100%" controls>
  <source src="<?php print $base ?>/shows/DragonsDenS7E12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<div id="comment-template" style="background: white; border: 3px solid grey;">
  <span class="msg"></span>
</div>