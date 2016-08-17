---
layout: post
title: Cannot hide status bar in iOS7
subtitle: ""
date: 2013-11-03 00:29:45
author: Blackie
header-img: ""
categories:
- Mobile
tags:
- iOS
---
如何隱藏iOS7的狀態列
<!-- More -->

最簡單的做法是在你的APP .plist 裡面加入下面兩個屬性

- Status bar is initially hidden = YES

- View controller-based status bar appearance = NO

增添完plist如下圖：

![plist](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131103/plist.png)

這樣就可以遮蔽摟～！

遮蔽前：

![前](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131103/before.png)

遮蔽後：

![後](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131103/after.png)

這樣簡單的兩個設定當初還找了一陣子.....iOS7預設是會顯示status bar 這邊要提醒大家一下摟
