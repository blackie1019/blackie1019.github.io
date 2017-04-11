---
layout: post
title: Emmet LiveStyle hands on Lab
subtitle: ""
date: 2014-08-03 00:29:45
author: Blackie
header-img: ""
categories:
- Development&Coding
tags:
- Emmet
- SublimeText
---

想必大部分人都知道Emmet是一套在SublimeText上Toolkit，而今天要介紹的是旗下的另外一套超方便的Emmet LiveStyle工具,讓你再透過瀏覽器修改檢查時就完成開發項目的調整，而這也是前端開發必學項目之一。

<!-- More -->

## Emmet and Emmet LiveStyle

Emmet是一個網業開發的Toolkit，前身叫做Zen Coding，可以快速的幫你建立Html與CSS文件，還不清楚或想了解更多的人可以先到[Emmet官網](http://docs.emmet.io/)看介紹影片。

而Emmet LiveStyle則是另外一套完全不同的工具，可以在Chrome上面讓你的Browser與Text Editor(當然預設是指SublimeText瞜)協同工作，目前瀏覽器的部分支援Chrome與Safari，編輯器則只有SublimeText。

快速介紹Emmet LiveStyle的特色

- 不用儲存實際檔案
- 修改不用刷新頁面
- Browser與Editor的雙向協同工作
- 跨平台
- 創新的CSS patching
- 安裝與使用方便，完全不用修改工作流程(只有簡化)

## Setup

1. 下載[SublimeText](http://www.sublimetext.com/)
2. 安裝[Package Control](https://sublime.wbond.net/installation)
3. 在SublimeText中使用Package Control安裝LiveStyle

	![1](1.png)

	看到下面的說明代表安裝完成瞜

	![2](2.png).

4. 接著打開Chrome安裝[LiveStyle plugin](https://chrome.google.com/webstore/detail/emmet-livestyle/diebikgmpmeppiilkaijjbdgciafajmg?hl=zh-TW)

	![3](3.png)

5. 然後打開Chrome的開發者工具可以看到多一個LiveStyle的選項選擇開啟功能就可以來玩耍瞜

	![4](4.png)

## Hands on

1. 打開另一個網頁
2. 開啟Chorme developer tool 勾選Enable LiveStyle for current page
3. 這邊會顯示這一個網頁有多少公司是獨立的檔案可以被修改，這邊我們需要把他Mapping到我們SublimeText上面去

	![5](5.png)

4. 這時候如果我們在SublimeText開一份新文件就會發生原本沒有任何可以mapping的下拉選項出現了一個剛剛新開的檔案瞜

	![6](6.png)

5. 接著我們也來讓網頁選轉一下吧

	![7](demo.gif)

## 結語

有這套神奇之後以往麻煩的前端也面修改要一直切換Browser與編輯器的過程可以跟他說掰掰瞜，而SublimeText支援前端的能力有多強小弟就不多贅言，大家還是趕快來動手玩玩吧!
