---
layout: post
title: iOS 10 browser inline video play
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-10-06 16:54:23
categories:
- HTML5
tags:
- iOS
- Safari
---

在上個月iOS 10發佈後更新了safari上面支援inline播放的功能，這邊來解釋一下該如何使用。

<!-- More -->

## Background ##

很多同時有iPad與iPhone的朋友在使用Safari時都覺得很奇怪，為什麼iPad的影片可以直接inline播放，但iPhone卻被強制只能在全螢幕觀看。

而在iOS 10的升級上面提供了[這項彈性](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html)，這邊也總算提供跟iPad一樣的功能給iPhone了，只是你需要稍微對使用的HTML5 Video Tag上添加一個***playsinline***屬性即可。

## Solution ##

這邊介紹一下兩個做法來達到iOS可以支援inline play的作法

### Pure HTML Video Tag ###

可以用你的iOS 10裝置使用Safari看看這[成果參考](http://jsfiddle.net/ogm88ach/2/embedded/result/)。而當然iphone上的Chrome或是尚未支援的就會看到兩個影片都是先播放讓他放大後才能縮小繼續inline觀看。

**Code snippet:**
	
	<body>
	    <h2>playsinline</h2>
	    <video width="320" height="240" controls autoplay loop muted playsinline>
	        <source src="http://www.w3schools.com/TAGS/movie.mp4"  type="video/mp4" />
	    </video>
	    <br/>
	    <h2>Without playsinline</h2>
	    <video width="320" height="240" controls>
	        <source src="http://www.w3schools.com/TAGS/movie.mp4"  type="video/mp4" />
	    </video>
	</body>

### JavaScript Soluion ###

其實有些人可能知道iOS 8 - iOS 9.3有另外一個JS的解決辦法
[iphone-inline-video](https://github.com/bfred-it/iphone-inline-video)。 如果要廣大的支援到iOS的版本可能考慮這樣的作法會較佳!

### Native APP ###

除了Web外，如果你是開發APP的朋友也要記得做一些修改來支援HTML5的Video inline屬性

#### iOS UIWebView ####

1. 設定***allowsInlineMediaPlayback***屬性
2. 添加***webkit-playsinline***屬性至video tag內
3. 如果要支援autoplay則需要在設定***mediaPlaybackRequiresUserAction***屬性

#### Android WebView ####

1. 在 AndroidManifest.xml中啟用 hardware acceleration (add ***android:hardwareAccelerated="true"***) 
2. 設定WebChromeClient在你的 WebView當中.