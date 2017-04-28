---
layout: post
title: flurry:symbols not found for architecture i386
subtitle: ""
date: 2013-10-11 00:29:45
author: Blackie
header-img: ""
categories:
- Mobile
tags:
- iOS
---
Flurry更新設定
<!-- More -->

這邊小弟原先使用的Flurry因為要app要上iOS7所以要更新到4.2.3以上的版本才能支援，所以先去官網下載了目前最新版的4.2.4，並將檔案放置專案後如下：

![1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93blog/blogs/20131011/1.png)

但是當我們run在iOS7的裝置或模擬器時會出現下面的錯誤

![2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93blog/blogs/20131011/2.png)

這邊的修正方式是到target>Build Phases>Link Binary With Libraries中加入Security.framework後再重新run該專案即可正常執行了

![3](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93blog/blogs/20131011/3.jpg)

這邊要稍微注意一下如果你還是有遇到iOS實機執行的問題可以參考小弟之前另外一篇[[iOS]Xcode4 upgrade to Xcode5:ld: symbol(s) not found for architecture armv7 or armv7s linker error](https://blackie1019.github.io/2013/10/10/xcode4-upgrade-to-xcode5-symbol-not-found-for-architecture-armv7-or-armv7s-linker-error/)
