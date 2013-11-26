<?php 
class ControllerAccountRegister extends Controller {
	private $error = array();

	public function register(){
		$this->language->load('account/register');

		if (isset($this->request->server['HTTPS']) && (($this->request->server['HTTPS'] == 'on') || ($this->request->server['HTTPS'] == '1'))) {
			$this->data['base'] = $this->config->get('config_ssl');
		} else {
			$this->data['base'] = $this->config->get('config_url');
		}

		$this->load->model('account/customer');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->model_account_customer->addCustomer($this->request->post);
			
			$this->customer->login($this->request->post['email'], $this->request->post['password']);
			
			unset($this->session->data['guest']);

			return $this->response->setOutput(json_encode(array(
	            'success' => 'ok'
	        )));
    	}
    	
    	if (isset($this->error['warning'])) {
			$this->data['error_warning'] = $this->error['warning'];
		} else {
			$this->data['error_warning'] = '';
		}
		
    	return $this->response->setOutput(json_encode(array(
            'success' => 'not ok',
            'warning' => $this->data['error_warning']
        )));
		
	}
	      
  	public function index() {  		
  		if ($this->customer->getId()) {
  			// text
  			$this->data['text_introdure_your_self'] = 'Introduce your self';
  			$this->data['text_create_profile'] = 'Create my profile';
  			$this->data['text_profile_recommend'] = 'A Yesocl profile helps you...';
  			$this->data['text_recommend_1'] = 'Showcase your skills and experience';
  			$this->data['text_recommend_2'] = 'Be found for new opportunities';
  			$this->data['text_recommend_3'] = 'Stay in touch with colleagues and friends';
  			$this->data['text_field_required'] = 'Field is required';
  			$this->data['text_i_current'] = 'I am current';
  			$this->data['text_live_in'] = 'I live in';
  			$this->data['text_location_placer'] = 'Input Text';
  			$this->data['text_postal_code'] = 'Postal code';
  			$this->data['text_post_code_placer'] = 'Input Text';
  			$this->data['text_employed'] = 'Employed';
  			$this->data['text_job_seeker'] = 'Job Seeker';
  			$this->data['text_student'] = 'Student';
  			$this->data['text_job_title'] = 'Job title';
  			$this->data['text_job_title_placer'] = 'Input Text';
  			$this->data['text_self_employed'] = 'I am a self-employed';
  			$this->data['text_company'] = 'Company';
  			$this->data['text_company_placer'] = 'Input Text';

  			// get customer data
  			$this->load->model('account/customer');
  			$customer = $this->model_account_customer->getCustomer($this->customer->getId());
  			if (empty($customer)) {
  				// set redirect link & redirect to login form.
  			}

  			// fetch data to step 1
  			$meta = $customer->getMeta();
  			$background = $customer->getBackground();
  			//location
  			$location = $meta->getLocation();
  			$this->data['location']	= $location->getLocation();
  			$this->data['city_id']	= $location->getCityId();
  			//post code
  			$this->data['postal_code'] = $meta->getPostalCode();
  			//experience
  			$experience = $background->getCurrentExperience();
  			if ($experience) {/*
  				$this->data['company']['name'] = $experience->getCompany();
  				$this->data['company']['title'] = $experience->getTitle();
  				$this->data['company']['start'] = $experience->getStarted();
  				$this->data['company']['end'] = $experience->getEnded();
  				$this->data['company']['self_employed'] = $experience->getSelfEmployed();*/
  			}
  			//education
  			$education = $background->getCurrentEducation();
  			if ($education) {/*
  				$this->data['school']['name'] = $education->getSchool();
  				$this->data['school']['id'] = $education->getSchoolId();
  				$this->data['school']['field_of_study'] = $education->getFieldOfStudy();
  				$this->data['school']['start'] = $education->getStarted();
  				$this->data['school']['end'] = $education->getEnded();*/
  			}

			if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/account/register/register.tpl')) {
				$this->template = $this->config->get('config_template') . '/template/account/register/register.tpl';
			} else {
				$this->template = 'default/template/account/register/register.tpl';
			}
			
			$this->children = array(
				'common/sidebar_control',
				'common/footer',
				'common/header'	
			);
					
			$this->response->setOutput($this->twig_render());
  		}else {
  			// set redirect link & redirect to login form.
  		}
  	}

  	private function validate() {
    	if ((utf8_strlen($this->request->post['firstname']) < 1) || (utf8_strlen($this->request->post['firstname']) > 32)) {
      		$this->error['warning'] = $this->language->get('error_firstname');
    	
    	}elseif ((utf8_strlen($this->request->post['lastname']) < 1) || (utf8_strlen($this->request->post['lastname']) > 32)) {
      		$this->error['warning'] = $this->language->get('error_lastname');
    	
    	}elseif ((utf8_strlen($this->request->post['email']) > 96) || !preg_match('/^[^\@]+@.*\.[a-z]{2,6}$/i', $this->request->post['email'])) {
      		$this->error['warning'] = $this->language->get('error_email');
    	
    	}elseif ($this->model_account_customer->getCustomerByEmail($this->request->post['email'])) {
      		$this->error['warning'] = $this->language->get('error_exists');
    	}else{
    		$this->load->library('recaptcha');
			$captcha = new Recaptcha();
			$resp = $captcha->recaptcha_check_answer($_SERVER["REMOTE_ADDR"], 
				$this->request->post['recaptcha_challenge_field'],
				$this->request->post['recaptcha_response_field']
			);
			//file_put_contents("D:\\a.txt", $resp->error);
			if (!$resp->is_valid) {
	        	$this->error['warning'] = "Security code wasn't entered correctly";
	        }
	    }
    	if (!$this->error) {
      		return true;
    	} 
    	return false;
  	}	
}
?>