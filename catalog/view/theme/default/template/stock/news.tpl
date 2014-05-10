{% extends '@template/default/template/common/layout.tpl' %}
{% use '@template/default/template/stock/common/block_news.tpl' %}
{% use '@template/default/template/common/ko_template_block.tpl' %}

{% block title %}{{ heading_title }}{% endblock %}
{% block stylesheet %}    
{{ block('common_ko_template_style') }}
{% endblock %}

{% block body %}
<div id="y-content">
    <div id="y-main-content" class="has-horizontal stock-page" style="min-width: inherit; display: inline-block;">
        {{ block('stock_common_block_news') }}
        {{ block('common_ko_template_comment') }}
        {{ block('common_ko_template_user_box') }}
    </div>
</div>
{% endblock %}

{% block javascript %}	
	<script type="text/javascript" src="{{ asset_js('market.js') }}"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			var newsOptions = {
				Id : "stock-news",
				canLoadMore: true,
				stockCode : "BCE"
			};
			var commentBoxOptions = {
				Id : "comment-box"
			};
			var userBoxOptions = {
			};

			var viewModel = {
				newsModel : new NewsViewModel(newsOptions),
				commentBoxModel : new CommentBoxViewModel(commentBoxOptions),
				userBoxModel : new UserBoxViewModel(userBoxOptions)
			};
			ko.applyBindings(viewModel, document.getElementById('y-main-content'));
		});
	</script>	

{% endblock %}