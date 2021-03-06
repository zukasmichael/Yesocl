<?php 
class ControllerAdminGroup extends Controller {
	private $error = array( );
	private $limit = 10;
	private $route = 'admin/group';
 
	public function index(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_view')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'admin/group' );
		$this->load->model( 'admin/group' );

		$this->document->setTitle( $this->language->get('heading_title') );
		
		$this->getList();
	}

	public function insert(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_insert')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'admin/group' );
		$this->load->model( 'admin/group' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateForm() ){
			$this->model_admin_group->addGroup( $this->request->post );
			
			$this->session->data['success'] = $this->language->get( 'text_success' );
			$this->redirect( $this->url->link('admin/group', 'token=' . $this->session->data['token'], 'SSL') );
		}

		$this->data['action'] = $this->url->link( 'admin/group/insert', 'token=' . $this->session->data['token'], 'SSL' );
		
		$this->getForm( );
	}

	public function update(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_edit')) ) {
			return $this->forward('error/permission');
		}
		
		$this->load->language( 'admin/group' );
		$this->load->model( 'admin/group' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateForm() ){
			$this->model_admin_group->editGroup( $this->request->get['group_id'], $this->request->post );
			
			$this->session->data['success'] = $this->language->get( 'text_success' );
			$this->redirect( $this->url->link('admin/group', 'token=' . $this->session->data['token'], 'SSL') );
		}
		
		$this->getForm();
	}
 
	public function delete(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_delete')) ) {
			return $this->forward('error/permission');
		}
		
		$this->load->language( 'admin/group' );
		$this->load->model( 'admin/group' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateDelete() ){
			$this->model_admin_group->deleteGroup( $this->request->post );
			
			$this->session->data['success'] = $this->language->get( 'text_success' );
			$this->redirect( $this->url->link('admin/group', 'token=' . $this->session->data['token'], 'SSL') );
		}

		$this->getList( );
	}

	private function getList( ){
		// catch error
		if ( isset($this->error['warning']) ){
			$this->data['error_warning'] = $this->error['warning'];

			unset( $this->session->data['error_warning'] );
		} elseif ( isset($this->session->data['error_warning']) ) {
			$this->data['error_warning'] = $this->session->data['error_warning'];
			
			unset( $this->session->data['error_warning'] );
		} else {
			$this->data['error_warning'] = '';
		}
		
		if ( isset($this->session->data['success']) ){
			$this->data['success'] = $this->session->data['success'];
		
			unset( $this->session->data['success'] );
		} else {
			$this->data['success'] = '';
		}
		
		if (isset($this->request->get['page'])) {
			$page = $this->request->get['page'];
		} else {
			$page = 1;
		}

		// breadcrumbs
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get( 'text_home' ),
			'href'      => $this->url->link( 'common/home', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => false
   		);
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get( 'heading_title' ),
			'href'      => $this->url->link( 'admin/group', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => ' :: '
   		);

   		// Heading title
		$this->data['heading_title'] = $this->language->get( 'heading_title' );
		
		// Text
		$this->data['text_no_results'] = $this->language->get( 'text_no_results' );
		$this->data['text_status'] = $this->language->get( 'text_status' );
		$this->data['text_group'] = $this->language->get( 'text_group' );	
		$this->data['text_action'] = $this->language->get( 'text_action' );
		$this->data['text_enabled'] = $this->language->get( 'text_enabled' );
		$this->data['text_disabled'] = $this->language->get( 'text_disabled' );
		$this->data['text_edit'] = $this->language->get( 'text_edit' );
		
		// Confirm
		$this->data['confirm_del'] = $this->language->get( 'confirm_del' );
		
		// Button
		$this->data['button_insert'] = $this->language->get( 'button_insert' );
		$this->data['button_delete'] = $this->language->get( 'button_delete' );
		
		// Link
		$this->data['insert'] = $this->url->link( 'admin/group/insert', 'token=' . $this->session->data['token'], 'SSL' );
		$this->data['delete'] = $this->url->link( 'admin/group/delete', 'token=' . $this->session->data['token'], 'SSL' );

		// Group
		$groups = $this->model_admin_group->getGroups( );
		
		$group_total = $this->model_admin_group->getTotalGroups();
		
		$this->data['groups'] = array();
		if ( $groups ){
			foreach ( $groups as $group ){
				$action = array();
			
				$action[] = array(
					'text' => $this->language->get( 'text_edit' ),
					'href' => $this->url->link( 'admin/group/update', 'group_id=' . $group->getId() . '&token=' . $this->session->data['token'], 'SSL' ),
					'icon' => 'icon-edit',
				);
			
				$this->data['groups'][] = array(
					'id' => $group->getId(),
					'name' => $group->getName(),
					'action' => $action,
				);
			}
		}
		
		$pagination = new Pagination();
		$pagination->total = $group_total;
		$pagination->page = $page;
		$pagination->limit = $this->limit;
		$pagination->text = $this->language->get('text_pagination');
		$pagination->url = $this->url->link('admin/group', '&page={page}' . '&token=' . $this->session->data['token'], 'SSL');
			
		$this->data['pagination'] = $pagination->render();

		$this->template = 'admin/group_list.tpl';
		$this->children = array(
			'common/header',
			'common/footer'
		);
				
		$this->response->setOutput( $this->render() );
	}

	private function getForm(){
		// catch error
		if ( isset($this->error['warning']) ){
			$this->data['error_warning'] = $this->error['warning'];
		} else {
			$this->data['error_warning'] = '';
		}
		
		if ( isset($this->session->data['success']) ){
			$this->data['success'] = $this->session->data['success'];
		
			unset( $this->session->data['success'] );
		} else {
			$this->data['success'] = '';
		}
		
		if ( isset($this->error['error_name']) ) {
			$this->data['error_name'] = $this->error['error_name'];
		} else {
			$this->data['error_name'] = '';
		}

		// breadcrumbs
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get( 'text_home' ),
			'href'      => $this->url->link( 'common/home', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => false
   		);
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get( 'heading_title' ),
			'href'      => $this->url->link( 'admin/group', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => ' :: '
   		);

   		// Heading title
		$this->data['heading_title'] = $this->language->get( 'heading_title' );
		
		// Text	
		$this->data['text_enabled'] = $this->language->get( 'text_enabled' );
		$this->data['text_disabled'] = $this->language->get( 'text_disabled' );
		
		// Button
		$this->data['button_save'] = $this->language->get( 'button_save' );
		$this->data['button_cancel'] = $this->language->get( 'button_cancel' );
		$this->data['button_select_all_action'] = $this->language->get( 'button_select_all_action' );
		
		// Entry
		$this->data['entry_name'] = $this->language->get( 'entry_name' );
		$this->data['entry_permission'] = $this->language->get( 'entry_permission' );

		// Column
		$this->data['column_layout'] = $this->language->get( 'column_layout' );
		$this->data['column_action'] = $this->language->get( 'column_action' );
		$this->data['column_checkall'] = $this->language->get( 'column_checkall' );
		
		// Link
		$this->data['cancel'] = $this->url->link( 'admin/group', 'token=' . $this->session->data['token'], 'SSL' );
		
		// Group
		if ( isset($this->request->get['group_id']) ){
			$group = $this->model_admin_group->getGroup( $this->request->get['group_id'] );
			
			if ( $group ){
				$this->data['action'] = $this->url->link( 'admin/group/update', 'group_id=' . $group->getId() . '&token=' . $this->session->data['token'], 'SSL' );	
			}else {
				$this->redirect( $this->data['cancel'] );
			}
		}

		// Entry name
		if ( isset($this->request->post['name']) ){
			$this->data['name'] = $this->request->post['name'];
		}elseif ( isset($group) ){
			$this->data['name'] = $group->getName();
		}else {
			$this->data['name'] = '';
		}

		// Layout
		$this->load->model( 'design/layout' );
		$layouts = $this->model_design_layout->getAllLayouts();

		$this->data['layouts'] = array();
		foreach ( $layouts as $layout ) {
			if ( isset($this->request->post['layouts'][$layout->getId()]) ){
				$actionIds = $this->request->post['layouts'][$layout->getId()];
			}elseif ( isset($group) ){
				$permission = $group->getPermissionByLayoutId( $layout->getId() );
				if ( !$permission ){
					$actionIds = array();
				}else{
					$actions = $permission->getActions()->toArray();
					$actionIds = array_map(function($action) {
						return $action->getId();
					}, $actions);
				}
			}else{
				$actionIds = array();
			}

			$actions = array();
			foreach ( $layout->getActions() as $action ) {
				$checked = false;
				if ( in_array($action->getId(), $actionIds) ){
					$checked = true;
				}
				$actions[] = array(
					'id' => $action->getId(),
					'name' => $action->getName(),
					'code' => $action->getCode(),
					'checked' => $checked
				);
			}
			$this->data['layouts'][] = array(
				'id' => $layout->getId(),
				'name' => $layout->getName(),
				'path' => $layout->getPath(),
				'actions' => $actions
			);
		}

		$this->template = 'admin/group_form.tpl';
		$this->children = array(
			'common/header',
			'common/footer'
		);
				
		$this->response->setOutput( $this->render() );
	}

	private function isValidateForm(){
		if ( !isset($this->request->post['name']) || strlen($this->request->post['name']) < 3 || strlen($this->request->post['name']) > 128 ){
			$this->error['error_name'] = $this->language->get( 'error_name' );
		}

		if ( $this->error){
			return false;
		}else {
			return true;	
		}
	}

	private function isValidateDelete(){
		if ( !isset($this->request->post['id']) || !is_array( $this->request->post['id']) ){
			$this->error['error_permission'] = $this->language->get( 'error_permission' );
		}

		if ( $this->error){
			return false;
		}else {
			return true;	
		}
	}
}
?>