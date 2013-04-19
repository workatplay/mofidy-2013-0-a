<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('index');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->user->returnUrl);
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
  
	public function actionCommentLoad($id) {
		$result = false;
		if (!is_null($id)) {
			$row = Comment::model()->findByPk($id);
			if ($row) {
				$result = $row->getAttributes();
			}
		}
		$this->renderJSON($result);
	}
  
  /**
   * use: /zappserv/index.php?r=site/commentList&video=theshowep&lastId=0&startTime=0
   * @param type $lastId
   * @param type $startTime
   */
	public function actionCommentList($video = null, $lastId = null, $startTime = null) {
		$result = array();
    $filters = array();
    $params = array();
    
    $categoryFilter = "1";
		if ($lastId) {
      $filters[] = "id>:id";
      $params[':id'] = $lastId;
		}
		if ($startTime) {
      $filters[] = "time>:time";
      $params[':time'] = $startTime;
		}
		if ($video) {
      $filters[] = "video=:video";
      $params[':video'] = $video;
		}
		
		$query = array(
      'condition' => implode(' AND ', $filters),
      'params' => $params,
      'order' => 'time'
		);
		
		$rows = Comment::model()->findAll($query);
    
    if ($rows && count($rows)) {
      foreach ($rows as $row) {
        $result[] = $row->getAttributes();
      }
    }
    
		$this->renderJSON($result);
	}
  
  /**
   * use:
  $.ajax({
    type: 'post',
    dataType: "json",
    url: '/zappserv/index.php?r=site/commentSave',
    data: {
      user: 'ronn',
      data: {
        message: 'hi',
        position: 'bottom'
      },
      time: 30, // in s
      video: 'den_s7e1' // unique identifier for show/episode
    },
    success: function (data) {
      console.log('data', data);
    }    
  });
   * @return type
   */
	public function actionCommentSave() {
		$params = $_POST;

		$comment = new Comment;
		$comment->setAttributes($params);

		if ($comment->save()) {
			return $this->actionCommentLoad($comment->id);
		}
		$this->renderJSON(false);
	}
  
	public function actionTv() {
    $this->render('tv');
	}

  /**
   * use: /zappserv/index.php?r=site/commentList&video=theshowep&lastId=0&startTime=0
   * @param type $lastId
   * @param type $startTime
   */
	public function actionCommandRetrieve($user) {
		$result = (object)array();
		$command = Command::model()->find(array('condition' => 'user = :user', 'params' => array(':user' => $user)));

		if ($command) {
	        $result = $command->getAttributes();
	        $command->delete();
		}

		$this->renderJSON($result);
	}

  /**
   * use:
  $.ajax({
    type: 'post',
    dataType: "json",
    url: '/zappserv/index.php?r=site/CommandSend',
    data: {
      user: 'ronn', // used to differentiate who the command is for
      command: 'showComments',
      data: {
		user: 'DragonDen'
      }
    },
    success: function (data) {
      console.log('data', data);
    }    
  });
   * @return type
   */
	public function actionCommandSend() {
		$params = $_POST;

		$command = Command::model()->find(array('condition' => 'user = :user', 'params' => array(':user' => $params['user'])));
		if (!$command) {
			$command = new Command;
		}

		$command->setAttributes($params);

		if ($command->save()) {
			return $this->renderJSON(true);
		}
		$this->renderJSON(false);
	}

  /**
   * use: /zappserv/index.php?r=site/commentList&video=theshowep&lastId=0&startTime=0
   * @param type $lastId
   * @param type $startTime
   */
	public function actionVariableRetrieve($name) {
		$result = (object)array();
		$variable = Variable::model()->find(array('condition' => 'name = :name', 'params' => array(':name' => $name)));

		if ($variable) {
	        $result = $variable->getAttributes();
		}

		$this->renderJSON($result);
	}

  /**
   * use:
  $.ajax({
    type: 'post',
    dataType: "json",
    url: '/zappserv/index.php?r=site/CommandSend',
    data: {
      user: 'ronn', // used to differentiate who the command is for
      command: 'showComments',
      data: {
		user: 'DragonDen'
      }
    },
    success: function (data) {
      console.log('data', data);
    }    
  });
   * @return type
   */
	public function actionVariableSend() {
		$params = $_POST;

		$variable = Variable::model()->find(array('condition' => 'name = :name', 'params' => array(':name' => $params['name'])));
		if (!$variable) {
			$variable = new Variable;
		}

		$variable->setAttributes($params);

		if ($variable->save()) {
			return $this->renderJSON(true);
		}
		$this->renderJSON(false);
	}
}