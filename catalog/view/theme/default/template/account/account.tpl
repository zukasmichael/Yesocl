{% extends '@template/default/template/common/layout.tpl' %}

{% use '@template/default/template/post/common/form_status.tpl' %}
{% use '@template/default/template/post/common/post_block.tpl' %}
{% use '@template/default/template/post/common/post_comment.tpl' %}

{% block title %}{{ user_info.username }}{% endblock %}

{% block stylesheet %}
    {{ block('post_common_post_comment_style') }}
{% endblock %}

{% block body %}
<div id="y-content">
    <div id="y-main-content" class="has-horizontal">
        {{ block('post_common_form_status') }}

        {% for post in posts %}
            {{ block('post_common_post_block') }}
            {{ block('post_common_post_block') }}
            {{ block('post_common_post_block') }}
        {% endfor %}        
        
        {{ block('post_common_post_comment') }}
    </div>
</div>
{% endblock %}

{% block javascript %}
{{ block('post_common_post_comment_javascript') }}
{{ block('post_common_form_status_javascript') }}
{% endblock %}