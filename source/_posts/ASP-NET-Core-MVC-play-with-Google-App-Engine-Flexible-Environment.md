---
layout: post
title: ASP.NET Core MVC play with Google App Engine - Flexible Environment
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-30 13:37:07
categories:
- Google Cloud Platform
tags: 
- Asp.Net Core
- GCP
- GAE
- Google App Engine
---

先前為大家介紹了GAE的 Standard Environment ，這次將介紹如何實際將ASP.NET Core MVC專案放置在GAE的Flexible Environment環境運行。

<!-- More -->

這邊因為還是在GAE的功能範圍，所以本篇只會針對*Flexible Environment*做細節的介紹，有關於GAE的全貌與不同Environment的請參考[ASP.NET Core MVC play with Google App Engine - Standard Environment](http://blackie1019.github.io/2017/04/21/ASP-NET-Core-MVC-play-with-Google-App-Engine-Standard-Environment/)

## Recap : The Difference Between Standard Environment and Flexible Environment ##

這邊我們分享一下Google GCP教材幫我們整理的差異:

![app_engine_environments_differences](app_engine_environments_differences.png)

簡單來講如果想獲得比較彈性的環境與願意付較多的錢，GAE的Flexible Environment能給予你更大的彈性但依舊免去維運上的負擔，持續專心在主要的應用開發上。

## Flexible Environment with ASP.NET Core 1.0.1 ##

### Create New Project ###

這邊我們新增一個Google Cloud專案

![new_project.png](new_project.png)

### Publish the ASP.NET Core app ###

### Package the ASP.NET Core app as a Docker container ###

### Create app.yaml for App Engine flexible and Deploy ###

## Flexible Environment with ASP.NET Core 1.1.1 ##

在上面我們示範了如何使用Google Cloud Shell的方式幫我們建立一個ASP.NET Core 1.0.1的專案並透過容器化的過程打包整個應用程式成為一個Docker images，再將此發佈至GAE上作Flexible的擴展．但由於專案是我們透過Google Cloud Shell建立的，由於內建的SDK僅支援ASP.NET Core 1.0.1與.NET CLI 1.0.0的版本這讓我們無法建立最新版的ASP.NET Core專案．

這邊我們可改用本機下載的ASP.NET Core 1.1.1 SDK 建立一個新版的開發環境，將起封裝成Docker Images後再透過Google Cloud SDK改此環境推上App Engine發佈，接下來就讓我們來實作這樣的過程吧：

### Create Another New Project ###

這邊我們再新增一個不同的Google Cloud專案，

![new_project.png](new_project.png)

### Prepare Your Environments ###

接著，不同於 App Engine 我們可以運用Google Cloud Shell直接來開發我們的程式，官方這邊建議我們在Flexible Environment的開發採用本地端的容器化開發方式(Containerized)，方便我們驗證是否成功建立我們想要的容器(Container)。

### Google Cloud SDK Install ###

### ASP.NET Core with Container ###

對於此步驟的詳細內容請參考[ASP.NET Core play with Docker](http://blackie1019.github.io/2017/03/26/ASP-NET-Core-Play-with-Docker/)，這邊僅將流程記錄下來不做多餘解釋。

## [補充說明] ASP.NET Core 1.0.1 vs ASP.NET Core 1.1.1 ##

而這兩版相比從CLI到產生的專案都差很多，這邊我們快速的讓大家了解一下．

### Create New Project ###

### Template Support ###

### Project Structure ###

### Library/Package Support ###

## [補充] Why Google Cloud Platform ##

身為一個.NET的愛好者來說，Azure應該是首選，但為什麼我會積極的介紹GCP呢？理由很簡單：錢！

一個雲端服務除了一開始的技術與架構門檻跨過後，剩下的大概就是三個問題：錢、錢、錢

雲端的服務使用時間、空間、與用了多少方便的服務都是要錢的，既然如此一開始的考量應該是我們都能達到需求的情況下誰真的能給予最划算的價錢

![gcp_good_parts](gcp_good_parts.png)

而這邊不拿Azure出來比較是因為Azure有的服務AWS都有，但都稍微貴一點點．

而除了錢的考量外，考量到ASP.NET Core本身就是一個跨平台的技術，如果不能跨*雲端平台*被綁死在微軟自己體系下豈不是很好笑嗎？

ASP.NET Core天生就與Azure的整合應該是最好的（如果不是，好像只能請微軟自己檢討了..)，而使用AWS的人又佔了雲端50%以上的用戶不缺與AWS整合的文章或學習資源

所以為了推廣這樣ASP.NET Core這樣的一個好技術與雲端平台的另一個選擇，我開始這一ASP.NET Core + GCP 系列的文章．之後我也會將更多ASP.NET Core能與GCP服務整合的實際案例分享出來！

## References ##

- [Quickstart for .NET in the App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/dotnet/quickstart?hl=zh-TW)
- [Deploy an ASP.NET Core app to App Engine](https://codelabs.developers.google.com/codelabs/cloud-app-engine-aspnetcore/)