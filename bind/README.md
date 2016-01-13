### this

浏览器里的this, function 外的 this.x ＝＝＝ window.x === var x。

nodejs 里面的this, function外的this 指文件本身(this === exports, this === module.exports)，
global相当 window


如：
```
    a.js
        this.x = 9;
        console.log(exports === this) //true
        console.log(moudle.exports === this) // true

    b.js 
        var a = require('./a') 
        console.log(a.x) // 9    

```


