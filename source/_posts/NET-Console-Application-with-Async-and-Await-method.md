---
layout: post
title: .NET Console Application with Async and Await method
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-04-15 20:26:34
categories:
- .NET
tags: 
- .NET Core
- Async & Await
- C#
---

紀錄一下主控台應用程式(console application)怎麼使用 async 與 await　函式。

<!-- More -->

async 與 await 是 *.Net Framework 4.5* 加入的功能，幫助開發者可以撰寫非同步的方法，加速整體執行上被拖延的可能。詳細說明可以參考一下官方的 [使用 async 和 await 進行非同步程式設計 (C#)](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/concepts/async/), [Parallel Programming with .NET](https://blogs.msdn.microsoft.com/pfxteam/)或是 [處理大型資料的技巧 – Async / Await](http://columns.chicken-house.net/2013/04/14/%E8%99%95%E7%90%86%E5%A4%A7%E5%9E%8B%E8%B3%87%E6%96%99%E7%9A%84%E6%8A%80%E5%B7%A7-async-await/)

而使用上只有兩處：

1. 在宣告方法時加上關鍵字 async，即表示它是個非同步方法。而 async 的作用也真的就只有告訴編譯器：這是個 **非同步方法** 。
2. 接著真正的主角是使用關鍵字 await 來等待非同步工作的結果的部分。

而控制流則參考下圖：
![navigationtrace.png](navigationtrace.png)

一般的 *async* 與 *await* 有幾種合適的執行與開發方式，這邊建議直接看 [async 與 await](https://www.huanlintalk.com/2016/01/async-and-await.html)的圖文解說。這邊只放上重點：

## 錯誤觀念：程式執行時，一旦進入以 async 關鍵字修飾的方法，就會執行在另一條工作執行緒上面 ##

> 程式的控制流一開始進入非同步方法時，依舊是以同步的方式執行，而且是執行於呼叫端所在的執行緒；直到碰到 await 敘述後，控制流會一分為二。
> 
> 基本上，await 之前的程式碼是一個同步執行的程式區塊，而 await 敘述之後的程式碼則為另一個同步執行的程式區塊；兩者分屬不同的控制流。前者負責先導工作，後者則是接續的工作——會在 await 所等待的工作完成之後接著執行。

## 錯誤觀念：await 會阻斷當前所在的程式碼，直到欲等待的工作完成時才會繼續執行 ##

> 一個以 async 關鍵字修飾的非同步方法裡面可以有一個或多個 await 敘述。按照先前的講法，若非同步方法中有兩個 await 敘述，即可以理解為該方法被切成三個控制流（三個各自同步執行的程式區塊）。若非同步方法中三個 await 敘述，則表示該方法被切成四個控制流。依此類推。

以上請大家以一定要支持一下原作者！

## Development Tips ##

而在開發 主控台應用程式(console application) 或 背景執行服務(windows service) 的時候，因為在起始點不能使用async和task，所以必須透過 Result 或 Wait 的方式。

要在 *console* 上面執行的話，記得要用下放的寫法直接呼叫 *Task* 類別的 *Wait*
 方法即可。

```csharp
static void Main(string[] args)
{
    Task t = MainAsync(args);
    t.Wait();
}

static async Task MainAsync(string[] args)
{
    await ...
}
```

但是上述做法如果是在網頁應用程式(Web Form, Web MVC, Web API或是 Windows Form) 的話，就會相互等待的死結問題。

另外，.NET Framework 4 原本沒支援  await/async 就不能使用，但微軟官方也 porting 一個 Library - [Microsoft.Bcl.Async](https://www.nuget.org/packages/Microsoft.Bcl.Async/) 給在 .NET Framework 4 的環境使用。