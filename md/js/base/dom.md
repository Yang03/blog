### `querySelector`
返回文档中匹配指定的选择器组的第一个元素(使用深度优先先序遍历文档的节点，性能不好), 如果没有找到匹配元素，则返回 `null`

``` javascript
    var el = document.querySelector(".myclass")
    var child = el.querySelector('.xx')
```

### `querySelectorAll`
返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 `NodeList` 。

``` javascript
    var elementList = document.querySelectorAll(selectors);
    elementList.querySelectorAll('.xx')
```

### `prepend` 和 `insertBefore`
在父节点的第一个子节点之前插入一系列 `Node` 对象或者 `DOMString` 对象
`parentElement.insertBefore(newElement, referenceElement)`

``` javascript
    var parent = document.createElement("div");
    parent.append("Some text");
    parent.prepend("Headline: ");
    console.log(parent.textContent); // "Headline: Some text"
```

### `createDocumentFragment`
创建一个空白的文档

``` javascript
    let node = document.createDocumentFragment()
    let li = document.createElement("li");
    li.textContent = e;
    docfrag.appendChild(li);
    document.body.append(node)
``` 

### 获得兄弟节点

```javascript
    [...element.parentNode.children].filter((child, index, array) => child !== element)

    Array.from(elment.parentNode.children).filter(el, index, array) => child !== element)

    //转换数组
    Array.prototype.slice.call(element.parentNode.children)

```

### 获得当前节点的前面的全部节点

```javascript
    // prev
    var el = document.getElementsByClassName('d3')[0]
    var e = el.previousElementSibling;
    while(e) {
        console.log(e)
        e = e.previousElementSibling;
    }
    //next
    var e = el.nextElementSibling;
    while(e) {
        console.log(e)
        e = e.nextElementSibling;
    }

```
### `Closest` 获得匹配选择器的第一个祖先元素，从当前元素开始沿 `DOM` 树向上。

```javascript
    el.closet('xx')

    function closest(el, selector) {
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                return el;
            } else {
                el = el.parentElement;
            }
        }
        return null;
    }
```

### `matches`
返回 `true` 或者 `false`
``` javascript
    // <div class="xx"><div>
    el.matches('xx')
```

### 属性

```javascript
    el.getAttribute()
    el.setAttribute()

    // 自定义
    el.dataset('xx')
    el.getAttribute('data-xx')
```

### `css & style`

```javascript
    el.style.color = '#000'
    // null 的意思是不返回伪类元素
    el.getComputedStyle(el, null).color
```

### `add class & remove class`
```javascript
    el.classList.add(className)
    el.classList.remove(className)

    //包含
    el.classList.contains(className)
    // toggle
    el.classList.toggle(className)
```

### `height & width`
* `height`
``` javascript
    // 含 scrollbar
    window.document.documentElement.clientHeight;   
    // 不含 scrollbar
    window.innerHeight;  

    // document height
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
        body.offsetHeight,
        body.scrollHeight,
        html.clientHeight,
        html.offsetHeight,
        html.scrollHeight
    );  

    // element height
    function getHeight(el) {
        const styles = this.getComputedStyle(el);
        const height = el.offsetHeight;
        const borderTopWidth = parseFloat(styles.borderTopWidth);
        const borderBottomWidth = parseFloat(styles.borderBottomWidth);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);
        return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
    }   

    // 精确到整数（border-box 时为 height - border 值，content-box 时为 height + padding 值）
    el.clientHeight;
    // 精确到小数（border-box 时为 height 值，content-box 时为 height + padding + border 值）
    el.getBoundingClientRect().height;     
```  

### `Position & Offset`  






