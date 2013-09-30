angularjs-placeholder
=====================

Implement a html5 placeholder feature to fix older browsers such as **IE7** and **IE8** 、 **IE9** on angularjs. **Don't need to include jQuery**.

###Dependency

* angularjs

###Usage

Include the 'angulerjs-placeholder' module.
```
<script type="text/javascript" src="../src/angularjs-placeholder.js"></script>
```

Set a module dependency and initialize a ng-app.
```
<script type="text/javascript">
  var app = angular.module( "demoApp", ["html5.placeholder"] );
  angular.bootstrap( document, [app.name] );
</script>

```

####submit a form

IE7~IE9 need to clear values.

```
app.controller( "demoController", function( $element, placeholder ){

  placeholder.ensure( $element, function( record ){

    //doSomething

    //do rollback placeholder to element.
    if ( !valid ) record.back();

  })

});
```

###Demo

Clone this project.
```
git clone git@github.com:SparrowJang/angularjs-placeholder.git

cd angularjs-placeholder
```

Run a static server.
```
python -m SimpleHTTPServer 8000
```

Finally,open your brower,enter [http://localhost:8000/demo/](http://localhost:8000/demo/).

