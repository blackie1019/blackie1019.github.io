---
layout: post
title: macOS occurred problem when installation -  missing xcrun issue
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-10-04 09:26:25
categories:
- Tool
tags:
- macOS
---

分享如何解決在 macOS 安裝其他軟體或工具遇到 missing xcrun 的問題

<!-- More -->

昨天將手上 macbook 升級至最新的 macOS:Mojave 後，透過 *homebrew* 進行套件更新時就會發生  missing xcrun 的問題: **invalid active developer path**，導致 git 指令不能正常執行成功．詳細的錯誤如下：

    xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun


查了一下相關資料，有可能發師的原因是 xcode 的套件位置移動或是位置不正確了，透過以下指令可以重新設定相關設定：

    xcode-select --install

接著會跳出視窗一步步按下同意與確認即可．

而當我們再次使用 homebrew 進行更新後即可以看到正確的回應

![1.png](1.png)