<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Banks extends REST_Controller {

	function __construct(){
		parent::__construct();
		$this->methods['index_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['index_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['index_delete']['limit'] = 50; // 50 requests per hour per user/key
	}

	public function index_post(){

		$data = json_decode(trim(file_get_contents('php://input')), true);

		$this->db->select('*');
		$this->db->from('bank');
		$this->db->like('name', $data["search"]);
		$this->db->or_like('code', $data["search"]);
		$query = $this->db->get();

		$banks = array();
		$banks["results"] = $query->result();
		$banks["count"] = count($banks["results"]);

		if (!empty($banks)) {
            $this->set_response($banks, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Something weird happend.'
            ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
        }
	}
}

?>