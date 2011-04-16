<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Entity extends CI_Controller {
	
	public function index()
	{
		$this->load_view('edit');
	}
	
	public function add()
	{
		$this->load_view('edit');
	}
	
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
	
	private function load_view($view)
	{
		$this->load->view('fragments/header');
		$this->load->view('entity/'.$view);
		$this->load->view('fragments/footer');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/entity.php */