<?php 
class ControllerAccountWall extends Controller { 
	private $iLimit = 20;

	public function index() {
		if (isset($this->request->server['HTTPS']) && (($this->request->server['HTTPS'] == 'on') || ($this->request->server['HTTPS'] == '1'))) {
			$this->data['base'] = $this->config->get('config_ssl');
		} else {
			$this->data['base'] = HTTP_SERVER;
		}
		
		$this->document->setTitle($this->config->get('config_title'));
		$this->document->setDescription($this->config->get('config_meta_description'));

		if ( !empty($this->request->get['user_slug']) ){
			$sUserSlug = $this->request->get['user_slug'];
		}elseif ( $this->customer->isLogged() ){
			$sUserSlug = $this->customer->getSlug();
		}else{
			$this->redirect( $this->extension->path('HomePage') );
		}

		$this->load->model('user/user');
		$this->load->model('tool/image');
		$this->load->model('friend/friend');
		$this->load->model('friend/follower');

		$oCurrUser = $this->model_user_user->getUserFull( array('user_slug' => $sUserSlug) );

		if ( !$oCurrUser ){
			return false;
		}

		$aCurrUser = $oCurrUser->formatToCache();
		$aCurrUser['avatar'] = $this->model_tool_image->getAvatarUser( $aCurrUser['avatar'], $aCurrUser['email'], 150, 150 );
		$this->data['current_user'] = $aCurrUser;

		$this->data['post_type'] = $this->config->get('common')['type']['user'];

		// set selected menu
		$this->session->setFlash( 'menu', 'wall' );

		// Title
		$this->data['heading_title'] = gettext('Wall Page of') . ' ' . $oCurrUser->getUsername();
		
		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/account/wal.tpl')) {
			$this->template = $this->config->get('config_template') . '/template/account/wall.tpl';
		} else {
			$this->template = 'default/template/account/wall.tpl';
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