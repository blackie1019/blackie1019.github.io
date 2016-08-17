---
layout: post
title: Xcode4 upgrade to Xcode5 - symbol(s) not found for architecture armv7 or armv7s linker error
subtitle: ""
date: 2013-10-11 00:29:45
author: Blackie
header-img: ""
categories:
- Mobile
tags:
- iOS
---

最近因為手殘把手機從iOS6升到iOS7後發現原本的Xcode4.6.3不能開發了…要使用Xcode5才可以上實機開發，而Xcode5又要OSX至少10.8以上的版本才能安裝，

<!-- More -->

所以昨天花了一整天才把因手殘發生的悲劇環境重新弄好，正當興高采烈地打開專案要開始上實機開發卻發生了下面的悲劇畫面

![1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131007/2.png)

後來查了一下，原來是因為專案架構目前不支援的緣故(專案內有些只能跑armv7而不是armv7s)，而我們可以透過在修改專案的Active Architecture Only的方式來避免掉這個問題，如下：

![2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131007/1.png)

Active Architecture Only這個設定值預設是No的這邊我們要設定為Yes後就可以了，而這個值如果是Yes其實是設定在按下左上方執行(run)時讓專案只依據你目前連接的手機進行重建(build)，執行上會比預設還快一點，而預設的No則是不依據你的手機做執行(就有可能發生armv7 or armv7s linker error)

目前看來打包出來的app還是可以run在iphone4,iphone4s 只要你專案設定SDK有支援的目前看來還是可以執行的(只要iOS Deployment Targets有支援你選擇的iOS版本，這邊我是選擇5.0)

而如果你也是跟我一樣用Phonegap開發APP的話強烈建議你升級到最新的Phonegap版本，因為這部分有些舊的專案設定已經不支援或建議修改了（目前我用的是2.5 & 2.7，專案內有很多警告....)
