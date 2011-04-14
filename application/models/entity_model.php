<?php

class Entity_model extends Morpho_Model {
	
	function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_list($filter)
    {
    	$this->load->database();
		if(isset($filter))
		{
			if(array_key_exists('code', $filter))
				$this->db->where('code', $filter['code']);			
			if(array_key_exists('name', $filter))
				$this->db->where('name', $filter['name']);
		}
    	
		$query = $this->db->get('entity');
		$result = array();
		foreach ($query->result_array() as $row)
			$result[] = $row;
			
    	if($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    		header("Content-type: text/x-json");
    		print json_encode($result);
    	} else {
    		return $result;
    	}
    }
}