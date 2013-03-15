<?php
use Document\Data\Value;

class ModelDataValue extends Doctrine {
	public function addValue( $data = array() ) {
		// Name is require
		if ( !isset($data['value']) || empty($data['value']) ){
			return false;
		}

		// Type is require
		if ( !isset($data['type']) || empty($data['type']) ){
			return false;
		}

		$value = new Value();
		$value->setValue( $data['value'] );

		$type = $this->dm->getRepository('Document\Data\Type')->find( $data['type'] );
		$value->setType( $type );

		$this->dm->persist( $value );
		$this->dm->flush();
	}

	public function editValue( $id, $data = array() ) {
		// Name is require
		if ( !isset($data['value']) || empty($data['value']) ){
			return false;
		}

		// Type is require
		if ( !isset($data['type']) || empty($data['type']) ){
			return false;
		}

		$value = $this->dm->getRepository('Document\Data\Value')->find( $id );

		if ( !$value ){
			return false;
		}

		$value->setValue( $data['value'] );

		$type = $this->dm->getRepository('Document\Data\Type')->find( $data['type'] );
		$value->setType( $type );

		$this->dm->flush();
	}

	public function deleteValue( $data = array() ) {
		if ( isset($data['id']) ) {
			foreach ( $data['id'] as $id ) {
				$value = $this->dm->getRepository( 'Document\Data\Value' )->find( $id );

				$this->dm->remove($value);
			}
		}

		$this->dm->flush();
	}

	public function getValue( $value_id ) {
		return $this->dm->getRepository( 'Document\Data\Value' )->find( $value_id );
	}

	public function getValues( $data = array() ) {
		if (!isset($data['limit']) || ((int)$data['limit'] < 0)) {
			$data['limit'] = 10;
		}
		if (!isset($data['start']) || ((int)$data['start'] < 0)) {
			$data['start'] = 0;
		}

		// $query = $this->dm->createQueryBuilder( 'Document\Data\Value' )
  //   		->limit( $data['limit'] )
  //   		->skip( $data['start'] );

  //   	if ( isset( $data['filter_type'] ) ) {
  //   		$query->field( 'type.name' )->equals( new \MongoRegex('/' . $data['filter_type'] . '.*/i') );
  //   	}

  //   	if ( isset( $data['filter_value'] ) ) {
  //   		$query->field( 'value' )->equals( new \MongoRegex('/' . $data['filter_value'] . '.*/i') );
  //   	}

  //   	if ( isset( $data['sort'] ) ) {
  //   		if ( isset( $data['order'] ) && $data['order'] == 'desc' ) {
  //   			$query->sort( $data['sort'], 'desc' );
  //   		}else {
  //   			$query->sort( $data['sort'], 'asc' );
  //   		}
  //   	}

    	// return $query->getQuery()->execute();

    	$arr_query = array();

    	if ( isset($data['filter_type']) ){
    		$arr_query['type.name'] = new \MongoRegex('/' . $data['filter_type'] . '.*/i');
    	}

    	if ( isset($data['filter_value']) ){
    		$arr_query['value'] = new \MongoRegex('/' . $data['filter_value'] . '.*/i');
    	}

    	if ( isset( $data['sort'] ) ) {
    		if ( isset( $data['order'] ) && $data['order'] == 'desc' ) {
    			$sort = array( $data['sort'] => -1 );
    		}else {
    			$sort = array( $data['sort'] => 1 );
    		}
    	}

    	return $this->dm->getRepository('Document\Data\Value')->findBy( $arr_query )->skip( $data['start'] )->limit( $data['limit'] )->sort( $sort );
	}

	public function getTotalValues( $data ) {
		$query = $this->dm->createQueryBuilder( 'Document\Data\Value' );

    	$values = $query->getQuery()->execute();

		return count($values);
	}
}
?>