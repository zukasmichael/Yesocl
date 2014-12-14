(function($, Y) {
	var globalSettings = Y.Constants.SettingKeys, 
		globalTriggers = Y.Constants.Triggers;

	if (!Modernizr.touch && $('#menu').is(':visible')) {
		if(Y.Utils.getSetting(globalSettings.SHOW_LEFT_SIDEBAR) === "1"){
			$('.container-fluid').removeClass('menu-hidden');
		}else {
			$('.container-fluid').addClass('menu-hidden');
		}
	}

	if (Modernizr.touch)
		$('#menu').removeClass('hidden-xs');

	// handle menu toggle button action
	window.toggleMenuHidden = function()
	{
		if (typeof $.fn.sidr !== 'undefined') {
			if ($('.sidr.right').is(':visible'))
			{
				$.sidr('close', 'menu-right');
				return;
			}
		}

		$('.container-fluid').toggleClass('menu-hidden');
		$('#menu').removeClass('hidden-xs');
		resizeNiceScroll();

		//Trigger menu visibility changed
		var menuVisibility = !($('.container-fluid').hasClass('menu-hidden'));
		Y.Utils.saveSetting(globalSettings.SHOW_LEFT_SIDEBAR, menuVisibility ? "1" : "0");
	}
	
	// main menu visibility toggle
	$('.navbar.main .btn-navbar.btn-open-left, #menu .btn-navbar.btn-open-left').click(function(e)
	{
		e.preventDefault();
		$(window).trigger("resize");
		toggleMenuHidden();		
	});

	$('[data-toggle="navbar-color"] a').on('click', function(e){
		e.preventDefault();
		
		if ($(this).is('.active'))
			return;

		if ($(this).is('.color-white'))
			$('.navbar.main').removeClass('navbar-inverse navbar-blue navbar-primary');

		if ($(this).is('.bg-primary'))
		{
			$('.navbar.main').removeClass('navbar-inverse navbar-blue').addClass('navbar-primary');
			$('#menu').addClass('sidebar-brand-primary');
		}
		else
			$('#menu').removeClass('sidebar-brand-primary');

		if ($(this).is('.color-blue'))
		{
			$('.navbar.main').removeClass('navbar-inverse navbar-primary').addClass('navbar-blue');
			$('#menu').addClass('sidebar-blue');
			$('html').addClass('layout-blue');
		}

		if ($(this).is('.color-inverse'))
		{
			$('.navbar.main').removeClass('navbar-blue navbar-primary').addClass('navbar-inverse');
			$('#menu').removeClass('sidebar-blue');
			$('html').removeClass('layout-blue');
		}

		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
	});

	if ($('.sidebar-blue').length)
	{
		$('html').addClass('layout-blue');
		$('.navbar.main').removeClass('navbar-inverse').addClass('navbar-blue');
		$('#toggleNavbarColor a.color').removeClass('active').find('.color-blue').addClass('active');
	}
	if ($('.sidebar-blue.sidebar-brand-primary').length)
	{
		$('.navbar.main').removeClass('navbar-blue').addClass('navbar-primary');
		$('#toggleNavbarColor a.color').removeClass('active').find('.bg-primary').addClass('active');
	}
})(jQuery, YesGlobal);