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









