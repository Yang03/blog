var controllerManager = {
    curController: null,
    allControllers: [],
    create: function(controller) {
        this.allControllers[controller.__name__] = controller;
        return controller;
    },
    destroy: function(controller) {
        delete this.allControllers[controller.__name__];
    },
    isExists: function(name) {
        return !!(name && this.allControllers[name]);
    },
    use: function(name){
        return this.allControllers[name];
    },
    getParams: function(){
        var url = window.location.hash;
        var str = url.substring(1, url.length);
        if(str == ""){
            return {};
        }
        var arr = str.split("&");
        var params = {};
        for(var i = 0, len = arr.length; i < len; i++){
            var arr1 = arr[i].split("=");
            params[arr1[0]]= arr1[1];
        }
        return params;
    },
    run: function(){
        var _this = this;
        function onAction(){
            var params = _this.getParams() || {};
            if(!params.c){
               params.c  = "index";
            }
            if (controllerManager.isExists(params.c)) {
                controllerManager.curController = controllerManager.use(params.c);
                controllerManager.curController.beforeRoute && controllerManager.curController.beforeRoute(params, _this);
                controllerManager.curController.route && controllerManager.curController.route(params, _this);
                controllerManager.curController.afterRoute && controllerManager.curController.afterRoute(params, _this);
            }
            controllerManager.curController.init = true;
        }
        if(window.addEventListener){
            window.addEventListener("hashchange", onAction, false);
        }else{
            window.attachEvent("onhashchange", onAction, false);
        }
        onAction();
    }

}

//function onRoute(params, context){
//   if(params.c == "index"){
//        $(".page").hide();
//        $("#page-"+ params.c).show();
//   }else{
//       $(".page").hide();
//       if(context.curController.init){
//           $(".page-"+ params.c).show();
//       }else{
//           $("#page-container").append($("#" + params.c).text())
//       }
//   }
//}
//
//controllerManager.create({
//    __name__: "index",
//    init : false,
//    route: onRoute,
//    afterRoute: function(){
//        if(!this.init){
//            console.log("do")
//        }
//    }
//})
//controllerManager.create({
//    __name__: "second",
//    init : false,
//    route: onRoute,
//    afterRoute: function(){
//        if(!this.init){
//            console.log("do2")
//        }
//    }
//})
//
//window.onload=function(){
//    controllerManager.run();
//}
