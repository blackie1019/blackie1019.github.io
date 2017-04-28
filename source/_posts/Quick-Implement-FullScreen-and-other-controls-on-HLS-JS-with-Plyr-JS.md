---
layout: post
title: Quick Implement FullScreen and other controls on HLS.JS with Plyr.JS
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-26 21:54:44
categories:
- JavaScript
tags:
- HLS
- Chrome
---

使用 Plyr.JS 快速的幫HTML5的 video tag支援更多功能並輕鬆客製化介面

<!-- More -->

先前有介紹過 *HLS.JS* 這個套件來協助瀏覽器支援HTML5的video tag 能正常播放HLS格式的影片，今天要來介紹另外一個樣式漂亮且功能強大的套件

![plyr](plyr.png)

## Plyr.JS Introduction ##

[Plyr.JS](https://github.com/selz/plyr)是一個輕巧漂亮的HTML5播放器的 *video* 標籤，這讓我們可以簡單輕鬆的將套件接到目前的網頁中．而它本身也將樣式呈現都放到自己的css檔案內方便我們做調整跟客製化．

以下節錄官方列出來的功能：

Features:

- *Accessible* - full support for VTT captions and screen readers
- *Lightweight* - under 10KB minified and gzipped
- *Customisable* - make the player look how you want with the markup you want
- *Semantic* - uses the right elements. <input type="range"> for volume and <progress> for progress and well, <button>s for buttons. There's no <span> or <a href="#"> button hacks
- *Responsive* - works with any screen size
- HTML *Video* & *Audio* - support for both formats
- *Embedded Video* - support for YouTube and Vimeo video playback
- *Streaming* - support for hls.js, Shaka and dash.js streaming playback
- *API* - toggle playback, volume, seeking, and more
- *Events* - no messing around with Vimeo and YouTube APIs, all events are standardized across formats
- *Fullscreen* - supports native fullscreen with fallback to "full window" modes
- *Shortcuts* - supports keyboard shortcuts
- *i18n support* - support for internationalization of controls
- *No dependencies* - written in "vanilla" JavaScript, no jQuery required
- *SASS* and *LESS* - to include in your build processes
- Works with **Bootstrap**.

而這邊我們也提到可以結合HLS.JS讓我們的瀏覽器如：Desktop的Chrome 播放HLS格式的影片並套用此播放器的其他功能．

## Pyer.JS + HLS.JS ##

```js
var video = document.getElementById('player');
 
if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
}
 
plyr.setup(video);
```

呈現上與預設的HLS.JS的比較如下：

![difference.png](difference.png)

有興趣的可以[參考這個範例](https://github.com/blackie1019/PlyrHLSDemo)．

至於為什麼還要特別用Plyr.JS呢，當你想要的播放功能（如 全螢幕或是自動播放等功能在*當前瀏覽器不支援時*)或是樣式需要做些調整或是客製化的時候，非常建議大家**在前人的輪子上面製造車子**!