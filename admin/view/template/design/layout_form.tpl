<?php echo $header; ?>
<div id="content">
  <div class="breadcrumb">
    <?php foreach ($breadcrumbs as $breadcrumb) { ?>
    <?php echo $breadcrumb['separator']; ?><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a>
    <?php } ?>
  </div>
  <?php if ($error_warning) { ?>
  <div class="warning"><?php echo $error_warning; ?></div>
  <?php } ?>
  <div class="box">    
    <div class="heading">
      <span><img src="view/image/layout.png" alt="<?php echo $heading_title; ?>" /> <?php echo $heading_title; ?></span>
      <div class="buttons">
      	<a onclick="$('#form').submit();" class="btn btn-success"><?php echo $button_save; ?></a>
      	<a onclick="location = '<?php echo $cancel; ?>';" class="btn btn-danger"><?php echo $button_cancel; ?></a>
      </div>
    </div>
    <div class="content">
      <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form">
        <table class="form">
          <tr>
            <td><span class="required">*</span> <?php echo $entry_name; ?></td>
            <td><input class="input-xxlarge" required="required" type="text" name="name" value="<?php echo $name; ?>" />
            <?php if ($error_name) { ?>
              	<div class="alert alert-error">
        				  <strong>Error!</strong> <?php echo $error_name; ?>
        				</div>
            <?php } ?></td>
          </tr>
          <tr>
            <td><?php echo $entry_path; ?></td>
            <td><select name="path">
                <?php foreach ($paths as $data) { ?>
                <option <?php if ($data == $path){ ?>selected="selected"<?php } ?> value="<?php echo $data; ?>"><?php echo $data; ?></option>
                <?php } ?>
              </select></td>
          </tr>
          <tr>
            <td><?php echo $entry_action; ?></td>
            <td>
              <?php foreach ( $actions as $action ){ ?>
              <div class="controls">
                <label class="checkbox inline">
                  <input type="checkbox" name="actions[]" value="<?php echo $action['id']; ?>" <?php if ($action['checked'] == true){ ?>checked="checked"<?php } ?> />
                  <?php echo $action['name']; ?>
                </label>
              </div>
              <?php } ?>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</div>
<?php echo $footer; ?>