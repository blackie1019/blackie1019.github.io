---
layout: post
title:  NTVS - Node.js Tools For Visual Studio Bootcamp
subtitle: ""
date: 2013-12-27 00:29:45
author: Blackie
header-img: ""
categories:
- Development&Coding
tags:
- Visual Studio
- NodeJS
---

NTVS是微軟上個月底新發行的一個VS tool，幫助開發者使用地表最強IDE工具開發NodeJS!除了支援可以一般的程式撰寫它還支援Intellisense, Profiling, npm，另外他在Debugging方面還支援 locally and remotely (Windows/MacOS/Linux)，最棒的是他整合了Azure Web Sites 與 Cloud Service.

<!-- More -->

![N](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/Codeplex%20Logo.png)

## Introduction

所支援的功能包含：

- node projects
- Intellisense
- Debugging (local & remote with support for Linux and MacOS)
- Profiling
- node REPL with multi-line editing
- Integrated npm GUI
- Azure Web Sites
- Azure Cloud Service
- Git publishing

目前visual studio 2012與2013都可使用(2010與08只能殘念)，整個NodeJS Application從開發、測試到發佈都可以透過VS來完成!真的不愧對"地表最強"這四個字阿!現在就讓我們趕快來安裝與使用吧!

## Setup

安裝上蠻簡單的只要依序完成下面幾個動作即可

1. 先下載並安裝[NodeJS](http://nodejs.org/)
2. 下載並安裝[NTVS](https://nodejstools.codeplex.com/releases)
3. 安裝完成後打開VS選擇New Project->Installed->Templates->Other Languages->Javascript就可以看到六個新的專案類型

	- <em>**From Existing Node.js code**</em>

		用現有的NodeJs程式建立新的專案	 	

	- <em>**Blank Node.js Console Application**</em>

		建立一個空白的NodeJs　Console專案(偏向一般桌面程式應用）

	- <em>**Blank Node.js Web Application**</em>

		建立一個空白的NodeJs　Web專案

	- <em>**Blank Express Application**</em>

		建立一個空白的Express(NodeJs的一種開發架構下面會再提到)專案

	- <em>**Blank Windows Azure Node.js Application**</em>

		建立一個支援Windows Azure　publish整合的NodeJs專案

	- <em>**Blank Windows Azure Express Application**</em>

		建立一個支援Windows Azure　publish整合的Express專案


## Hello world with Blank Node.js Web Application

這邊我們選擇Blank Node.js Web Application來實作我們第一個NTVS的Hello world

1.　在專案這邊選擇建立新的Blank Node.js Web Application，這邊會幫我們建立以下資料

![ARCH](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/Arch.PNG)

server.js預設的內容如下：

	var http = require('http');
	var port = process.env.port || 1337;
	http.createServer(function (req, res) {
	    res.writeHead(200, { 'Content-Type': 'text/plain' });
	    res.end('Hello World\n');
	}).listen(port);

2.然後直接按下f5執行，就可以看到跑出一個node.exe的執行顯示port 5858 被監聽中，然後去看他開啟的網頁

Hello world已經幫我們開好瞜～

![hello world](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/hello%20world.PNG)

## Hello world with Blank Express Application

這邊我們換成用選擇Blank Express Application來作我們第二個NTVS的Hello world

1.　在專案這邊選擇建立新的Blank Express Application，在專案建立後會幫我們透過NPM來載入需要的模組

![NPM](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/npm%20update.PNG)

順邊會幫我們建立express架構所需的資料(如果模組載入失敗會像下圖一樣顯示missing，可以右鍵手動去更新他的版本或來源或是解除安裝等設定)

![ARCH express](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/Arch%20express.PNG)

2.然後直接按下f5執行，就可以看到跑出一個node.exe的執行顯示port 5858 被監聽中，然後去看他開啟的網頁

第二個Hello world也幫我們開好瞜～

針對NPM與Express的部分先前在講MAN這個架構的時候已經有介紹過，NPM請參考[這邊](http://www.dotblogs.com.tw/blackie1019/archive/2013/10/23/125248.aspx)若是想知道express架構上的內容請參考[這邊](http://www.dotblogs.com.tw/blackie1019/archive/2013/10/23/125249.aspx)

## Still need improve

官方已知的問題(其他更多小問題請上論壇看更多瞜，但我覺得都不影響使用就是了)

- Intellisense fails on large projects (JS lang service timeout issue)
- REPL: no intellisense

但如果要我選IDE工具，我選一百次一定都是選VS！！BJ4

## Other Tips

在Node web application開發上面現在有幾個比較有名的套件

- [Express](http://expressjs.com/)(會在搭配[Jade](http://jade-lang.com/)來做)
- [Restify](http://mcavage.me/node-restify/)
- [Node-perfectapi](http://perfectapi.github.io/node-perfectapi/)
- [partialJs](http://www.partialjs.com/)

而我之後會在分享最近比較感興趣的partialJs，為什麼會感興趣哩!簡單看他幾個特色瞜BJ4

-	**Light**
	![1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/compare_1.PNG)

-	**Can use own Route or WebSocket**

	![2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/compare_2.PNG)

-	**More Features support for viewengine**

	![3](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/compare_3.PNG)

-	**Auto LESS　CSS**

	![4](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/compare_4.PNG)

-	**No dependencies and Faster**

	![5](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131227/compare_5.PNG)
