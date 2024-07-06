---
title: 孤独的WebGL之旅(二) | 着色器
date: 2020-01-23 10:09:51
categories: 学习
tags: WebGL
thumbnail: /images/coverpic6.jpg
---

着色器作为最重要的概念之一，怎么可能只有上一章那么点内容呢。

这一章将继续深入着色器相关概念，但涉及较少的实例程序部分，后续若有深入的着色器概念，也会在这一章补上，不再分开叙述。

<!-- more -->

&emsp;
## initShaders()函数解析

initShaders()函数虽然放在了函数库里供调用使用，但如果想深入了解WebGL，内部细节还是需要了解的。其大致可分为七个部分。

1. 创建着色器对象

通过gl.createShader(type)函数创建着色器对象，type参数可传入gl.VERTEX_SHADER或gl.FRAGMENT_SHADER，指定创建的着色器类型，为顶点着色器或片元着色器。可以通过gl.deleteShader(shader)来删除着色器对象，如果该着色器还在使用，则删除无效。

2. 向着色器对象中填充着色器程序的源代码

通过gl.shaderSource(shader, source)函数向着色器指定GLSL源代码，也就是上一章一直强调的要传入的字符串形式的GLSL代码。

3. 编译着色器

通过gl.compileShader(shader)来编译着色器代码。GLSL代码在使用之前要编译成二进制的可执行格式，WebGL系统真正使用的是这种可执行格式。如果通过gl.shaderSource替换了一个着色器内的代码，需要再次进行编译。

通过gl.getShaderParameter(shader, pname)函数，将第二个参数指定为gl.COMPILE_STATUS，可以检查着色器编译成功与否。若编译失败，返回false。可再通过gl.getShaderInfoLog(shader)函数来获取编译错误的具体信息。

4. 创建程序对象

通过gl.createProgram()来创建一个程序对象。可以通过gl.deleteProgram(program)来删除创建的程序对象。

5. 为程序对象分配着色器

通过gl.attachShader(program, shader)来为程序对象分配着色器。为了WebGL系统的正常运行，顶点着色器和片元着色器都应该被分配给程序对象。通过gl.detachShader(program, shader)函数来解除分配给程序对象的着色器。

6. 连接程序对象

通过gl.linkProgram()函数将程序对象中的顶点着色器和片元着色器连接起来。类似地，通过gl.getProgramParameter(shader, pname)设定第二个参数为gl.LINK_STATUS和gl.getProgramInfoLog(program)函数来获取编译成功与否和编译错误的信息。

7. 使用程序对象

通过gl.useProgram(program)函数来指定WebGL系统使用的程序对象。

通过在绘制前准备多个程序对象，在绘制时根据需要切换使用的程序对象，就能达到使用多个着色器的效果。这也是为什么上一章我要把这一步从initShaders()里分离出来的原因。

&emsp;
## 从JS代码向着色器传递数据
上一章虽然定义了着色器，但相关变量都是直接在着色器内定义的，缺乏可扩展性。如果要引入模型，数据势必要在JS代码与着色器代码间进行交互。

&emsp;
### 三种shader变量
如何将信息从JS代码传到GLSL代码？这将涉及GLSL的三种变量(实际上是存储限定符)——attribute, uniform以及varying。

attribute变量是只能在vertex shader中使用的变量，不能在fragment shader中声明和使用。一般attribute变量用来表示一些顶点的数据，如：顶点坐标，法线，纹理坐标，顶点颜色等。

uniform变量是外部程序传递给shader的变量，在shader内部，uniform变量不能被shader程序修改。如果uniform变量在vertex和fragment两者间声明一致，则它可以被vertex和fragment共享使用。uniform变量一般用来表示：变换矩阵，材质，光照参数和颜色等信息。

varying变量是vertex和fragment shader间作数据传递用的。一般vertex shader修改varying变量的值，然后fragment shader使用该varying变量的值。因此varying变量在vertex和fragment shader两者之间的声明必须是一致的。

&emsp;
### 获取来自JS的数据
来看两段简单的GLSL代码：

```glsl
//vertex shader
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;
    gl_PointSize = 10.0;
}

//fragment shader
precision mediump float;
uniform vec4 u_FragColor;
void main(){
    gl_FragColor = u_FragColor;
}
```

这是写在两个着色器的代码。

要向a_Position和u_FragColor传送数据，首先要获取这两个变量在WebGL系统中的位置，然后再通过函数发送数据。写在JS中的代码：

```js
//获取存储位置
var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

//传送数据
gl.vertexAttrib3f(a_Position, xy[0], xy[1], xy[2]);
gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
```
attribute赋值同族函数：gl.vertexAttrib1f, gl.vertexAttrib2f, gl.vertexAttrib3f, gl.vertexAttrib4f

uniform赋值同族函数：gl.uniform1f, gl.uniform2f, gl.uniform3f, gl.uniform4f

数字表示传递的参数的个数。

赋值后调用drawArrays()函数，即可动态改变顶点状态后进行绘制。

&emsp;

这章不提供代码。

&emsp;
## 参考资料
[1] 《WebGL Programming Guide》Kouichi Matsuda, Rodger Lea
[2] [OpenGL ES2.0 的三种变量类型](https://blog.csdn.net/Jackers679/article/details/6848085)