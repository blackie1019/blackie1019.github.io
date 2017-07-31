---
layout: post
title: Travis CI build daily with nightli.es
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-08-20 00:01:00
categories:
- CI&CD
tags: 
- Travis CI
- Continuous Integration
---

協助Travis CI建立每24小時至少建置一次的行為，確保外部套件或內部程序可正常被建置

<!-- More -->

在開發時難免會有用到別人套件的情況，而使用Travis CI雖然可以幫我們在push code到remote repository時，即時建立專案編譯與發佈至對應的位置，但如果我們有遇到使用的Library會不定時建置同一版本時你就需要[nightli.es](https://nightli.es/)協助，可以每天至少建置一次的Travis CI排程。

## 設定 ##

使用上很簡單只要上[nightli.es](https://nightli.es/)後登入你的github帳號並設定要建立daily build的專案，將他turn on即可。

![turn on](1.png)

## 結語 ##

本部落格是用Hexo來建立的，而Hexo在建立文章時可以加入date來指定該文章的時間。但卻點是如果要將該篇文章正常的被建置至首頁節錄顯示或是新增至routing則一定要經過編譯與重新發佈。

![date](2.png)

此時，就是需要nightli.es協助我們建立每天執行一次daily build來確保每天的文章都正常地顯示在首頁上。

而此篇文章也是前一天預先寫好跟透過daily build來發佈的歐! 有需求的朋友快點來嘗試看看吧。