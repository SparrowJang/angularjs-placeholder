angularjs-placeholder
=====================

Support older browsers such as IE7 and IE8 、 IE9 on angularjs,for. Don't need to include jQuery.

###Dependency

* angularjs

###Usage

Include the 'angulerjs-placeholder' module.
```
<script type="text/javascript" src="../src/angulerjs-placeholder.js"></script>
```

Set a module dependency and initialize a ng-app.
```
<script type="text/javascript">
  var app = angular.module( "demoApp", ["html5.placeholder"] );
  angular.bootstrap( document, [app.name] );
</script>

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

Finally,open your brower,enter http://localhost:8000/demo/

