---
layout: post
title: Ironman 30 days for ASP.NET Core
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-11-30 10:23:57
categories: 
- Asp.Net
tags: 
- Asp.Net Core
- Iron Man
- C#
---
此為系列為文章第一篇，本系列文章將為大家介紹ASP.NET Core並將如何運用它跨平台的特性去開發Web App。

<!-- More -->

## ASP.NET Core Introduction ##

ASP.NET Core 是一個全新的跨平台Framework, 讓我們使用已知的.NET Framework可以開發如電腦桌面程式、網頁應用程式、IoT應用程式與手機行動程式等不同的應用，並且正常運行在Windows, Mac與Linux上。
而他也是完全的Open-source的Framework

![overview](overview.png)

- [Offical ASP.NET Core Github](https://github.com/aspnet/Home)
- [ASP.NET Core Schedule and Roadmap](https://github.com/aspnet/Home/wiki/Roadmap)

## 30 Days Topic ##

要會在接下來的幾天內與各位介紹與分享如何享受ASP.NET Core帶來的跨平台好處與其相關的生態圈。
下面為目前計畫內容(內容會根據開發需求做調整)，過程當中主旨是希望實作一個具有存取DB資料的Web App並發佈至雲端使用:

### Developement ###

#### Setup ###
- [ASP.NET Core Hello World on Windows](http://blackie1019.github.io/2017/03/06/ASP-NET-Core-HelloWorld-on-Windows/)
- ASP.NET Core Hello World on Mac]
- ASP.NET Core Hello World on Linux

#### Basic ####
- ASP.NET Core Middleware
- ASP.NET Core Framework-Provided Services
- ASP.NET Core IServiceCollection
- ASP.NET Core Playing with Testing
- ASP.NET Core Working with ADO.NET and Database
- ASP.NET Core Working with Dapper and Database
- ASP.NET Core Working with Redis
- ASP.NET Core Working with Mongo

#### Web ####
- ASP.NET Core Working with MVC
- ASP.NET Core Playing with WebAPI
- Hosting ASP.NET Core Web Application on Kestrel 
- Hosting ASP.NET Core Web Application on Kestrel with Mac

#### Web Advance ####
- ASP.NET Core Playing with React
- ASP.NET Core Web Session with Redis
- ASP.NET Core Playing with SignalR Core

#### DevOps ####
- ASP.NET Core Playing with Docker
- ASP.NET Core Build up with Jenkins
- ASP.NET Core Hosting on AWS
- ASP.NET Core Hosting on Azure

## Project Goal ##

這邊為了對學習有個目標，我們就來明定過程當中要做出來的網站功能。 在這接下來的日子內我們將實作一個可以會員資料的app，可透過該平台查詢會員資料，並透過後臺來管理該系統的資料。

### 前台會員系統 ###

- 會員可以自行前台註冊
- 會員可以更改個人資料
- 會員可以瀏覽系統公告
- 會員可以在系統收到推播訊息

### 後台管理系統 ###

- 需登入才可以進入系統
- 會員管理
- 公告管理
- 推播管理
- 系統管理

過程當中會加減帶到系統功能的開發，最後希望在活動結束的時候這個demo site也能同時上線

## Learing Resource ##

過程中找到學習資料統一更新至此處以便閱讀

### .Net Core ###
- [ASP.NET Core and .NET Core Overview](https://weblog.west-wind.com/posts/2016/jun/13/aspnet-core-and-net-core-overview)
- [Overview of the new .NET Core and .NET Platform Standard](https://www.slideshare.net/AlexThissen/overview-of-the-new-net-core-and-net-platform-standard)

### VS Code ###

- [微軟良心之作——Visual Studio Code 開源免費跨平台代碼編輯器](http://blog.csdn.net/chinahuyong/article/details/46480995)

## End ##

內容看起很多但主要是把目前實作一個網站會用到的大部分技術都包裹在內，希望能將此技術實際用在真實的商場上而非只將此當作實驗性質的技術為目標。對此系列內容有興趣或是有任何建議歡迎留言與討論!讓我們一起學習吧!