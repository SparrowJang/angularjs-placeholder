
(function(){

  var support = "placeholder" in document.createElement("input");

  var app = angular.module( "html5.placeholder", [] );

  if ( support ) return ;

  app.directive( "placeholder", [function(){

    var time = (+new Date()),

        FOCUS_EVENT = "focus",

        BLUR_EVENT = "blur",

        getAttr;

    /**
    * Using 'getAttribute( "placeholder" )' will get null by IE7.
      Using 'getAttributeNode( "placeholder" ).nodeValue' replace.
    * @param {HTMLElement} elem
    * @param {String} name
    * @type String
    */
    attrByElem = function( elem, name ){

      var attr = elem.getAttributeNode( name );

      return attr? attr.nodeValue: attr;
    };

    return {
  
      link:function( scope, elem, attrs ){
  
        scope.$watch("ready", function(){

          if ( elem.attr("type") == "password" ) return {};

          elem
          .val( attrs.placeholder )
          .bind( FOCUS_EVENT, function(){
  
            var $this = angular.element( this );
  
            if ( $this.val() == attrByElem( this, "placeholder" ) ) {
  
              $this.val( '' );
            }
          })
          .bind( BLUR_EVENT, function(){
  
            var $this = angular.element( this );
  
            if ( $this.val() == '' ) {
  
              $this.val( attrByElem( this, "placeholder" ) );
            }
  
          });
  
          scope.$on( "$destroy", function(){
  
            elem
            .unbind( FOCUS_EVENT )
            .unbind( BLUR_EVENT );
          });

        });

      }
    };
  
  }]);

})();
