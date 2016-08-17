---
layout: post
title: iOS & Android icon and preloading size list
subtitle: ""
date: 2013-10-02 00:29:45
author: Blackie
header-img: ""
categories:
- Mobile
tags:
- iOS
- Android
---

整理一下開發APP時所要知道的各項尺寸

<!-- More -->

## iOS:(PNG only)

### preloading

- 320 × 480 (iphone3gs) Default~iphone.png
- 640 × 960 (iPhone4) Default@2x~iphone.png
- 768 × 1004 (iPad) Default-Portrait~ipad.png
- 1024 x 768 (iPad) Default-Landscape~ipad.png
- 1536 × 2008 (Retina iPad)  Default-Portrait@2x~ipad.png
- 2048 × 1496 (Retina iPad)  Default-Landscape@2x~ipad.png
- 640 × 1136 (iPhone 5)  Default-568h@2x~iphone.png

### icon

- 57×57 (default iPhone) icon.png
- 114×114 (Retina iPhone) icon@2x.png
- 72×72 (default iPad) icon-72.png
- 144×144 (Retina iPad) icon-72@2x.png
- 512×512 (app store) application144x144.png

## Android:

### preloading(none or by device screen)
### icon
- ldpi should be 36 x 36
- mdpi should be 48 x 48
- hdpi should be 72 x 72
- xhdpi should be 96 x 96
- xxhdpi should be 144 x 144

## icon slayer

這是一個可以你只要上傳一張圖就可以幫你產生不同尺寸iOS&android icons的網站(含光影與圓角效果等調整)

[icon slayer](http://www.gieson.com/Library/projects/utilities/icon_slayer/#.UkuTiWQskVl)
