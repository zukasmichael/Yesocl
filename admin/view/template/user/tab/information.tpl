<table class="form">
	<tr>
    	<td><span class="required">*</span> <?php echo $entry_firstname; ?></td>
        <td><input required="required" type="text" name="user[meta][firstname]" value="<?php echo $firstname; ?>" />
        	<?php if ($error_firstname) { ?>
              	<div class="alert alert-error">
				  <strong>Error!</strong> <?php echo $error_firstname; ?>
				</div>
            <?php } ?>
        </td>
	</tr>
    <tr>
    	<td><span class="required">*</span> <?php echo $entry_lastname; ?></td>
        <td><input required="required" type="text" name="user[meta][lastname]" value="<?php echo $lastname; ?>" />
        	<?php if ($error_lastname) { ?>
              	<div class="alert alert-error">
				  <strong>Error!</strong> <?php echo $error_lastname; ?>
				</div>
            <?php } ?>
        </td>
	</tr>
    <tr>
        <td> Birthday:</td>
        <td><input class="input-medium" type="text" name="user[background][birthday]" value="" /></td>
    </tr>
    <tr>
        <td> Marital Status:</td>
        <td><select class="input-medium" name="user[background][maritalstatus]" >
            <option value="1">Yes</option>
            <option value="0">Not Yet</option>
        </select></td>
    </tr>
    <tr>
        <td> Country:</td>
        <td><input required="required" class="input-medium" type="text" name="user[meta][location][country]" value="" /></td>
        <input type="hidden" name="user[meta][location][country_id]" />
    </tr>
    <tr>
        <td> City:</td>
        <td><input required="required" class="input-medium" type="text" name="user[meta][location][city]" value="" /></td>
        <input type="hidden" name="user[meta][location][city]" />
    </tr>
    <tr>
        <td> Postal Code:</td>
        <td><input class="input-medium" type="text" name="user[meta][postalcode]" value="" /></td>
    </tr>
    <tr>
        <td> Industry:</td>
        <td><input required="required" class="input-medium" type="text" name="user[meta][industry]" value="" /></td>
    </tr>
    <tr>
        <td> Headingline:</td>
        <td><input class="input-xxlarge" type="text" name="user[background][interest]" value="" /></td>
    </tr>
    <tr>
        <td> Interest:</td>
        <td><input class="input-xxlarge" type="text" name="user[background][interest]" value="" /></td>
    </tr>
</table>