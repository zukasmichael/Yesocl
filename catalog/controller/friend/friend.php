<?php 
use DateTime;

class ControllerFriendFriend extends Controller {
	public function index() {
		if (isset($this->request->server['HTTPS']) && (($this->request->server['HTTPS'] == 'on') || ($this->request->server['HTTPS'] == '1'))) {
			$this->data['base'] = $this->config->get('config_ssl');
		} else {
			$this->data['base'] = $this->config->get('config_url');
		}
		
		$this->load->model('tool/image');
		$this->load->model('user/user');
		$this->load->model('friend/friend');

		$this->document->setTitle($this->config->get('config_title'));
		$this->document->setDescription($this->config->get('config_meta_description'));

		if ( $this->customer->getSlug() != $this->request->get['user_slug'] ){
			$curr_user = $this->model_user_user->getUserFull( $this->request->get );
		}else{
			$curr_user = $this->customer->getUser();
		}

		if ( !$curr_user ){
			return false;
		}

		$user_temp = $curr_user->formatToCache();

		$user_temp['avatar'] = $this->model_tool_image->getAvatarUser( $user_temp['avatar'], $user_temp['email'] );

		$this->data['current_user_id'] = $curr_user->getId();

		$friends = $curr_user->getFriends();

		foreach ( $friends as $friend ) {
			$friend_id = $friend->getUser()->getId();
			if ( $friend_id == $curr_user->getId() ){
				continue;
			}
			$user_ids[$friend_id] = $friend_id;
		}

		$this->data['friend_ids'] = $user_ids;

		$users = $this->model_user_user->getUsers(array(
			'user_ids' => $user_ids
		));

		$this->data['users'] = array($user_temp['id'], $user_temp);

		foreach ( $users as $user ) {
			$fr_status = $this->model_friend_friend->checkFriendStatus( $user, $curr_user );

			$gender = $user->getMeta()->getSex();

			$user = $user->formatToCache();

			$user['avatar'] = $this->model_tool_image->getAvatarUser( $user['avatar'], $user['email'] );

			$user['fr_status'] = $fr_status;

			$user['gender'] = $gender;

			$this->data['users'][$user['id']] = $user;
		}

		$this->data['group'] = array();

		foreach ( $curr_user->getFriendGroups() as $group ) {
			$this->data['group'][$group->getId()] = array(
				'id' => $group->getId(),
				'name' => $group->getName()
			);
		}

		// set selected menu
		$this->session->setFlash( 'menu', 'friend' );

		$this->data['filter_type'] = $this->config->get('friend')['filter']['type'];

		$recent_time = new DateTime('now');
		date_add($recent_time, date_interval_create_from_date_string('7 days'));
		$this->data['recent_time'] = $recent_time;

		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/friend/friend.tpl')) {
			$this->template = $this->config->get('config_template') . '/template/friend/friend.tpl';
		} else {
			$this->template = 'default/template/friend/friend.tpl';
		}
		
		$this->children = array(
			'common/sidebar_control',
			'common/footer',
			'common/header'
		);
										
		$this->response->setOutput($this->twig_render());
	}

	public function getListFriends() {
		$json = array();

		if ( $this->customer->isLogged() ) {
			$data = array();

			if ( isset( $this->request->post['filter_name'] ) && (strlen( $this->request->post['filter_name'] ) > 0) ) {
				$data['filter_name'] = $this->request->post['filter_name'];
			}

			if ( isset( $this->request->post['filter_gender'] ) ) {
				$data['filter_gender'] = $this->request->post['filter_gender'];
			}

			if ( isset( $this->request->post['filter_request'] ) ) {
				$data['filter_request'] = $this->request->post['filter_request'];
			}

			$data['limit'] = 20;
			$data['start'] = 0;

			if ( count( $data ) > 0 ) {
				$this->load->model( 'friend/friend' );

				$json['success'] = 'ok';
				$json['friends'] = $this->model_friend_friend->getListFriends( $data );
			} 
		}

		$this->response->setOutput( json_encode( $json ) );
	}
}
?>