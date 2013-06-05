<?php  
class ControllerPostCategories extends Controller {
	public function index() {
		if (isset($this->request->server['HTTPS']) && (($this->request->server['HTTPS'] == 'on') || ($this->request->server['HTTPS'] == '1'))) {
			$this->data['base'] = $this->config->get('config_ssl');
		} else {
			$this->data['base'] = $this->config->get('config_url');
		}

		$this->document->setTitle($this->config->get('config_title'));
		$this->document->setDescription($this->config->get('config_meta_description'));

		$this->data['heading_title'] = $this->config->get('config_title');

		$this->load->model( 'company/company' );
		$this->load->model('tool/image');

		$company = $this->model_company_company->getCompanyBySlug( $this->config->get('company')['default']['slug'] );
		
		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/post/categories.tpl')) {
			$this->template = $this->config->get('config_template') . '/template/post/categories.tpl';
		} else {
			$this->template = 'default/template/post/categories.tpl';
		}
		
		$this->children = array(
			'common/sidebar_control',	
			'common/footer',
			'common/header'
		);
										
		$this->response->setOutput($this->twig_render());
	}
}
?>