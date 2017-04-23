---
layout: post
title: ASP.NET Core play with Firebase
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-30 07:55:14
categories:
- Asp.Net
tags: 
- Asp.Net Core
- Firebase
- GCP
---

介紹GCP上的Firebase服務，並實作與ASP.NET Core整合

<!-- More -->

## Firebase Introduction ##

Firebase 是一個同時支援 Android、iOS 及網頁的 app 雲端開發平台，協助 app 開發者在雲端快速建置後端服務，提供即時資料庫，有效縮短應用程式的開發時間，並幫助開發者更專注在本身應用程式的優化．Firebase目前包含以下功能：

- Cloud Messaging

Deliver and receive messages across platforms reliably
gmp_auth

- Authentication

Reduce friction with robust authentication
gmp_database

- Realtime Database

Store and sync app data in realtime
gmp_storage

- Cloud Storage

Store and serve content with ease
gmp_functions

- Cloud Functions

Run your mobile backend code without managing servers
gmp_hosting

- Hostingplat_web

Deliver web content faster
gmp_test_lab

- Test Labplat_android

Test in the lab, not on your users
gmp_crash
Crash Reportingplat_iosplat_android

Keep your app stable


## Integration with ASP.NET Core ##

[FirebaseDatabase.net](https://github.com/step-up-labs/firebase-database-dotnet)

## References ##

- [Google - Firebase](https://firebase.google.com/docs/)
- [Firebase C# library](https://medium.com/step-up-labs/firebase-c-library-5c342989ad18)
- [Firebase 心得（Realtime Database）](http://jasonchiucc.github.io/2016/07/20/firebase-tutorial-realtime-database/)