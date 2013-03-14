		<table class="form">
		  <tr>
		  	<td style="width: 40%;"><b><?php echo $text_title; ?></b></td>
		  	<td><b><?php echo $text_url; ?></b></td>
		  	<td><b><?php echo $text_delete; ?></b></td>
		  </tr>
		  <tr>
            <td><select class="input-medium" name="title-type"><?php foreach($title_types as $title_type) { ?><option value="<?php echo $title_type['code']; ?>"><?php echo $title_type['text']; ?></option><?php } ?></select>  <input class="title input-medium" style="display: none;" type="text" name="user[websites][0][title]" value="" /></td>
            <td><input class="url input-large" type="text" name="user[websites][0][url]" value="" /></td>
            <td><a class="btn-remove-website btn btn-danger"><i class="icon-trash"></i></a></td>
          </tr>
          <tr class="index-add-website"></tr>
		</table>
		
<a class="btn-add-website btn btn-success"><?php echo $button_add_website; ?><i class="icon-plus"></i></a>

<script>
	var website_length = 1;
	$(document).ready(function(){
		$('#tab-website').on('click', '.btn-add-website', function(){

			var html = '<tr>';
			html += '<td><select class="input-medium" name="title-type"><?php foreach($title_types as $title_type) { ?><option value="<?php echo $title_type['code']; ?>"><?php echo $title_type['text']; ?></option><?php } ?></select>  <input class="title input-medium" style="display: none;" type="text" name="user[websites][' + website_length + '][title]" value="" /></td>';
            html += '<td><input class="url input-large" type="text" name="user[websites][' + website_length + '][url]" value="" /></td>';
            html += '<td><a class="btn-remove-website btn btn-danger"><i class="icon-trash"></i></a></td>';
            html += '</tr>';

			$('.index-add-website').before( html );

			website_length++; 
		});

		$('#tab-website').on('click', '.btn-remove-website', function(){
			$(this).parent().parent().remove();
		});

		$('#tab-website').on('change', 'select[name=\'title-type\']', function() {
			if ($(this).val() == 'other') {
				$(this).parent().find('.title:hidden').toggle();
			}else {
				$(this).parent().find('.title').val($(this).val());
				$(this).parent().find('.title').css('display', 'none');
			}
		});
	});
</script>