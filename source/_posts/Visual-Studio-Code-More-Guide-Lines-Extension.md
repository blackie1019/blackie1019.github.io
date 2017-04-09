---
layout: post
title: Visual Studio Code More Guide Lines Extension
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-09 01:38:08
categories:
- Tool
tags:
- VSCode
---

使用Guides 讓VSCode快速幫你對齊程式區塊

<!-- More -->

常寫js的人應該對於以下的波動拳法不陌生：

![before](before.png)

雖然已經有JavaScript Promise了，但難免還是會看到一堆階層排版的code．當然除了js外其他語言也有這樣的問題．

而[Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides)這個VS Code Extension就是幫我們增加快速對齊的格線，讓我們清楚的知道區塊的範圍

# Installation #

開啟 VS Code 快捷開啟指令碼 (⌘+P),然後貼上下面的指令

    ext install guides

或是在Extension區塊查詢Guides點選安裝

安裝完後我們就可以看到原先的波動拳增加隔線了～

![after](after.png)

雖然不能解決波動拳的問題，但至少眼睛壓力可以減少不少...

而除了js檔案外，其他檔案也是支援的

![other](other.png)