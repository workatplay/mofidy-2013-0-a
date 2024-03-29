<?php /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="en" />
    <title><?php echo CHtml::encode($this->pageTitle); ?></title>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/tv.css" />
  </head>

  <body>

    <div class="container" id="page">

      <?php echo $content; ?>

    </div><!-- page -->
    
		<script>
      var app = {
        user: 'Ronn',
        server: 'http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php',
        basePath: '<?php echo Yii::app()->request->baseUrl; ?>'
      };
		</script>    
		<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/jquery-1.9.1.js"></script>

  </body>
</html>
