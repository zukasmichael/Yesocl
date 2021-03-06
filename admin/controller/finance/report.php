<?php
class ControllerFinanceReport extends Controller {
	private $error = array( );
	private $limit = 10;
	private $route = 'finance/report';

	public function index(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_view')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'finance/report' );
		$this->load->model( 'finance/report' );

		$this->document->setTitle( $this->language->get('heading_title') );

		$this->getList();
	}

	public function insert(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_insert')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'finance/report' );
		$this->load->model( 'finance/report' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateForm() ){
			$this->model_finance_report->addReport( $this->request->post );

			$this->session->data['success'] = $this->language->get( 'text_success' );

			$url = '';

			if (isset($this->request->get['filter_name'])) {
				$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
			}

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->redirect( $this->url->link('finance/report', 'token=' . $this->session->data['token'] . $url, 'sSL') );
		}

		$this->data['action'] = $this->url->link( 'finance/report/insert', 'token=' . $this->session->data['token'], 'sSL' );

		$this->getForm();
	}

	public function update(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_edit')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'finance/report' );
		$this->load->model( 'finance/report' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateForm(true) ){
			$this->model_finance_report->editReport( $this->request->get['report_id'], $this->request->post );

			$this->session->data['success'] = $this->language->get( 'text_success' );

			$url = '';

			if (isset($this->request->get['filter_name'])) {
				$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
			}

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->redirect( $this->url->link('finance/report', 'token=' . $this->session->data['token'] . $url, 'sSL') );
		}

		$this->getForm();
	}

	public function delete(){
		if ( !$this->user->hasPermission($this->route, $this->config->get('action_delete')) ) {
			return $this->forward('error/permission');
		}

		$this->load->language( 'finance/report' );
		$this->load->model( 'finance/report' );

		$this->document->setTitle( $this->language->get('heading_title') );

		// request
		if ( ($this->request->server['REQUEST_METHOD'] == 'POST') && $this->isValidateDelete() ){
			$this->model_finance_report->deleteReports( $this->request->post );

			$this->session->data['success'] = $this->language->get( 'text_success' );

			$url = '';

			if (isset($this->request->get['filter_name'])) {
				$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
			}

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->redirect( $this->url->link('finance/report', 'token=' . $this->session->data['token'] . $url, 'sSL') );
		}

		$this->getList( );
	}

	private function getList( ){
		if (isset($this->request->get['filter_name'])) {
			$filter_name = $this->request->get['filter_name'];
		} else {
			$filter_name = null;
		}

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

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}

		if (isset($this->request->get['page'])) {
			$url .= '&page=' . $this->request->get['page'];
		}

		// breadcrumbs
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link( 'common/home', 'token=' . $this->session->data['token'], 'sSL' ),
      		'separator' => false
   		);
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link( 'finance/report', 'token=' . $this->session->data['token'], 'sSL' ),
      		'separator' => ' :: '
   		);

   		// Heading title
		$this->data['heading_title'] = $this->language->get( 'heading_title' );

		// Text
		$this->data['text_no_results'] = $this->language->get('text_no_results');
		$this->data['text_edit'] = $this->language->get('text_edit');

		// Column
		$this->data['column_name'] = $this->language->get('column_name');
		$this->data['column_action'] = $this->language->get('column_action');

		// Confirm
		$this->data['confirm_del'] = $this->language->get('confirm_del');

		// Button
		$this->data['button_insert'] = $this->language->get('button_insert');
		$this->data['button_delete'] = $this->language->get('button_delete');
		$this->data['button_filter'] = $this->language->get('button_filter');

		// Link
		$this->data['insert'] = $this->url->link( 'finance/report/insert', 'token=' . $this->session->data['token'] . $url, 'sSL' );
		$this->data['delete'] = $this->url->link( 'finance/report/delete', 'token=' . $this->session->data['token'] . $url, 'sSL' );

		// TOKEN
		$this->data['token'] = $this->session->data['token'];

		// finance
		$aData = array(
			'start' => ($page - 1) * $this->limit,
			'limit' => $this->limit,
			'filter_name' => $filter_name,
		);

		$lReports = $this->model_finance_report->getReports( $aData );

		$iReportTotal = $lReports->count();

		$this->data['reports'] = array();
		foreach ($lReports as $key => $oReport) {
			$action = array();

			$action[] = array(
				'text' => $this->language->get('text_edit'),
				'href' => $this->url->link( 'finance/report/update', 'report_id=' . $oReport->getId() . '&token=' . $this->session->data['token'] . $url, 'sSL' ),
				'icon' => 'icon-edit',
			);

			$action[] = array(
				'text' => $this->language->get('text_export'),
				'href' => $this->url->link( 'finance/report/export', 'report_id=' . $oReport->getId() . '&token=' . $this->session->data['token'], 'sSL' ),
				'icon' => ' icon-circle-arrow-up',
			);

			$this->data['reports'][] = array(
				'id' => $oReport->getId(),
				'name' => $oReport->getName(),
				'action' => $action,
				);
		}

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}

		$pagination = new Pagination();
		$pagination->total = $iReportTotal;
		$pagination->page = $page;
		$pagination->limit = $this->limit;
		$pagination->text = $this->language->get('text_pagination');
		$pagination->url = $this->url->link('finance/report', '&page={page}' . '&token=' . $this->session->data['token'] . $url, 'sSL');

		$this->data['pagination'] = $pagination->render();

		$this->data['filter_name'] = $filter_name;

		$this->template = 'finance/report_list.tpl';
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

		if ( isset($this->error['error_dates']) ) {
			$this->data['error_dates'] = $this->error['error_dates'];
		} else {
			$this->data['error_dates'] = '';
		}

		if ( isset($this->error['error_functions']) ) {
			$this->data['error_functions'] = $this->error['error_functions'];
		} else {
			$this->data['error_functions'] = '';
		}

		$url = '';

		if (isset($this->request->get['filter_name'])) {
			$url .= '&filter_name=' . urlencode(html_entity_decode($this->request->get['filter_name'], ENT_QUOTES, 'UTF-8'));
		}

		if (isset($this->request->get['page'])) {
			$url .= '&page=' . $this->request->get['page'];
		}

		$idReport = $this->request->get['report_id'];

		// breadcrumbs
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link( 'common/home', 'token=' . $this->session->data['token'], 'sSL' ),
      		'separator' => false
   		);
   		$this->data['breadcrumbs'][] = array(
       		'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link( 'finance/report', 'token=' . $this->session->data['token'], 'sSL' ),
      		'separator' => ' :: '
   		);

   		// Heading title
		$this->data['heading_title'] = $this->language->get('heading_title');

		// Text
		// $this->data['text_enabled'] = $this->language->get('text_enabled');
		// $this->data['text_disabled'] = $this->language->get('text_disabled');
		$this->data['text_true'] = $this->language->get('text_true');
		$this->data['text_false'] = $this->language->get('text_false');
		$this->data['text_enter_function_name'] = $this->language->get('text_enter_function_name');
		$this->data['text_search_function'] = $this->language->get('text_search_function');
		$this->data['text_no_results'] = $this->language->get('text_no_results');
		$this->data['text_none'] = $this->language->get('text_none');
		$this->data['text_year'] = $this->language->get('text_year');
		$this->data['text_quarter'] = $this->language->get('text_quarter');
		$this->data['text_error_dates'] = $this->language->get('error_dates');
		$this->data['text_error_exist_date'] = $this->language->get('error_exist_date');
		$this->data['text_error_functions'] = $this->language->get('error_functions');
		$this->data['text_choose_year'] = $this->language->get('text_choose_year');

		// Button
		$this->data['button_save'] = $this->language->get('button_save');
		$this->data['button_cancel'] = $this->language->get('button_cancel');
		$this->data['button_add_function'] = $this->language->get('button_add_function');

		// Column
		$this->data['column_name'] = $this->language->get('column_name');
		$this->data['column_function'] = $this->language->get('column_function');
		$this->data['column_action'] = $this->language->get('column_action');

		// Entry
		$this->data['entry_name'] = $this->language->get('entry_name');
		$this->data['entry_dates'] = $this->language->get('entry_dates');
		$this->data['entry_year'] = $this->language->get('entry_year');
		$this->data['entry_quarter'] = $this->language->get('entry_quarter');
		$this->data['entry_functions'] = $this->language->get('entry_functions');
		$this->data['entry_function_name'] = $this->language->get('entry_function_name');

		// Link
		$this->data['cancel'] = $this->url->link( 'finance/report', 'token=' . $this->session->data['token'] . $url, 'sSL' );

		$this->data['token'] = $this->session->data['token'];

		// Year
		$this->load->model('finance/date');
		$aYears = $this->model_finance_date->getDates( array( 'limit' => 999 ) );
		$this->data['aYears'] = array();
		foreach ($aYears as $key => $value) {
			if ( !isset($this->data['aYears'][$value->getYear()]) ) {
				$this->data['aYears'][$value->getYear()] = array();
			}

			$this->data['aYears'][$value->getYear()][$value->getQuarter() + 1] = $value->getQuarter();
		}

		// report
		if ( isset($this->request->get['report_id']) ){
			$oReport = $this->model_finance_report->getReport( $idReport );
			if ( $oReport ){
				$this->data['action'] = $this->url->link( 'finance/report/update', 'report_id=' . $idReport . '&token=' . $this->session->data['token'], 'sSL' );
			}else {
				$this->redirect( $this->data['cancel'] );
			}
		}

		// Entry name
		if ( isset($this->request->post['name']) ){
			$this->data['name'] = $this->request->post['name'];
		}elseif ( isset($oReport) ){
			$this->data['name'] = $oReport->getName();
		}else {
			$this->data['name'] = '';
		}

		// Entry dates
		if ( isset($this->request->post['dates']) ){
			$this->data['dates'] = $this->request->post['dates'];
			$this->data['aDates'] = $this->model_finance_date->getDetailDates( $this->request->post['dates'] );
		}elseif ( isset($oReport) ){
			$this->data['dates'] = $oReport->getDates();
			$this->data['aDates'] = $this->model_finance_date->getDetailDates( $this->data['dates'] );
		}else {
			$this->data['dates'] = '';
			$this->data['aDates'] = array();
		}

		// Entry functions
		if ( isset($this->request->post['functions']) ){
			$this->data['functions'] = $this->request->post['functions'];
		}elseif ( isset($oReport) ){
			$this->data['functions'] = $this->model_finance_report->getDetailFunction( $oReport->getFunctions() );
		}else {
			$this->data['functions'] = array();
		}

		$this->template = 'finance/report_form.tpl';
		$this->children = array(
			'common/header',
			'common/footer'
		);

		$this->response->setOutput( $this->render() );
	}

	private function isValidateForm( $bIsEdit = false ){
		if ( !isset($this->request->post['name']) || strlen($this->request->post['name']) < 1 || strlen($this->request->post['name']) > 128 ){
			$this->error['error_name'] = $this->language->get( 'error_name' );
		}

		if ( !isset($this->request->post['dates']) || strlen($this->request->post['dates']) < 1 || !$this->isValidateDates($this->request->post['dates']) ){
			$this->error['error_dates'] = $this->language->get( 'error_dates' );
		}

		if ( empty($this->request->post['functions']) ){
			$this->error['error_functions'] = $this->language->get( 'error_functions' );
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

	private function isValidateDates( $dates ) {
		$this->load->model('finance/date');

		return $this->model_finance_date->isValidateDates( $dates );
	}

	public function export(){
		if ( empty($this->request->get['report_id']) ){
			return false;
		}

		$idReport = $this->request->get['report_id'];

		$this->load->model('finance/report');
		$this->load->model('finance/function');
		$this->load->model('stock/finance');
		$this->load->model('tool/excel');
		// Report
		$oReport = $this->model_finance_report->getReport( $idReport );
		// Function
		$aFunctionIds = $oReport->getFunctions();
		$lFunctions = $this->model_finance_function->getAllFunctions( array('function_ids' => $aFunctionIds) );
		if ( $lFunctions ){
			$aFunctions = $lFunctions->toArray();
		}
		// Date
		$sDates = $oReport->getDates();
		$sDates = preg_replace('/ \([a-zA-Z0-9 \)]+/', '', $sDates);
		$aDates = explode(', ', $sDates);
		// format column excel for list time
		$iAsciiRun = 66;
		$iAsciiPlus = 64;
		$aNewDates = array('A' => '');
		$aMatrix = array();
		sort($aDates);
		foreach ( $aDates as $sDate ) {
			if ( $iAsciiRun > 90 ) {
				$iAsciiRun = 65;
				$iAsciiPlus++;
			}
			$sChar = '';
			if ( $iAsciiPlus > 64 ) $sChar .= chr( $iAsciiPlus );
			$sChar .= chr($iAsciiRun);
			$aNewDates[$sChar] = $sDate;
			$iAsciiRun++;
		}
		$aMatrix[] = $aNewDates;
		array_shift($aNewDates);
		// get list stocks
		$lStockFinances = $this->model_stock_finance->getAllFinances();
		foreach ( $lStockFinances as $oStockFinances ) {
			$iRow = 1;
			// calculate data for list function
			foreach ( $aFunctionIds as $sFunctionName => $sFunctionId ) {
				$oFunction = $aFunctions[$sFunctionId];
				$aDetails = $this->model_finance_function->getFunctionDetail($oFunction->getFunction());
				$aValues['A'] = $sFunctionName;
				foreach ( $aNewDates as $sColumnName => $sDate ) {
					$aNewDetails = array_map(function($aDetail) use ($oStockFinances, $sDate){
						if ( $aDetail['is_fi'] ){
							$aFinanceValues = $oStockFinances->getFinanceByFinanceId($aDetail['value']);
							return $aFinanceValues->getValues()[$sDate];
						}
						return $aDetail['value'];
					}, $aDetails);
					$aValues[$sColumnName] = (int)implode('', $aNewDetails);
				}
				$aMatrix[$iRow] = $aValues;
				$iRow++;
			}
			$this->model_tool_excel->createExcelFile( $aMatrix, $oStockFinances->getStock()->getCode() );
		}
	}

	public function autocomplete() {
		$this->load->model('finance/report');

		if ( isset( $this->request->get['filter_name'] ) ) {
			$filter_name = $this->request->get['filter_name'];
		}else {
			$filter_name = null;
		}

		$data = array(
			'filter_name' => $filter_name,
			'limit'		  => 20,
		);

		$lReports = $this->model_finance_report->getReports( $data );

		$json = array();
		foreach ($lReports as $lReport) {
			$json[] = array(
				'name' => html_entity_decode( $lReport->getName() ),
				'id' => $lReport->getId(),
			);
		}

		$this->response->setOutput( json_encode( $json ) );
	}
}
?>