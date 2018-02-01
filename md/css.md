### 盒子模型
    标准的盒子模型 `contentWidth = width` , 而 `IE` 的盒子模型 `contentWith =  width - border - padding`

一个 `div width` 是 200，`padding` 是 20，`margin` 是 10，
`border` 是 5

- 标准盒子模型，容器需要占据的位置为: 
200 + 20 * 2 + 10 * 2 + 5 * 2 = 270, `content width` =  200 + 10 * 2 + 5 * 2 = 230    

- `IE`, 200 + 20 * 2 = 240, 因为，`content` 包括了 `padding, border` , 也就是 `box-sizing` 的
`border-box` 

### `box-sizing`
- `content-box`
    * width = width + padding + border
- `border-box`
    * width = width(包含padding-left + padding-right + border-left + border-right)