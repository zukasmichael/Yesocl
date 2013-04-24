<?php
use Document\Company\Position;

class ModelCompanyPosition extends Doctrine {
	public function addPosition( $data = array() ) {
		// name is required & isn't exist
		if ( isset( $data['name'] ) && !$this->isExistName( $data['name'] ) ) {
			$this->data['name'] = strtolower( trim( $data['name'] ) );
		}else {
			return false;
		}

		// branchs
		$branchs = array();
		if ( isset( $data['branchs'] ) ) {
			foreach ($data['branchs'] as $branch_data) {
				$branchs[$branch_data['id']] = $branch_data['id'];
			}
		}else {
			$branchs = array();
		}

		// status
		if ( !isset( $data['status'] ) ) {
			$data['status'] = 0;
		}

		$position = new Position();
		$position->setName( $data['name'] );
		$position->setStatus( $data['status'] );

		// branchs
		foreach ($branchs as $branch_data) {
			$branch = $this->dm->getRepository( 'Document\Company\Branch' )->find( $branch_data );
			if ( !empty( $branch ) ) {
				$position->addBranch( $branch );
			}
		}

		$this->dm->persist( $position );
		$this->dm->flush();

		return true;
	}

	public function editPosition( $position_id, $data = array() ) {
		// name is required
		if ( isset( $data['name'] ) ) {
			$this->data['name'] = strtolower( trim( $data['name'] ) );
		}else {
			return false;
		}

		// branchs
		$branchs = array();
		if ( isset( $data['branchs'] ) ) {
			foreach ($data['branchs'] as $branch_data) {
				$branchs[$branch_data['id']] = $branch_data['id'];
			}
		}else {
			$branchs = array();
		}

		// status
		if ( !isset( $data['status'] ) ) {
			$data['status'] = 0;
		}

		$position = $this->dm->getRepository( 'Document\Company\Position' )->find( $position_id );
		if ( empty( $position ) ) {
			return false;
		}

		// name is exist
		if ( $position->getName() != $data['name'] && $this->isExistName( $data['name'] ) ) {
			return false;
		}

		$position->setName( $data['name'] );
		$position->setStatus( $data['status'] );

		// branchs
		$position->setBranchs( array() );
		foreach ($branchs as $branch_data) {
			$branch = $this->dm->getRepository( 'Document\Company\Branch' )->find( $branch_data );
			if ( !empty( $branch ) ) {
				$position->addBranch( $branch );
			}
		}
		
		$this->dm->flush();

		return true;
	}

	public function deletePositions( $data ) {
		if ( isset( $data['id'] ) ) {
			foreach ($data['id'] as $id) {
				$position = $this->dm->getRepository( 'Document\Company\Position' )->find( $id );

				if ( !empty( $position ) ) {
					$this->dm->remove( $position );
				}
			}
		}

		$this->dm->flush();
	}

	public function getPosition( $position_id ) {
		return $this->dm->getRepository( 'Document\Company\Position' )->find( $position_id );
	}

	public function getPositions( $data = array() ) {
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

		return $this->dm->getRepository( 'Document\Company\Position' )->findAll()->limit( $this->data['limit'] )->skip( $this->data['start'] );
	}

	public function getTotalPositions( $data = array() ) {
		return count( $this->dm->getRepository( 'Document\Company\Position' )->findAll() );
	}

	public function isExistName( $name ) {
		$position = $this->dm->getRepository( 'Document\Company\Position' )->findOneBy( array( 'name' => strtolower( trim( $name ) ) ) );

		if ( !empty( $position ) ) {
			return true;
		}else {
			return false;
		}
	}
}
?>