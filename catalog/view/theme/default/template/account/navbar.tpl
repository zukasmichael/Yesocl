			{% block navbar_stylesheet %}
			{% endblock %}
			{% block navbar %}
	            <div class="navbar hidden-print navbar-default box main" role="navigation">
	                <div class="user-action user-action-btn-navbar pull-right border-left">
	                    <a href="#menu-right" class="btn btn-sm btn-navbar btn-open-right"><i class="fa fa-comments fa-2x"></i></a>
	                </div>
	                <div class="user-action user-action-btn-navbar pull-left">
	                    <a href="#menu" class="btn btn-sm btn-navbar btn-open-left"><i class="fa fa-bars fa-2x"></i></a>
	                </div>
	                <ul class="notifications pull-left hidden-xs">
	                    <li class="dropdown notif">
	                        <a href="" class="dropdown-toggle"  data-toggle="dropdown"><i class="notif-block icon-envelope-1"></i><span class="fa fa-star"></span></a>
	                        <ul class="dropdown-menu chat media-list">
	                            <li class="media">
	                                <a class="pull-left" href="#"><img class="media-object thumb" src="{{ asset_css('platform/images/people/100/15.jpg') }}" alt="50x50" width="50"/></a>
	                                <div class="media-body">
	                                    <span class="label label-default pull-right">5 min</span>
	                                    <h5 class="media-heading">Adrian D.</h5>
	                                    <p class="margin-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
	                                </div>
	                            </li>
	                            <li class="media">
	                                <a class="pull-left" href="#"><img class="media-object thumb" src="{{ asset_css('platform/images/people/100/16.jpg') }}" alt="50x50" width="50"/></a>
	                                <div class="media-body">
	                                    <span class="label label-default pull-right">2 days</span>
	                                    <h5 class="media-heading">Jane B.</h5>
	                                    <p class="margin-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
	                                </div>
	                            </li>
	                            <li class="media">
	                                <a class="pull-left" href="#"><img class="media-object thumb" src="{{ asset_css('platform/images/people/100/17.jpg') }}" alt="50x50" width="50"/></a>
	                                <div class="media-body">
	                                    <span class="label label-default pull-right">3 days</span>
	                                    <h5 class="media-heading">Andrew M.</h5>
	                                    <p class="margin-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
	                                </div>
	                            </li>
	                        </ul>
	                    </li>
	                </ul>
	                <div class="user-action pull-left menu-right-hidden-xs menu-left-hidden-xs border-left">
	                    <div class="dropdown username pull-left">
	                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
	                            <span class="media margin-none">
	                                <span class="pull-left"><img src="{{ asset_css('platform/images/people/35/16.jpg') }}" alt="user" class="img-circle"></span>
	                                <span class="media-body">Bill <span class="caret"></span></span>
	                            </span>
	                        </a>
	                        <ul class="dropdown-menu">
	                            <li><a href="about_1.html?lang=en" >About</a></li>
	                            <li><a href="messages.html?lang=en">Messages</a></li>
	                            <li><a href="timeline_3.html?lang=en">Profile</a></li>
	                            <li><a href="login.html?lang=en">Logout</a></li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="input-group hidden-xs pull-left">
	                    <span class="input-group-addon"><i class="icon-search"></i></span>
	                    <input type="text" class="form-control" placeholder="Search a friend"/>
	                </div>
	            </div>
			{% endblock %}
			{% block navbar_javascript %}
			{% endblock %}