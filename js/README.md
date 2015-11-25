director
===
 director 修改自 [page.js](http://visionmedia.github.io/page.js),为SPA(单页面提供路由),原理是绑定hashChange事件

```
	director('/index', function(data, next){
		next();
	},function(data){

	})

	director('/about:id', function(data, next){
		next();
	},function(data){

	})

	director('*', function(data){
		director.redirectTo('#/xx/') // === window.loaction.hash
	})

	director.run(); // 开始监听hashChange

```
callback(data) data包括

* params ： !#/about/12  {id:12}
* queries  !#/index?a=1&b=2 {a:1,b:2}