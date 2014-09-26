
(function($, ko, window, Y, undefined) {
	'use strict';

	Y.Widgets.PostList = function(options, ele){
		var self = this;

		/* ============= START PROPERTIES ================== */
		self.uniqueName = "YES_POST_LIST";
		self.canLoadMore = ko.observable(options.canLoadMore || false);
		self.canPostNew = ko.observable(options.canPostNew || false);
		self.apiUrls = options.apiUrls || {};

		self.isLoadSuccess = ko.observable(false);
		self.isLoadingMore = ko.observable(false);

		self.currentPage = ko.observable(1);
		self.postList = ko.observableArray([]);

		/*  ============= END PROPERTIES ==================== */

		/* ============= START PUBLIC METHODS ============== */
		this.loadMore = function(){
			if(!self.canLoadMore() || self.isLoadingMore()) return;

			self.isLoadingMore(true);
			self.currentPage(self.currentPage() + 1);
			_loadPost(function(data){
				self.isLoadingMore(false);
			});
		};
		/* ============= END PUBLIC METHODS ================ */

		/* ============= START PRIVATE METHODS ============= */
		function _loadPost(callback){
			var loadOptions = self.apiUrls.loadPost;
			loadOptions.page = self.currentPage();
			var ajaxOptions = {
				url: Y.Routing.generate(loadOptions.name, loadOptions.params),
				data : {
					limit : 5
				}
			};
			var successCallback = function(data){
				if(data.success === "ok"){
					ko.utils.arrayForEach(data.posts, function(p){
						var postItem = new Y.Models.PostModel(p);
						self.postList.push(postItem);
					});
					if(data.canLoadMore !== undefined) {
						self.canLoadMore(data.canLoadMore);
					}
				}
				self.isLoadSuccess(true);
				_handleEffects();

				if(callback && typeof callback === "function"){
					callback(data);
				}
			}
			//Call common ajax Call:
			Y.Utils.ajaxCall(ajaxOptions, null, successCallback, null);
		}

		function _handleEffects() {
			$(window).trigger('gridalicious-loaded');
		}

		_loadPost();

		/* ============= END PRIVATE METHODS =============== */
	};

}(jQuery, ko, window, YesGlobal));