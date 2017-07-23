---
layout: post
title: 使用iScroll.js讓在Cordova(Phonegap)上面快樂拖曳與捲軸功能＆一秒加速iscroll.js
subtitle: ""
date: 2013-09-10 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- iScroll
- Cordova
---

在開發Hybrid app或是Web app的時候難免會需要做到拖曳或是滾動刷新的功能，通常網頁放到手機上拖放功能都可以正常運作，但如果要做成app的方式，就不會希望你的application被發現可以這樣拖曳(會被猜穿是網頁使用者會有疑慮，使用經驗會不好)

<!-- More -->

![iScroll.js](1.jpg)

## 前言

通常有這需求大致上可能要完成下面幾個功能：

1. 條列頁下拉刷新
2. 左右滑動切換資料(類似carousels效果，以前寫silverlight時第一個做的demo就是這個效果)
3. 點選Zoom in與雙指Zoom out
4. 與滾動相關的操作

當有以上需求的時候就可以透過iScroll.js來幫你完成

## iScroll.js介紹
他可以支援上述的點選縮放(pinch/zoom), 下拉更新(pull down to refresh)與滾動事件等來製作客製功能.

這邊節錄官方的幾個重要功能,以下幾個功能用手機或平板操作比較好

- 下拉更新[DEMO](http://cubiq.org/dropbox/iscroll4/examples/pull-to-refresh/)
- 點選縮放[DEMO](http://cubiq.org/dropbox/iscroll4/examples/zoom/)
- 左右slide效果[DEMO](http://cubiq.org/dropbox/iscroll4/examples/carousel/)

這邊實作上只要先加入該script後在你要使用的dom物件帶入生成iScroll物件即可，如下

	<!doctype html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<script>
			myScroll = new iScroll('div_showcase_img',{ zoom: true });
		</script>
	</head>
	<body>
		<div id="div_showcase_img" class="div_showcase_img">
			<img class="showcase_img_s" src="test.png"></img>
		</div>
	</body>
	</html>

這樣就可以生成一個支援點選縮放的區塊了，如下示意：

一開始：
![demo圖-1](4.png)

點選：
![demo圖-2](5.png)

雙指放大：
![demo圖-3](6.png)

好吧，看圖說故事是沒用的，來看影片吧哈哈

<iframe width="90%" height="315" src="https://www.youtube.com/embed/pENszKvvGEg" frameborder="0" allowfullscreen></iframe>

## 祕技：一秒加速

接下來來示範一秒加速

將下面打開iScroll.js並將103行的useTransition從false改為true就好

![加速](2.png)

一秒搞定真給力！其實是參考K大的文章-[iScroll.js的scroll不順怎麼辦？](http://www.icoding.co/2012/03/iscroll-js%E7%9A%84scroll%E4%B8%8D%E9%A0%86%E6%80%8E%E9%BA%BC%E8%BE%A6%EF%BC%9F)

現在最新版的iScroll5 也在beta了，目前已經有的demo非常多，看來功能真的變強大了

![demo圖](3.png)

有興趣的可以上他們[Github](https://github.com/cubiq/iscroll)關註一下
