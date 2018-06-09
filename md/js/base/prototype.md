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
