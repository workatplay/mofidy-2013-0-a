<?php

/**
 * This is the model class for table "commands".
 *
 * The followings are the available columns in table 'commands':
 * @property integer $id
 * @property string $data
 * @property string $created
 * @property string $user
 * @property string $command
 */
class Command extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Command the static model class
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
		return 'commands';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user, command', 'required'),
			array('user', 'length', 'max'=>16),
			array('command', 'length', 'max'=>255),
			array('data, created', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, data, created, user, command', 'safe', 'on'=>'search'),
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
			'data' => 'Data',
			'created' => 'Created',
			'user' => 'User',
			'command' => 'Command',
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
		$criteria->compare('data',$this->data,true);
		$criteria->compare('created',$this->created,true);
		$criteria->compare('user',$this->user,true);
		$criteria->compare('command',$this->command,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
  
  
  
// custom:  
 	public function afterFind() {
    $this->id = (int)$this->id;
 		$this->data = json_decode($this->data);
 	}
   
 	public function beforeSave() {
 		$this->data = json_encode($this->data);
     return true;
 	}
}