<?php 

interface IDataLayer
{
	public function GetList($filter);
	public function GetSingle($id);
	public function Add($record);
	public function Update($record);
	public function Delete($record);
}


?>