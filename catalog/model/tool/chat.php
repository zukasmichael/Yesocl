<?php
class ModelToolChat extends Model {
	public function pushMessage( $aChannelNames, $sActivityType, $aOptions = array() ) {
		foreach ( $aChannelNames as $sChannelName ) {
			$a = $this->pusher->trigger($sChannelName, $sActivityType, $aOptions, null, true);
		}

		return true;
	}
}
?>