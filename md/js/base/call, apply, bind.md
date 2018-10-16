### `call`, `apply` 和 `bind` 的不同
- `call`, `apply` 立即执行，`bind`返回一个函数
- `call` 传递多个参数，`apply` 传递数组


### `bind`
fun.bind(thisArg, arg1, arg2, ....)

```
 Function.prototype.bind = function(context) {
     return function() {
        const aArgs   = Array.prototype.slice.call(arguments, 1),
        this.apply(context, aArgs.concat(Array.prototype.slice.call(arguments))
     }
 }
```
