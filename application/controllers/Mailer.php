<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mailer extends CI_Controller {

	public function index(){
		$this->load->view('home');
	}
	
	public function app(){
	    $this->load->view('app');
	}
}
