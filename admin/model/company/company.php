<?php
use Document\Company\Company,
	Document\Company\GroupMember;

use MongoRegex;

class ModelCompanyCompany extends Model {
	public function addCompany( $data = array(), $logo = array() ) {
		// name is required & isn't exist
		if ( isset( $data['name'] ) && !$this->isExistName( $data['name'] ) ) {
			$this->data['name'] = strtolower( trim( $data['name'] ) );
		}else {
			return false;
		}

		// owner is required
		if ( isset( $data['user_id'] ) ) {
			$user = $this->dm->getRepository( 'Document\User\User' )->find( $data['user_id'] );

			if ( empty( $user ) ) {
				return false;
			}
		}else {
			return false;
		}

		// owner is required
		if ( isset( $data['group'] ) ) {
			$group = $this->dm->getRepository( 'Document\Company\Group' )->find( $data['group'] );

			if ( empty( $group ) ) {
				return false;
			}
		}else {
			return false;
		}

		// logo
		if ( isset( $logo ) ) {
  			if ( !$this->isValidLogo( $logo ) ) {
  				return false;
  			}
  		}
		else {
			$logo = array();
  		}

		// description is required
		if ( !isset( $data['description'] ) ) {
			return false;
		}

		// status
		if ( !isset( $data['status'] ) ) {
			$data['status'] = 0;
		}

		// Slug
		$slug = $this->url->create_slug( $data['name'] );
		$companies = $this->dm->getRepository( 'Document\Company\Company' )->findBySlug( new MongoRegex("/^$slug/i") );

		$arr_slugs = array_map(function($company){
			return $company->getSlug();
		}, $companies->toArray());

		$this->load->model( 'tool/slug' );
		$slug = $this->model_tool_slug->getSlug( $slug, $arr_slugs );
		
		$company = new Company();
		$company->setSlug( $slug );
		$company->setSlug( $slug . $expend );
		$company->setName( $data['name'] );
		$company->setOwner( $user );
		$company->setGroup( $group );
		$company->setDescription( $data['description'] );
		$company->setCreated( new \Datetime( $data['created'] ) );
		$company->setStatus( $data['status'] );

		if ( isset($data['branchs']) || !empty($data['branchs']) ){
			$company->setBranchs( array() );
			foreach ( $data['branchs'] as $branch_id ) {
				$branch = $this->dm->getRepository('Document\Branch\Branch')->find( $branch_id );
				$company->addBranch( $branch );
			}
		}

		$group_member = new GroupMember();
		$group_member->setName( $this->config->get('company')['default']['group_member_name'] );
		$group_member->setStatus( true );
		$group_member->setCanDel( false );
		$this->dm->persist( $group_member );
		$company->addGroupMember( $group_member );

		$this->dm->persist( $company );

		$this->dm->flush();

		if ( !empty( $logo ) ) {
			if ( $data['logo'] = $this->uploadLogo( $company->getId(), $logo ) ) {
				$company->setLogo( $data['logo'] );
			}
		}

		$this->dm->flush();

		return true;
	}

	public function editCompany( $company_id, $data = array(), $logo = array() ) {
		// name is required
		if ( isset( $data['name'] ) ) {
			$this->data['name'] = strtolower( trim( $data['name'] ) );
		}else {
			return false;
		}

		// owner is required
		if ( isset( $data['user_id'] ) ) {
			$user = $this->dm->getRepository( 'Document\User\User' )->find( $data['user_id'] );

			if ( empty( $user ) ) {
				return false;
			}
		}else {
			return false;
		}

		// logo
		if ( isset( $logo ) && $logo['size'] > 0 ) {
  			if ( !$this->isValidLogo( $logo ) ) {
  				return false;
  			}
  		}
		else {
			$logo = array();
  		}

		// group is required
		if ( isset( $data['group'] ) ) {
			$group = $this->dm->getRepository( 'Document\Company\Group' )->find( $data['group'] );

			if ( empty( $group ) ) {
				return false;
			}
		}else {
			return false;
		}

		// description is required
		if ( !isset( $data['description'] ) ) {
			return false;
		}

		// status
		if ( !isset( $data['status'] ) ) {
			$data['status'] = 0;
		}

		$company = $this->dm->getRepository( 'Document\Company\Company' )->find( $company_id );
		if ( empty( $company ) ) {
			return false;
		}

		// name is exist
		/*if ( $company->getName() != $data['name'] && $this->isExistName( $data['name'] ) ) {
			return false;
		}*/

		// Slug
		if ( $data['name'] != $company->getName() ){
			$slug = $this->url->create_slug( $data['name'] );
			$companies = $this->dm->getRepository( 'Document\Company\Company' )->findBySlug( new MongoRegex("/^$slug/i") );

			$arr_slugs = array_map(function($company){
				return $company->getSlug();
			}, $companies->toArray());

			$this->load->model( 'tool/slug' );
			$slug = $this->model_tool_slug->getSlug( $slug, $arr_slugs );
			
			$company->setSlug( $slug );
		}

		$company->setName( $data['name'] );
		$company->setOwner( $user );
		$company->setGroup( $group );
		$company->setDescription( $data['description'] );
		$company->setCreated( new \Datetime( $data['created'] ) );
		$company->setStatus( $data['status'] );

		
		$company->setBranchs( array() );
		if ( isset($data['branchs']) || !empty($data['branchs']) ){
			foreach ( $data['branchs'] as $branch_id ) {
				$branch = $this->dm->getRepository('Document\Branch\Branch')->find( $branch_id );
				$company->addBranch( $branch );
			}
		}

		if ( !empty( $logo ) ) {exit;
			if ( $data['logo'] = $this->uploadLogo( $company->getId(), $logo ) ) {
				$company->setLogo( $data['logo'] );
			}
		}
		
		$this->dm->flush();

		return true;
	}

	public function deleteCompanies( $data = array() ) {
		if ( isset( $data['id'] ) ) {
			foreach ($data['id'] as $id) {
				$company = $this->dm->getRepository( 'Document\Company\Company' )->find( $id );

				if ( !empty( $company ) ) {
					$this->delete_directory( DIR_IMAGE . 'data/catalog/company/' . $company->getId() );
					$this->dm->remove( $company );
				}
			}
		}

		$this->dm->flush();
	}

	public function getCompany( $company_id ) {
		return $this->dm->getRepository( 'Document\Company\Company' )->find( $company_id );
	}

	public function getCompanies( $data = array() ) {
		if ( isset( $data['start'] ) && $data['start'] >= 0 ) {
			$data['start'] = (int)$data['start'];
		}else {
			$data['start'] = 0;
		}

		if ( isset( $data['limit'] ) && $data['limit'] > 0 ) {
			$data['limit'] = (int)$data['limit'];
		}else {
			$data['limit'] = 10;
		}

		$query = $this->dm->createQueryBuilder( 'Document\Company\Company' )
    		->limit( $data['limit'] )
    		->skip( $data['start'] );

		if ( isset( $data['filter_name'] ) ) {
			$query->field( 'name' )->equals( new \MongoRegex('/' . trim( $data['filter_name'] ) . '.*/i') );
		}

		if ( isset( $data['sort'] ) ) {
			if ( isset( $data['order'] ) && $data['order'] == 'desc' ) {
    			$query->sort( $data['sort'], 'desc' );
    		}else {
    			$query->sort( $data['sort'], 'asc' );
    		}
		}else {
			if ( isset( $data['order'] ) && $data['order'] == 'asc' ) {
				$query->sort( 'created', 'asc' );
			}else {
				$query->sort( 'created', 'desc' );
			}
		}

		return $query->getQuery()->execute();
	}

	public function getTotalCompanies( $data = array() ) {
		$query = $this->dm->createQueryBuilder( 'Document\Company\Company' );

		if ( isset( $data['filter_name'] ) ) {
    		$query->field( 'name' )->equals( new \MongoRegex('/' . trim( $data['filter_name'] ) . '.*/i') );
    	}

		return count( $query->getQuery()->execute() );
	}

	public function isExistName( $name ) {
		$company = $this->dm->getRepository( 'Document\Company\Company' )->findOneBy( array( 'name' => strtolower( trim( $name ) ) ) );

		if ( !empty( $company ) ) {
			return true;
		}else {
			return false;
		}
	}

	public function addFollower( $company_id, $user_id ) {
		$user = $this->dm->getRepository( 'Document\User\User' )->find( $user_id );
		if ( empty( $user ) ) {
			return false;
		}

		if ( $this->isExistFollower( $company_id, $user_id ) ) {
			return false;
		}

		$company = $this->dm->getRepository( 'Document\Company\Company' )->find( $company_id );
		if ( empty( $company ) ) {
			return false;
		}

		$company->addFollower( $user );

		$this->dm->flush();

		return true;
	}

	public function isExistFollower( $company_id, $user_id ) {
		$companies = $this->dm->getRepository( 'Document\Company\Company' )->findBy( array( 'followers.id' => $user_id ) );
		
		foreach ($companies as $company) {
			if ( $company->getId() == $company_id  ) {
				return true;
			}
		}
		
		return false;
	}

	public function removeFollowers( $company_id, $data = array() ) {
		$company = $this->dm->getRepository( 'Document\Company\Company' )->find( $company_id );

		if ( isset( $data['id'] ) ) {
			foreach ( $data['id'] as $id ) {
				$user = $this->dm->getRepository( 'Document\User\User' )->find( $id );

				if ( !empty( $user ) ) {
					$company->getFollowers()->removeElement( $user );
				}
			}
		}

		$this->dm->flush();
	}

	public function addRelativeCompany( $company_id, $relative_id ) {
		if ( $company_id == $relative_id ) {
			return false;
		}

		$relative = $this->dm->getRepository( 'Document\Company\Company' )->find( $relative_id );
		if ( empty( $relative ) ) {
			return false;
		}

		if ( $this->isExistRelativeCompany( $company_id, $relative_id ) ) {
			return false;
		}

		$company = $this->dm->getRepository( 'Document\Company\Company' )->find( $company_id );
		if ( empty( $company ) ) {
			return false;
		}

		$company->addRelativeCompany( $relative );

		$this->dm->flush();

		return true;
	}

	public function isExistRelativeCompany( $company_id, $relative_id ) {
		$companies = $this->dm->getRepository( 'Document\Company\Company' )->findBy( array( 'relativeCompanies.id' => $relative_id ) );
		
		foreach ($companies as $company) {
			if ( $company->getId() == $company_id  ) {
				return true;
			}
		}
		
		return false;
	}

	public function removeRelativeCompanies( $company_id, $data = array() ) {
		$company = $this->dm->getRepository( 'Document\Company\Company' )->find( $company_id );

		if ( isset( $data['id'] ) ) {
			foreach ( $data['id'] as $id ) {
				$relative = $this->dm->getRepository( 'Document\Company\Company' )->find( $id );

				if ( !empty( $relative ) ) {
					$company->getRelativeCompanies()->removeElement( $relative );
				}
			}
		}

		$this->dm->flush();
	}

	public function isValidLogo( $file ) {
		$allowedExts = array("gif", "jpeg", "jpg", "png");
		$extension = end(explode(".", $file["name"]));
		if ((($file["type"] == "image/gif") || ($file["type"] == "image/jpeg") || ($file["type"] == "image/jpg") || ($file["type"] == "image/png")) && ($file["size"] < 300000) && in_array($extension, $allowedExts)) {
  			if ($file["error"] > 0) {
    			return false;
    		}
  			else {
	    		return true;
    		}
  		}
		else {
  			return false;
  		}
	}

	public function uploadLogo( $company_id, $logo ) {
		$ext = end(explode(".", $logo["name"]));
		$path = 'data/catalog/company/' . $company_id . '/logo.';
		if (file_exists( DIR_IMAGE . $path . '.jpg')) {
			unlink($path . '.jpg');
		}elseif ( file_exists( DIR_IMAGE . $path . '.jpeg' ) ) {
			unlink($path . '.jpeg');
		}elseif ( file_exists( DIR_IMAGE . $path . '.gif' ) ) {
			unlink($path . '.gif');
		}elseif ( file_exists( DIR_IMAGE . $path . '.png' ) ) {
			unlink($path . '.png' );
		}

		if ( !is_dir( DIR_IMAGE . 'data' ) ) {
			mkdir( DIR_IMAGE . 'data' );
		}

		if ( !is_dir( DIR_IMAGE . 'data/catalog' ) ) {
			mkdir( DIR_IMAGE . 'data/catalog' );
		}

		if ( !is_dir( DIR_IMAGE . 'data/catalog/company' ) ) {
			mkdir( DIR_IMAGE . 'data/catalog/company' );
		}

		if ( !is_dir( DIR_IMAGE . 'data/catalog/company/' . $company_id ) ) {
			mkdir( DIR_IMAGE . 'data/catalog/company/' . $company_id );
		}

		if ( move_uploaded_file( $logo['tmp_name'], DIR_IMAGE . $path . $ext ) ) {
			return $path . $ext;
		}else {
			return false;
		}
	}

	public function delete_directory( $dirname ) {
  		if(is_dir($dirname)){
    		$files = glob( $dirname . '*', GLOB_MARK );
    		foreach( $files as $file )
      			$this->delete_directory( $file );
    		rmdir( $dirname );
  		}else
    		unlink( $dirname );
	}
}
?>