<?php

include_once 'database.php';
include_once 'idatalayer.php';

class InstanceDataLayer implements IDataLayer 
{
	private function getConnection()
	{
		$db =& new sdb("mysql:host=localhost;dbname=morpho", 'root', '', array());
		return $db;
	}
	
	public function GetList($filter)
	{		
		$db = $this->getConnection();		
		print_r($db->queryFetchAllAssoc("select * from instances"));
		
	}
	public function GetSingle($id){}
	public function Add($record){}
	public function Update($record){}
	public function Delete($record){}
}

?>