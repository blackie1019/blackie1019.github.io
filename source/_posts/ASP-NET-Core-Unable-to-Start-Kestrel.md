---
layout: post
title: ASP.NET Core Unable to Start Kestrel
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-11 02:06:35
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- C#
- Kerstrel
---

紀錄一下Kestrel意外沒關閉的狀況該如何解決

<!-- More -->

這邊在開發ASP.NET Core MVC的時候常遇到Kestrel沒關閉造成下面的問題。

順手分享一下問題的原因與解決辦法

### Kestrel 介紹 ###

[Kestrel](https://github.com/aspnet/KestrelHttpServer)是一專門為ASP.NET Core設計的Web Server Host，而他也是基於另外一個高效能的I/O伺服器專案 - [libuv](https://github.com/libuv/libuv)。

相較於我們長久開發ASP.NET所搭配的IIS，kestrel就是一個專門為ASP.NET Core所誕生的Web應用程式伺服器，解決跨平台服務的問題。

而因為ASP.NET Core改寫了原先ASP.NET Web應用程式與程式伺服器之間的處理關係，這強化了我們開發與建置上的選擇，在Windows的環境我們可以沿用原有的IIS來掛載ASP.NET Core程式，也可以採用新的Kestrel來取代IIS。但相較於IIS的全面性，Kestrel比較單純針對效能做了不錯的處理。根本來說 Kestel 是一個 I/O 元件，並沒有像 IIS 提供其他的功能來保護與管理，這也是架構上要考量跟注意的地方。

下圖我們可以清楚的了解Kestrel與ASP.NET Core如何互動與繫結(參考官方文件-[Web server implementations in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/))

![kestrel cycle](kestrel cycle.png)

開發上預設會使用kestrel，而如果你是用Visual Studio開發的則會使用IIS Express。而官方則是建議如果是要上正式環境使用則以IIS, Nginx, or Apache當作反轉伺服器再搭配Kestrel做調配。

![IIS cycle](IIS cycle.png)

### 問題 = Unable to start : Kerstrel ###

而今天所發生的問題則是在運行ASP.NET Core MVC時，可以在Terminal會有下面的成功訊息

![success](success.png)

但有時候會因為不明原因而無法啟動(顯示該port已被其他應用程式佔用而無法繫結)

![dotnet_exe](dotnet_exe.png)

目前發生該問題還沒有特定流程，但出現的頻率真的過高...

### 解決辦法 ###

因為造成該問題的主因在於原先該終止的Kerstel未能正確停止﹐所以導致我們即將開始運行的Kerstel無法正確的啟動(因為相同port無法綁定至兩個應用程式)

其實解決方法很簡單，就是把Host的應用程式(kerstrel)關閉即可，只是當我們打開工作管理員後可能都找不到對應的關鍵字，原來是因為它的名稱叫做:dotnet.exe

![solution](solution.png)

這邊就簡單的透過滑鼠右鍵End tasks即可。

### [延伸主題] Web Listener ###

如果你是在windows環境因為一些內外在因素而不能使用IIS，我們在開發與執行上也可以透過另外一個替代方案來取代，那就是Web Listener。流程會變成如下:

![Web Listener IIS](web listener_iis.png)

同樣的如果在內部網路無法使用kerstrel也可以改用這個方法。

![Web Listener Kerstrel](web listener_iis.png)

[官方說明](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/weblistener)，之後也會花點時間在這個題目上跟大家分享。

### References ###

- [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel)
- [Kestrel with IIS](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/aspnet-core-module)
- [Kestrel with Nginx](https://docs.microsoft.com/en-us/aspnet/core/publishing/linuxproduction)
- [Kestrel with Apache](https://docs.microsoft.com/en-us/aspnet/core/publishing/apache-proxy)
- [WebListener](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/weblistener)
- [Open Web Interface for .NET (OWIN) guide](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/owin)