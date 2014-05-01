<?php
class ModelBranchBranch extends Model {
	public function getAllBranches( $aData = array() ){
		$lPosts = $this->dm->getRepository('Document\Branch\Post')->findAll();
		foreach ($lPosts as $key => $oPost) {
			$lComments = $oPost->getComments();
			foreach ($lComments as $key => $oComment) {
				if ( !$oComment->getId() ){
					$oPost->getComments()->removeElement($oComment);
				}
			}
		}

		$this->dm->flush();

		$query = array('deleted' => false);

		$results = $this->dm->getRepository('Document\Branch\Branch')->findBy( $query );
		
		return $results;
	}

	public function getBranch( $aData = array() ){
		$query = array('deleted' => false);

		if ( !empty($aData['branch_id']) ){
			$query['id'] = $aData['branch_id'];
		
		}elseif ( !empty($aData['branch_slug']) ){
			$query['slug'] = $aData['branch_slug'];

		}elseif ( !empty($aData['branch_code']) ){
			$query['code'] = $aData['branch_code'];
		}else{
			return null;
		}

		return $this->dm->getRepository('Document\Branch\Branch')->findOneBy($query);
	}

	public function getBranchByCategoryId( $idCategory ){
		$oCategory = $this->dm->getRepository('Document\Branch\Category')->find( $idCategory );

		$oBranch = $oCategory->getBranch();
		if ( !$oBranch || $oBranch->getDeleted() == true ) return null;
		return $oBranch;
	}
}
?>