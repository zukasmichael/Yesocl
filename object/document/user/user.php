<?php
namespace Document\User;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Solr\Mapping\Annotations as SOLR;

/** 
 * @MongoDB\Document(db="yesocl", collection="user")
 * @SOLR\Document(collection="user")
 */
Class User {
	/** 
	 * @MongoDB\Id 
	 */
	private $id; 

	/** 
	 * @MongoDB\String 
	 */
	private $username;

	/** @MongoDB\String */
	private $password;

	/** 
	 * @MongoDB\EmbedMany(targetDocument="Document\User\Meta\Email") 
	 */
	private $emails = array();

	/** 
	 * @MongoDB\EmbedOne(targetDocument="Meta") 
	 */
    private $meta;

	/** @MongoDB\ReferenceOne(targetDocument="Group", inversedBy="users") */
    private $groupUser;

    /** @MongoDB\ReferenceMany(targetDocument="Document\Group\Group", mappedBy="author") */
	private $groups = array();
	
	/** @MongoDB\Boolean */
	private $status;
	
	/** @MongoDB\Date */
	private $created;

	public function getId() {
		return $this->id;
	}

	public function setUsername( $username ){
		$this->username = $username;
	}

	public function getUsername(){
		return $this->username;
	}

	public function setPassword( $password ){
		$this->password = $password;
	}

	public function getPassword(){
		return $this->password;
	}

	public function addEmail( Email $email ){
		$this->emails[] = $email;
	}

	public function setEmails( $emails ){
		$this->emails = $emails;
	}

	public function getEmails(){
		return $this->emails;
	}
	
	public function getPrimaryEmail() {
		foreach ($this->emails as $email) {
			if ($email->getPrimary()) {
				return $email;
			}
		}
	}

	public function isExistEmail( $email ) {
		foreach ( $this->emails as $email_data ) {
			if ( $email == $email_data->getEmail() ) {
				return true;
			}
		}

		return false;
	}

	public function setMeta( $meta ){
		$this->meta = $meta;
	}

	public function getMeta(){
		return $this->meta;
	}

	public function setGroupUser( $groupUser ){
		$this->groupUser = $groupUser;
	}

	public function getGroupUser(){
		return $this->groupUser;
	}

	public function addGroup( \Document\Group\Group $group ){
		$this->groups[] = $group;
	}

	public function setGroups( $groups ){
		$this->groups = $groups;
	}

	public function getGroups(){
		return $this->groups;
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

	/**
	* @SOLR\Field(type="text")
	*/
	private $solrContent;

	public function setSolrContent( $solrContent ){
		$this->solrContent = $solrContent;
	}

	public function getSolrContent(){
		$solrContent = "";

		$solrContent .= $this->getUsername() . "  ";

		if ( count($this->getEmails()) > 0 ) {
			foreach ($this->getEmails() as $data) {
		$solrContent .= $data->getEmail() . "  ";
			}
		}

		$solrContent .= $this->meta->getFirstname() . "  ";
		$solrContent .= $this->meta->getLastname() . "  ";


		$this->solrContent = $solrContent;
		return $solrContent;
	}
}