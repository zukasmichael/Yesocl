/*
	JS Utitlity Function
*/
function getActualLengthOfArray(obj) {
	var size = 0;
   	for (var i in obj) {
		if(obj[i] !== undefined) {
			size ++;
		}
	}
	return size;
}
if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

/*
	Create current User info
*/
function CurrentUser()
{
    var $curr_user_info = $('#current-user-info');
    this.slug = $curr_user_info.find('#current-user-slug');

    $curr_user_info.remove();
    
    this.getSlug = function()
    {
        return this.slug;
    }
}

var yCurrUser = new CurrentUser();

/*
	End JS Utitlity Function
*/
(function($, document, undefined) {

	jQuery.fn.makeScrollWithoutCalResize = function() {
	$(this).niceScroll();	
	}
	jQuery.fn.makeCustomScroll = function(isHonrizontal) {
		$(this).mCustomScrollbar({
			horizontalScroll: isHonrizontal, /*scroll horizontally: boolean*/
			scrollInertia:950, /*scrolling inertia: integer (milliseconds)*/
			mouseWheel:true, /*mousewheel support: boolean*/
			mouseWheelPixels:"auto", /*mousewheel pixels amount: integer, "auto"*/
			autoDraggerLength:true, /*auto-adjust scrollbar dragger length: boolean*/
			autoHideScrollbar:true, /*auto-hide scrollbar when idle*/
			scrollButtons:{ /*scroll buttons*/
				enable: false, /*scroll buttons support: boolean*/
				scrollType:"continuous", /*scroll buttons scrolling type: "continuous", "pixels"*/
				scrollSpeed:"auto", /*scroll buttons continuous scrolling speed: integer, "auto"*/
				scrollAmount:40 /*scroll buttons pixels scroll amount: integer (pixels)*/
			},
			advanced:{
				updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
				updateOnContentResize:true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/
				autoExpandHorizontalScroll:false, /*auto-expand width for horizontal scrolling: boolean*/
				autoScrollOnFocus:false, /*auto-scroll on focused elements: boolean*/
				normalizeMouseWheelDelta:false /*normalize mouse-wheel delta (-1/1)*/
			},
			contentTouchScroll:true, /*scrolling by touch-swipe content: boolean*/			
			theme:"light" /*"light", "dark", "light-2", "dark-2", "light-thick", "dark-thick", "light-thin", "dark-thin"*/
		});
	}
	jQuery.fn.makeEditor = function(heightCustom) {
		$(this).summernote({
			height: heightCustom,  
			focus: true,
  			toolbar: [
  				['tag', ['tag']],
			    ['style', ['style']],
			    ['style', ['bold', 'italic', 'underline', 'clear']],
			    //['fontsize', ['fontsize']],
			    //['color', ['color']],
			    ['para', ['ul', 'ol', 'paragraph']],
			    //['table', ['table']],
			    //['height', ['height']],
			    ['insert', ['picture', 'link']],		    
			    ['fullscreen', ['fullscreen']]
		  	]
		});	
	}

	/*
		Left sidebar
	*/
	function Sidebar(el){
		this.sidebarRoot = el.find("#y-sidebar");
		this.sidebarToggle = this.sidebarRoot.find("#sidebar-toggle");
		this.menuContainer = this.sidebarRoot.find(".sidebar-controls");
		this.searchCtrl	   = this.sidebarRoot.find("input#ss-keyword");
		this.closeSidebar  = this.sidebarRoot.find("#sidebar-close");		
		this.makeCustomVerticalScroll();
		this.attachEvents();
	}
	Sidebar.prototype.attachEvents = function(){
		var that = this;
		//Hide/show sidebar:
		that.sidebarRoot.hover(
			function() {
				that.sidebarToggle.stop().fadeOut(110);
				$(this).stop().animate( { left:'0px' }, 400, 'easeOutQuart');			
				setTimeout(function(){ 
					that.menuContainer.show(); 
				}, 50);
			},
			function() {				
				$(this).stop().animate( { left:'-370px'}, 400, 'easeOutQuart', function(){					
					that.menuContainer.hide();
				});
				setTimeout(function(){
					that.sidebarToggle.stop().fadeIn();
				}, 200);
			}
		);		
		//ESC to hide sidebar:
		that.sidebarRoot.keydown(function(e){
			if(e.which == 27){
				that.hideSidebar();
			}
		});
		//Close sidebar btn clicked:
		that.closeSidebar.click(function(){
			that.hideSidebar();
		});
		//Click content to hide sidebar:
		$("#y-header, #y-content, #y-footer").click(function(){
			that.hideSidebar();
		});
	}
	Sidebar.prototype.hideSidebar = function() {
		var that = this;
		if(parseInt(that.sidebarRoot.css('left')) == 0 ) {
			that.sidebarRoot.mouseleave();
			that.searchCtrl.val('');
			that.searchCtrl.blur();
		}
	}
	Sidebar.prototype.makeCustomVerticalScroll = function() {
		this.menuContainer.makeCustomScroll(false);
	}
	/* End Left Sidebar */
	/*
		Start Mention (Tag)
	*/
	function Tag(el) {
		this.$tagElement = el.find('.mention');
		this.attachEvents();
	}
	Tag.prototype.attachEvents = function() {
		var that = this;

		that.$tagElement.mentionsInput({
			onDataRequest:function (mode,currentMentionCollection,query,callback) {
				if ( window.yListFriends == null && is_send_ajax == 0 ){
					is_send_ajax = 1;
					$.getJSON(window.yRouting.generate('GetAllFriends'), function(json) {
						if ( json.success == 'ok' ){
							if ( json.friends == undefined ){
								is_send_ajax = 0;
							}
							window.yListFriends = json.friends;
							responseData = _.filter(window.yListFriends, function(item) { 
					       		return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 
					       	});
					       	callback.call(this, responseData);
						}
			      	});
				}else{
					data = _.filter(window.yListFriends, function(item) {
						if(currentMentionCollection !== undefined && currentMentionCollection.length > 0) {
							var checkExisted = _.filter(currentMentionCollection, function(tempItem){
								return (item.id === tempItem.id);
							});
							if(checkExisted.length > 0)
								return false;
						}					
						return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
					});
					callback.call(this, data);
				}
			},
			fullNameTrigger: true
	  	});
	}
	/*
		End Mention (Tag)
	*/
	/*
	Jquery effects
	*/
	function FlexibleElement(el) {
		this.main = el.find('#y-content');
		this.mainContent = el.find("#y-main-content");
		this.goLeftBtn = el.find('#auto-scroll-left');
		this.commentBox = el.find('#comment-box');
		this.linkPopupCommon = el.find('.link-popup');
		this.linkPopupImage = el.find('.img-link-popup');
		this.editor = el.find('.y-editor');
		this.attachEvents();
	}
	FlexibleElement.prototype.attachEvents = function() { 
		var that = this;
		//Tooltip:
		$('a[title]').each(function(){
			if($(this).hasClass('tooltip-bottom')) {
				$(this).tooltip({
						container: 'body', 
						placement: 'bottom'
					}
				);
			}else {
				$(this).tooltip({ container: 'body' });
			}
		})

		//Popup link:
		if(that.linkPopupImage.length > 0) {
			that.linkPopupImage.magnificPopup({type:'image'});	
		}
		that.linkPopupCommon.magnificPopup({
	    	type:'inline',
	    	midClick: true,
	    	removalDelay: 300,
			mainClass: 'mfp-fade',
			callbacks: {
				open: function() {
				    var src = $(that.linkPopupCommon.attr('data-mfp-src'));				    
				    var inputs = src.find('input[type="text"]').first();
				    if(inputs.length === 0) {
				    	inputs = src.find('textarea').first();
				    }
				    setTimeout(function(){
				    	inputs.focus();	    
				    }, 500);
			  	}
			}
	    });

	    //Editor:
	    that.editor.each(function() {
	    	$(this).makeEditor(250);
	    }); 

		//For show/hide GoLeft
		var maxScroll = that.mainContent.width() - that.main.width();
		var maxView = 2400 - that.main.width();
		that.main.scroll(function(e) { 
			if($(this).hasClass('scrolling')) {
				that.goLeftBtn.fadeOut(10);
				return;
			}
			var x = $(this).scrollLeft();
	    	var leftOffset = 0;
	    	var freeBlockFirst = $(this).find(".free-block:first-child");
	    	if(freeBlockFirst.length != 0 ){
	    		leftOffset = freeBlockFirst.width();
	    	}
	        if(x > leftOffset){
	        	that.goLeftBtn.fadeIn(500);
	        }
	        else {
	            that.goLeftBtn.fadeOut(300);
	        }
	        //Background move when scroll:	        
    		$(this).css('background-position', parseInt((-1)*x*maxView/maxScroll/10) + 'px 0px');
	    });
	    that.goLeftBtn.click(function(e){
	    	e.preventDefault();
	    	if(that.main.hasClass('scrolling')) return;
	    	that.main.addClass('scrolling');
			that.main.animate( { scrollLeft: 0 }, 1000, function(){
				$(this).removeClass('scrolling');
			});
	    });

	    //Demo alert, confirm, prompt, dialog:
	    var msgCallback = $("<div></div>").css(
	    	{
	    		'position': 'absolute',
	    		'right': '15px',
	    		'top': '60px',
	    		'background-color' : '#ddd',
	    		'color' : '#009B77',
	    		'padding' : '15px',
	    		'font-weight' : 'bold'
	    	}).hide().appendTo('body');
	    $(".y-alert").click(function(e) {
	        bootbox.alert("The post was delete successfully !", function() {
	        	msgCallback.html('Alert: ' + 'Alert callback').fadeIn(1000).delay(2000).fadeOut(300);
	        });
	    });
	    $(".y-confirm").click(function(e) {
	        bootbox.confirm("Are you sure you want to delete this post ?", function(result) {
	        	var text = "OK";
	        	if(!result){ text = "Cancel" }
	        	msgCallback.html('Confirm: ' + text).fadeIn(1000).delay(2000).fadeOut(300);
	        });
	    });
	    $(".y-prompt").click(function(e) {
	        bootbox.prompt("What is your name ?", function(result) { 
	          var text = "Prompt dismissed";
			  if (result !== null) {                                             
			    text = "Hi <b>"+result+"</b>";                       
			  }
			  msgCallback.html(text).fadeIn(1000).delay(2000).fadeOut(300);
			});
	    });
	    $(".y-dialog").click(function(e) {
	        bootbox.dialog({
				message: "I am a custom dialog",
				title: "Custom title",
				buttons: {
					danger: {
						  label: "Warning",
						  className: "btn-danger",
						  callback: function() {
						    msgCallback.html("Result: Warning").fadeIn(1000).delay(2000).fadeOut(300);
						  }
					},
					success: {
						  label: "Continute",
						  className: "btn-success",
						  callback: function() {
						    msgCallback.html("Result: Continute").fadeIn(1000).delay(2000).fadeOut(300);
						  }
					},				
					main: {
						  label: "Cancel",
						  className: "btn-primary",
						  callback: function() {
						    msgCallback.html("Result: Cancel").fadeIn(1000).delay(2000).fadeOut(300);
						  }
						}
					}
				});
	    });	    

	    //Comment box:
	    if(that.commentBox.length > 0) {
	    	that.commentBox.width(that.main.width()/3); 
	    	var expandBtn = that.commentBox.find('#btn-expand');
	    	var restoreBtn = that.commentBox.find('#btn-restore');
	    	expandBtn.fadeIn();
	    	restoreBtn.fadeOut();
	    	expandBtn.on('click', function(e){
	    		e.preventDefault();
	    		var me = $(this);
	    		if(me.hasClass('active')){
	    			return;
	    		}
	    		me.addClass('active');
	    		that.commentBox.animate({
	    			width: that.main.width()*2/3
	    		}, 300, function(){
	    			that.commentBox.find('.comment-meta').width(that.commentBox.width() - 97);
	    			expandBtn.fadeOut(100, function(){
	    				me.removeClass('active');
	    				restoreBtn.fadeIn(200);
	    			});
	    		});	    		
	    	});
	    	restoreBtn.on('click', function(e){
	    		e.preventDefault();
	    		var me = $(this);
	    		if(me.hasClass('active')){
	    			return;
	    		}
	    		me.addClass('active');
	    		that.commentBox.animate({
	    			width: that.main.width()/3
	    		}, 300, function(){
	    			that.commentBox.find('.comment-meta').width(that.commentBox.width() - 97);
	    			restoreBtn.fadeOut(100, function(){
	    				me.removeClass('active');
	    				expandBtn.fadeIn(200);
	    			});
	    		});
	    	});
	    }
	}

	/*
	Custom List Post
	*/
	var marginPost = 5;
	var marginPostPerColumn = 15;
	var marginBlock = 50;
	var minFirstColumn = 450;
	var minPostWidth = 400;
	var minPostStatusWidth = 420;
	var marginFriendBlockItem = 10;	
	var maxHeightBlock = 450;
	var df_POST_HAS_BLOCK = 'post-has-block';
	var df_POST_PER_COLUMN = 'post-per-column';
	var df_CATEGORY_SINGLE = 'post-category';
	var df_FRIEND_ACCOUNT = 'block-auto-floatleft';
	var df_SEARCH_PAGE 	= 'search-page';
	var df_NOTIFICATION_PAGE 	= 'notification-page';

	function HorizontalBlock(el) {
		if(el.length > 0){
			this.rootContent = $("#y-content");
			this.root = el;
			this.columns = el.find('.column');
			this.feeds = el.find('.feed');	
			this.heightMain =  el.height();
			this.widthMain = el.width();
			if(!this.rootContent.hasClass('no-scroll')) {
				this.initializeBlock();
			}
		}		
	}
	HorizontalBlock.prototype.initializeBlock = function() {
		if(this.root.hasClass(df_POST_HAS_BLOCK)) {
			this.blocks = this.root.find('.feed-block');
			this.blockContent = this.root.find('.block-content');				
			var heightBlockContent = this.heightMain - 42;
			var heightPost = (heightBlockContent - 2*marginPost)/2;
			var widthPost = this.widthMain*5/18 - 3*(marginPost + 2);
			if(widthPost < minPostWidth){
				widthPost = minPostWidth;
			}
			this.columns.width(widthPost);
			this.columns.css('margin-right', marginPost + 'px');
			this.columns.children('.feed-container').width(widthPost - 5);
			this.blockContent.height(heightBlockContent);		
			this.blocks.css('max-width', (widthPost + marginPost + 2 )*3 + 'px');
			this.blocks.css('margin-right', marginBlock + 'px');	
			var totalWithContent = 0;	
			this.blocks.each(function(index) {
				var blockFeed = new BlockFeed($(this), heightPost,widthPost);
				$(this).width(blockFeed.actualWidth);
				totalWithContent += ($(this).outerWidth() + marginBlock);
			});
			this.root.width(totalWithContent + 10);
			this.feeds.each(function() {
				$(this).parent('.feed-container').css('margin-bottom', marginPost + 'px');
				var hp = $(this).children('.post_header').first().outerHeight();
				var heightUpdated = $(this).height();
				$(this).children('.post_body').first().height(heightUpdated - hp - 20);
			});
			this.columns.css('opacity', '1');
			this.rootContent.niceScroll();
		}
		else if(this.root.hasClass(df_POST_PER_COLUMN)) {
			this.blocks = this.root.find('.feed-block');	
			this.freeBlock = this.root.find('.free-block');
			var totalWidth = 0;
			var heightBlockContent = this.heightMain - 42;
			if(heightBlockContent > maxHeightBlock) {
				var extraPadding = Math.floor((this.heightMain - maxHeightBlock)/2);
				this.rootContent.css({
					'padding-top': extraPadding + 'px',
					'padding-bottom': extraPadding + 'px'
				});
				this.heightMain -= 2*(extraPadding);
				heightBlockContent = maxHeightBlock;
			}			
			this.blocks.each(function(index) {			
				$(this).find('.block-content').height(heightBlockContent);
				var columnPerBlock = $(this).find('.column');
				var firstColumn = $(this).find('.column:first-child');
				var totalWidthOfColumns = 0;
				if(firstColumn.length > 0 && firstColumn.hasClass('has-new-post')){
					firstColumn.width(minFirstColumn);	
					firstColumn.css({ 
						'opacity':'1',
						'min-width': minFirstColumn + 'px',
						'margin-right': marginPostPerColumn + 'px'
					});
					totalWidthOfColumns = firstColumn.outerWidth() + marginPostPerColumn;
					columnPerBlock = $(this).find('.column').not(':first-child');
				}
				columnPerBlock.each(function() {
					$(this).width(minPostStatusWidth);
					var post = $(this).children('.post');
					var postHeader = post.children('.post_header');
					var postBody   = post.children('.post_body');
					var postTitle  = postBody.children('.post_title');
					var postImg    = postBody.children('.post_image');
					var postTextRaw = postBody.children('.post_text_raw');
					var imgInTextRaw = postTextRaw.find('img');
					post.height(heightBlockContent - 2*(marginPostPerColumn + 1));
					postBody.height(post.height() - postHeader.height() - 10 - 22);
					if(postTitle.length > 0){
						postImg.height(postBody.height()*0.6);
					}else {
						postImg.height(postBody.height()*0.7);
					}
					var maxHeightText = postBody.height() - postTitle.height() - postImg.height() - 15;
					postTextRaw.height(Math.floor(maxHeightText/20)*20);
					if(imgInTextRaw.length > 0) {
						imgInTextRaw.hide(10);
					}
					postTextRaw.truncate({
					    width: 'auto',
					    token: '&hellip;',
					    side: 'right',
					    multiline: true
					});
					$(this).css({
						'opacity':'1', 
						'min-width': minPostStatusWidth + 'px'
					});
					totalWidthOfColumns += $(this).outerWidth() + marginPostPerColumn;
				});
				totalWidth += totalWidthOfColumns;
			});
			this.freeBlock.css('margin-right', marginBlock);
			this.root.width(totalWidth == 0 ? this.widthMain : (totalWidth + this.freeBlock.outerWidth() + marginBlock));
			this.rootContent.niceScroll();
		}
		else if(this.root.hasClass(df_CATEGORY_SINGLE)) {
			this.blocks = this.root.find('.feed-block');	
			this.blockContent = this.root.find('.block-content');				
			var heightBlockContent = this.heightMain - 42;
			var heightPost = (heightBlockContent - 2*marginPost)/2;
			var widthPost = this.widthMain*5/18 - 3*(marginPost + 2);
			if(widthPost < minPostWidth){
				widthPost = minPostWidth;
			}
			this.columns.width(widthPost);
			this.columns.css('margin-right', marginPost + 'px');
			this.columns.children('.feed-container').width(widthPost - 5);
			this.blockContent.height(heightBlockContent);
			this.blocks.css('max-width', (widthPost + marginPost + 2 )*3 + 'px');
			var totalWithContent = 0;
			this.blocks.each(function(index) {
				if(index != 0) {
					$(this).find('.block-header').css('visibility','hidden');
				}
				var blockFeed = new BlockFeed($(this), heightPost,widthPost);
				totalWithContent += $(this).outerWidth();	
			});
			this.root.width(totalWithContent + 10);
			this.feeds.each(function() {
				$(this).parent('.feed-container').css('margin-bottom', marginPost + 'px');
				var hp = $(this).children('.post_header').first().outerHeight();
				var heightUpdated = $(this).height();
				$(this).children('.post_body').first().height(heightUpdated - hp - 20);
			});
			this.columns.css('opacity', '1');
			this.rootContent.niceScroll();
		}
		else if(this.root.hasClass(df_FRIEND_ACCOUNT)) {
			var widthBlockItem = parseInt(this.root.data('block-width'));
			var heightBlockItem = parseInt(this.root.data('block-height'));
			var heightBlockContent = this.heightMain - 42;
			var totalWidth = 0;
			var numberRow = Math.floor(heightBlockContent/(heightBlockItem + marginFriendBlockItem));
			var listBlockItem = this.root.find('.block-content-item');
			if(listBlockItem.length == 0) {
				this.root.css('min-width', '500px');
			}else {
				var freeBlock = this.root.find('.free-block');
				var blockContent = this.root.find('.feed-block');
				var numberCol = Math.floor(listBlockItem.length/numberRow) + 1;
				if(freeBlock.length === 0){
					this.root.width(numberCol*(widthBlockItem + marginFriendBlockItem));	
				}else{
					blockContent.width(numberCol*(widthBlockItem + marginFriendBlockItem));
					this.root.width(freeBlock.width() + 60 + numberCol*(widthBlockItem + marginFriendBlockItem));	
				}
				if(this.root.hasClass('full-width')){
					this.rootContent.css('right','0px');
				}else {
					this.rootContent.css('right','220px');
				}
				listBlockItem.css('opacity','1');
			}
			this.rootContent.niceScroll();
		}
		else if(this.root.hasClass(df_SEARCH_PAGE)){
			this.root.css('min-width', this.widthMain + 'px');
			var heightBlockContent = this.heightMain - 42;
			this.root.find('.block-content').height(heightBlockContent - 5);
			this.columns.height(heightBlockContent - 20).css('opacity', '1');
			this.columns.find('.search-result-container').each(function(){
				var firstItem = $(this).find('.data-detail').first();
				var friendItem = $(this).find('.friend-item').first();
				var maxContentWidth = 250;
				if(firstItem.length > 0) {
					maxContentWidth = Math.floor(firstItem.width() - 60 - 20);
				}else if(friendItem.length > 0) {
					maxContentWidth = Math.floor(friendItem.width() - 60 - 20);
				}
				$(this).find('.data-meta-info').css('max-width', maxContentWidth + 'px');
				$(this).find('.friend-info').css('max-width', maxContentWidth + 'px');
				$(this).makeCustomScroll(false);
			});
			this.rootContent.niceScroll();
		}else if(this.root.hasClass(df_NOTIFICATION_PAGE)){
			this.root.css('min-width', this.widthMain + 'px');
			var heightBlockContent = this.heightMain - 42;
			this.root.find('.block-content').height(heightBlockContent - 5);			
			var ntfContainer = this.root.find('.ntf-container');
			ntfContainer.height(heightBlockContent - 5 - 20);
			ntfContainer.css('opacity', '1');
			setTimeout(function(){				
				ntfContainer.niceScroll();
			}, 200);	
		}
		
	}
	function BlockFeed(block, heightAverPost, widthAverPost) {
		this.blockEle = block;
		this.listFeed = block.find('.feed-container');
		this.numberFeed = block.find('.feed').length;
		this.columns = block.find('.column');
		this.heightAverPost = heightAverPost;
		this.widthAverPost = widthAverPost;
		this.actualWidth = 0;
		this.putFeed();
	}
	BlockFeed.prototype.putFeed = function() {
		this.listFeed.height(this.heightAverPost - 2);
		if(this.numberFeed == 5) {
			this.blockEle.find('.column-special .feed-container:nth-child(1)').width(2*(this.widthAverPost) + marginPost - 5);
			this.blockEle.find('.column-special .feed-container:nth-child(1)').addClass('post-bigger');
			this.blockEle.find('.column-special .feed-container:nth-child(1)').parent('.column').width(2*(this.widthAverPost) + marginPost);
			this.blockEle.find('.column-special .feed-container:nth-child(2)').width(this.widthAverPost - 2).css( {'float': 'left', 'margin-right': '5px'});
			this.blockEle.find('.column-special .feed-container:nth-child(3)').width(this.widthAverPost - 5).css('float', 'left');	
		}else {
			var specialColumn = this.blockEle.find('.column-special'); 
			var heightFirst = this.heightAverPost*4/3;
			var heightLast = this.heightAverPost*2 - heightFirst - 4;
			specialColumn.each(function(index) {
				if($(this).children('.feed-container').length ==1)  { 
					$(this).children('.feed-container').height(heightFirst);
					$(this).children('.feed-container').addClass('post-special');	
				}else {
					$(this).children('.feed-container:first-child').height(heightFirst);
					$(this).children('.feed-container:first-child').addClass('post-special');
					$(this).children('.feed-container:last-child').height(heightLast);
					$(this).children('.feed-container:last-child').addClass('post-weak');
				}			
			});
		}
		var widthColumn = 0;
		this.columns.each(function(){
			if($(this).children().length > 0){
				widthColumn += $(this).outerWidth() + marginPost;	
			}
		});
		this.actualWidth = widthColumn;
	}

	/*
	End Custom List Post
	*/
	$(document).ready(function() {
		new HorizontalBlock($('.has-horizontal'));
		new FlexibleElement($(this));
		new Sidebar($(this));
		new Tag($(this));
		$(".timeago").timeago();
	});
}(jQuery, document));