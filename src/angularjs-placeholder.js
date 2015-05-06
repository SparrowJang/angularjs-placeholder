
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

  var hasPassword = function( elem ){

    return attrByElem( elem, "type" ) == "password";
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

  app.directive( "placeholder", ['$timeout', function($timeout){

    var time = (+new Date()),

        DATA_KEY = "_placeholder_" + time,

        FOCUS_EVENT = "focus",

        BLUR_EVENT = "blur",

        isIE9 = /msie 9/i.test( navigator.userAgent ),

        focus, blur, showPlaceholderTextByPassword, resetByElem;

    /**
     * @function
     */
    showPlaceholderTextByPassword = function( elem ){

      if ( elem.data( DATA_KEY ).type == "password" ) elem.attr( "type", "text" );
    };

    /**
     * @function
     */
    resetByElem = function( elem ){

      if ( elem.data( DATA_KEY ).type == "password" ) elem.attr( "type", "password" );
    };

    /**
    * @function
    */
    focus = function(){
  
      var $this = angular.element( this );
  
      if ( $this.val() == attrByElem( this, "placeholder" ) ) {
  
        $this.val( '' );
        resetByElem( $this );
      }
    };

    /**
    * @function
    */
    blur = function(){
  
      var $this = angular.element( this ), _this = this;
  
      if ( $this.val() == '' ) {
  
        //fixed #9 issue for tab button
        $timeout(function(){
          $this.val( attrByElem( _this, "placeholder" ) );
          showPlaceholderTextByPassword( $this );
        },1);
      }
  
    };

    return {
  
      link:function( scope, elem, attrs ){
  
        scope.$watch("ready", function(){

          if ( elem.attr("type") == "password" && !isIE9 ) return {};

          elem
          .val( attrs.placeholder )
          .data( DATA_KEY, {type:( elem.attr("type") || "" ).toLowerCase()} )
          .bind( FOCUS_EVENT, focus )
          .bind( BLUR_EVENT, blur );

          showPlaceholderTextByPassword( elem );
  
          scope.$on( "$destroy", function(){
  
            elem
            .unbind( FOCUS_EVENT, focus )
            .unbind( BLUR_EVENT, blur );
            resetByElem( elem );
          });

        });

      }
    };
  
  }]);


})();
