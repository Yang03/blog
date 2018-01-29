
### `[]` == `![]`

首先 `![]` 会被转成 `Boolean`, `[]` 转成 `Bolean` 为 `true`, `[]` == `!true`, 即为，`[] == false`, 其实就是 
    !!'true' // true
`[] == ToNumber(false)`, `[] == 0`, `[].valueOf().toString() == 0`

### `true == 'true'`
``` javascript
    // step1
    ToNumber(true) == 'true'
    // step2
    1 == 'true'
    // step3
    1 == ToNumber('true')
    // step4
    1 == NaN // return false

    !!'false' // true
    Boolean('false') // true

    [] == ture //false
    //step1
    [] == Number(true)
    //step2
    [] == 1
    // step3
    [].valueOf().toString() == 1
    //step4
    '' == 1
    //step5
    Number('') == 1
    //step6
    0 == 1 //return false

    !!null
    // setp1
    Boolen(null) //false
    //setp2
    !!false //false

    null == false
    // null 只和 undefined 相等 


```

### `baNaNa`
``` javascript
 'b' + 'a' + + 'a' + 'a'
 // step1
 'b' + 'a' + (+ 'a') + 'a'
 // step2
 (+'a') 
 // Numbeer('a') return NaN
```
### 数组相加
```
    [1,2,3] + [4,5,6]
    //step1
    [1,2,3].toString() + [4,5,6].toString()
    //step2
    '1,2,3' + '4,5,6' 
    //step3
    '1,2,34,5,6'
```

### `true` 和 `false`
```
    true + true 
    //step1
    Number(true) + Number(true)
    //step2
    1 + 1 = 2

    [4, 4] * [4, 4] 
    //step1
    [4,4].toString() * [4, 4].toString()
    //step2
    '4,4' * '4.4'
    //step3
    Number('4,4') * Number('4,4')
    //step4
    NaN * NaN    
```

### `typeof`

```
    typeof [] //object
    typeof null //object
    typeof undefined //undefined
    
    Object.prototype.toString.call([])
    // -> '[object Array]'
    Object.prototype.toString.call(new Date)
    // -> '[object Date]'
    Object.prototype.toString.call(null)
    // -> '[object Null]'
```

### 三个数字的比较

```
    1 < 2 < 3 // true
    //step
    (1 < 2) < 3
    //step2
    true < 3
    //step3
    Number(true) < 3
    //step4
    1 < 3 //true

    3 > 2 > 1 // fale
    // step1
    true > 1
    // step2
    1 > 1 //false
```

### `String`

```
'str' // -> 'str'
typeof 'str' // -> 'string'
'str' instanceof String // -> false


typeof String('str')   // -> 'string'
String('str')          // -> 'str'
String('str') == 'str' // -> true

var s = new String('str') == 'str' // -> true
typeof new String('str')   // -> 'object'
s instanceof String //-> true
```

### `null >= 0`

```
  null > 0
  +null = +0
  0 > 0
  // false  
  null >= 0
  +null = +0
  0 > 0
  // true
```



