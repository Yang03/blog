### 什么是原型(prototype)?
每一个构造函数都有一个原型对象，原型对象对象包含一个指向构造函数的指针。
实力包含一个指向原型对象的内部指针。

```
    function Person () {

    }
    Person.prototype.say = function() {
        console.log('wow')
    }
    var p = new Person()
    p.__proto__  === Person.prototype
    Person.prototype.constructor == Person
```

### 原型链的问题

```
    function SuperType() {
        this.colors = ['blue', 'red']
    }

    function SubType() {

    }
    SubType.prototype = new SuperType()
    var instance1 = new SubType()
    instance1.colors.push('black')
    console.log(instance1.colors) //['blue','red', 'black']

    var instance2 = new SubType()
    console.log(instance2.colors) //['blue','red', 'black']

```
1.subType的实例会共享一个是属性，一个实例修改，导致所有实例属性被修改。
2.实例化无法向父类的构造函数传递参数。

Object.create(super, sub),能让super和sub包含相同的属性和方法，但是
和原型模式一样，实例会共享属性，方法。

### 什么是原型链

每个构造函数 都有一个 `prototype`, 当通过构造函数 `new` 实例化一个实例的时候，实例的 `__proto__` 指向构造函数
这个 实例 同时继承了 改构造函数的属性，当访问该实例的属性的时候，如果该实例 不存在该属性，会一直向上查找，直达
`Object` 


