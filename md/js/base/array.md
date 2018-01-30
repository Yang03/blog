### `isArray`
判断是否是数组，返回 `true` or `false`
```javascript
    Array.isArray([]) // true
    Array.isArray({}) // false

```
ployfill
``` javascript
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]'
        }
    }
```

### `copyWithin`
`copyWithin(目标索引, [源开始索引], [结束源索引])` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。
```javascript
    ['a', 'b', 'c', 'd'].copyWhithin(2, 0)
    //['c', 'd', 'c', 'd']
```

### `entries()`
`entries()` 方法返回一个新的 `Array Iterator` 对象
``` javascript
    var arr = ["a", "b", "c"];
    var iterator = arr.entries();
    // undefined

    console.log(iterator);
    // Array Iterator {}

    console.log(iterator.next().value); 
    // [0, "a"]
```

### `every`
`every()` 方法测试数组的所有元素是否都通过了指定函数的测试。

```javascript
    let a =  [1,2,3].every((element, index,   array) => {
        return index < 10
    })
    console.log(a) // 10
```

### `filter`
`filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

``` javascript
    let filtered = [12, 5, 8, 130, 44].filter((element, index, array) => {
        return element > 12
    });
    console.log(filtered) //[130, 44]
```

### `some`
`some()` 方法测试数组中的某些元素是否通过由提供的函数实现的测试。 
``` javascript
    let result = [2, 5, 8, 1, 4].some((element,index, array) => element > 5)
    console.log(result) //true
```

### `find`
`find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`

```javascript
    let finded = [12, 5, 8, 130, 44].find((element, index, array) => {
        return element > 12
    });
    console.log(finded) // 130
```

### `findIndex`
`findIndex() `方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

```javascript
    let findIndex = [12, 5, 8, 130, 44].findIndex((element, index, array) => {
        return element > 12
    });
    console.log(findIndex) // 3
```

### `includes`
`includes()` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。
``` javascript
    arr.includes(searchElement, fromIndex)
    [1, 2, 3].includes(2);     // true
    [1, 2, 3].includes(4);     // false
    [1, 2, NaN].includes(NaN); // true

```
尽管 `NaN !== NaN`, 但是 `includes` 就是可以找到。

### `map`

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

``` javascript
    let arr = [1,2,3].map((element, index, arr) => {
        return element + 1
    })
    console.log(arr) //[2,3,4]
```

### `reduce`
`reduce()` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
```javascript
    var total = [0, 1, 2, 3].reduce(function(sum, value) {
        return sum + value;
    }, 0);
    // total is 6

    var flattened = [[0, 1], [2, 3], [4, 5]]    .reduce(function(a, b) {
        return a.concat(b);
    }, []);
    // flattened is [0, 1, 2, 3, 4, 5]
```

### `reduceRight`
同上，执行方向相反

### `slice` 和 `splice`
`splice()` 方法与 `slice()` 方法的作用是不同的，`splice()` 方法会直接对数组进行修改。

```javascript
    var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

    myFish.splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
    // myFish 变为 ["angel", "clown", "drum", "mandarin", "sturgeon"]

    myFish.splice(2, 1); // 从索引为2的位置删除一项（也就是'drum'这一项）
    // myFish 变为 ["angel", "clown", "mandarin", "sturgeon"]
    var a = [1,2,3]
    var newMyFish = a.slice(1,3)
    // 不包括结束
    console.log(newMyFish) // [2]

```









