---
title: Software Security Note(1) | Buffer Overflow
date: 2020-07-18 06:59:06
categories: 学习
tags: 
- Security  
- Buffer Overflow
thumbnail: /images/security1.jpg
---

> 少年心性岁岁长，何必虚掷惊和慌。
皆是我曾途径路，不过两鬓雪与霜。

<!-- more -->

是对这学期上的Software Security课程的一个整理，讲道理上课的时候听的不是很认真，而且感觉这门课还是很值得复盘整理一下的，于是写了这个系列的note，希望我能早点更完。一些依托于助教的虚拟机的服务器端的HW就没法复现了，可惜。

这个[github](https://github.com/AshenAshes/Software-Security)是和这个项目一起的。

&emsp;&emsp;

### Buffer Overflow
---

Buffer Overflow, 即缓冲区溢出。在存在缓存溢出安全漏洞的计算机中，攻击者可以用超出常规长度的字符数来填满一个域，通常是内存区地址。在某些情况下，这些过量的字符能够作为“可执行”代码来运行。从而使得攻击者可以不受安全措施的约束来控制被攻击的计算机。

C语言中存在很多有安全漏洞的库函数，由于不进行边界检查，存在着buffer overflow的风险：

```C++
int main(...){
    char buffer[100];
    ...
    strcpy(buffer, argv[1]);    //buffer overflow
    strcat(buffer, argv[2]);    //buffer overflow
    gets(buffer);               //buffer overflow
    fgets(buffer, 200, badfile);       //buffer overflow
}

```

以上是一些典型的会造成buffer overflow的例子。

&emsp;&emsp;

### 一些概念
---

我们一般通过覆盖堆栈内存来利用buffer overflow进行attack。这门课里只提到了关于栈的buffer overflow。先讲一些涉及到的基础知识。

&emsp;&emsp;

#### 程序内存布局

一个程序的内存布局及其存放内容：

(高地址)
· Stack： 局部变量、返回地址、参数...
· Heap：动态内存分配
· BSS：未初始化的static/global变量
· Data segment：已初始化的static/global的变量  
· Text segment：程序的code
(低地址)

<img src="/article/software-security(1)/memory.png" width = 30% height = 30% />

&emsp;&emsp;

#### 栈内存布局

当一个function形如：

```C
int func(int a, int b){
    int x, y;
    x=a+b; y=a-b;
}
```

被call时，栈会为此次call在栈顶分配一块内存，依次压入：

· Arguments参数，从右往左
· Return address函数的返回地址
· Previous stack frame pointer(ebp)上一个栈帧指针
· Local varibles函数内的一些局部变量

如下图所示：

<img src="/article/software-security(1)/stack.png" width = 60% height = 60% />

&emsp;&emsp;

#### Frame Pointer

Stack frame pointer(ebp)是用来access内存域内的局部变量的，在汇编代码中，function域内的局部变量都是通过ebp+栈上偏移量来表达的。

因为存在嵌套调用，每个函数域都有自己的ebp，在进入另一个域后需要先Push前一个域的ebp，再set自己的ebp。相当于各个函数划分stack memory为不同的stack frame，各个frame有自己的frame pointer，即ebp。

栈的生长方向是从高地址向低地址。

栈顶指针esp(in 32bit)，rsp(in 64bit)。

帧指针ebp(in 32bit)，rbp(in 64bit)。

&emsp;&emsp;

#### 汇编指令

在实际汇编指令操作中，一个func被call会经历：

· push参数入栈
· call func命令，然后PC跳转到func开头
· push ebp(push前一个frame的ebp)
· mov esp, ebp(把当前栈顶位置赋值给ebp)
· 一堆函数内部过程
· leave命令
· ret命令

这里涉及到了三个汇编指令,call、leave和ret。

&emsp;
##### call指令

call 标号

包含两步操作：
1) push $eip, 相当于push了return address
2) 跳转到func的地址，即标号地址

&emsp;
##### leave指令

leave

包含两步操作：
1) mov $ebp, $esp(esp指向当前frame的ebp)
2) pop $ebp, 把previous ebp的值赋给$ebp，即是指向上一个frame的ebp，准备返回了

&emsp;
##### ret指令

ret

就是pop $eip的操作，结束函数，根据return address返回


&emsp;&emsp;

### Attack原理
---

通过buffer overflow去overwrite栈上的return address并写入一段恶意代码，通过新的return address跳转到恶意代码起始处去执行恶意代码即可。

<img src="/article/software-security(1)/attack.png" width = 60% height = 60% />

&emsp;&emsp;

恶意代码可以引用一些现成的shellcode。

我们主要的工作是找到return address，如果堆栈地址是随机化的，我们可以通过暴力搜索，但一般是固定的，可以通过观察计算得到。

为了简化计算，我们可以在新的return address和malicious code间插入NOP，NOP是不会被执行的并会跳到下一条指令，这样我们就不需要精确地计算malicious code的起始位置，而只需要保证我们新的return address是在malicious code前就可以了。

<img src="/article/software-security(1)/nop.png" width = 60% height = 60% />


&emsp;&emsp;

### Defense
---

#### Canary

在ebp下面放一个字作为canary,在程序调用结束之前(leave ret之前), 检查栈上的canary与寄存器中的canary是否相等，若不相等则调用中断程序。

attack:printf格式化攻击拉出canary。

&emsp;

#### DEP(NX)

指定内存要么为RX(可读可执行)，要么为RW(可读可写)。

attack:Code reuse attack, e.g., ret2libc

&emsp;

#### ASLR

Address Space Layout Randomization(ASLR),地址空间布局随机化,每次程序运行时，其分布不完全固定而是随机的，那么我们无法确定return address，从而难以攻击。ASLR只打乱Stack区和lib，其他的如Heap和Text区并不会被打乱。

attack:brute force，ret2ret，ret2pop，ret2esp之类的


&emsp;
### 参考资料
---
[1] 老师课件02
[2] https://www.jianshu.com/p/4c0a30e7ddd2