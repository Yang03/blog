### reflow(回流)

DOM结构中每个元素都有自己的盒子模型，浏览器根据样式(浏览器的默认样式，开发人员自定义)来计算，计算大小和位置，这个过程就是`reflow`

`reflow` 会影响`dom`结构渲染，会影响`parent`元素，这种开销是非常昂贵的，导致页面性能下降， 同时会触发`repaint`

### repaint(重绘)
根据盒子大小，背景，字体，内容，把元素绘制到页面的过程叫`repaint`

`outline`, `visibility`, `background`, `color` 会重新`repaint`但是不会 `reflow`


### 什么时候会触发 `reflow`
- DOM的CURD
- Resize窗口，滚动页面
- 读取 `offsetLeft、offsetTop、offsetHeight、offsetWidth、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、 getComputedStyle()`
- 改变字体大小
- 设置style属性
- 激活伪类
- 内容的改变，如用户在输入框中写字 
- 添加、删除样式表
- 新的样式或者修改任何影响元素外观的属性

### 如何减少 `reflow`

- 新的样式或者修改任何影响元素外观的属性,通过修改className来修改样式
- 缓存Layout属性值  `const left=el.offsetLeft`
- 设置元素的position为absolute或fixed,元素脱离标准流，从DOM树结构中脱离出来，在需要reflow时只需要reflow自身与下级元素
- 避免使用expression,他会每次调用都会重新计算一遍

