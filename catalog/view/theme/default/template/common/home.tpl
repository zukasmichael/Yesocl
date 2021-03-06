{% extends '@template/default/template/common/layout.tpl' %}

{% use '@template/default/template/common/html_block.tpl' %}
{% use '@template/default/template/post/common/post_item_list.tpl' %}
{% use '@template/default/template/post/common/comment_post_list.tpl' %}

{% block title %}{% trans %}Home Feed{% endtrans %}{% endblock %}

{% block stylesheet %}
    <link href="{{ asset_css('home.css') }}" rel="stylesheet" media="screen" />
    {{ block('post_common_comment_post_list_style') }}
{% endblock %}

{% block body %}
	<div id="y-content" class="no-header-fixed">
		<div id="y-main-content" class="has-horizontal post-has-block">
		{% for branch in branches %}
			{% set posts = all_posts[branch.slug] %}
			{% if posts|length > 0 %}
		        {% set style = random([1, 2]) %}
	            {% set block_info = branch %}
	            {% set post_type = branch_type %}
	            {% set block_href = path('BranchCategories', {branch_slug: branch.slug}) %}
	            {{ block('post_common_post_item_list') }}
			{% endif %}
		{% endfor %}
		{% if fl_posts|length > 0 %}
			{% set style = random([1, 2]) %}
			{% set posts = fl_posts %}
            {% set block_info = {name: 'Follow Posts'|trans} %}
            {% set block_href = path('FollowPost') %}
            {% set post_type = user_type %}
            {{ block('post_common_post_item_list') }}
		{% endif %}
		</div>
	</div>
	{{ block('post_common_comment_post_list') }}
{% endblock %}

{% block template %}
    {{ block('post_common_comment_post_list_template') }}
{% endblock %}

{% block javascript %}
	{{ block('post_common_comment_post_list_javascript') }}
	
	{% if warning_active is defined %}
	<script type="text/javascript">
		bootbox.dialog({
			message: "{{warning_active}}",
			title: "Active warning !",
			buttons: {
				resend: {
					label: "Resend active email",
					className: "btn-primary js-resend-active-link",
					callback: function() {
					    var promise = $.ajax({
			                type: 'POST',
			                url:  yRouting.generate('ReActiveAccount'),
			                dataType: 'json'
			            });
			            var $el = $('.js-resend-active-link');
			            var $spinner = $('<i class="icon-spinner icon-spin"></i>');
				        var $old_icon = $el.find('i');
				        var f        = function() {
				            $spinner.remove();
				            $el.html($old_icon);
				        };

				        $el.addClass('disabled').html($spinner);

				        promise.then(f, f);

			            promise.then(function(data) { 
			                if(data.success == 'ok'){
			                	alert('Resend active link success!');
			                }
			            });
				  	}
				},
				success: {
					label: "Ok",
					className: "btn-primary"
				}
			}
		});
	</script>
	{% endif %}
{% endblock %}