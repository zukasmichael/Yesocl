<?php
class ModelToolChat extends Model {
	public function pushMessage( $aChannelNames, $sActivityType, $aOptions = array() ) {
		// var_dump($aOptions);exit;
		foreach ( $aChannelNames as $sChannelName ) {
			$a = $this->pusher->trigger($sChannelName, $sActivityType, $aOptions, null, true);
			// var_dump($a);
		}

		return true;
	}

	private function sanitiseInput( $aChatInfo ) {
	  	$aOptions = array();
	  	$aOptions['displayName'] = substr(htmlspecialchars($aChatInfo['nickname']), 0, 30);
	  	$aOptions['text'] = substr(htmlspecialchars($aChatInfo['text']), 0, 300);
	  	$aOptions['image'] = substr(htmlspecialchars($aChatInfo['avatar']), 0, 100);
	  	return $aOptions;
	}
}

class Activity {
  	private $display_name = '<em>Anon</em>';
  	private $image = null;
  	private $action_text = null;
  	private $date = null;
  	private $id;
  	private $type;
  	private $data;
  
  	public function __construct($activity_type, $action_text, $options = array()) {
	    $options = $this->set_default_options($options);
	      
	    date_default_timezone_set('UTC');
	    
	    $this->type = $activity_type;
	    $this->id = uniqid();
	    $this->date = date('r');
	    $this->action_text = $action_text;
	    $this->display_name = $options['displayName'];
	    $this->data = $options['data'];
	    if ( !empty($options['image']) ) {
	    	$this->image = $options['image'];
	    }
    }
  
  	public function getMessage() {
	    $activity = array(
	      	'id' => $this->id,
	      	'body' => $this->action_text,
	      	'published' => $this->date,
	      	'type' => $this->type,
	      	'actor' => array(
		        'displayName' => $this->display_name,
		        'objectType' => 'person',
		        'image' => $this->image
	      	),
	      	'data' => $this->data
	    );
	    return $activity;
  	}
  
  	private function set_default_options($options) {
	    $defaults = array(
	    	'displayName' => null,
	    	'image' => array(
	    		'url' => 'http://www.gravatar.com/avatar?d=wavatar&s=48',
	    		'width' => 48,
	    		'height' => 48
	    	)
	    );
	    foreach ($defaults as $key => $value) {
	      	if( isset($options[$key]) == false ) {
	        	$options[$key] = $value;
	      	}
	    }
    
    	return $options;
  	}

}
?>