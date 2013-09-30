
(function(){

  'use strict';

  var support = "placeholder" in document.createElement("input");

  var app = angular.module( "html5.placeholder", [] );

  /**
  * Using 'getAttribute( "placeholder" )' will get null by IE7.
    Using 'getAttributeNode( "placeholder" ).nodeValue' replace.
  * @param {HTMLElement} elem
  * @param {String} name
  * @type String
  */
  var attrByElem = function( elem, name ){

    var attr = elem.getAttributeNode( name );

    return attr? attr.nodeValue: attr;
  };


  app.factory( "placeholder", function(){

    var ensure;

    if ( !support ) {

      var tmpName = "placeholderTmp" + (+new Date());

      var jqliteMerge = function( target, elems ){

        angular.forEach( elems, function( elem ){

          target.push( elem );
        });

        return target;

      };
  
      var record = {
  
        commit:function( elems ){

          angular.forEach( elems, function( input ){
  
            var $input = angular.element( input ), placeholder;
  
            placeholder = attrByElem( input, 'placeholder' );
  
            if ( $input.val() == placeholder ) {
  
              $input.data( tmpName, $input.val() );
              $input.val("");
            }
  
          });
  
        },
  
        doRollback:function( elems ){
  
          angular.forEach( elems, function( input ){
  
            var $input = angular.element( input ), placeholder;
  
            placeholder = $input.data( tmpName );
  
            if ( placeholder ) {
  
              $input.val( placeholder );
              $input.data( tmpName, null );
              //$input.removeData( tmpName );
            }
  
          });
  
        }
  
      };

      ensure = function( form, callback ){

        var elems;

        if ( form.length && form[0].tagName.toLowerCase() == "form" ) {

          elems = form.find( "input" );
          elems = jqliteMerge( form.find( "textarea" ), elems );

        } else

          elems = form;


        record.commit( elems );

        callback && callback({

          back:function(){

            record.doRollback( elems );
          }
        });

      };

    } else {

      ensure = function( form, callback ){

        callback && callback({back:function(){}});

      };

    }

    return {

      ensure:ensure
    };

  });


  if ( support ) return ;

  app.directive( "placeholder", [function(){

    var time = (+new Date()),

        FOCUS_EVENT = "focus",

        BLUR_EVENT = "blur",

        focus, blur;


    /**
    * @function
    */
    focus = function(){
  
      var $this = angular.element( this );
  
      if ( $this.val() == attrByElem( this, "placeholder" ) ) {
  
        $this.val( '' );
      }
    };

    /**
    * @function
    */
    blur = function(){
  
      var $this = angular.element( this );
  
      if ( $this.val() == '' ) {
  
        $this.val( attrByElem( this, "placeholder" ) );
      }
  
    };

    return {
  
      link:function( scope, elem, attrs ){
  
        scope.$watch("ready", function(){

          if ( elem.attr("type") == "password" ) return {};

          elem
          .val( attrs.placeholder )
          .bind( FOCUS_EVENT, focus )
          .bind( BLUR_EVENT, blur );
  
          scope.$on( "$destroy", function(){
  
            elem
            .unbind( FOCUS_EVENT, focus )
            .unbind( BLUR_EVENT, blur );
          });

        });

      }
    };
  
  }]);


})();
