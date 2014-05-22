<?php 
class ControllerApiComment extends Controller {
    private $error = array();
    private $limit = 10;

    public function add(){
        if ( empty($this->request->get['post_slug']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post slug is empty'
            )));
        }

        if ( empty($this->request->get['post_type']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post type is empty!'
            )));
        }

        if ( empty($this->request->post['content']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'content is empty!'
            )));
        }
        
        $sModel = $this->request->get['post_type'] . '/comment';
        $this->load->model($sModel);
        $this->load->model('tool/image');
        $this->load->model('user/user');
        $this->load->model('tool/object');

        $sModelLink = 'model_' . $this->request->get['post_type'] . '_comment';
        $oComment = $this->$sModelLink->addComment(array(
            'user_id' => $this->customer->getId(),
            'post_slug' => $this->request->get['post_slug'],
            'content' => $this->request->post['content']
        ));

        if ( !$oComment ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: add comment have error'
            )));
        }

        $aComment = $this->model_tool_object->formatComment( $oComment );

        $iTotalComment = $this->$sModelLink->getTotalComments( $this->request->get['post_slug'] );

        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'comment' => $aComment,
            'comment_count' => $iTotalComment
        )));
    }

    public function edit(){
        if ( empty($this->request->get['comment_id']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'comment id empty'
            )));
        }

        if ( empty($this->request->get['post_type']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post type is empty!'
            )));
        }

        if ( empty($this->request->post['content']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'content is empty!'
            )));
        }
        
        $sModel = $this->request->get['post_type'] . '/comment';
        $this->load->model($sModel);
        $this->load->model('tool/image');
        $this->load->model('user/user');

        $sModelLink = 'model_' . $this->request->get['post_type'] . '_comment';
        $oComment = $this->$sModelLink->editComment(
            $this->request->get['comment_id'],
            array(
                'content' => $this->request->post['content'],
                'author_id' => $this->customer->getId()
            )
        );
        
        if ( !$oComment ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok: add comment have error'
            )));
        }

        $aComment = $oComment->formatToCache();

        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'comment' => $aComment
        )));
    }    

    public function delete(){
        if ( empty($this->request->get['comment_id']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'comment id empty'
            )));
        }

        if ( empty($this->request->get['post_type']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post type is empty!'
            )));
        }

        $sModel = $this->request->get['post_type'] . '/comment';
        $this->load->model($sModel);
        $this->load->model('tool/image');
        $this->load->model('user/user');

        $sModelLink = 'model_' . $this->request->get['post_type'] . '_comment';
        $iTotalComment = $this->$sModelLink->deleteComment(
            $this->request->get['comment_id'],
            $this->customer->getId()
        );
        
        if ( $iTotalComment === false ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'you not have authentication for this comment'
            )));
        }

        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'comment_count' => $iTotalComment
        )));
    }

    public function getComments(){
        if ( empty($this->request->get['post_slug']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post slug is empty'
            )));
        }

        if ( empty($this->request->get['post_type']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post type is empty!'
            )));
        }

        if ( !empty($this->request->post['limit']) ){
            $limit = $this->request->post['limit'];
        }else{
            $limit = $this->limit;
        }

        if ( !empty($this->request->get['page']) ){
            $page = $this->request->get['page'];
        }else{
            $page = 1;
        }

        $sModel = $this->request->get['post_type'] . '/comment';
        $this->load->model($sModel);
        $this->load->model('tool/image');
        $this->load->model('tool/object');
        $this->load->model('user/user');

        $sModelLink = 'model_' . $this->request->get['post_type'] . '_comment';
        $aComments = $this->$sModelLink->getComments( 
            array(
                'post_slug' => $this->request->get['post_slug'],
                'limit' => (int)$limit,
                'start' => (int)($limit * ($page - 1))
            ),
            true
        );

        $aComments = $this->model_tool_object->formatComments( $aComments, false );

        $iTotalComment = $this->$sModelLink->getTotalComments( $this->request->get['post_slug'] );
        
        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'comments' => $aComments,
            'comment_count' => $iTotalComment
        )));
    }

    public function like(){
        $aDatas = array();

        if ( empty($this->request->get['comment_id']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'comment id empty'
            )));
        }

        if ( empty($this->request->get['post_type']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post type is empty!'
            )));
        }
        
        $sModel = $this->request->get['post_type'] . '/comment';
        $this->load->model($sModel);
        $this->load->model('tool/image');
        $this->load->model('user/user');

        $sModelLink = 'model_' . $this->request->get['post_type'] . '_comment';
        $oComment = $this->$sModelLink->editComment(
            $this->request->get['comment_id'],
            array('likerId' => $this->customer->getId())
        );

        if ( !$oComment ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'Like comment has error'
            )));
        }

        return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'like_count' => count($oComment->getLikerIds())
        )));
    }

    public function getLikers(){
        $aDatas = array();

        if ( empty($this->request->get['comment_id']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'comment id empty'
            )));
        }

        if ( empty($this->request->get['post_type']) ){
            return $this->response->setOutput(json_encode(array(
                'success' => 'not ok',
                'error' => 'post type is empty!'
            )));
        }
        
        $sModel = $this->request->get['post_type'] . '/comment';
        $this->load->model($sModel);

        $sModelLink = 'model_' . $this->request->get['post_type'] . '_comment';
        $oComment = $this->$sModelLink->getComment( $this->request->get['comment_id'] );

        $aUsers = array();

        if ( $oComment ){
            $this->load->model('tool/image');
            $this->load->model('user/user');

            $lQueryUsers = $this->model_user_user->getUsers( array(
                'user_ids' => $oComment->getLikerIds()
            ));

            if ( $lQueryUsers ){
                foreach ( $lQueryUsers as $oUser ) {
                    $aUser = $oUser->formatToCache();
                    $aUser['avatar'] = $this->model_tool_image->getAvatarUser( $aUser['avatar'], $aUser['email'] );
                    $aUsers[$aUser['id']] = $aUser;
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