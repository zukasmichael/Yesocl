// Friend action button
(function($, document, undefined) {
	'use strict';

	function FriendAction( $el, removeUnFriend ){
		this.$el				= $el;
		this.$makeFriendBtn		= $el.find('.js-makefriend-btn');
		this.$unFriendBtn		= $el.find('.js-unfriend-btn');
		this.$cancelRequestBtn	= $el.find('.js-cancel-request-friend-btn');
		this.$makeFollowBtn		= $el.find('.js-makefollow-btn');
		this.$unFollowBtn		= $el.find('.js-unfollow-btn');
		
		this.userSlug			= $el.parents('.js-friend-info').data('user-slug');
		this.is_remove_friend = removeUnFriend;

		this.attachEvents();
	}

	FriendAction.prototype.attachEvents = function(){
		var that = this;

		this.$makeFriendBtn.click(function(e) {
			if( $(this).hasClass('disabled') ) {
				e.preventDefault();

				return false;
			}

			that.url = window.yRouting.generate('MakeFriend', {user_slug: that.userSlug});
			that.frStatus = 1;

			that.submitFriend($(this));

			return false;
		});

		this.$cancelRequestBtn.click( function (e) {
			if ( $(this).hasClass('disabled') ) {
				e.preventDefault();

				return false;
			}

			that.url = window.yRouting.generate('MakeFriend', {user_slug: that.userSlug});
			that.frStatus = 2;

			that.submitFriend($(this));

			return false;
		});

		this.$unFriendBtn.click( function (e) {
			if ( $(this).hasClass('disabled') ) {
				e.preventDefault();

				return false;
			}

			that.url = window.yRouting.generate('UnFriend', {user_slug: that.userSlug});
			that.frStatus = 3;

			that.submitFriend($(this));

			return false;
		});
	};
		
	FriendAction.prototype.submitFriend = function($button){
		var that = this;

		var promise = $.ajax({
			type: 'POST',
			url:  this.url,
			dataType: 'json'
		});

		this.triggerProgress($button, promise);

		promise.then(function(data) {
			if(data.success == 'ok'){
				var $htmlOutput = '';

				if ( that.frStatus === 1 ){
					$htmlOutput = $.tmpl( $('#cancel-request') );
					// $(document).trigger('FRIEND_UPDATE_STATUS', [
					// 	3,
					// 	''
					// ]);
				}else if ( that.frStatus === 2 ){
					$htmlOutput = $.tmpl( $('#send-request') );
					// $(document).trigger('FRIEND_UPDATE_STATUS', [
					// 	4,
					// 	''
					// ]);
				}else{
					// Remove friend
					if ( that.is_remove_friend === true ){
						that.$el.parent().remove();
						return false;

					// Change status to not relationship
					// And show button make friend
					}else{
						$htmlOutput = $.tmpl( $('#send-request') );
						
						// $(document).trigger('FRIEND_UPDATE_STATUS', [
						// 	4,
						// 	''
						// ]);
					}
				}
				
				that.$el.find('.friend-group').remove();
				that.$el.prepend( $htmlOutput );
				new FriendAction( that.$el );
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

	$(function(){
        $(document).bind('FRIEND_ACTION', function(e, remove) {
            $('.friend-actions').each(function(){
                new FriendAction($(this), remove);
            });
        });
    });
}(jQuery, document));

// Filter friend
(function($, document, undefined) {
	'use strict';
	function FriendFilter( $el ){
		this.$el = $el;
		this.$rootContent = $('#y-content');
		this.$mainContent = $('#y-main-content');
		
		this.$friendConditions	= $el.find('.friend-condition');
		this.$inputFilter		= $el.find('#filter-input');
		this.$userContainer = this.$mainContent.find('.user-container');
		this.$friendList		= this.$userContainer.find('.friend-item');
		this.$isDone = true;
		this.attachEvents();
	}

	FriendFilter.prototype.attachEvents = function () {
		var that = this;

		if(!String.prototype.trim) {
		  String.prototype.trim = function () {
		    return this.replace(/^\s+|\s+$/g,'');
		  };
		}

		that.$inputFilter.keyup(function(){
			if(that.$friendList.length === 0 || that.$isDone === false )
				return;
			var userId = '', userName='', userEmail='';
			var query = $(this).val().toString().trim().toLowerCase();
			if(query.length === 0) {
				that.showResult(that.$friendList);
				return;
			}
			that.$isDone = false;
			var resultFilter = that.$friendList.filter(function() {
				if($(this).data('user-id')) {
					userId = $(this).data('user-id');
				}else {
					userId = '*';
				}
				if($(this).data('user-name')) {
					userName = $(this).data('user-name');
				}else {
					userName = '*';
				}
				if($(this).data('user-email')) {
					userEmail = $(this).data('user-email');
				}else {
					userEmail = '*';
				}
				return (userId.toLowerCase().indexOf(query) > -1 ||
						userName.toLowerCase().indexOf(query) > -1 ||
						userEmail.toLowerCase().indexOf(query) > -1);
			});
			that.showResult(resultFilter);
		});

		this.$friendConditions.each( function () {
			$(this).click(function(e){
				e.preventDefault();
				if ( $(this).hasClass('active') ){
					return false;
				}
				that.$friendConditions.each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				var typeFilter = $(this).data('friend');
				var resultFriend = that.$friendList.filter(function() {
					return $(this).hasClass(typeFilter);
				});
				that.showResult(resultFriend);
				return true;
			});
		});
	};
	FriendFilter.prototype.showResult = function (result) {
		var that = this;
		
		that.$friendList.fadeOut(10);
		//Empty result
		if(typeof result == 'undefined'){
			that.$mainContent.width(that.$rootContent.width() - 10);
		}else {
			var numberRow = Math.floor(that.$mainContent.find('.feed-block').height()/(85 + 10));
			var numberCol = Math.floor(result.length/numberRow) + 1;
			var freeBlock = that.$mainContent.find('.free-block');
			var blockContent = that.$mainContent.find('.feed-block');
			if(freeBlock.length === 0){
				that.$mainContent.width(numberCol*(320 + 15));
			}else{
				blockContent.width(numberCol*(320 + 15));
				that.$mainContent.width(freeBlock.width() + 60 + numberCol*(320 + 15));
			}
			result.stop(true,true).fadeIn(300);
		}
		that.$rootContent.getNiceScroll().resize();
		that.$rootContent.animate({scrollLeft : '0px'}, 200);
		that.$isDone = true;
	};

	$(function(){
		$('#friend-filter').each(function(){
            new FriendFilter( $(this) );
        });
    });
}(jQuery, document));