---
title: 孤独的WebGL之旅(三) | 响应函数
date: 2020-01-23 19:48:47
categories: 学习
tags: WebGL
thumbnail: /images/coverpic7.jpg
---

动态绘制过程中不免会用到鼠标或键盘的响应函数。之后进入三维世界，我们将通过鼠标改变场景的视角，通过键盘实现在场景中的漫游。在这一章只是先介绍一下鼠标和键盘的响应函数，等我写到三维世界，再回过头来补充具体的漫游相关。

<!-- more -->

&emsp;
### 鼠标响应
---
我们可以通过`<canvas>`对象来注册鼠标响应函数。

比如鼠标的点击事件，代码可以如下：

```js
//注册鼠标点击事件响应函数
canvas.onmonsedown = function(ev) { click(ev, gl, canvas, a_Position); };
```

当发生鼠标点击事件时，就会调用click函数。这样的写法是匿名函数的写法，好处是可以获得main()函数内部的一些变量，比如gl, canvas等。而click()函数的实际定义是在main外部的。








&emsp;
### 参考资料
---
[1] 《WebGL Programming Guide》Kouichi Matsuda, Rodger Lea