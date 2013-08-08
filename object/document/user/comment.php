<?php
namespace Document\User;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/** @MongoDB\EmbeddedDocument */
Class Comment {
	/** @MongoDB\Id */
	private $id;

	/** @MongoDB\String */
	private $content;
	
	/** @MongoDB\Boolean */
	private $status;
	
	/** @MongoDB\Date */
	private $created;
	
	/** @MongoDB\ReferenceOne(targetDocument="Document\User\User", inversedBy="comment") */
    private $user;

	public function getId(){
		return $this->id;
	}

	public function setContent( $content ){
		$this->content = $content;
	}

	public function getContent(){
		return $this->content;
	}

	public function setStatus( $status ){
		$this->status = $status;
	}

	public function getStatus(){
		return $this->status;
	}

	public function setCreated( $created ){
		$this->created = $created;
	}

	public function getCreated(){
		return $this->created;
	}

	/** @MongoDB\PrePersist */
	public function prePersist(){
		$this->created = new \DateTime();
	}

	public function setUser( $user ){
		$this->user = $user;
	}

	public function getUser(){
		return $this->user;
	}

	public function formatToCache(){
		$data_format = array(
			'author' 		=> $this->getUser(),
			'content' 		=> html_entity_decode($this->getContent()),
			'created'		=> $this->getCreated()->format('h:i A d/m/Y'),
			'user_id'		=> $this->getUser()->getId()
		);

		return $data_format;
	}
}