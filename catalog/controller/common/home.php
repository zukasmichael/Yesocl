<?php  
class ControllerCommonHome extends Controller {
	private $limit = 20;

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

		if ( $company ){
			$company_posts = $company->getPosts();
		}

		$this->data['posts'] = array();
		$i = 0;
		foreach ( $company_posts as $post ) {
			if ( $post->getUser() && $post->getUser()->getAvatar() ){
				$avatar = $this->model_tool_image->resize( $post->getUser()->getAvatar(), 180, 180 );
			}else{
				$avatar = $this->model_tool_image->getGavatar( $post->getEmail(), 180 );
			}

			$comment_count = count( $post->getComments() );

			if ( $post->getThumb() ){
				$image = $this->model_tool_image->resize( $post->getThumb(), 400, 250 );
			}else{
				$image = null;
			}			

			$this->data['posts'][] = array(
				'id'			=> $post->getId(),
				'author' 		=> $post->getAuthor(),
				'avatar' 		=> $avatar,
				'image'			=> $image,
				'title' 		=> $post->getTitle(),
				'content' 		=> html_entity_decode($post->getDescription()),
				'created'		=> $post->getCreated(),
				'comment_count' => $comment_count,
				'type'			=> 'company',
				'href_user'		=> $this->url->link('account/edit', 'user_slug=' . $post->getUser()->getSlug(), 'SSL'),
				'href_post'		=> $this->url->link('post/detail', 'post_slug=' . $post->getSlug(), 'SSL'),
				'href_status'	=> $this->url->link('post/post/getCommentByPost', '', 'SSL')
			);
			
			// Limit 20 post each load company
			if ( $i == $this->limit ){
				break;
			}

			$i++;
		}

		$this->data['action']['comment'] = $this->url->link('post/post/addComment', '', 'SSL');
		
		if (file_exists(DIR_TEMPLATE . $this->config->get('config_template') . '/template/common/home.tpl')) {
			$this->template = $this->config->get('config_template') . '/template/common/home.tpl';
		} else {
			$this->template = 'default/template/common/home.tpl';
		}
		
		$this->children = array(
			'common/sidebar_control',			
			// 'common/content_top',
			// 'common/content_bottom',
			'common/footer',
			'common/header'
		);
										
		$this->response->setOutput($this->twig_render());
	}
}
?>