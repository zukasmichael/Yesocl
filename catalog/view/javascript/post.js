(function($, document, undefined) {
    var comment_box = $('#comment-box');
    var comment_form = $('.comment-form');
    var list_comment = $('#comment-box .y-box-content');
    var page = 1;

    function UserInfo(user_name, user_img, user_url, number_friend, is_friend, is_follow) {
        this.userName = user_name;
        this.userUrl = user_url;
        this.userImg = user_img;
        this.numberFriend = number_friend;
        this.isFriend = is_friend;
        this.isFollow = is_follow;
    }
    function UserListViewer(el) {
        this.element 		= el;
        this.viewTitle 		= el.data('view-title');
        this.viewType 		= el.data('view-title');
        this.postSlug		= el.data('post-slug');
        this.postType		= el.data('post-type');
        this.typeSlug 		= el.data('type-slug');
        this.url	        = el.data('url');
        this.addEvents();
        this.users = [];
    }
    UserListViewer.prototype.addEvents = function() {
        var that = this;
        this.element.click(function(e){
            e.preventDefault();
            if($(this).hasClass('disabled')) {
                return false;
            }
            that.showViewer();
        });
    }
    UserListViewer.prototype.showViewer = function() {
        var that = this;

        var data;
        if(that.viewType == 'like'){

        }
        else if (that.viewType == 'comment') {

        }
        else if (that.viewType == 'view') {

        }
        if(that.users.length == 0){	
            //D? li?u test demo:
            var promise = $.ajax({
                type: 'POST',
                url:  this.url,
                dataType: 'json'
            });
        
            this.triggerProgress(that.element, promise);
            promise.then(function(data) { 
                if(data.success == 'ok'){ 
                    for (key in data.users) {
                        var user = new UserInfo(data.users[key].username, data.users[key].avatar, data.users[key].href_user, 10, 0, 1);
                        that.users.push(user);
                    }
                    var templateUserInfo = $('#user-info-template');
                    $('#user-viewer-container').html('');
                    var userViewerContainer = $('#user-viewer-container');
                    var htmlContent = '';

                    for (var i = 0; i < that.users.length; i++) {
                        var user = that.users[i];
                        var html = templateUserInfo.html().replace(/USER_URL/gi, user.userUrl);
                        html = html.replace(/USER_NAME/gi, user.userName);
                        html = html.replace(/USER_IMG/gi, user.userImg);
                        html = html.replace(/NUMBER_OF_FRIEND/gi, user.numberFriend);
                        var actionFriend = '<i class="icon-ok"></i>Friend';
                        if(user.isFriend == 0) {
                            actionFriend = '<i class="icon-plus"></i>Add as Friend';
                        }
                        html = html.replace(/USER_ACTIONS/gi, actionFriend);
                        htmlContent += html;
                    };
                    userViewerContainer.html(htmlContent);
                    userViewerContainer.bPopup({
                        follow: [false, false],				
                        speed: 300,
                        transition: 'slideDown',
                        modalColor : '#000',
                        opacity: '0.5'
                    });
                }

            });
        }else{
            var templateUserInfo = $('#user-info-template');
            $('#user-viewer-container').html('');
            var userViewerContainer = $('#user-viewer-container');
            var htmlContent = '';

            for (var i = 0; i < that.users.length; i++) {
                var user = that.users[i];
                var html = templateUserInfo.html();
                html = html.replace(/USER_URL/gi, user.userUrl);
                html = html.replace(/USER_NAME/gi, user.userName);
                html = html.replace(/USER_IMG/gi, user.userImg);
                html = html.replace(/NUMBER_OF_FRIEND/gi, user.numberFriend);
                var actionFriend = '<i class="icon-ok"></i>Friend';
                if(user.isFriend == 0) {
                    actionFriend = '<i class="icon-plus"></i>Add as Friend';
                }
                html = html.replace(/USER_ACTIONS/gi, actionFriend);
                htmlContent += html;
            };
            userViewerContainer.html(htmlContent);
            userViewerContainer.bPopup({
                follow: [false, false],				
                speed: 300,
                transition: 'slideDown',
                modalColor : '#000',
                opacity: '0.5'
            });
        }	
    }
    
    UserListViewer.prototype.triggerProgress = function($el, promise){
        var $spinner = $('<i class="icon-spinner icon-spin"></i>');
        var $old_icon = $el.find('d');
        var f        = function() {
            $spinner.remove();
            $el.html($old_icon);
        };
        
        $el.addClass('disabled').html($spinner);

        promise.then(f, f);
    };

    function LikePostBtn( $el ){
        var that = this;
        this.$el			= $el;
        this.url			= $el.data('url');
        this.isLiked 		= $el.data('post-liked');
        this.iconLike 		= $el.find('i');

        this.attachEvents();
    }
    LikePostBtn.prototype.attachEvents = function(){
        var that = this;

        this.$el.click(function(e) {
            if(that.$el.hasClass('disabled')) {
                e.preventDefault();

                return false;
            }

            that.submit(that.$el);

            return false;
        });
    };
    LikePostBtn.prototype.submit = function($button){
        var that = this;		

        var promise = $.ajax({
            type: 'POST',
            url:  this.url,
            dataType: 'json'
        });

        this.triggerProgress($button, promise);

        promise.then(function(data) { 
            if(data.success == 'ok'){ 
                var $curr_item = that.$el.parents('.post'); 
                $curr_item.find('.post_meta .post_like d').html( data.like_count );
                $button.find('d').html( data.like_count );
                $curr_item.find('.view-list-liker d').html( data.like_count );

                var $likeIcon = $('<i class="icon-thumbs-up medium-icon"></i>');
                var $unLikeIcon = $('<i class="icon-thumbs-down medium-icon"></i>');
                //Unlike
                if(that.isLiked == 1) {
                    that.iconLike.replaceWith($likeIcon);
                    that.iconLike = $likeIcon;
                    that.isLiked = 0;
                }else { //Like
                    that.iconLike.replaceWith($unLikeIcon);
                    that.iconLike = $unLikeIcon;
                    that.isLiked = 1;
                }

                that.$el.removeClass('disabled');
            }

        });		
    };		
    LikePostBtn.prototype.triggerProgress = function($el, promise){
        var $spinner = $('<i class="icon-spinner icon-spin"></i>');
        var $old_icon = $el.find('i');
        var f        = function() {
            $spinner.remove();
            $el.html($old_icon);
        };

        $el.addClass('disabled').html($spinner);

        promise.then(f, f);
    };

    function LikeCommentBtn( $el ){
        var that = this;

        var $curr_item = $el.parents('.post');

        this.$el			= $el;
        this.url			= $el.data('url');
        this.isLiked 		= $el.data('comment-liked');
        this.iconLike 		= $el.find('i');
        this.attachEvents();
    }

    LikeCommentBtn.prototype.attachEvents = function(){
        var that = this;

        this.$el.click(function(e) {
            if(that.$el.hasClass('disabled')) {
                e.preventDefault();

                return false;
            }

            that.submit(that.$el);

            return false;
        });
    };
		
    LikeCommentBtn.prototype.submit = function($button){
        var that = this;

        var promise = $.ajax({
            type: 'POST',
            url:  this.url,
            dataType: 'json'
        });

        this.triggerProgress($button, promise);

        promise.then(function(data) {
            if(data.success == 'ok'){
                that.$el.find('d').html( data.like_count ); 

                var $likeIcon = $('<i class="icon-thumbs-up medium-icon"></i>');
                var $unLikeIcon = $('<i class="icon-thumbs-down medium-icon"></i>');
                //Unlike
                if(that.isLiked == 1) {
                    that.iconLike.replaceWith($likeIcon);
                    that.iconLike = $likeIcon;
                    that.isLiked = 0;
                }else { //Like
                    that.iconLike.replaceWith($unLikeIcon);
                    that.iconLike = $unLikeIcon;
                    that.isLiked = 1;
                }
            }
        });
    };
		
    LikeCommentBtn.prototype.triggerProgress = function($el, promise){
        var $spinner = $('<i class="icon-spinner icon-spin"></i>');
        var f        = function() {
            $spinner.remove();
            $el.removeClass('disabled');
        };

        $el.addClass('disabled').parent().append($spinner);

        promise.then(f, f);
    };

    function CommentBtn( $el ){
        var that = this;

        this.$el			= $el;
        this.comment_count	= $el.data('comment-count');
        this.comment_url	= $el.data('comment-url');
        this.url			= $el.data('url');
        this.comments = [];
        this.attachEvents();
    }
    CommentBtn.prototype.attachEvents = function(){
        var that = this;
        this.$el.click(function(e) {
            if(that.$el.hasClass('disabled')) {
                e.preventDefault();
                return false;
            }
            $('#comment-box').find('.y-box-header .close').trigger('click');
            that.submit(that.$el);
            return false;
        });
        //Attach close event:
        comment_box.on('click', '.y-box-header .close', function(){
            that.hideCommentBox(that.$el);
        });        
        $('#overlay').click(function() {
            that.hideCommentBox(that.$el);
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { 
                that.hideCommentBox(that.$el);
            }
        });
    };
    CommentBtn.prototype.submit = function($button){
        var that = this;
        if (that.comments.length == 0){
            var promise = $.ajax({
                type: 'POST',
                url:  this.url,
                dataType: 'json'
            });
            this.triggerProgress($button, promise);
            promise.then(function(data) { 
                if(data.success == 'ok'){
                    $('.comment-body').html('');

                    var htmlOutput = '';
                    for (key in data.comments) {
                        that.comments.push(data.comments[key]);
                        htmlOutput += $.tmpl( $('#item-template'), data.comments[key] ).html();
                    }
				
                    htmlOutput += '<div id="add-more-item"></div>';
                    comment_box.find('.comment-body').html(htmlOutput);
                    comment_box.find('.y-box-header span').html(that.comment_count);
                    comment_form.attr('data-url', that.comment_url);
                    page = 1;
                    $('.comment-body').stop().animate({
                        scrollTop: $(".comment-body").find("#add-more-item").first().offset().top
                    }, 1000);
                    new CommentForm(comment_form);

                    $('.comment-item .like-comment').each(function(){
                        new LikeCommentBtn($(this));			
                    });

                    jQuery(".timeago").timeago();
                    that.showCommentBox($button); 
                }     
            });
        }else{
            var $spinner = $('<i class="icon-spinner icon-spin"></i>');
            var $old_icon = that.$el.find('i');
            var f        = function() {
                $spinner.remove();
                that.$el.html($old_icon);
            };

            that.$el.addClass('disabled').html($spinner);
            $('.comment-body').html('');

            var htmlOutput = '';
            for (key in that.comments) {
                htmlOutput += $.tmpl( $('#item-template'), that.comments[key] ).html();
            }
				
            htmlOutput += '<div id="add-more-item"></div>';
            comment_box.find('.comment-body').html(htmlOutput);
            comment_box.find('.y-box-header span').html(that.comment_count);
            comment_form.attr('data-url', that.comment_url);
            page = 1;
            $('.comment-body').stop().animate({
                scrollTop: $(".comment-body").find("#add-more-item").first().offset().top
            }, 100);
            new CommentForm(comment_form);

            $('.comment-item .like-comment').each(function(){
                new LikeCommentBtn($(this));			
            });

            jQuery(".timeago").timeago();
            that.showCommentBox($button);
            f();
        }
    };
    CommentBtn.prototype.triggerProgress = function($el, promise)
    {
        var $spinner = $('<i class="icon-spinner icon-spin"></i>');
        var $old_icon = $el.find('i');
        var f        = function() {
            $spinner.remove();
            $el.html($old_icon);
        };

        $el.addClass('disabled').html($spinner);

        promise.then(f, f);
    };
    CommentBtn.prototype.showCommentBox = function($button) {
        var post = $button.parents('.post');
        if(post.length >= 0){
            $('.post').removeClass('post-selecting');
            post.addClass('post-selecting');
        }       
        $('#overlay').show(100);        
        list_comment.makeCustomScroll(false);
        //Show comment box:
        comment_box.stop().animate({ "right": "2px" }, 200);
    }
    CommentBtn.prototype.hideCommentBox = function($button) {
        $('#overlay').hide();
        $('.post').removeClass('post-selecting');
        $button.removeClass('disabled');
        comment_box.stop().animate({"right": "-500px" }, "slow");
        page = 1;
    }

    function CommentForm( $el ){
        var that = this;
        this.$el			= $el;
        this.$content		= $el.find('textarea');
        this.$comment_btn	= $el.find('.btn-comment');
        this.$comments      = [];
        this.$press_enter_cb  = $el.find('.cb-press-enter');
        
        this.attachEvents();
    }
    CommentForm.prototype.attachEvents = function(){
        var that = this;

        if(this.$press_enter_cb.parent().hasClass('checked')){
            this.$comment_btn.hide();
        }

        this.$comment_btn.click(function(e) {
            if(that.$comment_btn.hasClass('disabled')) {
                e.preventDefault();

                return false;
            }
			
            if(that.validate() == false){
                return false;
            }

            that.url	= that.$el.attr('data-url');

            that.data = {
                content 	: that.$content.val()
            };

            that.submit(that.$comment_btn);

            return false;
        });
        
        this.$press_enter_cb.click(function(e) {
            if(that.$press_enter_cb.parent().hasClass('checked')){
                that.$comment_btn.hide("slow");
            }else{
                that.$comment_btn.show("slow");
            }
        });
                
        this.$content.keypress(function(e){
            if(that.$press_enter_cb.parent().hasClass('checked') && e.which == 13){
                if ( that.$press_enter_cb.parent().hasClass('disabled') ){
                    e.preventDefault();

                    return false;
                }

                if(that.validate() == false){
                    return false;
                }

                that.url  = that.$el.attr('data-url');

                that.data = {
                    content   : that.$content.val()
                };

                that.submit(that.$press_enter_cb.parent());
                return false;
            }
        });
    };
    CommentForm.prototype.submit = function($button){
        var that = this;
        var promise = $.ajax({
            type: 'POST',
            url:  this.url,
            data: that.data,
            dataType: 'json'
        });

        this.triggerProgress($button, promise);

        promise.then(function(data) {
            if(data.success == 'ok'){
                that.$comments.push(data.comment);
                if(that.$comments.length > 10){
                    that.$comments.pop();
                }
                htmlOutput = $.tmpl( $('#item-template'), data.comment ).html();
                $('#add-more-item').before(htmlOutput);
                that.$content.val('');
                //Scroll to last post which have just been added
                list_comment.stop().animate({ 
                    scrollTop: $('#add-more-item').offset().top
                }, 1000);

                var comment_count = parseInt(that.$el.parent().find('.counter').html()) + 1;
                that.$el.parent().find('.counter').html( comment_count );

                var $curr_item = $('.open-comment.disabled').parents('.post');
				
                $('.open-comment.disabled').parent().find('d').html( comment_count );
                $curr_item.find('.open-comment').attr('data-comment-count', comment_count).find('d').html( comment_count );
                $curr_item.find('.post_header .post_cm d').html( comment_count );
                $curr_item.find(".view-list-user[data-view-type='comment']").html(comment_count);
                $('.comment-item .like-comment').each(function(){
                    new LikeCommentBtn($(this));			
                });

                jQuery(".timeago").timeago();
            }
        });
    };
    CommentForm.prototype.validate = function(){
        if(this.$content.val().length == 0){
            return false;
        }
    };
    CommentForm.prototype.triggerProgress = function($el, promise)
    {
        var $spinner = $('<i class="icon-spinner icon-spin"></i>');
        var f = function() {
            $el.removeClass('disabled');
            $spinner.remove();
        };

        $el.addClass('disabled').prepend($spinner);

        promise.then(f, f);
    };

    $(function(){
        $('.who-action .view-list-liker').each(function(){
            new UserListViewer($(this));
        });

        $('.like-post').each(function(){
            new LikePostBtn($(this));			
        });

        $('.open-comment').each(function(){
            new CommentBtn($(this));
        });

        var getComments = function () {
            list_comment.off('scroll');
            if(list_comment.scrollTop() == 0 && (((page + 1)*10 < $('.open-comment.disabled').attr('data-comment-count')) || ((page + 1)*10 - $('.open-comment.disabled').attr('data-comment-count') <= 10)) ) {
                page++;
                var data = {
                    'post_slug'	: comment_form.attr('data-post-id'),
                    'post_type' : comment_form.attr('data-post-type'),
                    'page'		: page
                }
                $.ajax({
                    type: 'POST',
                    url:  $('.open-comment.disabled').data('url'),
                    data: data,
                    dataType: 'json',
                    progress: function () {
                        $('.comment-body').prepend('<span class="loading"><i class="icon-spin icon-spinner"></i>Loading...</span>');
                    },
                    success: function (data) {
                        if(data.success == 'ok') {
                            var htmlOutput = '';
                            for (key in data.comments) {
                                htmlOutput += $.tmpl( $('#item-template'), data.comments[key] ).html();
                            }
                            $('.comment-body').find('.loading').remove();
                            $('.comment-body').prepend(htmlOutput);
                            jQuery(".timeago").timeago();
                        }
                    }
                });
            } 
            list_comment.on('scroll', function () {
                getComments();
            });
        }
        list_comment.on('scroll', function () {
            getComments();
        });

        $(document).bind('POST_BUTTON', function(e) {
            $('.like-post').each(function(){
                new LikePostBtn($(this));			
            });

            $('.open-comment').each(function(){
                new CommentBtn($(this));
            });
            
        });
    });
    
}(jQuery, document));