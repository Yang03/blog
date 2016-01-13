 function ac (x, callback) {
    setTimeout(function(){
      callback.call(this, null, x)
    }, 1000)
  }
  function thunkify(fn){
    return function(){
      var args = new Array(arguments.length);
      var ctx = this;

      for(var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
      }

      return function(done){
        var called;
        console.log(done);
        args.push(function(){
          if (called) return;
          called = true;
          done.apply(null, arguments);
        });

        try {
          fn.apply(ctx, args);
        } catch (err) {
          done(err);
        }
      }
    }
  }
  var af = thunkify(ac);

  /*
  * function () {
  *    fn = function(x, callback) {
  *     setTimeout(function(){
  *      callback.call(this, null, x)
  *      }, 1000)
  *
  *    };
  *    var args = new Array(arguments.length);
       var ctx = this;

       for(var i = 0; i < args.length; ++i) {
       args[i] = arguments[i];
       }

       return function(done){
       var called;

       args.push(function(){
       if (called) return;
       called = true;
       done.apply(null, arguments);
       });

       try {
       fn.apply(ctx, args);
       } catch (err) {
       done(err);
       }
       }
  *
  *
  * }
  *
  * */


  var gen = function * (){
    var r1 = yield af(1);
    //console.log(r1);
    var r2 = yield af(2);
    //console.log(r2);
  }

  /**
   * r1
   *var  fn = setTimeout(function(){
      callback.call(this, null, x)
    }, 1000)

   var args = new Array(arguments.length);
   var ctx = this;

   for(var i = 0; i < args.length; ++i) {
        args[i] = arguments[i];
      }
    // agrs = [1];
    return function(done){
        var called;

        args.push(function(){
          if (called) return;
          called = true;
          done.apply(null, arguments);
        });

        try {
          fn.apply(ctx, args);
        } catch (err) {
          done(err);
        }
      }
   }

   * */



  /*
   return  function(done) {
     fn (this, [1, function() {
          
     }])

   }
  * */
  function run(fn) {
    var gen = fn() // gen Generator
    function next(err, data) {
      var result = gen.next(data);
     // console.log(result);
      if(result.done) return;
     // console.log(result.value);
      result.value(next);
    }
    next();
  }

  run(gen);
