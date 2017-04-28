---
layout: post
title: Make first letter of a string upper case in C#
subtitle: ""
date: 2013-08-30 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- ASP.NET
- C#
---

寫程式時我們常常遇到要將英文文字轉換成大寫與小寫的需求，此時我們通常會使用.ToUpper()或.ToLower()的方式做大寫與小寫的轉換

<!-- More -->

但我們也會常常收到只需要將第一個字轉成大寫其他都小寫的需求，這時我們可以透過TextInfo這個類別的.ToTitleCase()來幫忙我們完成

使用前先稍微了解一下這個TextInfo類別的

## TextInfo 類別(.NET Framework後 2.0開始使用) ##

- 定義文字屬性和行為，例如書寫系統特有的大小寫。
- 使用方式:

```csharp
string testStr = ABC;
var convertStr = Thread.CurrentThread.CurrentCulture.TextInfo.ToTitleCase(gameType.ToString().ToLower());
```

這邊要稍微注意一下，這個方法只能將第一個字變大寫，如果像範例原本就是三個大寫的字卻希望只有開頭大寫的話就要先做一次.ToLower()將文字都轉換成小寫在透過.ToTitleCase()將第一個字轉換為大寫。

關於TextInfo類別的其他方法(Method):

![Method](TextInfo.PNG)

## References ##

- [MSDN:TextInfo類別](http://msdn.microsoft.com/zh-tw/library/System.Globalization.TextInfo(v=vs.110).aspx)
