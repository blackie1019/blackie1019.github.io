---
layout: post
title: Short-cut for C# Implement Methods of an Interface or Abstract Class
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-09-16 10:20:41
categories:
- Tool
tags:
- C#
- Rider
- Visual Studio
---

記錄如何在開發工具使用快捷鍵實作繼承抽象類別與方法

<!-- More -->

在 *OOP* 的開發裡面，繼承是一定會使用到的手法，而當我們繼承抽象類別與介面要一一找出必要的實作時難免有點麻煩．

以往我們最常用的快捷鍵莫過於直接輸入 *ctor* 並按下 *tab* 後幫我們產生類別建構子:

![ctor.jpg](ctor.jpg)

而現代的 IDE 都已經內建快捷鍵協助快速實作方法，免去我們打字的困擾．

## Rider : ⌘+N > select Implement method or ⌃+I ##

在 Rider 當中我們可以透過滑鼠右鍵的 *Generate* 或是 *⌘+N* > select Implement method 的方式：

![01.jpg](01.jpg)

![02.jpg](02.jpg)

當然我們也可以直接按下快捷鍵 *⌃+I* 省去上面的步驟，直接選擇我們要實作的方法來幫我們自動產生程式碼：

![03.jpg](03.jpg)

完成後，產生的程式碼暫時透過丟出 **System.NotImplementedException()** 的方式來完成實作：

![04.jpg](04.jpg)

## Visual Studio :  Ctrl+.  ##

而 VS 其實很早就支援這樣的快捷鍵，一樣可以透過滑鼠右鍵選擇 *Implement Abstract Metohd* 或是直接按下 *Ctrl+.*，呼叫出以下畫面：

![05.png](05.png)

## References ##
- [Implement Methods of an Interface or Abstract Class](https://www.jetbrains.com/help/idea/implementing-methods-of-an-interface.html)
- [Implement an abstract class in Visual Studio](https://docs.microsoft.com/en-us/visualstudio/ide/reference/implement-abstract-class?view=vs-2017) 