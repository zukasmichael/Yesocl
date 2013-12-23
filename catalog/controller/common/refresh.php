<?php  
class ControllerCommonRefresh extends Controller {
	private $limit = 6;

	public function index() {
		if (isset($this->request->server['HTTPS']) && (($this->request->server['HTTPS'] == 'on') || ($this->request->server['HTTPS'] == '1'))) {
			$this->data['base'] = $this->config->get('config_ssl');
		} else {
			$this->data['base'] = HTTP_SERVER;
		}

		$this->document->setTitle($this->config->get('config_title'));
		$this->document->setDescription($this->config->get('config_meta_description'));
		
		$this->data['heading_title'] = $this->config->get('config_title');

		$this->load->model( 'branch/branch' );
		$this->load->model( 'friend/friend' );
		$this->load->model( 'cache/post' );
		$this->load->model( 'tool/image' );
		$this->load->model( 'user/user' );

		$aBranchs = $this->model_branch_branch->getAllBranchs()->toArray();

		$this->data['all_posts'] = array();

		$aBranchIds = array_keys($aBranchs);
		$aUserIds = $this->model_friend_friend->getListFriendIds();
		$aUserIds[] = $this->customer->getId();


		$aPosts = $this->model_cache_post->getPosts(array(
			'sort' => 'created',
			'type_ids' => array_merge($aBranchIds, $aUserIds),
		));
		
		$list_posts = array();
		$aUserIds = array();

		foreach ($aPosts as $i => $aPost) {
			// thumb
			if ( isset($aPost['thumb']) && !empty($aPost['thumb']) ){
				$aPost['image'] = $this->model_tool_image->resize( $aPost['thumb'], 400, 250, true );
			}else{
				$aPost['image'] = null;
			}

			if ( in_array($this->customer->getId(), $aPost['liker_ids']) ){
				$aPost['isUserLiked'] = true;
			}else{
				$aPost['isUserLiked'] = false;
			}

			$this->data['posts'][] = $aPost;

			$aUserIds[$aPost['user_id']] = $aPost['user_id'];
		}

		$this->data['users'] = array();
		$lUsers = $this->model_user_user->getUsers( array('user_ids' => $aUserIds) );

		if ( $lUsers ){
			foreach ( $lUsers as $oUser ) {
				$aUser = $oUser->formatToCache();

				$aUser['avatar'] = $this->model_tool_image->getAvatarUser( $aUser['avatar'], $aUser['email'] );

				$this->data['users'][$aUser['id']] = $aUser;
			}
		}
		
		$this->data['date_format'] = $this->language->get('date_format_full');
		$this->data['action']['comment'] = $this->url->link('post/comment/addComment', '', 'SSL');
		
		// set selected menu
		$this->session->setFlash( 'menu', 'refresh' );

		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/common/refresh.tpl')) {
			$this->template = $this->config->get('config_template') . '/template/common/refresh.tpl';
		} else {
			$this->template = 'default/template/common/refresh.tpl';
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