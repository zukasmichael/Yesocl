<?php

/* default/template/common/footer.tpl */
class __TwigTemplate_c7a589b44b6da2403680365c61dbb5cb8d5b298856b37457ba473da252082359 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );

        $this->macros = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div id=\"y-footer\">
    <div id=\"yes-footer-bar\" style=\"display: none;\">
        <div class=\"btn-group dropup\">
          <button class=\"btn btn-yes\">Language</button>
          <button class=\"btn btn-yes dropdown-toggle\" data-toggle=\"dropdown\">
            <span class=\"caret\"></span>
          </button>
          <ul class=\"dropdown-menu\">
            <li><a href=\"#\"> <i class=\"icon-yes-flag icon-lang-eng\"></i> English</a></li>
            <li><a href=\"#\"> <i class=\"icon-yes-flag icon-lang-vn\"></i> Việt Nam</a></li>
          </ul>
        </div>
    </div>
    <div id=\"scroll-footer\">
        <a href=\"#\" class=\"btn-link-circle medium\" id=\"auto-scroll-left\" title=\"Scroll Left\" style=\"display: none;\">
          <i class=\"icon-arrow-left\"></i>
        </a>
    </div>
    <div id=\"yes-info\">
        <div class=\"copyright\">
            Copyright &copy; 2013 - <strong>YESOCL.com</strong>
        </div> 
        <div class=\"language-wrapper dropup\">
          <a href=\"#\" class=\"language-item selected dropdown-toggle\" data-toggle=\"dropdown\">
            <img src=\"image/flags/england.png\"> 
            <span> English</span>
            <i class=\"icon-caret-up\"></i>
          </a>
          <ul class=\"dropdown-menu\">
            <li>
              <a href=\"#\" class=\"language-item\"><img src=\"image/flags/vn.png\"> <span>Vietnamese</span></a>
            </li>
            <li>
              <a href=\"#\" class=\"language-item\"><img src=\"image/flags/cn.png\"> <span>Chinese</span></a>
            </li>
          </ul>
        </div> 
        <div class=\"links-footer\">
          <ul>
            <li><a href=\"#\">Create Group</a></li>
            <li><a href=\"#\">User privacy</a></li>
            <li><a href=\"#\">Term</a></li>
            <li><a href=\"#\">Contact</a></li>
            <li><a href=\"#\">About us</a></li>
          </ul>            
        </div>              
    </div>    
</div>";
    }

    public function getTemplateName()
    {
        return "default/template/common/footer.tpl";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
