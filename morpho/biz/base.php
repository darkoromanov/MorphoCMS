<?php

include_once "dal/instance.dal.php";

class Base
{
	public function GetList()
	{
		call_user_func(array($classname, 'say_hello'));
	}
}

?>