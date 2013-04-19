<?php 
$base = Yii::app()->getBaseUrl();
$cs = Yii::app()->getClientScript();
$cs->registerScriptFile($base . '/js/tv.js', CClientScript::POS_END);  
?>
<video width="100%" height="100%"" controls>
  <source src="<?php print $base ?>/shows/DragonsDenS7E12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


<script id="comment-template" type="text/template">
  <span></span>
</script>