<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Upload extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    function index_post()
    {
        $post = json_decode(trim(file_get_contents('php://input')), true);

        if(isset($_FILES['file'])){            
            //The error validation could be done on the javascript client side.
            $errors= array();        
            $file_name = $_FILES['file']['name'];
            $file_size = $_FILES['file']['size'];
            $file_tmp = $_FILES['file']['tmp_name'];
            $file_type = $_FILES['file']['type']; 

            // Uploaded file extension.
            $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

            // Allowed extensions.
            $extensions = array("jpeg", "jpg", "png"); 

            if(in_array($file_ext, $extensions) === false){
                $errors = array('uploaded' => false, 'err_code'=> 'ext_not_allowed', 'message' => 'Extension not allowed.');
            }
            if($file_size > 2097152){
                $errors = array('uploaded' => false, 'err_code'=> 'file_size_exceeded', 'message' => 'File size cannot exceed 2mb.');
            }               
            if(empty($errors) == true){
                if(move_uploaded_file($file_tmp, "assets/images/profile_photos/".$file_name)){
                    $data = array('photo' => 'assets/images/profile_photos/'.$file_name);
                    $this->db->where('id', '52');
                    $this->db->update('employee', $data);

                    $result = array('uploaded' => true, 'photo_url' => $data['photo'], 'message' => 'File uploaded.');
                    $this->set_response($result, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                }
            } else {
                $result = $errors;
                $this->set_response($result, REST_Controller::HTTP_OK); // NOT_FOUND (404) being the HTTP response code
            }
        }
    }
}
?>