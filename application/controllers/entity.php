<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Entity extends CI_Controller {
	
	private $entity_list;
	
	public function index()
	{
		$this->load_view('edit');
	}
	
	public function add()
	{
		$empty_entity = array(
			'code' => '',
			'id' => '',
			'meta' => '',
			'name' => '',
			'parent' => '',
			'model' => ''
		);
		$this->load->model('Entity_model');
		$this->entity_list = $this->Entity_model->get_list();		
		$this->load_view('edit', array('data_json' => json_encode($empty_entity)));
	}
	
	public function edit($id)
	{
		$this->load->model('Entity_model');
		$this->entity_list = $this->Entity_model->get_list();
		$data = $this->Entity_model->load($id);
		$this->load_view('edit', array('data_json' => json_encode($data)));
	}
	
	private function load_view($view, $data=null)
	{
		$this->load->view('fragments/header');
		$this->load->view('entity/'.$view, $data);
		$this->load->view('entity/sidebar', array("entities" => $this->entity_list));
		$this->load->view('fragments/footer');
	}
	
	/* ajax methods */
	public function get_list()
	{
		header("Content-type: text/x-json");
		$this->load->model('Entity_model');
		$filter = array();
		if($this->input->post('name'))
			$filter['name'] = $this->input->post('name');
		if($this->input->post('code'))
			$filter['code'] = $this->input->post('code');
			
		print json_encode($this->Entity_model->get_list($filter));
	}
	
	public function save()
	{
		header("Content-type: text/x-json");
		$this->load->model('Entity_model');
		$entity = array();		
		$entity['id'] = $this->input->post('id');
		$entity['name'] = $this->input->post('name');
		$entity['code'] = $this->input->post('code');
		$entity['model'] = json_encode($this->input->post('properties'));
		$id = $this->Entity_model->save($entity);
		
		print json_encode($id);    	
	}
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/entity.php */