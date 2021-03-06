<?php 
class ControllerPostPost extends Controller {
	private $error = array();

	public function addPost(){
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->load->model('tool/image');

            $sImageLink = null;
            $sExtension = null;
            if ( !empty($this->request->post['thumb']) ){
                $aParts = explode('/', $this->request->post['thumb'] );
                $sFilename = $aParts[count($aParts) - 1];
                $sImageLink = DIR_IMAGE . $this->config->get('common')['image']['upload_cache'] . $sFilename;
                $sExtension = explode('.', $sFilename)[1];
            }

            $sPostType = $this->request->get['post_type'];

            switch ( $sPostType ) {
                case $this->config->get('common')['type']['user']:
                    $this->load->model('user/post');
                    $aDatas = array(
                        'content'       => $this->request->post['content'],
                        'title'         => $this->request->post['title'],
                        'user_slug'     => $this->request->get['user_slug'],
                        'author_id'     => $this->customer->getId(),
                        'image_link'    => $sImageLink,
                        'extension'     => $sExtension
                    );

                    $oPost = $this->model_user_post->addPost( $aDatas );
                    break;

                case $this->config->get('common')['type']['branch']:
                    $this->load->model('branch/post');
                    $aDatas = array(
                        'content'       => $this->request->post['content'],
                        'title'         => $this->request->post['title'],
                        'description'   => $this->request->post['description'],
                        'category'      => $this->request->post['category'],
                        'author_id'     => $this->customer->getId(),
                        'image_link'    => $sImageLink,
                        'extension'     => $sExtension
                    );

                    $oPost = $this->model_branch_post->addPost( $aDatas );
                    break;
                
                default:
                    $oPost = null;
                    break;
            }

            if ( !$oPost ){
                return $this->response->setOutput(json_encode(array(
                    'success' => 'not ok: Save Post have error',
                )));
            }

            $aAuthor = $oPost->getUser()->formatToCache();

            // avatar
            $sAvatar = $this->model_tool_image->getAvatarUser( $aAuthor['avatar'], $aAuthor['email'] );

            // thumb
            $sThumb = $oPost->getThumb();
            if ( !empty($sThumb) ){
                $sImage = $this->model_tool_image->resize( $sThumb, 400, 250 );
            }else{
                $sImage = null;
            }

            // href
            $aData_post_infos = array(
                'post_type' => $sPostType,
                'post_slug' => $oPost->getSlug()
            );
            $aHref = array(
                'comment_list' => $this->extension->path( "CommentList", $aData_post_infos ),
                'comment_add' => $this->extension->path( "CommentAdd", $aData_post_infos ),
                'post_like' => $this->extension->path( "PostLike", $aData_post_infos ),
                'post_detail' => $this->extension->path( "PostPage", $aData_post_infos ),
                'user_info' => $this->extension->path( "WallPage", array('user_slug' => $aAuthor['slug']) ),
                'post_get_liked' => $this->extension->path( "PostGetLiker", $aData_post_infos )
            );

            $bIsSeeMore = false;

            $aReturnData = array(
                'post' => array(
                    'user' => array(
                        'avatar' => $sAvatar,
                        'username' => $oPost->getAuthor()
                    ),
                    'created' => $this->extension->dateFormat( $oPost->getCreated() ),
                    'image' => $sImage,
                    'thumb' => $sThumb,
                    'title' => $oPost->getTitle(),
                    'content' => html_entity_decode($oPost->getContent()),
                    'see_more' => $bIsSeeMore,
                    'slug' => $oPost->getSlug()
                ),
                'post_type' => $sPostType,
                'href' => $aHref,
                'is_owner' => true
            );

            // Check owner
            // If post of wall & owner = false ==> user A post on all of user B
            // If post of branch ==> user A post on any Branch
            switch ( $sPostType ) {
                case $this->config->get('common')['type']['user']:
                    if ( $aAuthor['id'] != $oPost->getOwnerSlug() ){
                        $this->load->model('user/user');

                        $aOwner = $this->model_user_user->getUser( $this->request->get['user_slug'] );
                        if ( $aOwner ){
                            $aReturnData['is_owner'] = false;
                            $aReturnData['owner'] = array(
                                'username' => $aOwner['username'],
                                'href' => $this->extension->path( "WallPage", array('user_slug' => $aOwner['slug']) )
                            );
                        }
                    }
                    break;

                case $this->config->get('common')['type']['branch']:
                    $oCategory = $oPost->getCategory();

                    $aReturnData['is_owner'] = false;
                    $aReturnData['owner'] = array(
                        'username' => $oCategory->getName(),
                        'href' => $this->extension->path("BranchCategory", array('branch_slug' => $oCategory->getSlug()) )
                    );
                    break;
                
                default:
                    $oPost = null;
                    break;
            }

            // Add notification
            $this->load->model('user/notification');
            
            if ( $this->customer->getSlug() != $this->request->get['user_slug'] ){
                $this->model_user_notification->addNotification(
                    $this->request->get['user_slug'],
                    $this->customer->getUser(),
                    $this->config->get('common')['action']['post'],
                    $oPost->getId(),
                    $oPost->getSlug(),
                    $sPostType,
                    $this->config->get('common')['object']['wall']
                );
            }

            if ( !empty($this->request->post['tags']) ){
                $aUserSlugs = $this->request->post['tags'];

                foreach ( $aUserSlugs as $sUserSlug ) {
                    $this->model_user_notification->addNotification(
                        $sUserSlug,
                        $this->customer->getUser(),
                        $this->config->get('common')['action']['tag'],
                        $oPost->getId(),
                        $oPost->getSlug(),
                        $sPostType,
                        $this->config->get('common')['object']['post']
                    );
                }
            }

			return $this->response->setOutput(json_encode(array(
	            'success' => 'ok',
                'post' => $aReturnData
	        )));
    	}
		
    	return $this->response->setOutput(json_encode(array(
            'success' => 'not ok',
            'error' => $this->error['warning']
        )));
	}

    public function editPost(){
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            if ( empty($this->request->get['post_slug']) ){
                return $this->response->setOutput(json_encode(array(
                    'success' => 'not ok: post slug empty'
                )));
            }

            $this->load->model('user/post');
            $this->load->model('tool/image');

            $sImageLink = null;
            $sExtension = null;
            if ( !empty($this->request->post['thumb']) ){
                $aParts = explode('/', $this->request->post['thumb'] );
                $sFilename = $aParts[count($aParts) - 1];
                $sImageLink = DIR_IMAGE . $this->config->get('common')['image']['upload_cache'] . $sFilename;
                $sExtension = explode('.', $sFilename)[1];
            }

            $sPostType = $this->request->get['post_type'];

            switch ( $sPostType ) {
                case $this->config->get('common')['type']['user']:
                    $this->load->model('user/post');
                    $aDatas = array(
                        'content' => $this->request->post['content'],
                        'title' => $this->request->post['title'],
                        'image_link' => $sImageLink,
                        'extension' => $sExtension
                    );

                    $oPost = $this->model_user_post->editPost( $this->request->get['post_slug'],  $aDatas );
                    break;

                case $this->config->get('common')['type']['branch']:
                    $this->load->model('branch/post');
                    $aDatas = array(
                        'content'       => $this->request->post['content'],
                        'title'         => $this->request->post['title'],
                        'description'   => $this->request->post['description'],
                        'category'      => $this->request->post['category'],
                        'image_link'    => $sImageLink,
                        'extension'     => $sExtension
                    );

                    $oPost = $this->model_branch_post->editPost( $this->request->get['post_slug'], $aDatas );
                    break;
                
                default:
                    $oPost = null;
                    break;
            }

            if ( !$oPost ){
                return $this->response->setOutput(json_encode(array(
                    'success' => 'not ok',
                    'error' => $this->error['warning']
                )));
            }

            // thumb
            $sThumb = $oPost->getThumb();
            
            if ( !empty($sThumb) ){
                $sImage = $this->model_tool_image->resize( $sThumb, 400, 250 );
            }else{
                $sImage = null;
            }

            $sPostType = $this->config->get('post')['type']['user'];

            $aReturnData = array(
                'image' => $sImage,
                'thumb' => $sThumb,
                'title' => $oPost->getTitle(),
                'content' => html_entity_decode($oPost->getContent())
            );

            return $this->response->setOutput(json_encode(array(
                'success' => 'ok',
                'post' => $aReturnData
            )));
        }
        
        return $this->response->setOutput(json_encode(array(
            'success' => 'not ok',
            'error' => $this->error['warning']
        )));
    }

    public function deletePost(){
        $aDatas = array();

        if ( !empty($this->request->get['post_slug']) ){
            $aDatas['post_slug'] = $this->request->get['post_slug'];
        }else{
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post slug empty'
            )));
        }

        if ( !empty($this->request->get['post_type']) ){
            $aDatas['post_type'] = $this->request->get['post_type'];
        }else{
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post type empty'
            )));
        }
        
        switch ($aDatas['post_type']) {
            case $this->config->get('post')['type']['branch']:
                $this->load->model('branch/post');
                $bResult = $this->model_branch_post->deletePost( $aDatas['post_slug'] );
                break;

            case $this->config->get('post')['type']['user']:
                $this->load->model('user/post');
                $bResult = $this->model_user_post->deletePost( $aDatas['post_slug'] );
                break;
            
            default:
                $bResult = false;
                break;
        }

        if ( $bResult == false ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok'
            )));
        }
        
        return $this->response->setOutput(json_encode(array(
            'success' => 'ok'
        )));
    }

    public function validate(){
        if ( empty($this->request->post['content']) ) {
            $this->error['warning'] = $this->language->get( 'error_content' );
        
        }elseif ( !empty($this->request->files['thumb']) && $this->request->files['thumb']['size'] > 0 ) {
            $this->load->model('tool/image');
            if ( !$this->model_tool_image->isValidImage( $this->request->files['thumb'] ) ) {
                $this->error['warning'] = $this->language->get( 'error_thumb');
            }
        
        }elseif ( isset($this->request->get['user_slug']) && empty($this->request->get['user_slug']) ){
            $this->error['warning'] = 'user slug is empty';
        
        }elseif ( $this->request->get['post_type'] == $this->config->get('common')['type']['branch'] ){
            if ( empty($this->request->post['description']) ){
                $this->error['warning'] = 'description is empty';
            
            }elseif ( empty($this->request->post['category']) ){
                $this->error['warning'] = 'category is empty';
            }
        }

        if ( $this->error ) {
            return false;
        }else {
            return true;
        }
    }

    public function like(){
        $aDatas = array();

        if ( !empty($this->request->get['post_slug']) ){
            $aDatas['post_slug'] = $this->request->get['post_slug'];
        }else{
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post slug empty'
            )));
        }

        if ( !empty($this->request->get['post_type']) ){
            $aDatas['post_type'] = $this->request->get['post_type'];
        }else{
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post type empty'
            )));
        }

        $aDatas['likerId'] = $this->customer->getId();
        
        switch ($aDatas['post_type']) {
            case $this->config->get('post')['type']['branch']:
                $this->load->model('branch/post');
                $oPost = $this->model_branch_post->editPost( $aDatas['post_slug'], $aDatas );
                break;

            case $this->config->get('post')['type']['user']:
                $this->load->model('user/post');
                $oPost = $this->model_user_post->editPost( $aDatas['post_slug'], $aDatas );
                break;
            
            default:
                $oPost = null;
                break;
        }

        if ( $oPost ){
            if ( $oPost->getUser()->getId() != $this->customer->getId() ){
                $this->load->model('user/notification');
                
                if ( in_array($this->customer->getId(), $oPost->getLikerIds()) ){
                    $this->model_user_notification->addNotification(
                        $oPost->getUser()->getSlug(),
                        $this->customer->getUser(),
                        $this->config->get('common')['action']['like'],
                        $oPost->getId(),
                        $oPost->getSlug(),
                        $aDatas['post_type'],
                        $this->config->get('common')['object']['post']
                    );
                }else{
                    $this->model_user_notification->deleteNotification(
                        $oPost->getUser()->getId(),
                        $this->customer->getId(),
                        $oPost->getId(),
                        $this->config->get('common')['action']['like']
                    );
                }
            }

            return $this->response->setOutput(json_encode(array(
                'success' => 'ok',
                'like_count' => count($oPost->getLikerIds())
            )));
        }

        return $this->response->setOutput(json_encode(array(
            'success' => 'not ok'
        )));
    }

    public function getLikers() {
        $aDatas = array();

        if (isset($this->request->get['post_slug']) && !empty($this->request->get['post_slug'])) {
            $aDatas['post_slug'] = $this->request->get['post_slug'];
        } else {
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post slug empty'
            )));
        }

        if (isset($this->request->get['post_type']) && !empty($this->request->get['post_type'])) {
            $aDatas['post_type'] = $this->request->get['post_type'];
        } else {
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: post type empty'
            )));
        }

        switch ($aDatas['post_type']) {
            case $this->config->get('post')['type']['branch']:
                $this->load->model('branch/post');
                $oPost = $this->model_branch_post->getPost( $aDatas );
                break;

            case $this->config->get('post')['type']['user']:
                $this->load->model('user/post');
                $oPost = $this->model_user_post->getPost( $aDatas );
                break;
            
            default:
                $oPost = null;
                break;
        }

        $this->load->model('user/user');
        $this->load->model('friend/friend');
        $this->load->model('friend/follower');
        $this->load->model('tool/image');
        
        $aUsers = array();

        if ( $oPost ){
            $lUsers = $this->model_user_user->getUsers(array(
                'user_ids' => $oPost->getLikerIds()
            ));
            
            if ( $lUsers ){
                foreach ( $lUsers as $oUser ) {
                    $aUser = $oUser->formatToCache();
                    
                    $aUser['fr_status'] = $this->model_friend_friend->checkStatus( $this->customer->getId(), $oUser->getId() );
                    $aUser['fl_status'] = $this->model_friend_follower->checkStatus( $this->customer->getId(), $oUser->getId() );
                    $aUser['avatar'] = $this->model_tool_image->getAvatarUser( $aUser['avatar'], $aUser['email'] );
                    $aUser['href_user'] = $this->extension->path( 'WallPage', array('user_slug' => $aUser['slug']) );

                    $aUsers[] = $aUser;
                }
            }
        }

        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'users' => $aUsers
        )));
    }
}
?>