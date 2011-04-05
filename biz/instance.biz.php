<?php

include 'dal/instance.dal.php';

class InstanceBiz
{
	public function GetList()
	{
		$dal = new InstanceDataLayer();
		$dal->GetList(null);
	}
}

?>