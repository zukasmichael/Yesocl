(function($, document, undefined) {
	'use strict';

	function Login( $el ){
		this.$el		= $el;
		this.$email		= $el.find('input[name=\'email\']');
		this.$password	= $el.find('input[name=\'password\']');

		this.$remember	= $el.find('input[name=\'remember\']');

		this.$login_btn	= $el.find('.btn-login');

		this.attachEvents();
	}

	Login.prototype.attachEvents = function(){
		var that = this;

		this.$login_btn.click(function(e) {
			if(that.$login_btn.hasClass('disabled')) {
				e.preventDefault();

				return false;
			}
			
			if(that.validate() !== false){
				that.data = {
					email		: that.$email.val(),
					password	: that.$password.val(),
					remember	: (that.$remember.attr('checked') == 'checked')?'1':'0'
				};
				
				that.submit(that.$login_btn);

				return false;
			}
		});
	};

	Login.prototype.submit = function($button){
		var promise = $.ajax({
			type: 'POST',
			url:  window.yRouting.generate('AjaxLogin'),
			data: this.data,
			dataType: 'json'
		});

		this.triggerProgress($button, promise);

		promise.then(function(data) {
			if(data.success == 'ok'){
				window.location.reload();
			}else{
				window.location.href = window.yRouting.generate('Login');
			}
		});
	};

	Login.prototype.validate = function(){
		if (this.$email.val() === ''){
			return false;
		}

		if (this.$password.val() === ''){
			return false;
		}
	};

	Login.prototype.triggerProgress = function($el, promise)
	{
		var $spinner = $('<i class="icon-spinner icon-spin"></i>');
		var f        = function() {
			$el.removeClass('disabled');
			$spinner.remove();
		};

		$el.addClass('disabled').prepend($spinner);

		promise.then(f, f);
	};

	$(function(){
		$('.login-form').each(function(){
			new Login($(this));
		});
	});
}(jQuery, document));