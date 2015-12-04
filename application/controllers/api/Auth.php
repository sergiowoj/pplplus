<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Auth extends REST_Controller {

	function __construct(){
		parent::__construct();
		$this->methods['index_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['index_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['index_delete']['limit'] = 50; // 50 requests per hour per user/key
	}

	public function index_post(){

		$data = json_decode(trim(file_get_contents('php://input')), true);

		$this->db->select('name, surname, username, key');
		$this->db->from('user');
		$this->db->join('keys', 'user.access_key_id = keys.id');
		$this->db->join('employee', 'user.employee_id = employee.id');
		$this->db->where('username', $data["username"]);
		$this->db->where('password', $data["password"]);
		$query = $this->db->get();

		$result = array();
		if(count($query->result()) > 0){
			$result["token"] = $query->row()->key;
			$result["username"] = $query->row()->username;
			$result["name"] = $query->row()->name;
			$result["surname"] = $query->row()->surname;
			$result["message"] = 'Login successful.';
			$this->set_response($result, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
		} else {
			$this->set_response([
                'status' => FALSE,
                'message' => 'Invalid credentials.'
            ], REST_Controller::HTTP_UNAUTHORIZED);
		}
	}
}

?>