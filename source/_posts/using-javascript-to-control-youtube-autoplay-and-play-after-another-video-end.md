---
layout: post
title: How to Control YouTube AutoPlay and Play after another video end
subtitle: ""
date: 2014-04-14 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- API
---

今天被一個朋友問起如何控制embed的YouTube影片，讓他可以自動撥放也可以在播放完後讓另外一個embed的影片也播放。

<!-- More -->

這邊先介紹一下官方的API ─ [Youtube IFrame API](https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw)

## What is Youtube IFrame API

Youtube iFrame API是Google官方提供的一組JavaScript Library讓我們可以輕鬆控制嵌入的影片，但不同於[Flash](https://developers.google.com/youtube/flash_api_reference?hl=zh-tw) 與 [JavaScript](https://developers.google.com/youtube/js_api_reference?hl=zh-tw) player API都在網頁內嵌入一個Flash object的概念，IFrame API 使用 `<iframe>` tag ，在HTML5的支援下這提供了更穩固的播放基礎。

它目前的功能包括：

- Play(include seeks to a specified time), Pause and Stop Video
- Video information
- Queueing functions
- Quality、Mute、Volume、Screen Size Control
- Can Get Player State
	- 1 – unstarted
	- 0 – ended
	- 1 – playing
	- 2 – paused
	- 3 – buffering
	- 5 – video cued

## Hand on Lab

在開發上主要透過Create 一個`YT.Player` object的方式去操控處理，基本的操控如下:

<a class="jsbin-embed" href="http://jsbin.com/yasar/2/embed?html,css,js,console,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

接下來介紹如何使用這個API1幫我們完成在ㄧ個Player播放完影片後自動trigger另外一個player播放，範例如下：

<a class="jsbin-embed" href="http://jsbin.com/wevuka/2/embed?html,css,js,console,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

如此一來透過這個API我們就可以很輕鬆的處理影片播放的任何需求了
