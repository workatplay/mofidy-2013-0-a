<?php

/**
 * This is the model class for table "comments".
 *
 * The followings are the available columns in table 'comments':
 * @property integer $id
 * @property string $created
 * @property string $data
 * @property string $user
 * @property integer $time
 * @property string $video
 */
class Comment extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Comment the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'comments';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('time', 'numerical', 'integerOnly'=>true),
			array('user', 'length', 'max'=>16),
			array('video', 'length', 'max'=>128),
			array('created, data', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, created, data, user, time, video', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'created' => 'Created',
			'data' => 'Data',
			'user' => 'User',
			'time' => 'Time',
			'video' => 'Video',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('created',$this->created,true);
		$criteria->compare('data',$this->data,true);
		$criteria->compare('user',$this->user,true);
		$criteria->compare('time',$this->time);
		$criteria->compare('video',$this->video,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
  
  
// custom:  
 	public function afterFind() {
    $this->id = (int)$this->id;
    $this->time = (int)$this->time;
 		$this->data = json_decode($this->data);
 	}
   
 	public function beforeSave() {
 		$this->data = json_encode($this->data);
     return true;
 	}
}