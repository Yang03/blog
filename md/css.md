### 盒子模型
    标准的盒子模型 `contentWidth = width` , 而 `IE` 的盒子模型 `contentWith =  width - border - padding`

一个 `div width` 是 200，`padding` 是 20，`margin` 是 10，
`border` 是 5

- 标准盒子模型，容器需要占据的位置为: 
200 + 20 * 2 + 10 * 2 + 5 * 2 = 270, `content width` =  200 + 10 * 2 + 5 * 2 = 230    

- `IE`, 200 + 20 * 2 = 240, 因为，`content` 包括了 `padding, border` , 也就是 `box-sizing` 的
`border-box` 

### `box-sizing`
- `content-box`
    * width = width + padding + border
- `border-box`
    * width = width(包含padding-left + padding-right + border-left + border-right)

 ### `Block Formatting Contexts` （BFC 块级格式上下文） 
它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
 - 作用：
    * 清浮动，防止 margin 重叠等
 - 布局规则
    * 内部的Box会在垂直方向，一个接一个地放置。
    * Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠  
    * 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
    * BFC的区域不会与float box重叠。
    * BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。  
    * 计算BFC的高度时，浮动元素也参与计算
  - 哪些元素会生成BFC?
    * root element
    * "float" is not "none"
    * "overflow" is not "visible"
    * "position" is "absolute", "fixed"
    * "display" is "table-cell","table-caption", "inline-block", "flex", "inline-flex"....
    
```html
<div class="root">
  <div class="d1">
  
  </div>
  <div class="d2">
  
  </div>
</div>
```

``` css
.d1{
  float: left;
  background: red;
  width:200px;
  height: 100px;
}

.d1{
  width:300px;
  background:yellow;
  height:100px;
}
```
![image](https://user-images.githubusercontent.com/10190366/35713940-f7f4c0d4-0804-11e8-8095-27f9444f79f6.png)
虽然存在浮动的元素 `d1`，但 `d2` 的左边依然会与包含块的左边相接触。
每个元素的 `margin box`的左边， 与包含块`border box` 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

为 `d2` ,添加 `oveflow:hidden` 触发 `BFC`
![image](https://user-images.githubusercontent.com/10190366/35714068-bbe68d9c-0805-11e8-9b87-b403af0bbc87.png)
可以看到：`d1` 和  `d2` 不再重合
是因为： `BFC` 的区域不会与 `float box` 重叠

### `float`
```html
<div class="root">
  <div class="d1">
  
  </div>
  <div class="d2">
  
  </div>
</div>
```
``` css
.root {
  border: 4px solid green;
}

.d1{
  float: left;
  background: red;
  width:200px;
  height: 100px;
}

.d2{
  float: left;
  width:300px;
  background:yellow;
  height:100px;
}
```
![image](https://user-images.githubusercontent.com/10190366/35714223-57201e4a-0806-11e8-9182-ef85d05c4119.png)
可以看到，`root` 的没有高度
但是： 计算BFC的高度时，浮动元素也参与计算
我们为 `root` 添加 `overflow:hidden` 触发 `BFC`

![image](https://user-images.githubusercontent.com/10190366/35714327-f786f28c-0806-11e8-8b8c-cc89d17dda59.png)

### `Box` 垂直方向的距离由 `margin` 决定。属于同一个 `BFC` 的两个相邻 `Box` 的 `margin` 会发生重叠
```html
    <div class="root">
  <div class="d1">
   
  </div>
   <div class="d2">
  
  </div>
  
</div>
```
```css
.root {
  border: 4px solid green;
  overflow: hidden
  
}

.d1{
  
  background: red;
  width:100px;
  height: 100px;
  margin: 100px;
}

.d2{
  
  width:100px;
  background:yellow;
  height:100px;
  margin: 100px;
}
```


![image](https://user-images.githubusercontent.com/10190366/35714604-bb4679d0-0808-11e8-9c82-40c98d261dbc.png)

可以看到 `d1`, `d2` 垂直方向相距 `100px`

### `Box` 垂直方向的距离由 `margin` 决定。属于同一个 `BFC` 的两个相邻 `Box` 的 `margin` 会发生重叠

我们可以，外面包裹一层容器，并触发该容器生成一个`BFC`。那么 `d1`, `d2` 便不属于同一个 `BFC`，就不会发生 `margin `重叠了。

```html
 <div class="root">
  <div class="d1">
   
  </div>
   <div class="box">
    <div class="d2">
   </div>
    </div>  
  
</div>
```
 ```css
 .box {
    overflow:hidden 
}


![image](https://user-images.githubusercontent.com/10190366/35714945-a0d0eed0-080a-11e8-8014-6fdcfd6d413a.png)
 ```


 


