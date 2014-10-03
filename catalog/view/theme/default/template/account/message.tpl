{% extends '@template/default/template/layout/basic/master.tpl' %}

{% block title %}{{ heading_title }}{% endblock %}

{% block stylesheet %}
{% endblock %}
{% block body %}
    <div class="innerAll">
		<div data-bind="with: MesageView" id="widget-messages" class="widget widget-messages widget-heading-simple widget-body-white">
            <div class="widget-body padding-none margin-none">
                <div class="innerAll bg-gray">
                    {#<h2 data-bind="text: DemoText"></h2>#}
                </div>
                <div class="row row-merge borders">
                    <div class="col-md-3 listWrapper">
                        <div class="innerAll">
                            <form autocomplete="off" class="form-inline margin-none">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="Find messages .." />
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-primary btn-xs pull-right"><i class="fa fa-search"></i></button>
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div class="bg-gray text-center strong border-top innerAll half"><span data-bind="text: totalRoom"></span> {% trans %}messages{% endtrans %} <i class="fa fa-circle-arrow-down"></i></div>
                        <ul class="list-unstyled" id="js-list-message" data-bind="foreach: { data: $data.roomList, afterRender: addMoreEvents }">
                            <li class="border-bottom" data-bind="click: $parent.clickRoomItem, css: { 'bg-primary' : $data.id == $parent.activeRoomId() }">
                                <div class="media innerAll" data-bind="with: $data.last_message">
                                    <div class="media-object pull-left hidden-phone">
                                        <a href="#">
                                            <img data-bind="attr: {src: $data.user.avatar}" height="40px" width="40px" alt="Image" />
                                        </a>
                                    </div>
                                    <div class="media-body">
                                        <div><span class="strong" data-bind="text: $parent.name"></span> <small class="text-italic pull-right label label-default" data-bind="timeAgo: $data.created"></small></div>
                                        <div data-bind="text: $data.content"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-9 detailsWrapper">
                        <!-- User -->
                        <div class="bg-primary">
                            <div class="media">
                                <a href="" class="pull-left">
                                    <img src="{{ asset_img('no_user_avatar.png') }}" width="65" class="media-object">
                                </a>
                                <div class="media-body innerTB innerR">
                                    <div class="innerT half pull-right">
                                    <a  href="#type" class=" btn btn-default bg-white btn-sm" data-toggle="collapse">
                                        <i class="fa fa-pencil"></i> Write
                                    </a>
                                    </div>
                                    <h4 href="" class="text-white pull-left innerAll strong display-block margin-none">Joanne Smith</h4>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray innerAll text-center margin-none"><a href="" class="text-muted lead"><i class="icon-time-clock"></i> View Archive</a></div>
                        <div  id="type" class="collapse border-top">
                            <textarea type="text" class="form-control rounded-none border-none" placeholder="Write your messages..."></textarea>
                        </div>

                        <div class="widget border-top padding-none margin-none" data-bind="foreach: $data.messageList">
                            <!--  Message -->
                            <div class="media margin-none innerAll">
                                <a href="" class="pull-left hidden-xs">
                                    <img data-bind="attr: {src: $data.user.avatar}" width="60" class="media-object">
                                </a>
                                <div class="media-body innerTB">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="innerT half">
                                                <div class="media">
                                                    <div class="pull-left">
                                                        <a href="" class="strong text-inverse" data-bind="text: $data.username"></a>
                                                        <span class="innerR text-muted visible-xs" data-bind="timeAgo: $data.created"></span>
                                                    </div>
                                                    <div class="media-body" data-bind="text: $data.content"></div>
                                                </div>
                                            </div>  
                                        </div>
                                        <div class="col-sm-6 hidden-xs">
                                            <i class="icon-time-clock pull-right text-muted innerT half fa fa-2x"></i>
                                            <span class="pull-right innerR innerT text-right  text-muted" data-bind="timeAgo: $data.created"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{% endblock %}
{% block library_javascript %}
{% endblock %}
{% block common_javascript %}
    <script src="{{ asset_js('models/message-models.js') }}"></script>
    <script src="{{ asset_js('pages/account/message.js') }}"></script>
{% endblock %}
{% block javascript %}
    <script type="text/javascript">
        (function($, ko,  Y, undefined) {
                Y.GlobalKoModel = Y.GlobalKoModel || {};
                var mesageOptions = {
                    apiUrls : {
                        loadRoomMessage: {
                            name: "ApiGetRooms"
                        }
                    }
                };
                var mesageView = new Y.Widgets.MessageView(mesageOptions, $("#widget-messages"));
                Y.GlobalKoModel.MesageView = mesageView;

                //Apply Knockout
                ko.applyBindings(Y.GlobalKoModel);
        }(jQuery, ko, YesGlobal));
    </script>
{% endblock %}