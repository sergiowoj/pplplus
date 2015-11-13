<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Employees extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['index_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['index_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['index_delete']['limit'] = 50; // 50 requests per hour per user/key
    }

    public function index_get() {
        // Get employee id from url
        $id = $this->get_uri_params();

        //Get employee content from database
        $this->load->database();
        $query = $this->db->query('SELECT * FROM employee');
        $employees = array();
        $employees["results"] = $query->result();
        $employees["count"] = count($employees["results"]);

        // If the id parameter doesn't exist return all the employees
        if ($id === NULL) {
            
            // Check if the employees data store contains employees (in case the database result returns NULL)
            if ($employees) {
                $this->response($employees, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else {
                $this->response([
                    'status' => FALSE,
                    'message' => 'No employees were found'
                ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
            }
        }

        // Find and return a single record for a particular user.
        //$id = (int) $id;
        // Validate the id.
        if ($id <= 0) {
            // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        // Get the user from the array, using the id as key for retreival.
        // Usually a model is to be used for this.

        $employee = NULL;
        if (!empty($employees)) {
            foreach ($employees["results"] as $key => $value)
            {
                if ($value->cpf === $id)
                {
                    $employee = $value;
                }
            }
        }

        if (!empty($employee)) {
            $this->set_response($employee, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Employee not found.'
            ], REST_Controller::HTTP_NOT_FOUND); // NOT_FOUND (404) being the HTTP response code
        }
    }

    public function index_post() {
        $data = json_decode(trim(file_get_contents('php://input')), true);

        $this->load->database();
        $this->db->insert('employee', $data);

        $message = array('message'=>'Employee created.');
        $this->set_response($message, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }

    public function index_delete() {
        // Get employee id from url
        $id = $this->get_uri_params();

        $this->load->database();
        $this->db->delete('employee', array('cpf'=>$id));

        // $this->some_model->delete_something($id);
        $message = [
            'cpf' => $id,
            'message' => 'Deleted the resource'
        ];

        $this->set_response($message, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
    }

    public function index_put(){
        // Get employee id from url
        $id = $this->get_uri_params();

        $data = json_decode(trim(file_get_contents('php://input')), true);

        $this->load->database();
        $this->db->where('cpf', $id);
        $this->db->update('employee', $data);

        $message = array('message'=>'Employee updated.');
        $this->set_response($message, REST_Controller::HTTP_CREATED); // CREATED (201) being the HTTP response code
    }
}
