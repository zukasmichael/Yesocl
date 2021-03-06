{% block common_news_item_add_edit %}
<div class="form-status upload-container">
	<div class="post_new drop-zone">
		<div class="row-fluid txt_editor">
			<textarea class="post_input mention" style="resize: none; min-height: 70px;" placeholder="{% trans %}What's in your mind{% endtrans %}? ..." maxlength="1000"></textarea>
			<input type="hidden" name="img-url" class="img-url" value="" />
		</div>
		<div class="img-previewer-container">
		</div>
		<div class="y-progress">
			<div class="bar" style="width: 0%;"></div>
		</div>
		<div class="post_tool">
			<div class="row-fluid">
				<div class="span8 post_new_control">
					<a id="insert-new-img" onclick="$('#img-upload').trigger('click'); return false;">
						<i class="icon-camera icon-2x"></i>							
					</a>
					<input type="file" data-no-uniform="true" class="img-upload" title="{% trans %}Choose image to upload{% endtrans %}" name="files[]" data-url="{{ path('UploadFile') }}" id="img-upload" />
					<a title="{% trans %}Advance post{% endtrans %}" data-bind="click: openAdvancePost">
						<i class="icon-external-link-sign icon-2x"></i>
					</a>
				</div>
				<div class="span4 text-right">
					<a class="btn btn-yes" data-bind="click: addStatus">{% trans %}Submit{% endtrans %}</a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="mfp-hide y-dlg-container form-advance" data-focus-type="input[type='text']" id="news-advance-post">
	<div class="y-dlg">
		<div class="dlg-title">
			<i class="icon-yes"></i> 
			<span>{% trans %}New post{% endtrans %}</span>
			<a title="Close" style="display: inline-block; float: right; margin-right: 10px;" data-bind="click: closeAdvancePost">X</a>
		</div>
		<div class="dlg-content">
			<div class="dlg-column upload-container fl" style="width:28%;">
				<label class="control-label">{% trans %}Choose an image for new post{% endtrans %}</label>
				<input type="hidden" name="img-url" class="img-url" value="" />
				<div class="img-previewer-container" placeholder="{% trans %}Drag an image here{% endtrans %}">
					<p class="drop-zone-show">{% trans %}Drag an image here{% endtrans %}</p>
				</div>
				<div class="y-progress">
					<div class="bar" style="width: 0%;"></div>
				</div>
				<div class="drag-img-upload">			    			
					<a class="btn btn-yes" onclick="$('#img-upload-adv').click() ; return false;">
						<span><i class="icon-upload"></i> {% trans %}Choose image{% endtrans %}</span>
					</a>
					<input type="file" data-no-uniform="true" id="img-upload-adv" class="img-upload" title="Choose image to upload" name="files[]" data-url="{{ path('UploadFile') }}" />
				</div>
			</div>
			<div class="dlg-column fr" style="width:68%;">
				<div class="alert alert-error top-warning hidden">{% trans %}Warning{% endtrans %}!!</div>
				<div class="control-group">
					<label for="title" class="control-label">{% trans %}Title{% endtrans %}</label>
					<div class="controls">
						<input placeholder="Your title" type="text" name="title" class="post-title-input" style="width: 98%;" />
					</div>
				</div>
				<div class="control-group">
					<label for="title" class="control-label">{% trans %}Stock tag{% endtrans %}</label>
					<div class="controls">
						<input type="hidden" multiple class="autocomplete-tag-input" data-bind="autoCompleteTag: true" style="width: 100%;"/>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">{% trans %}Content{% endtrans %}</label>
					<div class="y-editor" id="post-adv-editor" data-height="200" ></div>
				</div>
			</div>
		</div>
		<div class="dlg-footer">
			<div class="controls">
				<a class="btn btn-yes" data-bind="click: saveAdvancePost">{% trans %}Submit{% endtrans %}</a>
				<a class="btn btn-yes" data-bind="click: resetAdvancePost">{% trans %}Reset{% endtrans %}</a>
				<a class="btn btn-yes" data-bind="click: closeAdvancePost">{% trans %}Close{% endtrans %}</a>
			</div>
		</div>
	</div>
</div>
{% endblock %}

{% block common_news_item_add_edit_javascript %}
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.ui.widget.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.load-image.min.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.canvas-to-blob.min.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.iframe-transport.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.fileupload.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.fileupload-process.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.fileupload-image.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/jquery.fileupload-validate.js') }}"></script>
<script type="text/javascript" src="{{ asset_js('libs/upload/upload-app.js') }}"></script>
{% endblock %}