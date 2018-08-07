---
layout: post
title: Visual Studio Code Change Syntax
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-07 14:02:47
categories:
- Tool
tags:
- VSCode
---

分享在 VSCode 切換檔案 syntax 的幾種方法
<!-- More -->

一般開啟一個新檔案的時候都希望提供當下撰寫語言的一些 highlight 與排版功能，有幾種方法可以幫助我們讓當前檔案達到此目的。

## 儲存特定附檔名檔案 ##

VSCode 對很多程式語言與檔案格式有所支援，預設有支援的可以查看[Known language identifiers](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers)

所以我們如果要達到當前檔案的highlight效果可以透過另存取新檔後達到預設檔案名稱的支援。

![01](01.png)

## 透過 VSCode 畫面上的 Language 切換 ##

今天如果不想先存檔案或是檔案預設的 syntax 在 VSCode 上面也提供切換的功能 :

![02](02.png)

## 透過 Command Palette 觸發 ##

我們也可以透過 Command Palette (Windows 的快捷鍵 Ctrl+Shift+P 或是 macOS的快捷鍵 ⇧⌘P)，再選擇 *change language*

![03](03.png)

## 直接輸入快捷鍵 Ctrl+K, M ##

再上一頁，可以看到該設定有預設支援的快捷鍵:

1. 先按 *Ctrl+K*
2. 再按 *M*

就可以看到設定的畫面

![04](04.png)

如果對於預設的語言或是副檔名支援有其他對應配置的想法也可以在此修改**語言**或是**副檔名**的對應。