<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'libraries/REST_Controller.php';

class Employee extends REST_Controller {


	public function employee_get()
	{
		$this->load->database();
		$query = $this->db->query('SELECT * FROM employee');
		//echo json_encode($query->result());
		$this->response($query);
	}


}
