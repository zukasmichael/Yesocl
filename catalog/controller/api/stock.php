<?php
class ControllerApiStock extends Controller {
	public function getAllStocks() {
		if ( !$this->customer->isLogged() ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'permission deney!'
	        )));
		}

		$this->load->model('stock/stock');

		$lStocks = $this->model_stock_stock->getAllStocks();
		
		$aStocks = array();
		foreach ( $lStocks as $oStock ) {
			if ( !$oStock->getLastExchange() || !$oStock->getPreLastExchange() )
				continue;
			$aStocks[] = $oStock->formatToCache();
		}
		
		return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'stocks' => $aStocks
        )));
	}

	public function addStocksToWatchList() {
		if ( !$this->customer->isLogged() ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'permission deney!'
	        )));
		}

		if ( empty($this->request->post['stock_ids']) ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'Stock ID is empty!'
	        )));
		}

		$this->load->model('user/setting');

		$result = $this->model_user_setting->addStocksToWatchList( $this->customer->getId(), $this->request->post['stock_ids'] );
		
		if ( !$result ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'Add Stock to Watch List have error'
	        )));
		}

		return $this->response->setOutput(json_encode(array(
            'success' => 'ok'
        )));
	}

	public function removeStockFromWatchList() {
		if ( !$this->customer->isLogged() ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'permission deney!'
	        )));
		}

		if ( empty($this->request->get['stock_id']) ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'Stock ID is empty!'
	        )));
		}

		$this->load->model('user/setting');
		$result = $this->model_user_setting->removeStockFromWatchList( $this->customer->getId(), $this->request->get['stock_id'] );

		if ( !$result ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'Remove Stock have error!'
	        )));
		}

		return $this->response->setOutput(json_encode(array(
            'success' => 'ok'
        )));
	}

	public function getStockExchanges() {
		if ( empty($this->request->get['stock_id']) ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'Stock ID is empty!'
	        )));
		}

		$this->load->model('stock/exchange');

		$oStockExchanges = $this->model_stock_exchange->getExchange(array(
			'stock_id' => $this->request->get['stock_id']
		));

		if ( !$oStockExchanges ){
			return $this->response->setOutput(json_encode(array(
	            'success' => 'not ok',
	            'error' => 'Exchanges of this Stock is empty!'
	        )));
		}

		return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'exchanges' => $oStockExchanges->getExchanges()
        )));
	}

	public function getLastStockNews() {
		$sStockCode = $this->config->get('branch')['code']['stock'];
		
		$this->load->model('branch/branch');
		$this->load->model('branch/post');
		$this->load->model('tool/object');
		
		$lPosts = null;
		$aPosts = array();

		$oBranch = $this->model_branch_branch->getBranch( array('branch_code' => $sStockCode) );
		if ( $oBranch ){
			$aCategoryIds = $oBranch->getIsBranchCategories( true, true );
			if ( count($aCategoryIds) > 0 ){
				$lPosts = $this->model_branch_post->getPosts(array(
					'limit' => 5,
					'branch_id' => $oBranch->getId(),
					'category_ids' => $aCategoryIds
				));
			}
		}
		
		if ( $lPosts ){
			$aPosts = $this->model_tool_object->formatPosts( $lPosts, false );
		}

		return $this->response->setOutput(json_encode(array(
            'success' => 'ok',
            'posts' => $aPosts
        )));
	}
}
?>