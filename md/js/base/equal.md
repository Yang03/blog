
### Array includes,indexOf, lastIndexOf 
执行的是 ===

### "==="
    If Type(x) is different from Type(y), return false.

    If Type(x) is Undefined, return true.

    If Type(x) is Null, return true.

    If Type(x) is Number, then

    If x is NaN, return false.

    If y is NaN, return false.

    If x is the same Number value as y, return true.

    If x is +0 and y is −0, return true.

    If x is −0 and y is +0, return true.

    Return false.

    If Type(x) is String, then return true if x and y are exactly the same sequence of characters (same length and same characters in corresponding positions); otherwise, return false.

    If Type(x) is Boolean, return true if x and y are both true or both false; otherwise, return false.

    Return true if x and y refer to the same object. Otherwise, return false.


### "=="
    - Type[x] 和Type[y]相同
        - Type[x] 和 Type[y] 为undefined 返回true
        - Type[x] 和 Type[y] 为null 返回true
        - 如果Type[x] 是number
            - 如果x 或者 是NaN, 返回false
            - 如果x或者y 是(-0, +0), 返回true
            - 其他 返回flase
        - 如果Type[x]是String， 如果y 的有相同的字符，并且长度相同，返回true
        - 如果Type[x],Type[y] 都是是Boolean, x 和 y 都是true或者false 的时候，返回true
    - 如果 x是null, y是undefined，返回true  
    - Type[x]是Number, Type[y]是String return x == ToNumner(y)  
    - Type[x]是String, Type[y]是Number return ToNumner(x) == y
    -   - Type[x]是Number, Type[y]是Boolean return x == ToNumner(y)  
    - Type[x]是Boolean, Type[y]是Number return ToNumner(x) == y
      