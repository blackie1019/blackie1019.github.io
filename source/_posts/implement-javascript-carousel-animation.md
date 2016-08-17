---
layout: post
title: 實作javascript Carousel Animation
subtitle: ""
date: 2013-12-24 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- Basic JS
---

今天幫一個同事做一個前端效果所以自製了簡單的Carousel Animation(10分鐘的code沒有再經過大腦處理過，長得很醜請見諒)

<!-- More -->

![horse](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131224/horse-3.png)

Carousel Animation算以前在做silverlight的時候練到不想再練的東西...

如果還不知道的人可以參考這邊[入門與解說](http://diegolamonica.info/build-a-simple-semantically-valid-carousel-from-scratch-part-4/)

重點其實就在這張圖上(這邊是以Opacity為例，我的實作有加上loop 前後的item)

![重點](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131224/3DCarousel-Animation.png)

重點就是再按下左右的時候幫裡面的物件作增減與呈現效果，接下來直接放很醜的實作

<iframe width="100%" height="300" src="http://jsfiddle.net/7m7T3/6/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
