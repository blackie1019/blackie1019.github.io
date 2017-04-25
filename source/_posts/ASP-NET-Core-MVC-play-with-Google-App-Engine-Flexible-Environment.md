---
layout: post
title: ASP.NET Core MVC play with Google App Engine - Flexible Environment
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-30 13:37:07
categories:
- Asp.Net
tags: 
- Asp.Net Core
- Google Cloud
- App Engine
---

先前為大家介紹了GAE的 Standard Environment ，這次將介紹如何實際將ASP.NET Core MVC專案放置在GAE的Flexible Environment環境運行。

<!-- More -->

這邊因為還是在GAE的功能範圍，所以本篇只會針對*Flexible Environment*做細節的介紹，有關於GAE的全貌與不同Environment的請參考[ASP.NET Core MVC play with Google App Engine - Standard Environment](http://blackie1019.github.io/2017/04/21/ASP-NET-Core-MVC-play-with-Google-App-Engine-Standard-Environment/)

## Recap the Difference Between Standard Environment and Flexible Environment ##

這邊我們分享一下Google GCP教材幫我們整理的差異:

![app_engine_environments_differences](app_engine_environments_differences.png)

簡單來講如果想獲得比較彈性的環境與願意付較多的錢，GAE的Flexible Environment能給予你最大的彈性並免去維運上的負擔，專心在主要的應用開發上。

## Flexible Environment with ASP.NET Core ##

### Create New Project ###

### Prepare Your Environments ###

不同於 App Engine 我們可以運用Google Cloud Shell直接來開發我們的程式，官方這邊建議我們在Flexible Environment的開發採用本地端的容器化開發方式(Containerized)，方便我們驗證是否成功建立我們想要的容器(Container)。

### Google Cloud SDK Install ###

### ASP.NET Core with Container ###

對於此步驟的細節請參考[ASP.NET Core play with Docker](http://blackie1019.github.io/2017/03/26/ASP-NET-Core-Play-with-Docker/)，這邊僅將流程記錄下來不做多餘解釋。


## [補充說明] ASP.NET Core 1.0.1 vs ASP.NET Core 1.1.1 ##

而這兩版相比從CLI到產生的專案都差很多，這邊我們快速的讓大家了解一下．

### Create New Project ###

### Template Support ###

### Project Structure ###

### Library/Package Support ###

## References ##

- [Quickstart for .NET in the App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/dotnet/quickstart?hl=zh-TW)