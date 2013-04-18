<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');
// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
$settings = array(
		'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
		'name' => 'Zappserv',
		'defaultController' => 'site', 
		// preloading 'log' component
		'preload' => array('log'),
		// autoloading model and component classes
		'import' => array(
				'application.models.*',
				'application.components.*',
		),
		'modules' => array(
				// uncomment the following to enable the Gii tool
				'gii' => array(
						'class' => 'system.gii.GiiModule',
						'password' => 'gii',
						// If removed, Gii defaults to localhost only. Edit carefully to taste.
						'ipFilters' => array('127.0.0.1', '::1'),
				),
		),
		// application components
		'components' => array(
				// uncomment the following to enable URLs in path-format
				/*
				  'urlManager'=>array(
				  'urlFormat'=>'path',
				  'rules'=>array(
				  '<controller:\w+>/<id:\d+>'=>'<controller>/view',
				  '<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				  '<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
				  ),
				  ),
				 */
//        'db' => array(
//            'connectionString' => 'sqlite:' . dirname(__FILE__) . '/../data/testdrive.db',
//        ),
				// uncomment the following to use a MySQL database
				'db' => array(
						'connectionString' => 'mysql:host=127.0.0.1;dbname=zapp',
						'emulatePrepare' => true,
						'username' => '',
						'password' => '',
						'charset' => 'utf8',
						'tablePrefix' => '',
				),
				'cache' => array(
						'class' => 'CDummyCache', // disable caching by default
//						'class' => 'CApcCache',
//						'class' => 'CDbCache',
//						'connectionID' => 'db',
//					'class'=>'CMemCache',
//					'servers'=>array(
//						array('host'=>'server1', 'port'=>11211, 'weight'=>60),
//						array('host'=>'server2', 'port'=>11211, 'weight'=>40),
//					),
				),
				'session' => array(
						'class' => 'system.web.CDbHttpSession',
						'connectionID' => 'db',
						'sessionTableName' => 'sessions',
				),
//				'user' => array(
//						// enable cookie-based authentication
//						'class' => 'WebUser',
//						'allowAutoLogin' => true,
//						'loginUrl' => array('/user/login'),
//				),
				'errorHandler' => array(
						// use 'site/error' action to display errors
						'errorAction' => 'site/error',
				),
				'log' => array(
						'class' => 'CLogRouter',
						'routes' => array(
								array(
										'class' => 'CFileLogRoute',
										'levels' => 'error, warning',
								),
						// uncomment the following to show log messages on web pages
						/*
						  array(
						  'class'=>'CWebLogRoute',
						  ),
						 */
						),
				),
		),
		// application-level parameters that can be accessed
		// using Yii::app()->params['paramName']
		'params' => array(
				// this is used in contact page
				'adminEmail' => 'webmaster@example.com',
		),
);