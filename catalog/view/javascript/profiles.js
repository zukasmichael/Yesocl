function Profiles($element) {
	this.self = $element;
	this.information = new TabsInformation($element.find('#profiles-tabs-information'), $element.height()*9/10);
	this.background = new TabsBackground($element.find('#profiles-tabs-background'), this.information.self.width(), $element.height()*9/10);

	this.afterCreate();
}

Profiles.prototype.afterCreate = function () {
	this.self.width(this.information.self.outerWidth() + this.background.self.outerWidth() + 25*2);
}

function TabsInformation($element, contentHeight) {
	this.self = $element;

	this.contentHeight = contentHeight;
	this.header = $element.find('.profiles-tabs-header');
	this.mainBody = $element.find('.profiles-tabs-main-body');
	this.afterCreate();

	this.btnEdit = $element.find('.profiles-btn-edit');

	this.attachEvents();
}

TabsInformation.prototype.afterCreate = function () {
	this.mainBody.height(this.contentHeight - this.header.height() - 30);
	this.mainBody.niceScroll();
}

TabsInformation.prototype.attachEvents = function () {
	var self = this;

	this.btnEdit.click(function () {
		if ( self.btnEdit.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );
		
		var item = self.self.find( '.basic-profiles-item' );

		var data = {
			'url': item.data('url'),
			'username': item.data('username'),
			'firstname': item.data('firstname'),
			'lastname': item.data('lastname'),
			'fullname': item.data('fullname'),
			'emails': item.data('emails'),
			'emails_js': JSON.stringify(item.data('emails')),
			'phones': item.data('phones'),
			'phones_js': JSON.stringify(item.data('phones')),
			'sex': item.data('sex'),
			'sext': item.data('sext'),
			'birthday': item.data('birthday'),
			'birthdayt': item.data('birthdayt'),
			'address': item.data('address'),
			'location': item.data('location'),
			'industry': item.data('industry')
		}
		
		var $form = $.tmpl( $('#profiles-form'), data );
		new ProfilesForm( $form );

		item.toggle();
		item.after( $form );
		item.remove();
	});
}

function ProfilesForm( $element ) {
	this.self = $element;
	this.btnSave = $element.find('.profiles-btn-save');
	this.btnCancel = $element.find('.profiles-btn-cancel');
	this.btnAddPhone = $element.find('.phones-btn-add');

	this.attachEvents();
}

ProfilesForm.prototype.attachEvents = function () {
	var self = this;

	this.self.find('select[name=\"sex\"]').val( this.self.data('sex') ).prop('selected',true);

	this.btnSave.click( function () {
		if ( self.btnSave.hasClass( 'disabled' ) ) {
			return false;
		}

		var phones_arr = [];
		var i = 0;
		self.self.find('.phones-form').each( function () {
			phones_arr[i] = {};
			phones_arr[i].phone = $(this).find('input').val();
			phones_arr[i].type = $(this).find('select').val();
			i++;
		});

		var data = {
			'username': self.self.find('[name=\"username\"]').val(),
			'firstname': self.self.find('[name=\"firstname\"]').val(),
			'lastname': self.self.find('[name=\"lastname\"]').val(),
			'email': self.self.find('[name=\"email\"]').val(),
			'phones': phones_arr,
			'sex': self.self.find('[name=\"sex\"]').val(),
			'birthday': self.self.find('[name=\"birthday\"]').val(),
			'address': self.self.find('[name=\"address\"]').val(),
			'location': self.self.find('[name=\"location\"]').val(),
			'industry': self.self.find('[name=\"industry\"]').val()
		};

		$.ajax({
			type: 'POST',
			url: self.self.data('url'),
			data: data,
			dataType: 'json',
			success: function (json) {
				if ( json.message == 'success' ) {
					var $item = $.tmpl($('#profiles-item'), json);
					new ProfilesItem($item);

					self.self.toggle();
					self.self.after($item);
					self.self.remove();

					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function(xhr, error){
		    	alert(xhr.responseText);
		 	}
		});
	} );

	this.btnCancel.click( function () {
		var data = {
			'url': self.self.data('url'),
			'username': self.self.data('username'),
			'firstname': self.self.data('firstname'),
			'lastname': self.self.data('lastname'),
			'fullname': self.self.data('fullname'),
			'emails': self.self.data('emails'),
			'emails_js': JSON.stringify(self.self.data('emails')),
			'phones': self.self.data('phones'),
			'phones_js': JSON.stringify(self.self.data('phones')),
			'sex': self.self.data('sex'),
			'sext': self.self.data('sext'),
			'birthday': self.self.data('birthday'),
			'birthdayt': self.self.data('birthdayt'),
			'address': self.self.data('address'),
			'location': self.self.data('location'),
			'industry': self.self.data('industry')
		}

		var $item = $.tmpl($('#profiles-item'), data);
		new ProfilesItem($item);

		self.self.toggle();
		self.self.after($item);
		self.self.remove();

		$('.profiles-btn-edit').removeClass( 'disabled' );
		$('.profiles-btn-add').removeClass( 'disabled' );
		$('.profiles-btn-remove').removeClass( 'disabled' );
	} );

	this.btnAddPhone.click( function () {
		var data = {
			'index': $(this).data('index')
		}

		var $form = $.tmpl( $('#profiles-phone-form'), data);
		new PhonesForm( $form );

		//$(this).attr('data-index', data.index + 1);
		$(this).parent().before( $form );
	});

	self.self.find('.phones-form').each( function () {
		new PhonesForm( $(this) );
	});
}

function PhonesForm( $element ) {
	this.self = $element;
	this.btnRemove = $element.find('.phones-btn-remove');

	this.attachEvents();
}

PhonesForm.prototype.attachEvents = function () {
	var self = this;

	this.self.find('select').val( self.self.data('type') ).prop('selected',true);

	this.btnRemove.click( function () {
		self.self.remove();
	});
}

function ProfilesItem( $element ) {
	this.self = this;
}

function TabsBackground($element, contentWidth, contentHeight) {
	this.self = $element;
	this.header = $element.find('.profiles-tabs-header');
	this.sumary = new TabsBackgroundSumary($element.find('#profiles-tabs-background-sumary'), contentWidth, contentHeight - this.header.height() - 30);
	this.experience = new TabsBackgroundExperience($element.find('#profiles-tabs-background-experience'), contentWidth, contentHeight - this.header.height() - 30);
	this.skill = new TabsBackgroundSkill($element.find('#profiles-tabs-background-skill'), contentWidth, contentHeight - this.header.height() - 30);
	this.education = new TabsBackgroundEducation($element.find('#profiles-tabs-background-education'), contentWidth, contentHeight - this.header.height() - 30);

	this.afterCreate();
}

TabsBackground.prototype.afterCreate = function () {
	this.self.width((this.sumary.self.outerWidth() + 25)*4 - 25);
}

function TabsBackgroundSumary($element, contentWidth, contentHeight) {
	this.self = $element;
	this.contentWidth = contentWidth;
	this.contentHeight = contentHeight;
	this.mainBody = $element.find('.profiles-tabs-main-body');
	this.afterCreate();

	this.btnEdit = $element.find('.profiles-btn-edit');
	this.btnCancel = $element.find('.profiles-btn-cancel');
	this.btnSave = $element.find('.profiles-btn-save');
	this.inputSumary = $element.find('.background-input-sumary');

	this.attachEvents();
}

TabsBackgroundSumary.prototype.afterCreate = function () {
	this.self.outerWidth(this.contentWidth);
	this.mainBody.outerHeight(this.contentHeight);
	this.mainBody.niceScroll();
}

TabsBackgroundSumary.prototype.attachEvents = function () {
	var self = this;

	this.btnEdit.click(function () {
		if ( self.btnEdit.hasClass( 'disabled' ) ) {
			return false;
		}
		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		self.btnEdit.toggle();
		self.btnCancel.toggle();
		self.btnSave.toggle();
		self.inputSumary.toggle();

		var data = { 
			'sumary': self.inputSumary.data('sumary') 
		};

		self.mainBody.append($.tmpl($('#background-sumary-form'), data));
		$('textarea[name=\"sumary\"]').niceScroll();
	});

	this.btnCancel.click(function () {
		self.btnCancel.toggle();
		self.btnSave.toggle();
		self.btnEdit.toggle();
		$('textarea[name=\"sumary\"]').remove();
		self.inputSumary.toggle();
		$('.profiles-btn-edit').removeClass( 'disabled' );
		$('.profiles-btn-add').removeClass( 'disabled' );
		$('.profiles-btn-remove').removeClass( 'disabled' );
	})

	this.btnSave.click(function () {
		var data = {
			'sumary': self.mainBody.find('[name=\"sumary\"]').val()
		};
		$.ajax({
			type: 'POST',
			url: self.self.data('url'),
			data: data,
			dataType: 'json',
			success: function (json) {
				if ( json.message == 'success' ) {
					self.btnCancel.toggle();
					self.btnSave.toggle();
					self.btnEdit.toggle();
					$('textarea[name=\"sumary\"]').remove();
					self.inputSumary.html(data.sumary);
					self.inputSumary.toggle();
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function(xhr, error){
		    	alert(xhr.responseText);
		 	}
		});
	})
}

function TabsBackgroundEducation($element, contentWidth, contentHeight) {
	this.self = $element;
	this.mainBody = $element.find('.profiles-tabs-main-body');
	this.contentWidth = contentWidth;
	this.contentHeight = contentHeight;
	this.afterCreate();

	this.btnAdd = $element.find('.profiles-btn-add');
	this.items = $element.find('.profiles-tabs-item1');

	this.attachEvents();
}

TabsBackgroundEducation.prototype.afterCreate = function () {
	this.self.outerWidth(this.contentWidth);
	this.mainBody.outerHeight(this.contentHeight);
	this.mainBody.niceScroll();
}

TabsBackgroundEducation.prototype.attachEvents = function () {
	var self = this;

	this.items.each( function () {
		new EducationItem($(this));
	})

	this.btnAdd.click(function () {
		if ( self.btnAdd.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'url': self.self.data('url'),
			'id': '',
			'started': (new Date()).getFullYear(),
			'ended': (new Date()).getFullYear(),
			'degree': '',
			'school': '',
			'fieldofstudy': '',
		}

		var $form = $.tmpl($('#background-education-form'), data);
		new FormAddEducation($form);

		self.mainBody.prepend($form);
	});
}

function FormAddEducation($element) {
	this.self = $element;
	this.btnSave = $element.find('.profiles-btn-save');
	this.btnCancel = $element.find('.profiles-btn-cancel');

	this.attachEvents();
}

FormAddEducation.prototype.attachEvents = function () {
	var self = this;

	this.self.find('select[name=\"started\"]').val( this.self.data('started') ).prop('selected',true);
	this.self.find('select[name=\"ended\"]').val( this.self.data('ended') ).prop('selected',true);

	this.btnSave.click( function () {
		if ( self.btnSave.hasClass( 'disabled' ) ) {
			return false;
		}

		var data = {
			'id': self.self.data('id'),
			'started': self.self.find('[name=\"started\"]').val(),
			'ended': self.self.find('[name=\"ended\"]').val(),
			'degree': self.self.find('input[name=\"degree\"]').val(),
			'school': self.self.find('input[name=\"school\"]').val(),
			'fieldofstudy': self.self.find('input[name=\"fieldofstudy\"]').val()
		};

		$.ajax({
			type: 'POST',
			url: self.self.data('url'),
			data: data,
			dataType: 'json',
			success: function (json) {
				if ( json.message == 'success' ) {
					var $item = $.tmpl($('#background-education-item'), json);
					new EducationItem($item);
					self.self.toggle();
					if ( self.self.data('id') == '' ) {
						self.self.parent().append($item);
					}else {
						self.self.after($item);
					}
					self.self.remove();
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function(xhr, error){
		    	alert(xhr.responseText);
		 	}
		});
	} );

	this.btnCancel.click( function () {
		var data = {
			'id': self.self.data('id'),
			'url': self.self.data('url'),
			'remove': self.self.data('remove'),
			'started': self.self.data('started'),
			'ended': self.self.data('ended'),
			'degree': self.self.data('degree'),
			'school': self.self.data('school'),
			'fieldofstudy': self.self.data('fieldofstudy')
		}

		if ( self.self.data('id') != '' ) {
			var $item = $.tmpl($('#background-education-item'), data);
			new EducationItem($item);
			self.self.toggle();
			self.self.after($item);
		}

		self.self.remove();

		$('.profiles-btn-edit').removeClass( 'disabled' );
		$('.profiles-btn-add').removeClass( 'disabled' );
		$('.profiles-btn-remove').removeClass( 'disabled' );
	} );
}

function EducationItem($element) {
	this.self = $element;
	this.btnSave = $element.find('.profiles-btn-save');
	this.btnCancel = $element.find('.profiles-btn-cancel');
	this.btnEdit = $element.find('.profiles-btn-edit');
	this.btnRemove = $element.find('.profiles-btn-remove');

	this.attachEvents();
}

EducationItem.prototype.attachEvents = function () {
	var self = this;

	this.btnEdit.click( function () {
		if ( self.btnEdit.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'id': self.self.data('id'),
			'url': self.self.data('url'),
			'remove': self.self.data('remove'),
			'started': self.self.data('started'),
			'ended': self.self.data('ended'),
			'degree': self.self.data('degree'),
			'school': self.self.data('school'),
			'fieldofstudy': self.self.data('fieldofstudy')
		}

		var $form = $.tmpl($('#background-education-form'), data);
		new FormAddEducation($form);

		self.self.toggle();
		self.self.after($form);
		self.self.remove();
	});

	this.btnRemove.click( function () {
		if ( self.btnRemove.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'id': self.self.data('id')
		};

		$.ajax({
			type: 'POST',
			url: self.self.data('remove'),
			data: data,
			dataType: 'json',
			success: function (json) {
				if ( json.message == 'success' ) {
					self.self.remove();
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function(xhr, error){
		    	alert(xhr.responseText);
		 	}
		});
	});
}

function TabsBackgroundExperience($element, contentWidth, contentHeight) {
	this.self = $element;
	this.mainBody = $element.find('.profiles-tabs-main-body');
	this.contentWidth = contentWidth;
	this.contentHeight = contentHeight;
	this.afterCreate();

	this.btnAdd = $element.find('.profiles-btn-add');
	this.items = $element.find('.profiles-tabs-item1');

	this.attachEvents();
}

TabsBackgroundExperience.prototype.afterCreate = function () {
	this.self.outerWidth(this.contentWidth);
	this.mainBody.outerHeight(this.contentHeight);
	this.mainBody.niceScroll();
}

TabsBackgroundExperience.prototype.attachEvents = function () {
	var self = this;

	this.items.each( function () {
		new ExperienceItem($(this));
	})

	this.btnAdd.click(function () {
		if ( self.btnAdd.hasClass( 'disabled' ) ) {
			return false;
		}
		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'url': self.self.data('url'),
			'id': '',
			'started_month': 1,
			'ended_month': 1,
			'started_year': (new Date()).getFullYear(),
			'ended_year': (new Date()).getFullYear(),
			'started_text': 'January ' + (new Date()).getFullYear(),
			'ended_text': 'January ' + (new Date()).getFullYear(),
			'title': '',
			'company': '',
			'location': '',
		}

		var $form = $.tmpl($('#background-experience-form'), data);
		new FormAddExperience($form);

		self.mainBody.prepend($form);
	});
}

function FormAddExperience($element) {
	this.self = $element;
	this.btnSave = $element.find('.profiles-btn-save');
	this.btnCancel = $element.find('.profiles-btn-cancel');

	this.attachEvents();
}

FormAddExperience.prototype.attachEvents = function () {
	var self = this;

	this.self.find('select[name=\"started_month\"]').val( this.self.data('startedm') ).prop('selected',true);
	this.self.find('select[name=\"ended_month\"]').val( this.self.data('endedm') ).prop('selected',true);
	this.self.find('select[name=\"started_year\"]').val( this.self.data('startedy') ).prop('selected',true);
	this.self.find('select[name=\"ended_year\"]').val( this.self.data('endedy') ).prop('selected',true);

	this.btnSave.click( function () {
		if ( self.btnSave.hasClass( 'disabled' ) ) {
			return false;
		}

		var data = {
			'id': self.self.data('id'),
			'started_month': self.self.find('[name=\"started_month\"]').val(),
			'ended_month': self.self.find('[name=\"ended_month\"]').val(),
			'started_year': self.self.find('[name=\"started_year\"]').val(),
			'ended_year': self.self.find('[name=\"ended_year\"]').val(),
			'title': self.self.find('input[name=\"title\"]').val(),
			'company': self.self.find('input[name=\"company\"]').val(),
			'location': self.self.find('input[name=\"location\"]').val()
		};

		$.ajax({
			type: 'POST',
			url: self.self.data('url'),
			data: data,
			dataType: 'json',
			success: function (json) {
				if ( json.message == 'success' ) {
					var $item = $.tmpl($('#background-experience-item'), json);
					new ExperienceItem($item);
					self.self.toggle();
					if ( self.self.data('id') == '' ) {
						self.self.parent().append($item);
					}else {
						self.self.after($item);
					}
					self.self.remove();
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function(xhr, error){
		    	alert(xhr.responseText);
		 	}
		});
	} );

	this.btnCancel.click( function () {
		var data = {
			'id': self.self.data('id'),
			'url': self.self.data('url'),
			'remove': self.self.data('remove'),
			'started_text': self.self.data('startedt'),
			'ended_text': self.self.data('endedt'),
			'started_month': self.self.data('startedm'),
			'ended_month': self.self.data('endedm'),
			'started_year': self.self.data('startedy'),
			'ended_year': self.self.data('endedy'),
			'title': self.self.data('title'),
			'company': self.self.data('company'),
			'location': self.self.data('location')
		}

		if ( self.self.data('id') != '' ) {
			var $item = $.tmpl($('#background-experience-item'), data);
			new ExperienceItem($item);
			self.self.toggle();
			self.self.after($item);
		}

		self.self.remove();

		$('.profiles-btn-edit').removeClass( 'disabled' );
		$('.profiles-btn-add').removeClass( 'disabled' );
		$('.profiles-btn-remove').removeClass( 'disabled' );
	} );
}

function ExperienceItem($element) {
	this.self = $element;
	this.btnSave = $element.find('.profiles-btn-save');
	this.btnCancel = $element.find('.profiles-btn-cancel');
	this.btnEdit = $element.find('.profiles-btn-edit');
	this.btnRemove = $element.find('.profiles-btn-remove');

	this.attachEvents();
}

ExperienceItem.prototype.attachEvents = function () {
	var self = this;

	this.btnEdit.click( function () {
		if ( self.btnEdit.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'id': self.self.data('id'),
			'url': self.self.data('url'),
			'remove': self.self.data('remove'),
			'started_text': self.self.data('startedt'),
			'ended_text': self.self.data('endedt'),
			'started_month': self.self.data('startedm'),
			'ended_month': self.self.data('endedm'),
			'started_year': self.self.data('startedy'),
			'ended_year': self.self.data('endedy'),
			'title': self.self.data('title'),
			'company': self.self.data('company'),
			'location': self.self.data('location')
		}

		var $form = $.tmpl($('#background-experience-form'), data);
		new FormAddExperience($form);

		self.self.toggle();
		self.self.after($form);
		self.self.remove();
	});

	this.btnRemove.click( function () {
		if ( self.btnRemove.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'id': self.self.data('id')
		};

		$.ajax({
			type: 'POST',
			url: self.self.data('remove'),
			data: data,
			dataType: 'json',
			success: function (json) {
				if ( json.message == 'success' ) {
					self.self.remove();
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function(xhr, error){
		    	alert(xhr.responseText);
		 	}
		});
	});
}

function TabsBackgroundSkill($element, contentWidth, contentHeight) {
	this.self = $element;
	this.contentWidth = contentWidth;
	this.contentHeight = contentHeight;
	this.mainBody = $element.find('.profiles-tabs-main-body');
	this.afterCreate();

	this.btnAdd = $element.find('.profiles-btn-add');
	this.btnSave = $element.find('.profiles-btn-save');
	this.btnCancel = $element.find('.profiles-btn-cancel');
	this.inputSkill = $element.find('.profiles-input');
	this.attachEvents();
}

TabsBackgroundSkill.prototype.afterCreate = function () {
	this.self.outerWidth(this.contentWidth);
	this.mainBody.outerHeight(this.contentHeight);
	this.mainBody.niceScroll();
}

TabsBackgroundSkill.prototype.attachEvents = function () {
	var self = this;

	this.btnAdd.click( function () {
		if ( self.btnAdd.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		self.btnAdd.toggle();
		self.btnSave.toggle();
		self.btnCancel.toggle();
		self.inputSkill.toggle();
	});

	this.btnCancel.click( function () {
		self.btnAdd.toggle();
		self.btnSave.toggle();
		self.inputSkill.toggle();
		self.btnCancel.toggle();

		self.inputSkill.val('');

		$('.profiles-btn-add').removeClass( 'disabled' );
		$('.profiles-btn-edit').removeClass( 'disabled' );
		$('.profiles-btn-remove').removeClass( 'disabled' );
	});

	this.btnSave.click( function () {
		if ( self.btnSave.hasClass( 'disabled' ) ) {
			return false;
		}

		var data = {
			'skill': self.inputSkill.val()
		}

		$.ajax({
			type: 'POST',
			url: self.self.data('url'),
			data: data,
			dataType: 'json',
			success: function ( json ) {
				if ( json.message == 'success' ) {
					var $item = $.tmpl( $('#background-skill-item'), json );
					new SkillItem( $item );

					self.mainBody.append( $item );

					self.btnAdd.toggle();
					self.btnSave.toggle();
					self.inputSkill.toggle();
					self.btnCancel.toggle();

					self.inputSkill.val('');

					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function ( xhr, error ) {
				alert( xhr.responseText );
			}
		});
	});

	this.self.find( '.profiles-tabs-item2' ).each( function () {
		new SkillItem( $(this) );
	});
}

function SkillItem( $element ) {
	this.self = $element;
	this.btnRemove = $element.find('.profiles-btn-remove');

	this.attachEvents();
}

SkillItem.prototype.attachEvents = function () {
	var self = this;

	this.btnRemove.click( function () {
		if ( self.btnRemove.hasClass( 'disabled' ) ) {
			return false;
		}

		$('.profiles-btn-add').addClass( 'disabled' );
		$('.profiles-btn-edit').addClass( 'disabled' );
		$('.profiles-btn-remove').addClass( 'disabled' );

		var data = {
			'id': self.self.data('id'),
		}

		$.ajax({
			type: 'POST',
			url: self.self.data('remove'),
			data: data,
			dataType: 'json',
			success: function ( json ) {
				if ( json.message == 'success' ) {
					self.self.remove();

					$('.profiles-btn-add').removeClass( 'disabled' );
					$('.profiles-btn-edit').removeClass( 'disabled' );
					$('.profiles-btn-remove').removeClass( 'disabled' );
				}else {
					alert('Error!');
				}
			},
			error: function ( xhr, error ) {
				alert( xhr.responseText );
			}
		});
	});
}