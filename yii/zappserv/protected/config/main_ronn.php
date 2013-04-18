<?php

require_once(dirname(__FILE__) . '/main_core.php');

$settings['components']['db']['connectionString'] = 'mysql:host=127.0.0.1;dbname=zapp';
$settings['components']['db']['username'] = 'root';
$settings['components']['db']['password'] = 'root';

//$settings['components']['less']['forceCompile'] = true;

//$settings['components']['log']['routes'][] = array(
//	'class' => 'CWebLogRoute',
//	'levels' => 'trace',
//	'categories'=>'system.db.CDbCommand',
//);

return $settings;