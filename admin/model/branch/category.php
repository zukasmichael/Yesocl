<?php
use Document\Branch\Category,
	Document\Branch\Layout,
	Document\Setting\Config;

class ModelBranchCategory extends Doctrine {
	public function addCategory( $data = array() ) {
		// Name is required
		if ( !isset($data['name']) || empty($data['name']) ){
			return false;
		}

		// Branch is requied
		if ( !isset($data['branch_id']) || empty($data['branch_id']) ){
			return false;
		}
		$branch = $this->dm->getRepository('Document\Branch\Branch')->find( $data['branch_id'] );
		if ( !$branch ){
			return false;
		}

		$order = 0;
		if ( isset($data['order']) && !empty($data['order']) ){
			$order = $data['order'];
		}

		$parent = null;
		if ( isset($data['parent_id']) && !empty($data['parent_id']) ){
			$parent = $this->dm->getRepository('Document\Branch\Category')->find( $data['parent_id'] );
		}		
		
		$category = new Category();
		$category->setName( $data['name'] );
		$category->setBranch( $branch );
		$category->setOrder( $order );
		$category->setParent( $parent );

		$this->dm->persist( $category );
		$this->dm->flush();
	}

	public function editCategory( $id, $data = array() ) {
		// Name is require
		if ( !isset($data['name']) || empty($data['name']) ){
			return false;
		}

		// Branch is requied
		if ( !isset($data['branch_id']) || empty($data['branch_id']) ){
			return false;
		}
		$branch = $this->dm->getRepository('Document\Branch\Branch')->find( $data['branch_id'] );
		if ( !$branch ){
			return false;
		}
		
		// Check category
		$category = $this->dm->getRepository('Document\Branch\Category')->find( $id );
		if ( !$category ){
			return false;
		}

		$order = 0;
		if ( isset($data['order']) && !empty($data['order']) ){
			$order = $data['order'];
		}

		$parent = null;
		if ( isset($data['parent_id']) && !empty($data['parent_id']) ){
			$parent = $this->dm->getRepository('Document\Branch\Category')->find( $data['parent_id'] );
		}

		$category->setName( $data['name'] );
		$category->setBranch( $branch );
		$category->setOrder( $order );
		$category->setParent( $parent );

		$this->dm->flush();
	}

	public function deleteCategory( $data = array() ) {
		if ( isset($data['id']) ) {
			foreach ( $data['id'] as $id ) {
				$category = $this->dm->getRepository( 'Document\Branch\Category' )->find( $id );

				$this->dm->remove( $category );
			}
		}
		
		$this->dm->flush();
	}
	
	public function getCategory( $action_id ) {
		$category = $this->dm->getRepository( 'Document\Branch\Category' )->find( $action_id );
		return $category;
	}

	public function getCategories( $data = array() ) {
		if (!isset($data['limit']) || ((int)$data['limit'] < 0)) {
			$data['limit'] = 10;
		}
		if (!isset($data['start']) || ((int)$data['start'] < 0)) {
			$data['start'] = 0;
		}
		if (!isset($data['sort']) || empty($data['sort']) ){
			$data['sort'] = 'order';
		}

		$query = $this->dm->createQueryBuilder( 'Document\Branch\Category' )
    		->limit( $data['limit'] )
    		->skip( $data['start'] )
    		->sort( $data['sort'] );
    	
    	return $query->getQuery()->execute();
	}

	public function getAllCategories( $data = array() ) {
		$query = array();
		if ( isset($data['branch_id']) && !empty($data['branch_id']) ){
			$query['branch.id'] = $data['branch_id'];
		}
		if (!isset($data['sort']) || empty($data['sort']) ){
			$data['sort'] = 'order';
		}

		return $this->dm->getRepository( 'Document\Branch\Category' )->findBy($query)->sort(array($data['sort'] => 1));
	}
	
	public function getTotalCategories() {
		$query = $this->dm->createQueryBuilder( 'Document\Branch\Category' );

		$categories = $query->getQuery()->execute();

		return count($categories);
	}

	public function getCategoryByCode( $code ){
		return $this->dm->getRepository( 'Document\Branch\Category' )->findBy( array('code' => $code) );
	}
}
?>