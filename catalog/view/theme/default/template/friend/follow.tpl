{% extends '@template/default/template/common/layout.tpl' %}

{% use '@template/default/template/account/common/profile_column.tpl' %}
{% use '@template/default/template/common/user_block/user_item.tpl' %}
{% use '@template/default/template/common/user_block/user_filter.tpl' %}
{% use '@template/default/template/common/user_block/user_button.tpl' %}

{% block title %}{{ users[current_user_id].username }} | {% trans %}Follow Page{% endtrans %} {% endblock %}

{% block stylesheet %}
{% endblock %}

{% block body %}
<div id="y-content">
    <div id="y-main-content" data-block-width="380" data-block-height="90" class="has-horizontal block-auto-floatleft">
        {% if current_user_id != get_current_user().id %}
            {% set user = users[current_user_id] %}
            {{ block('account_common_profile_column') }}
        {% endif %}
        <div class="feed-block">
            <div class="block-header">
                <a class="block-title fl" href="#">{% trans %}Follow{% endtrans %}</a>  
                <a class="block-seemore fl" href="#"> 
                    <i class="icon-angle-right"></i>
                </a>
            </div>
            <div class="block-content user-container">
                {% if following_ids|length > 0 or followed_ids|length > 0 %}
                    {% for follower_id in following_ids %}
                        {% set friend = users[follower_id] %}
                        {% set class = 'following' %}
                        {{ block('common_user_block_user_item') }}
                    {% endfor %}
                    {% for follower_id in followed_ids %}
                        {% set friend = users[follower_id] %}
                        {% set class = 'followed' %}
                        {{ block('common_user_block_user_item') }}
                    {% endfor %}
                {% else %}
                    <div class="empty-data">
                        {% trans %}No follows found{% endtrans %}
                    </div>
                {% endif %}
                {{ block('common_user_block_user_button_template') }}        
            </div>
        </div>
        {% set friend_count = follower_ids|length %}
        {% set user = users[current_user_id] %}
        {% set is_follow = true %}
        {{ block('common_user_block_user_filter') }}
    </div>
</div>
{% endblock %}

{% block javascript %}
    {% set isRemove = 'false' %}
    {{ block('common_user_block_user_item_javascript') }}
{% endblock %}