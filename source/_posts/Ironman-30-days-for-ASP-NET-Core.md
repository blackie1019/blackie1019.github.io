---
layout: post
title: Ironman for ASP.NET Core
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-11-30 10:23:57
categories: 
- .NET
tags: 
- ASP.NET Core
- Iron Man
- C#
---
此為系列為文章目錄，本系列文章將為大家介紹.NET Core 與 ASP.NET Core並將如何運用它跨平台的特性去開發 Web App 並將其推至真實世界的雲端服務之上運行。最後會用一個專案實例如帶大家從系統的設計到架構運行，如何做到持續整合與開發並用最少的成本發揮最大的效能運行．

<!-- More -->

文章持續更新，最新更新時間: **2017-05-17**

## Sharing Events with Blackie ##

### GCPUG.TW #25 ###

Introduce ASP.NET Core and sharing how to host .NET application on GCP.
- Online Presentation
    [SpeakerDeck : GCPUG.TW Meetup #25 - ASP.NET Core with GCP](https://speakerdeck.com/blackie1019/gcpug-dot-tw-meetup-number-25-asp-dot-net-core-with-gcp)
- Online Streaming
    [YouTube : GCPUG.TW #25 ASP.NET Core with Google Cloud Platform](https://www.youtube.com/watch?v=6gMCB380h2A)
- Slide 
    [PDF : GCPUG Taiwan Meetup #25 - ASP.NET Core with GCP by Blackie Tsai](https://drive.google.com/open?id=0ByZH69bRVHlzUzV6YjN4TnNEcW8)
- Demo Code
    [Github : GCPUG-Meetup-Demo](https://github.com/blackie1019/GCPUG-Meetup-Demo)

### XY - .NET Study Group ###

TBD

## .NET Core and ASP.NET Core Introduction ##

ASP.NET Core 是一個基於.NET Core全新的跨平台Framework, 類似於使用已知的.NET Framework的方式，可以開發如電腦桌面程式、網頁應用程式、IoT應用程式與手機行動程式等不同的應用，並且正常運行在Windows, Mac與Linux上。而他也是完全的Open-source的Framework

![overview](overview.png)

- [Official ASP.NET Core Github](https://github.com/aspnet/Home)
- [ASP.NET Core Schedule and Roadmap](https://github.com/aspnet/Home/wiki/Roadmap)

### .NET Standard ###

而這邊順便提起會有一個與ASP.NET Core有點關係的.NET Standard，簡單來講就是ASP.NET Core*"未來"*要呼叫的底層應用庫。

![overview_standard](overview_standard.png)

相較於先前那張一覽表，可以清楚地發現微軟想把目前三套不一樣的App Models運行在同一套底層應用庫，而非現在三套分別維護。而*"現在"*ASP.NET Core是跑在.NET Core上面的!

這對開發者來說是個好事，但不幸的是這還是有過渡期的

![standard_matrix](standard_matrix.png)

目前發行的版本為.NET Standard 1.6，可以看到包含了.NET Framework 4.6.2與ASP.NET Core 1.0(目前最新的是1.1)，而2.0目標則是有下面的既定目標:

![standard_2](standard_2.png)

## Goal and Subject ##

要會在接下來的幾天會介紹與分享如何享受ASP.NET Core帶來的跨平台好處與其相關的生態圈。

由於開發上我們會在 *macOS* + *visual studio code* 為主來開發，所以對VSCode有興趣的朋友歡迎參考另外的[VSCode分類](http://blackie1019.github.io/tags/VSCode/)

下面為目前計畫內容(內容會根據開發需求做調整)，過程當中主旨是希望實作一個具有存取DB資料的Web App並發佈至雲端使用:

### Developement ###

#### Prerequisite ###

- [ASP.NET and ASP.NET Core, .NET Framework and .NET core and .NET Standard](http://blackie1019.github.io/2017/04/29/ASP-NET-and-ASP-NET-Core-NET-Framework-and-NET-core-and-NET-Standard/)
- [ASP.NET Core Hello World on Windows](https://blackie1019.github.io/2017/03/06/ASP-NET-Core-HelloWorld-on-Windows/)
- [ASP.NET Core Hello World on Mac](https://blackie1019.github.io/2017/03/27/ASP-NET-Core-nuget-can-t-restore-on-macOS/)
- [ASP.NET Core Development via Container](http://blackie1019.github.io/2017/05/10/ASP-NET-Core-Development-via-Container/)
- [ASP.NET Core play with Docker](https://blackie1019.github.io/2017/03/26/ASP-NET-Core-Play-with-Docker/)
- [ASP.NET Core add Git Ignore File](https://blackie1019.github.io/2017/03/12/ASP-NET-Core-add-Git-Ignore-File/)
- [ASP.NET Core play with Solution File](ASP.NET Core play with Solution File)

#### Basic ####

- ASP.NET Core Middleware
- ASP.NET Core Framework-Provided Services
- ASP.NET Core IServiceCollection
- [ASP.NET Core using NuGet with Visual Studio Code](https://blackie1019.github.io/2017/03/30/ASP-NET-Core-using-NuGet-with-Visual-Studio-Code/)
- [ASP.NET Core play with MSTest](https://blackie1019.github.io/2017/04/05/ASP-NET-Core-play-with-MSTest/)
- [ASP.NET Core Create New Project Template](http://blackie1019.github.io/2017/04/27/ASP-NET-Core-Create-New-Project-Template/)

#### Data and Caching ####

- ASP.NET Core Caching
- ASP.NET Core Working with ADO.NET and MSSQL
- ASP.NET Core Working with Dapper and MSSQL
- [ASP.NET Core play with Redis and StackExchange.Redis](http://blackie1019.github.io/2017/04/16/ASP-NET-Core-play-with-Redis-and-StackExchange-Redis/)
- [ASP.NET Core play with MongoDB and MongoDB .NET Driver](https://blackie1019.github.io/2017/03/31/ASP-NET-Core-play-with-MongoDB-and-MongoDB-NET-Driver/)
- [ASP.NET Core play with MongoDB and MongoDB .NET Driver - Create](https://blackie1019.github.io/2017/04/08/ASP-NET-Core-play-with-MongoDB-and-MongoDB-NET-Driver-Create-Delete/)
- [ASP.NET Core play with MongoDB and MongoDB .NET Driver - Read](ASP.NET Core play with MongoDB and MongoDB .NET Driver - Read)
- [ASP.NET Core play with MongoDB and MongoDB .NET Driver - Update](https://blackie1019.github.io/2017/04/10/ASP-NET-Core-play-with-MongoDB-and-MongoDB-NET-Driver-Update/)

#### Logging ####

- [ASP.NET Core play with log4net](http://blackie1019.github.io/2017/05/02/ASP-NET-Core-play-with-Log4Net/)

#### Web ####

- ASP.NET Core play with MVC
- ASP.NET Core play with WebAPI
- [ASP.NET Core play with dotnet-watch](https://blackie1019.github.io/2017/03/13/ASP-NET-core-play-with-dotnet-watch/)
- Hosting ASP.NET Core Web Application on Kestrel
- Hosting ASP.NET Core Web Application on Kestrel with Reverse Proxy

#### Web Advance ####

- [ASP.NET Core Set Hosting Environment](https://blackie1019.github.io/2017/03/19/ASP-NET-Core-Set-Hosting-environment/)
- [ASP.NET Core play with SPA](https://blackie1019.github.io/2017/03/17/ASP-NET-Core-play-with-SPA/)
- [ASP.NET Core SPA Boilerplate with React and Redux](https://blackie1019.github.io/2017/03/28/ASP-NET-Core-SPA-Biobiolerplate-with-React-and-Redux/)
- ASP.NET Core Web Session with Redis
- ASP.NET Core play with SignalR Core

#### Continuous Delivery ####

- [ASP.NET Core play with Docker](https://blackie1019.github.io/2017/03/26/ASP-NET-Core-Play-with-Docker/)
- ASP.NET Core Build up with Jenkins
- ASP.NET Core Build up with TravisCI
- [.NET Core CLI switch to Different SDK Version by global.json](http://blackie1019.github.io/2017/05/14/NET-Core-CLI-switch-to-Different-SDK-Version-by-global-json/)
#### Hosting and Cloud ####

這邊都會以專欄的方式介紹，有興趣的朋友請到各專欄閱讀：

- ASP.NET Core Hosting on Cloud - Azure
- [Amazon Web Service 專區](http://blackie1019.github.io/tags/AWS/)
- [Google Cloud Platform 專區](http://blackie1019.github.io/tags/GCP/)

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

## References ##

過程中找到學習資料統一更新至此處以便閱讀

### .Net Core ###

- [ASP.NET Core and .NET Core Overview](https://weblog.west-wind.com/posts/2016/jun/13/aspnet-core-and-net-core-overview)
- [Overview of the new .NET Core and .NET Platform Standard](https://www.slideshare.net/AlexThissen/overview-of-the-new-net-core-and-net-platform-standard)
- [Introduction to ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)
- [ASP.NET Core quick build "dev" branch feed](http://myget.org/gallery/aspnetcidev ) 
    
    這是產品團隊所使用的 "開發版" 元件清單，也就是 GitHub 裡面 dev branch 的實際內容，你可以在這最快速的看到每個元件目前最新的版號與更新時間．

- [dotnetthoughts](http://dotnetthoughts.net/)

### Web Host ###

- [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel)
- [Kestrel with IIS](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/aspnet-core-module)
- [Kestrel with Nginx](https://docs.microsoft.com/en-us/aspnet/core/publishing/linuxproduction)
- [Kestrel with Apache](https://docs.microsoft.com/en-us/aspnet/core/publishing/apache-proxy)
- [WebListener](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/weblistener)
- [Open Web Interface for .NET (OWIN) guide](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/owin)

### Third Party Library ###

- [Awesome .NET Core](https://github.com/thangchung/awesome-dotnet-core)
- [Entity Framework Core](http://ef.readthedocs.io/en/latest/index.html)
- [StackExchange.Redis](https://stackexchange.github.io/StackExchange.Redis/)
- [MongoDB .NET Driver](https://github.com/mongodb/mongo-csharp-driver)
- [log4net](http://logging.apache.org/log4net/)

### Architecture/Template/Framework ###

- [Microsoft.AspNetCore.SpaServices](https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#server-side-prerendering)
- [Squidex is an open source headless CMS](https://github.com/Squidex/squidex)
- [ASP.NET Zero](https://aspnetzero.com/)
- [ASP.NET Boilerplate](https://github.com/aspnetboilerplate/aspnetboilerplate)
- [ASP.NET Boilerplate - Module Zero](https://github.com/aspnetboilerplate/module-zero)

### VS Code ###

#### General ####

- [微軟良心之作——Visual Studio Code 開源免費跨平台代碼編輯器](http://blog.csdn.net/chinahuyong/article/details/46480995)
- [awesome-vscode](https://github.com/viatsko/awesome-vscode)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
- [Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides)
- [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

#### ASP.NET Core ####

- [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
- [C# Extensions](https://marketplace.visualstudio.com/items?itemName=jchannon.csharpextensions)
- [NuGet Package Manager](https://marketplace.visualstudio.com/items?itemName=jmrog.vscode-nuget-package-manager)

## End ##

內容看起很多但主要是把目前實作一個網站會用到的大部分技術都包裹在內，希望能將此技術實際用在真實的商場上而非只將此當作實驗性質的技術為目標。對此系列內容有興趣或是有任何建議歡迎留言與討論!讓我們一起學習吧!