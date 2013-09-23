(function($, document, undefined) {
	function Status( $el ){
		var that = this;

		this.$el		= $el;
		this.$title		= $el.find('.status-title')
		this.$content	= $el.find('.status-content');

		this.url		= $el.data('url');

		this.$status_btn	= $el.find('.btn-status');

		this.attachEvents();
	}

	Status.prototype.attachEvents = function(){
		var that = this;

		this.$status_btn.click(function(e) {
			if(that.$status_btn.hasClass('disabled')) {
				e.preventDefault();

				return false;
			}
			
			if(that.validate() == false){
				return false;
			}

			if ( that.$el.hasClass('full-post') ){
				that.data = {
					title 		: that.$title.val(),
					content 	: that.$content.html()
				};
			}else{
				that.data = {
					content 	: that.$content.val()
				};
			}

			that.submit(that.$status_btn);

			return false;
		});
	};

	Status.prototype.submit = function($button){
		var that = this;

		var promise = $.ajax({
			type: 'POST',
			url:  this.url,
			data: this.data,
			dataType: 'json'
		});

		this.triggerProgress($button, promise);

		promise.then(function(data) {
			if(data.success == 'ok'){
				var $htmlOutput = $.tmpl( $('#post-item-template'), data.post );
				
				var $column_first = $('.column').first();
				var $first_post = $column_first.children('.post_status');
				
				if ( $first_post.length == 0 ){
					$column_first.append( $htmlOutput );
				}else{
					$htmlOutput = $htmlOutput.after( $first_post );
					$htmlOutput = $('<div class="column">').append($htmlOutput);
					// $first_post.remove();
					$('.column').first().after( $htmlOutput );
				}

				$(document).trigger('POST_BUTTON');
				$(document).trigger('HORIZONTAL_POST');
				jQuery(".timeago").timeago();

				that.$content.val('');
				that.$content.html('');
				that.$title.val('');
			}
		});
	};

	Status.prototype.validate = function(){
		if ( this.$el.hasClass('full-post') && this.$content.html().length == 0 || !this.$el.hasClass('full-post') && this.$content.val().length == 0 ){
			return false;
		}
	};

	Status.prototype.triggerProgress = function($el, promise){
		var $spinner = $('<i class="icon-refresh icon-spin"></i>');
		var f        = function() {
			$el.removeClass('disabled');
			$spinner.remove();
		};

		$el.addClass('disabled').prepend($spinner);

		promise.then(f, f);
	};

	function initToolbarBootstrapBindings() {
        $('a[title]').tooltip({ container: 'body' });
        $('.dropdown-menu input').click(function () { 
			return false; 
		}).change(function () { 
			$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle'); 
		}).keydown('esc', function () {
			this.value = ''; 
			$(this).change(); 
		});
        $('[data-role=magic-overlay]').each(function () { 
	        var overlay = $(this), target = $(overlay.data('target')); 
	        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
      });
    };

	$(function(){
		$('.form-status').each(function(){
			new Status($(this));
		});

		initToolbarBootstrapBindings();		
		$('.y-editor').wysiwyg();		
	});
}(jQuery, document));