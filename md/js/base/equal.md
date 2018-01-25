### 为什么 `'true' == true` return false

#### 看看 `javascript spec` 关于 `==` 的比较文档

1. 如果 `Type(x)` 和 `Type(y)` 的结果一样
    - a. 如果 `Type(x)` 是 `undefined`, 返回 `true`
    - b. `Type(x)` 是 `Null`, 返回 `true`
    - c. `Type(x)` 是 `Number`
        * 1. If x is NaN, return false.
        * 2. If y is NaN, return false.
        * 3. If x is the same Number value as y, return true.
        * 4. If x is +0 and y is −0, return true.
        * 5. If x is −0 and y is +0, return true.
        * 6. Return false.
    - d. 如果 `Type(x)` 是 `String`，如果 `x` 和 `y` 是完全相同的字符序列（相同长度和相同位置的相同字符）。否则，返回  `false`。 
    - e. 如果 `Type（x）` 是 `Boolean`, 如果 `x` 和 `y` 都为 `true` 或者都为 `false`，则返回 `true`，否则，返回 `false`。
    - f. 如果 `x` 和 `y` 引用同一个对象，则返回 `true`。否则，返回 `false`。 
2. 如果 `x` 是 `null`, `y` 是 `undefined`, 返回 `true`
3. 如果 `x` 是 `undefined`, `y` 是 `null`, 返回 `true`
4. If `Type(x)` is `Number` and `Type(y)` is `String`,
return the result of the comparison `x == ToNumber(y)`.
5. If `Type(x)` is `String` and `Type(y)` is `Number`,
return the result of the comparison `ToNumber(x) == y`.
6. If `Type(x)` is `Boolean`, return the result of the comparison `ToNumber(x) == y`.
7. If `Type(y)` is `Boolean`, return the result of the comparison `x == ToNumber(y)`.
8. If `Type(x)` is either `String` or `Number` and `Type(y)` is `Object`,
return the result of the comparison `x == ToPrimitive(y)`.
9. If `Type(x)` is `Object` and `Type(y)` is either `String` or `Number`,
return the result of the comparison `ToPrimitive(x) == y`.
10. Return `false`. 

通过第7条
```
   “true” == true ====> 'true' == ToNumber(true)
   ===> 'true' == 1  

```
`true` == 1, 通过第5条，
```
    ToNumber('true') == 1 
    // ToNumber('true') return 'NAN'
```
所以最后是 `NAN` == 1 的比较， `NAN` 和任何数据比较都返回 `false`

### `[1] == 1` return `true`
从第9条可以，看到, 其实 `ToPrimitive([1]) == 1`

### `ToPrimitive([1])`
`ToPrimitive(input, PreferredType?)`

可选参数PreferredType可以是Number或者String,它只代表了一个转换的偏好,转换结果不一定必须是这个参数所指的类型,但转换结果一定是一个原始值.如果PreferredType被标志为Number,则会进行下面的操作来转换输入的值:

如果输入的值已经是个原始值,则直接返回它.
否则,如果输入的值是一个对象.则调用该对象的valueOf()方法.如果valueOf()方法的返回值是一个原始值,则返回这个原始值.
否则,调用这个对象的toString()方法.如果toString()方法的返回值是一个原始值,则返回这个原始值.
否则,抛出TypeError异常.
如果PreferredType被标志为String,则转换操作的第二步和第三步的顺序会调换.如果没有PreferredType这个参数,则PreferredType的值会按照这样的规则来自动设置:Date类型的对象会被设置为String,其它类型的值会被设置为Number.

http://www.ecma-international.org/ecma-262/5.1/#sec-9.1

### `ToPrimitive([1]) == 1`
这样会先对 `[1].valueOf().toString` 返回 `1`, 所以 `[1] == 1` 返回 `true`

### ToNumber
undefined	NaN
null	+0
Boolean	true被转换为1,false转换为+0
Number	无需转换
String	由字符串解析为数字.例如,"324"被转换为324

如果输入的值是一个对象,则会首先会调用 `ToPrimitive(obj, Number)` 将该对象转换为原始值,然后在调用 `ToNumber()` 将这个原始值转换为数字.













Array 的 `includes,indexOf, lastIndexOf` 执行的是 `===`


      