<?php
namespace Document\Stock;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Doctrine\Solr\Mapping\Annotations as SOLR;

/** 
 * @MongoDB\Document(db="yesocl", collection="stock")
 * @SOLR\Document(collection="stock")
 */
Class Stock {
	/** 
	 * @MongoDB\Id 
	 * @SOLR\Field(type="id")
	 */
	private $id; 

	/** 
	 * @MongoDB\String 
	 * @SOLR\Field(type="text")
	 */
	private $name;

	/** 
	 * @MongoDB\String 
	 * @SOLR\Field(type="text")
	 */
	private $code;

	/** 
	 * @MongoDB\EmbedMany(targetDocument="Exchange")
	 */
	private $exchanges = array();

	/** @MongoDB\ReferenceOne(targetDocument="Market", inversedBy="stocks") */
	private $market;

	/** @MongoDB\ReferenceMany(targetDocument="Post", mappedBy="stock") */
	private $posts = array();

	/** @MongoDB\ReferenceOne(targetDocument="Document\Company\Company", inversedBy="stock") */
	private $company;

	/** @MongoDB\ReferenceOne(targetDocument="Meta", mappedBy="stock") */
	private $meta;

	/** @MongoDB\Hash */
	private $rangePrice = array();

	/** 
	 * @MongoDB\EmbedOne(targetDocument="Exchange")
	 */
	private $lastExchange;

	/** @MongoDB\Boolean */
	private $isDown;
	
	/** @MongoDB\Boolean */
	private $status = true;

	/** @MongoDB\Date */
	private $created;

	public function formatToCache() {
		return array(
			'id' => $this->id,
			'name' => $this->name,
			'code' => $this->code,
			'is_down' => $this->isDown,
			'last_exchange' => $this->lastExchange->formatToCache()
		);
	}

	public function getExchangeByCreated( $created ){
		foreach ( $this->exchanges as $oExchange ) {
			if ( $oExchange->getCreated == $created ){
				return $oExchange;
			}
		}

		return null;
	}

	public function getExchangeById( $idExchange ){
		foreach ( $this->exchanges as $oExchange ) {
			if ( $oExchange->getId() == $idExchange ){
				return $oExchange;
			}
		}

		return null;
	}

	public function calculateRangePrice( $iDay, $systemDoctrine ){
        $oTimeLimit = $this->lastExchange->getCreated();
        date_sub($oTimeLimit, date_interval_create_from_date_string($iDay . ' days'));
        
        $aExchanges = $this->exchanges->toArray();
        $aExchanges = array_reverse($aExchanges);

        $iMaxPrice = $this->lastExchange->getHighPrice();
        $iMinPrice = $this->lastExchange->getLowPrice();
        foreach ($aExchanges as $oExchange) {
            if ( $oExchange->getCreated() < $oTimeLimit ){
                break;
            }

            if ( $iMaxPrice < $oExchange->getHighPrice() ){
            	$iMaxPrice = $oExchange->getHighPrice();
            }

            if ( $iMinPrice > $oExchange->getLowPrice() ){
            	$iMinPrice = $oExchange->getLowPrice();
            }
        }

        $this->rangePrice = array(
        	$iDay => array(
        		'max_price' => $iMaxPrice,
        		'min_price' => $iMinPrice
        	)
        );

        $systemDoctrine->flush();
	}

	public function getRangePriceByDay( $iDay, $systemDoctrine ){
		if ( empty($this->rangePrice[$iDay]) ){
			$this->calculateRangePrice( $iDay, $systemDoctrine );
		}

		return $this->rangePrice[$iDay];
	}

	/** @MongoDB\PrePersist */
    public function prePersist()
    {
    	$this->created = new \DateTime();
    }

	public function getId() {
		return $this->id;
	}

	public function setId( $id ) {
		$this->id = $id;
	}

	public function setName( $name ){
		$this->name = $name;
	}

	public function getName(){
		return $this->name;
	}

	public function setCode( $code ){
		$this->code = $code;
	}

	public function getCode(){
		return $this->code;
	}

	public function addExchange( Exchange $exchange ){
		$this->exchanges[] = $exchange;
		$this->lastExchange = $exchange;
		if ( $this->lastExchange->getClosePrice() >= $exchange->getClosePrice() ){
			$this->isDown = true;
		}else{
			$this->isDown = false;
		}
	}

	public function setExchanges( $exchanges ){
		$this->exchanges = $exchanges;
	}

	public function getExchanges(){
		return $this->exchanges;
	}

	public function setMarket( $market ){
		$this->market = $market;
	}

	public function getMarket(){
		return $this->market;
	}

	public function setStatus( $status ){
		$this->status = $status;
	}

	public function getStatus(){
		return $this->status;
	}

	public function setCompany( $company ){
		$this->company = $company;
	}

	public function getCompany(){
		return $this->company;
	}

	public function setMeta( $meta ){
		$this->meta = $meta;
	}

	public function getMeta(){
		return $this->meta;
	}

	public function setLastExchange( $lastExchange ){
		$this->lastExchange = $lastExchange;
	}

	public function getLastExchange(){
		return $this->lastExchange;
	}

	public function setIsDown( $isDown ){
		$this->isDown = $isDown;
	}

	public function getIsDown(){
		return $this->isDown;
	}

	public function setCreated( $created ){
		$this->created = $created;
	}

	public function getCreated(){
		return $this->created;
	}

	public function setRangePrice( $rangePrice ){
		$this->rangePrice = $rangePrice;
	}

	public function getRangePrice(){
		return $this->rangePrice;
	}
}