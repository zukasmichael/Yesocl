<?php
class ControllerAccountAvatar extends Controller {
	private $error = array();
	     
	public function index() {
  	if (isset($this->request->server['HTTPS']) && (($this->request->server['HTTPS'] == 'on') || ($this->request->server['HTTPS'] == '1'))) {
			$this->data['base'] = $this->config->get('config_ssl');
		} else {
			$this->data['base'] = HTTP_SERVER;
		}

    $this->document->setTitle($this->language->get('heading_title'));

		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/account/avatar.tpl')) {
			$this->template = $this->config->get('config_template') . '/template/account/avatar.tpl';
		} else {
			$this->template = 'default/template/account/avatar.tpl';
		}
		
		$this->children = array(
			'common/sidebar_control',
			'common/footer',
			'common/header'
		);
				
		$this->response->setOutput($this->twig_render());			
	}

	public function save(){

		if ( empty($this->request->post['cropW']) ){
			return $this->response->setOutput(json_encode(array(
        'success' => 'not ok',
        'message' => 'Change avatar unsuccessfully: width is empty !'
      )));
		}
		if ( empty($this->request->post['image']) ){
			return $this->response->setOutput(json_encode(array(
        'success' => 'not ok',
        'message' => 'Change avatar unsuccessfully: image is empty !'
      )));
		}

		$this->load->model('user/user');

    $aParts = explode('/', $this->request->post['image'] );
    $sFilename = $aParts[count($aParts) - 1];
    $sImageLink = DIR_IMAGE . $this->config->get('common')['image']['upload_cache'] . $sFilename;
    $sExtension = explode('.', $sFilename)[1];

    $aDatas = array('avatar' => array(
      'x' => $this->request->post['cropX'],
      'y' => $this->request->post['cropY'],
      'holderW' => $this->request->post['holderW'],
      'holderH' => $this->request->post['holderH'],
      'width' => $this->request->post['cropW'],
      'image_link' => $sImageLink,
      'extension' => $sExtension
    ));

    $return = $this->model_user_user->editUser( $this->customer->getSlug(), $aDatas );
    if ( !$return ){
    	return $this->response->setOutput(json_encode(array(
        'success' => 'not ok',
        'message' => 'Change avatar unsuccessfully !'
      )));
    }
    return $this->response->setOutput(json_encode(array(
      'success' => 'ok',
      'message' => 'Change avatar successfully !'
    )));
	}
}
?>
