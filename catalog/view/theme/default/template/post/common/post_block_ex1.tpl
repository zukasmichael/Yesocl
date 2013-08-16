{% block post_common_post_block_ex1 %}
	{% set special = random([2, 3]) %}
	<div class="block-content">
    	<div class="column {% if special == 3 %}column-special bommer-column-special{% endif %}">
    		{% for post in posts|slice(0, 5) %}
			<div class="feed-container feed{{ loop.index }}">
				<div class="feed post post_in_block">
					<div class="post_header">
						<h4 class="post_title">
							<a href="#">{{ post.title }}</a>
							<div class="post_time">
								<i class="icon-calendar"></i> {{ post.created|date(date_format) }}
							</div>
						</h4>					
					</div>
					<div class="post_body">
						<div class="post_image">
							<img src="{{ post.image }}" alt="title">
						</div>
						<div class="post_text_raw">{{ post.description }}</div>	
					</div>
					<div class="hover post_overlay">
						<div class="post_virtual_overlay">							
						</div>
						<div class="post_overlay_wrapper">
							<div class="post_action">
								<a href="#" title="Like"><i class="icon-thumbs-up medium-icon"></i></a>
								<a href="#" title="Comment ({{ post.comment_count }})" class="open-comment" data-url="{{ post.href_status|raw }}" data-comment-count="0" data-post-id="{{ post.id }}" data-post-type="{{ post_type }}"><i class="icon-comments medium-icon"></i></a>
								<a href="#" title="View (1k)"><i class="icon-eye-open medium-icon"></i></a>
							</div>													
						</div>						
					</div>
				</div>   			
			</div>
			{% if loop.index % special == 0 and loop.index != 5 %}
			{% if special == 2 %}
				{% set special = 3 %}
			{% else %}
				{% set special = 6 %}
			{% endif %}
		</div>
		<div class="column {% if special == 3 %}column-special bommer-column-special{% endif %}">
			{% set special = 6 %}
			{% endif %}
			{% endfor %}
		</div>
	</div>
{% endblock %}