<?php 
class ControllerPostPost extends Controller {
	private $error = array();

	public function addPost(){
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->load->model('user/post');
            $this->load->model('tool/image');

            $image_link = null;
            $extension = null;
            if ( !empty($this->request->post['thumb']) ){
                $parts = explode('/', $this->request->post['thumb'] );
                $filename = $parts[count($parts) - 1];
                $image_link = DIR_IMAGE . $this->config->get('common')['image']['upload_cache'] . $filename;
                $extension = explode('.', $filename)[1];
            }
            
            $data = array(
                'content' => $this->request->post['content'],
                'title' => $this->request->post['title'],
                'user_slug' => $this->request->get['user_slug'],
                'author_id' => $this->customer->getId(),
                'image_link' => $image_link,
                'extension' => $extension
            );

            $post = $this->model_user_post->addPost( $data );

            $user = $post->getUser()->formatToCache();

            // avatar
            $avatar = $this->model_tool_image->getAvatarUser( $user['avatar'], $user['email'] );

            // thumb
            $thumb = $post->getThumb();
            if ( !empty($thumb) ){
                $image = $this->model_tool_image->resize( $thumb, 400, 250, true );
            }else{
                $image = null;
            }

            $post_type = $this->config->get('post')['type']['user'];

            // href
            $data_post_info = array(
                'post_type' => $post_type,
                'post_slug' => $post->getSlug()
            );
            $href = array(
                'comment_list' => $this->extension->path( "CommentList", $data_post_info ),
                'comment_add' => $this->extension->path( "CommentAdd", $data_post_info ),
                'post_like' => $this->extension->path( "PostLike", $data_post_info ),
                'post_detail' => $this->extension->path( "PostPage", $data_post_info ),
                'user_info' => $this->extension->path( "WallPage", array('user_slug' => $user['slug']) ),
                'post_get_liked' => $this->extension->path( "PostGetLiker", $data_post_info )
            );

            $content = html_entity_decode($post->getContent());
            $see_more = false;

            if ( strlen($content) > 200 ){
                $content = substr($content, 0, 200) . '[...]';
                $see_more = true;
            }

            $return_data = array(
                'post' => array(
                    'user' => array(
                        'avatar' => $avatar,
                        'username' => $post->getAuthor()
                    ),
                    'created' => $post->getCreated()->format( $this->language->get('date_format_full') ),
                    'image' => $image,
                    'title' => $post->getTitle(),
                    'content' => $content,
                    'see_more' => $see_more
                ),
                'href' => $href
            );

			return $this->response->setOutput(json_encode(array(
	            'success' => 'ok',
                'post' => $return_data
	        )));
    	}
		
    	return $this->response->setOutput(json_encode(array(
            'success' => 'not ok',
            'error' => $this->error['warning']
        )));
	}

    public function validate(){
        if ( empty( $this->request->post['content']) ) {
            $this->error['warning'] = $this->language->get( 'error_content' );
        }elseif ( !empty( $this->request->files['thumb'] ) && $this->request->files['thumb']['size'] > 0 ) {
            $this->load->model('tool/image');
            if ( !$this->model_tool_image->isValidImage( $this->request->files['thumb'] ) ) {
                $this->error['warning'] = $this->language->get( 'error_thumb');
            }
        }

        if ( $this->error ) {
            return false;
        }else {
            return true;
        }
    }

    public function like(){
        $data = array();

        if ( !empty($this->request->get['post_slug']) ){
            $data['post_slug'] = $this->request->get['post_slug'];
        }else{
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post slug empty'
            )));
        }

        if ( !empty($this->request->get['post_type']) ){
            $data['post_type'] = $this->request->get['post_type'];
        }else{
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post type empty'
            )));
        }

        $data['likerId'] = $this->customer->getId();
        
        switch ($data['post_type']) {
            case $this->config->get('post')['type']['branch']:
                $this->load->model('branch/post');
                $post = $this->model_branch_post->editPost( $data['post_slug'], $data );
                break;

            case $this->config->get('post')['type']['user']:
                $this->load->model('user/post');
                $post = $this->model_user_post->editPost( $data['post_slug'], $data );
                break;
            
            default:
                $post = null;
                break;
        }

        if ( $post ){
            if ( $post->getUser()->getId() != $this->customer->getId() ){
                $this->load->model('user/user');

                if ( in_array($this->customer->getId(), $post->getLikerIds()) ){
                    $this->model_user_user->addNotification(
                        $post->getUser()->getId(),
                        $this->customer->getUser(),
                        $this->config->get('common')['action']['like'],
                        $post->getId(),
                        $data['post_type']
                    );
                }else{
                    
                }
            }

            return $this->response->setOutput(json_encode(array(
                'success' => 'ok',
                'like_count' => count($post->getLikerIds())
            )));
        }

        return $this->response->setOutput(json_encode(array(
            'success' => 'not ok'
        )));
    }

    public function getLikers() {
        $data = array();

        if (isset($this->request->get['post_slug']) && !empty($this->request->get['post_slug'])) {
            $data['post_slug'] = $this->request->get['post_slug'];
        } else {
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post slug empty'
            )));
        }

        if (isset($this->request->get['post_type']) && !empty($this->request->get['post_type'])) {
            $data['post_type'] = $this->request->get['post_type'];
        } else {
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post type empty'
            )));
        }

        switch ($data['post_type']) {
            case $this->config->get('post')['type']['branch']:
                $this->load->model('branch/post');
                $post = $this->model_branch_post->getPost( $data );
                break;

            case $this->config->get('post')['type']['user']:
                $this->load->model('user/post');
                $post = $this->model_user_post->getPost( $data );
                break;
            
            default:
                $post = null;
                break;
        }

        $this->load->model('user/user');
        $this->load->model('friend/friend');
        $this->load->model('tool/image');
        
        $users = array();

        if ( $post ){
            $query_users = $this->model_user_user->getUsers(array(
                'user_ids' => $post->getLikerIds()
            ));
            
            if ( $query_users ){
                foreach ( $query_users as $user ) {
                    $fr_status = $this->model_friend_friend->checkFriendStatus( $this->customer, $user );

                    $user = $user->formatToCache();

                    $user['fr_status'] = $fr_status['status'];
                    $user['fr_href'] = $fr_status['href'];

                    $user['avatar'] = $this->model_tool_image->getAvatarUser( $user['avatar'], $user['email'] );
                    $user['href_user'] = $this->extension->path( 'WallPage', array('user_slug' => $user['slug']) );

                    $users[] = $user;
                }
            }
        }

        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'users' => $users
        )));
    }
}
?>