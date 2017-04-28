---
layout: post
title: Phonegap archives/build armv7s error!（What different between armv6/armv7/armv7s/arm64?)
subtitle: ""
date: 2013-10-12 00:29:45
author: Blackie
header-img: ""
categories:
- Mobile
tags:
- Phonegap
- Cordova
---

在Xcode 4.6.X的時代預設使用的Archives與build的架構是在armv6/armv7/armv7s(但armv7s預設不會開啓)所以在打包ipa檔案都沒什麼問題，直到最近換成Xcode5與iOS7之後真的是一連串的悲劇。

<!-- More -->

先直接的說明，如果你要打包Phonegap的專案請使用armv7就好，設定上如下圖：

![1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131012/1.png)

上面可以看得很清楚Xcode5預設的打包(最右邊的iOS Default)是跑在armv7/armv7s/arm64，

如果不改成只支援armv7就會發生下面的悲劇錯誤


![2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131012/2.png)

講完解決辦法，就來講講這幾個設定到底有什麼差別，其實他們就是ARM對應的指令版本

- armv6
	- iPhone
	- iPhone2
	- iPhone3G
	- 第一代和第二代iPod Touch
- armv7
	- iPhone4
	- iPhone4S
- armv7s
	- iPhone5
	- iPhone5C
- arm64
	- iPhone5S	 

如果在build setting的Architectures中 選擇“Standard Active Architecture Only”為Yes則會根據你目前的裝置打包對應的版本；但若選false，則會讓编译器一起打包兩個指令集的版本檔案會比较大，但是能使用Armv7的優化，同時也能讓較舊的機器也正常使用。

這邊要注意一點，一般Debug的时候“Build Active Architecture Only”如果你選擇YES，這是讓你以目前架構看程式是否有问题，而你如果是要Release的时候一定要選擇NO，因为需要配合其他的機型來使用，而且不選額no的話也不能讓你打包的歐！這點要千萬注意。

關於Build Active Architecture Only如何設定可以參考[[iOS]Xcode4 upgrade to Xcode5:ld: symbol(s) not found for architecture armv7 or armv7s linker error
](https://blackie1019.github.io/2013/10/10/xcode4-upgrade-to-xcode5-symbol-not-found-for-architecture-armv7-or-armv7s-linker-error/)
