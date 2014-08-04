<?php 
class ControllerDesignAction extends Controller {
	private $error = array( );
	private $limit = 10;
	private $route = 'design/action';
 
	public function index(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_view')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'design/action' );
		$this->load->model( 'design/action' );

		$this->document->setTitle( $this->language->get('heading_title') );
		
		$this->getList();
	}

	public function insert(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_insert')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'design/action' );
		$this->load->model( 'design/action' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateForm() ){
			$this->model_design_action->addAction( $this->request->post );
			
			$this->session->design['success'] = $this->language->get( 'text_success' );
			$this->redirect( $this->url->link( 'design/action', 'token=' . $this->session->data['token'], 'SSL' ) );
		}

		$this->data['action'] = $this->url->link( 'design/action/insert', 'token=' . $this->session->data['token'], 'SSL' );
		
		$this->getForm( );
	}

	public function update(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_edit')) ) {
			return $this->forward('error/permission');
		}
		
		$this->load->language( 'design/action' );
		$this->load->model( 'design/action' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateForm(true) ){
			$this->model_design_action->editAction( $this->request->get['action_id'], $this->request->post );
			
			$this->session->design['success'] = $this->language->get( 'text_success' );
			$this->redirect( $this->url->link( 'design/action', 'token=' . $this->session->data['token'], 'SSL' ) );
		}
		
		$this->getForm();
	}
 
	public function delete(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_delete')) ) {
			return $this->forward('error/permission');
		}
		
		$this->load->language( 'design/action' );
		$this->load->model( 'design/action' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateDelete() ){
			$this->model_design_action->deleteAction( $this->request->post );
			
			$this->session->design['success'] = $this->language->get( 'text_success' );
			$this->redirect( $this->url->link( 'design/action', 'token=' . $this->session->data['token'], 'SSL' ) );
		}

		$this->getList( );
	}

	private function getList( ){
		// catch error
		if ( isset($this->error['warning']) ){
			$this->data['error_warning'] = $this->error['warning'];

			unset( $this->session->design['error_warning'] );
		} elseif ( isset($this->session->design['error_warning']) ) {
			$this->data['error_warning'] = $this->session->design['error_warning'];
			
			unset( $this->session->design['error_warning'] );
		} else {
			$this->data['error_warning'] = '';
		}
		
		if ( isset($this->session->design['success']) ){
			$this->data['success'] = $this->session->design['success'];
		
			unset( $this->session->design['success'] );
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
			'href'      => $this->url->link( 'design/action', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => ' :: '
   		);

   		// Heading title
		$this->data['heading_title'] = $this->language->get( 'heading_title' );
		
		// Text
		$this->data['text_no_results'] = $this->language->get( 'text_no_results' );
		$this->data['text_action'] = $this->language->get( 'text_action' );
		$this->data['column_name'] = $this->language->get( 'column_name' );	
		$this->data['column_code'] = $this->language->get( 'column_code' );
		$this->data['column_order'] = $this->language->get( 'column_order' );
		$this->data['column_action'] = $this->language->get( 'column_action' );
		//$this->data['text_enabled'] = $this->language->get( 'text_enabled' );
		//$this->data['text_disabled'] = $this->language->get( 'text_disabled' );
		$this->data['text_edit'] = $this->language->get( 'text_edit' );
		
		// Confirm
		$this->data['confirm_del'] = $this->language->get( 'confirm_del' );
		
		// Button
		$this->data['button_insert'] = $this->language->get( 'button_insert' );
		$this->data['button_delete'] = $this->language->get( 'button_delete' );
		$this->data['button_filter'] = $this->language->get( 'button_filter' );
		
		// Link
		$this->data['insert'] = $this->url->link( 'design/action/insert', 'token=' . $this->session->data['token'], 'SSL' );
		$this->data['delete'] = $this->url->link( 'design/action/delete', 'token=' . $this->session->data['token'], 'SSL' );

		$data = array(
			'limit' => $this->limit,
			'start' => $this->limit * ($page - 1)
		);

		$actions = $this->model_design_action->getActions( $data );
		// print("<pre>");
		// var_dump($actions);
		// exit;
		$action_total = $this->model_design_action->getTotalActions();
		
		$this->data['actions'] = array();
		
		if ( $actions ){
			foreach ( $actions as $action ){
				$data = array();
				
				if ( $action->getCode() == $this->config->get('action_view') ){
					continue;
				}

				$data[] = array(
					'text' => $this->language->get( 'text_edit' ),
					'href' => $this->url->link( 'design/action/update', 'action_id=' . $action->getId() . '&token=' . $this->session->data['token'], 'SSL' ),
					'icon' => 'icon-edit',
				);
			
				$this->data['actions'][] = array(
					'id' => $action->getId(),
					'name' => $action->getName(),
					'code' => $action->getCode(),
					'order' => $action->getOrder(),
					'action' => $data,
				);
			}
		}
		
		$pagination = new Pagination();
		$pagination->total = $action_total;
		$pagination->page = $page;
		$pagination->limit = $this->limit;
		$pagination->text = $this->language->get('text_pagination');
		$pagination->url = $this->url->link('design/action', '&page={page}', '&token=' . $this->session->data['token'], 'SSL');
			
		$this->data['pagination'] = $pagination->render();

		$this->template = 'design/action_list.tpl';
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
		
		if ( isset($this->session->design['success']) ){
			$this->data['success'] = $this->session->design['success'];
		
			unset( $this->session->design['success'] );
		} else {
			$this->data['success'] = '';
		}
		
		if ( isset($this->error['error_name']) ) {
			$this->data['error_name'] = $this->error['error_name'];
		} else {
			$this->data['error_name'] = '';
		}

		if ( isset($this->error['error_code']) ) {
			$this->data['error_code'] = $this->error['error_code'];
		} else {
			$this->data['error_code'] = '';
		}

		// breadcrumbs
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get( 'text_home' ),
			'href'      => $this->url->link( 'common/home', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => false
   		);
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get( 'heading_title' ),
			'href'      => $this->url->link( 'design/action', 'token=' . $this->session->data['token'], 'SSL' ),
      		'separator' => ' :: '
   		);

   		// Heading title
		$this->data['heading_title'] = $this->language->get( 'heading_title' );
		
		// Text	
		//$this->data['text_enabled'] = $this->language->get( 'text_enabled' );
		//$this->data['text_disabled'] = $this->language->get( 'text_disabled' );
		
		// Button
		$this->data['button_save'] = $this->language->get( 'button_save' );
		$this->data['button_cancel'] = $this->language->get( 'button_cancel' );
		
		// Entry
		$this->data['entry_name'] = $this->language->get( 'entry_name' );
		$this->data['entry_code'] = $this->language->get( 'entry_code' );
		$this->data['entry_order'] = $this->language->get( 'entry_order' );
		
		// Link
		$this->data['cancel'] = $this->url->link( 'design/action', 'token=' . $this->session->data['token'], 'SSL' );
		
		if ( isset($this->request->get['action_id']) ){
			$action = $this->model_design_action->getAction( $this->request->get['action_id'] );
			
			if ( $action ){
				$this->data['action'] = $this->url->link( 'design/action/update', 'action_id=' . $action->getId() . '&token=' . $this->session->data['token'], 'SSL' );	
			}else {
				$this->redirect( $this->data['cancel'] );
			}
		}

		// Entry name
		if ( isset($this->request->post['name']) ){
			$this->data['name'] = $this->request->post['name'];
		}elseif ( isset($action) ){
			$this->data['name'] = $action->getName();
		}else {
			$this->data['name'] = '';
		}

		// Entry code
		if ( isset($this->request->post['code']) ){
			$this->data['code'] = $this->request->post['code'];
		}elseif ( isset($action) ){
			$this->data['code'] = $action->getcode();
		}else {
			$this->data['code'] = '';
		}

		// Entry order
		if ( isset($this->request->post['order']) ){
			$this->data['order'] = $this->request->post['order'];
		}elseif ( isset($action) ){
			$this->data['order'] = $action->getOrder();
		}else {
			$this->data['order'] = '';
		}

		if ( isset($this->request->get['action_id']) ){
			$this->template = 'design/action_form_edit.tpl';
		}else{
			$this->template = 'design/action_form_view.tpl';
		}
		$this->children = array(
			'common/header',
			'common/footer'
		);
				
		$this->response->setOutput( $this->render() );
	}

	private function isValidateForm( $bIsEdit = false ){
		if ( !isset($this->request->post['name']) || strlen($this->request->post['name']) < 3 || strlen($this->request->post['name']) > 128 ){
			$this->error['error_name'] = $this->language->get( 'error_name' );
		}

		if ( $bIsEdit == false && (!isset($this->request->post['code']) || strlen($this->request->post['code']) < 3 || strlen($this->request->post['code']) > 20) ){
			$this->error['error_code'] = $this->language->get( 'error_code' );
		}

		$actions = $this->model_design_action->getActionByCode( strtolower(trim($this->request->post['code'])) );
		
		if ( count($actions) > 1 || (count($actions) == 1 && (!isset($this->request->get['action_id']) || !array_key_exists($this->request->get['action_id'], $actions->toArray()))) ){
			$this->error['error_code'] = $this->language->get( 'error_exist_code' );
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