(function($, document, undefined) {
	function FriendAction( $el, removeUnFriend ){
		var that = this;
		this.$el			= $el;
		this.$friend_btn	= $el.find('.btn-friend');
		this.$unfriend_btn	= $el.find('.btn-unfriend');
		this.friend_url		= this.$friend_btn.data('url');
		this.unfriend_url	= this.$unfriend_btn.data('url');
		
		this.is_cancel		= this.$friend_btn.data('cancel')
		this.is_remove_friend = removeUnFriend;

		this.attachEvents();
	}

	FriendAction.prototype.attachEvents = function(){
		var that = this;

		this.$friend_btn.click(function(e) {
			if(that.$friend_btn.hasClass('disabled')) {
				e.preventDefault();

				return false;
			}

			that.submit(that.$friend_btn);

			return false;
		});

		this.$unfriend_btn.click( function (e) {
			if (that.$unfriend_btn.hasClass('disabled')) {
				e.preventDefault();

				return false;
			}

			that.remove(that.$unfriend_btn);

			return false;
		});
	};
		
	FriendAction.prototype.submit = function($button){
		var that = this;

		var promise = $.ajax({
			type: 'POST',
			url:  this.friend_url,
			dataType: 'json'
		});

		this.triggerProgress($button, promise);

		promise.then(function(data) { 
			if(data.success == 'ok'){
				var $htmlOutput = '';

				if ( that.is_cancel == 0 ){
					$htmlOutput = $.tmpl( $('#cancel-request'), {
						href: that.friend_url,
						id: that.$friend_btn.data('id')
					});
					$(document).trigger('FRIEND_UPDATE_STATUS', [
						3, 
						that.$friend_btn.data('id')
					]);
				}else{
					$htmlOutput = $.tmpl( $('#send-request'), {
						href: that.friend_url,
						id: that.$friend_btn.data('id')
					});
					$(document).trigger('FRIEND_UPDATE_STATUS', [
						4, 
						that.$friend_btn.data('id')
					]);
				}

				that.$el.find('.friend-group').remove();
				that.$el.prepend( $htmlOutput );
				new FriendAction( that.$el );
			}

		});
	};
		
	FriendAction.prototype.remove = function($button){
		var that = this;

		var promise = $.ajax({
			type: 'POST',
			url:  this.unfriend_url,
			dataType: 'json',
			error: function (xhr, error) {
				alert(xhr.responseText);
			}
		});

		this.triggerProgress($button, promise);

		promise.then(function(data) { 
			if(data.success == 'ok'){
				// Remove friend
				if ( that.is_remove_friend == true ){
					that.$el.parent().remove();

				// Change status to not relationship
				// And show button make friend
				}else{
					var $htmlOutput = $.tmpl( $('#send-request'), {
						href: that.friend_url,
						id: that.$unfriend_btn.data('id')
					});
					that.$el.find('.friend-group').remove();
					that.$el.prepend( $htmlOutput );
					new FriendAction( that.$el );
					
					$(document).trigger('FRIEND_UPDATE_STATUS', [
						4, 
						that.$unfriend_btn.data('id')
					]);
				}
			}
		});
	};

	FriendAction.prototype.triggerProgress = function($el, promise){
		var $spinner = $('<i class="icon-spinner icon-spin"></i>');
		var $old_icon = $el.find('i');
		var f        = function() {
			$spinner.remove();
			$el.prepend($old_icon);
		};

		$old_icon.remove();
		$el.addClass('disabled').prepend($spinner);

		promise.then(f, f);
	};

	function FriendFilter( $element ){
		this.$element			= $element;
		this.$inputSearch		= $element.find('#search-input');
		this.$btnSearch			= $element.find('.friend-search-btn');
		this.$friendConditions		= $element.find('.friend-condition');

		this.attachEvents();
	}

	FriendFilter.prototype.attachEvents = function () {
		var that = this;

		this.$inputSearch.typeahead({
            source: function (query, process) {
            	friendList = [];
                map = {};      
                		
            	$.ajax({
            		type: 'POST',
            		url: that.$inputSearch.data('url'),
            		data: { 'filter_name': query },
            		dataType: 'json',
            		success: function ( json ) {
            			if ( json.success == 'ok' ) {
				            $.each(json.friends, function (i, item) {
				            	if ( friendList.indexOf(item.id + '-' + item.name) == -1 ) {
					                friendList.push(item.id + '-' + item.name);
					                map[item.id + '-' + item.name] = item;
				            	}
				            });
                			process(friendList);
            			}
            		},
            		error: function (xhr, error) {
            			alert(xhr.responseText);
            		},
            	});
            },
            updater: function (item) {
                var selectedFriend = map[item];
                return selectedFriend.name;
            },
            matcher: function (item) {
                return true;
            },
            sorter: function (items) {
                return items.sort();
            },
            highlighter: function (item) {
                var selectedFriend = map[item];
                var regex = new RegExp( '(' + this.query + ')', 'gi' );
                var boldItem = selectedFriend.name.replace( regex, "<strong>$1</strong>" );
                var htmlContent = '<div class="friend-dropdown-info">'
                                + '<img src="' + selectedFriend.avatar + '" alt="" />'
                                + '<div class="friend-meta-info">'
                                + '<span class="friend-name">' + boldItem + '</span>' 
                                + '<span class="num-friend">' + selectedFriend.numFriend + '</span>'   
                                + '</div>'
                                + '</div>';
                return htmlContent;
            }
        });

		this.$btnSearch.click( function () {
			if ( that.$inputSearch.val() == '' ) {
				return false;
			}

			$.ajax({
            	type: 'POST',
            	url: that.$inputSearch.data('url'),
            	data: { 'filter_name': that.$inputSearch.val() },
            	dataType: 'json',
            	success: function ( json ) {
            		if ( json.success == 'ok' ) { 
            			if ( json.friends.length > 0 ) {
	            			var $friends = $.tmpl( $('#friend-item'), json.friends );
	            			$friends.each(function(){
					            new FriendAction( $(this) );
					        });
	            			var $htmlParent = $('#y-content .block-content');
	            		    $('#y-content .friend-item').remove();
	            		    $htmlParent.prepend( $friends );
            		    }else {
            		    	$('#y-content .friend-item').remove();
            		    }
            		}
            	},
            	error: function (xhr, error) {
            		alert(xhr.responseText);
            	},
            });
		});

		this.$friendConditions.each( function () {
			new FriendCondition( $(this) );
		})
	}

	function FriendCondition( $element ) {
		this.$element = $element;
		this.$action = $element.find('a');

		this.attachEvents();
	}

	FriendCondition.prototype.attachEvents = function () {
		var that = this;

		this.$action.click( function () {
			if ( that.$element.hasClass('active') ) {
				return false;
			}else {
				$('#friend-filter .friend-conditions .active').removeClass('active');
				that.$element.addClass('active');
			}

			var data = that.$element.data('filter');

			$.ajax({
            	type: 'POST',
            	url: that.$element.data('url'),
            	data: data,
            	dataType: 'json',
            	success: function ( json ) {
            		if ( json.success == 'ok' ) {
            			if ( json.friends.length > 0 ) {
	            			var $friends = $.tmpl( $('#friend-item'), json.friends );
	            			$friends.each(function(){
					            new FriendAction( $(this) );
					        });
	            			var $htmlParent = $('#y-content .block-content');
	            		    $('#y-content .friend-item').remove();
	            		    $htmlParent.prepend( $friends );
            		    }else {
            		    	$('#y-content .friend-item').remove();
            		    }
            		}
            	},
            	error: function (xhr, error) {
            		alert(xhr.responseText);
            	},
            });
		});
	}

	$(function(){
        $('.friend-actions').each(function(){
            new FriendAction( $(this), true );
        });

        $('#friend-filter').each(function(){
            new FriendFilter( $(this) );
        });

        $(document).bind('FRIEND_ACTION', function(e, remove) {
            $('.friend-actions').each(function(){
                new FriendAction($(this), remove);
            });
        });
    });
}(jQuery, document));