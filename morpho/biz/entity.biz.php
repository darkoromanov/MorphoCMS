<?php

include 'dal/entity.dal.php';

class EntityBiz
{
	public function GetList()
	{
		$dal = new EntityDataLayer();
		$dal->GetList(null);
	}
}

?>