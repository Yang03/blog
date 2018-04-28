### 什么是事件冒泡
事件开始由最具体的元素(文档中嵌套最深的那个节点)接收，然后
向上传播到不具体的节点。
```html
    <html>
        <body>
            <div id="xx">click me</div>
        </body>
    </html>
```
传播顺序：
1. div
2. body
3. html
4. document

### 什么是事件捕获(`event capturing`)
事件由不具体的节点接收，而具体的节点最后接收
传播顺序：
1. document
2. html
3. body
4. div

### `DOM` 事件流

- 捕获阶段
- 目标阶段
- 冒泡阶段

1. document ---> 捕获
2. html ---> 捕获
3. body ---> 捕获
4. div ---> 目标
5. body ---> 冒泡
6. html ---> 冒泡
7. document ---> 冒泡


### 事件捕获
当某个元素触发某个事件（如onclick），顶层对象document就会发出一个事件流，随着DOM树的节点向目标元素节点流去，直到到达事件真正发生的目标元素。在这个过程中，事件相应的监听函数是不会被触发的。

### 事件目标
当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。

### 事件冒泡
从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被一次触发。如果想阻止事件起泡，可以使用e.stopPropagation()


### `addEventListener`

addEventListener(eventName, callback, options)
options
    - capture: true | false, true 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
    - once : true | false, 只执行一次，执行完后自动 remove
useCapture true | false , true 捕获阶段执行


``` html
    <div class="out" id="out">
  <div class="inner" id="inner">

  </div>
</div>
```

```javascript
    document.getElementById('out').addEventListener('click', function(){
        alert('out')
    })
    document.getElementById('inner').addEventListener('click', function(){
        alert('inner')
    })  
```
当你点击 `inner` 先 `alert('inner')` 然后 `alert('out')`
点击 `out` 会 `alert('out')`


```javascript
    document.getElementById('out').addEventListener('click', function(){
        alert('out')
    }, true)
    document.getElementById('inner').addEventListener('click', function(){
        alert('inner')
    },true)
```

当你点击 `inner` 先 `alert('out')` 然后 `alert('inner')`
点击 `out` 会 `alert('out')`
事件在捕获阶段，会由最外层的节点接收


### 事件委托
将事件绑定在父节点
当子节点被点击的时候，click事件会从子节点开始向上冒泡。父节点捕获到事件之后，通过判断e.target.来判断是否为我们需要处理的节点。从而可以获取到相应的信息，并作处理。
