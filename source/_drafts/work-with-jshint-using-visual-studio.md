---
layout: post
title: Work with JSHint using Visual Studio
subtitle: ""
date: 2014-01-19 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags: 
- JSHint
- Visual Studio
---

介紹如何在Visual Studio使用JSHint

<!-- More -->

![LOGO](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20140120/jshint_vs.png)

上一篇文章介紹了[Work with JSHint using Sublime Text 2
](https://blackie1019.github.io/2014/01/17/work-with-jshint-using-sublime-text/)，這次要補充如何在Visual Studio也使用JSHint來幫我們達到一樣的效果，畢竟地表最強IDE不是叫假的啊！

##Visual Studio版本

而Visual Studio版本的部分，我們回想一下上篇剛開始前面介紹有提到JSHint是JSLint其中一個分支，是因為在實務上有些JSLint規範太過嚴格的部分作出了部分的取捨而成的子集，所以相對的條件較少，所以這邊我們雖然找不到JSHint的extension但我們可以用JSLint.VS2012做些微調整即可。

###前置工作

1. 下載並安裝VS
2. 下載並安裝JSLint.VS2012 extension
3. 設定JSLint檢查條件