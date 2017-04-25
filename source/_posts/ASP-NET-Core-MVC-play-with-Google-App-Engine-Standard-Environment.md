---
layout: post
title: ASP.NET Core MVC play with Google App Engine - Standard Environment
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-25 23:44:48
categories:
- Asp.Net
tags: 
- Asp.Net Core
- Google Cloud
- App Engine
---

<!-- More -->

## Google App Engine ##

## Standard Environment ##

### Google Cloud Shell ###

## [補充說明] ASP.NET Core 1.0.1 vs ASP.NET Core 1.1.1 ##

這邊要特別說明一下GCP上的App Engine目前僅支援 [1.0.1](https://github.com/dotnet/core/releases/tag/1.0.1)而這個版本的對應是.NET Core 1.0.0 與 .NET Core 1.0.0 SDK - Preview 2，是在2016年的9月推出的，有賴於社群的積極貢獻與回饋，在短短的7個月官方就推出了新版的[.NET Core 1.1.1](https://github.com/dotnet/core/releases/tag/1.1.1)包含了.NET Core 1.1.1 與 .NET Core 1.0.1 SDK．

而這兩版相比從CLI到產生的專案都差很多，這邊我們快速的讓大家了解一下．

### Create New Project ###

### Template Support ###

### Project Structure ###

### Library/Package Support ###

很遺憾的目前還沒找到可以幫App Engine升級的方法，而支援.NET Core這部分也由於還在Beta所以已經請求官方upgrade到1.1之後的版本．

## References ##

- [Quickstart for .NET in the App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/dotnet/quickstart?hl=zh-TW)