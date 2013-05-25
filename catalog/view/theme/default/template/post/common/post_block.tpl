{% block post_common_post_block %}
	<div class="post">
		<div class="row-fluid post_header">
			<div class="span2 avatar_thumb">
				<a href="#">
					<img src="{{ post.avatar }}" alt="user">
				</a>
			</div>
			<div class="span10">
				<div class="row-fluid">
					<div class="span8 post_user">
						<a href="#">{{ post.author }}</a>
					</div>
					<div class="span4 post_time">
						<i class="icon-time icon-2x"></i> 1 minute ago
					</div>
				</div>
				<h6 class="post_title">{{ post.title }}</h4>
			</div>
		</div>
		<div class="post_body">{{ post.content|raw }}</div>
		<div class="row-fluid post_footer">
			<div class="span10 post_action">
				<a href="#"><i class="icon-thumbs-up medium-icon"></i> Like</a>
				<a href="#"><i class="icon-comments medium-icon"></i> Comment</a>
			</div>
			<div class="span2">
				<a href="#"><i class="icon-eye-open medium-icon"></i> More</a>
			</div>
		</div>
	</div>
{% endblock %}

{% block post_common_post_block_javascript %}
{% endblock %}