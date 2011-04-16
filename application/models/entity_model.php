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
			    	
    	return $result;    	
    }
    
    function save($entity)
    {
    	$this->load->database();
    	if($entity['id'] > 0)
    	{
    		$this->db->update('entity', $entity);
    		return $entity['id'];
    	}
    	else
    	{
    		$this->db->insert('entity', $entity);    	
    		return $this->db->insert_id(); 
    	}
    }
}