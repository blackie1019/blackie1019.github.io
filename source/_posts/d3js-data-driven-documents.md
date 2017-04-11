---
layout: post
title: D3.JS:Data-Driven Documents
subtitle: ""
date: 2014-08-26 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- D3js
---

[D3.JS:Data-Driven Documents](https://github.com/mbostock/d3/wiki)，是本人近期很感興趣的一個js 套件，它提供了一些基於文件操作方式的js函式，讓文件的資料呈現可以透過更能讓瀏覽者理解與互動的方式來使用，大大的提升了可讀性與使用率。

<!-- More -->

在動手前我們先來知道一下D3到底做了什麼，這邊節錄底部大大書裡的一段話

>Fundamentally, D3 is an elegant piece of software that facilitates generation and manipulation of web documents with data. It does this by:

- Loading data into the browser’s memory
- Binding data to elements within the document, creating new elements as needed
- Transforming those elements by interpreting each element’s bound datum and setting its visual properties accordingly
- Transitioning elements between states in response to user input

這邊來看幾個showcase與demo吧

- [D3.js Line Chart](http://www.youtube.com/watch?v=1_LDH1T1D1Y)
- [Leap Motion D3.js Demo](http://www.youtube.com/watch?v=qYEHt_ykDR0)
- [At the National Conventions, the Words They Used](http://www.nytimes.com/interactive/2012/09/06/us/politics/convention-word-counts.html?_r=0)
- [treemap](http://mbostock.github.io/d3/talk/20111018/treemap.html)
- [World Tour](http://bl.ocks.org/mbostock/4183330)
- [Hive Plots](http://bost.ocks.org/mike/hive/)


如果想看了解更多，請知道還有什麼更酷的實例[請看](https://github.com/mbostock/d3/wiki/Gallery)，想了解更深請看[ACM期刊](http://dl.acm.org/citation.cfm?id=2068631)

## Hands on with D3js

接著我們來動手玩玩D3js吧,先到[官方Github](https://github.com/mbostock/d3/wiki)下載最新的code,使用上很簡單只要加入下面這段即可

'''js
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
'''

這邊我們簡單先做出一個表格再來跟大家說明

## 結語

會寫這篇其實跟以前在學時期玩過一陣子splunk有關，基本上splunk是一個收集記錄(log)或是任何資料(data)，經過處理與計算後以圖像或表單的方式來讓使用者更能看出一些現象的趨勢與探討出一些指標做出預測。Acer使用splunk做出了SOC的安全預測中心的一套偵測系統，而e-Travel(歐洲前十大網路旅行社)也透過splunkf去將它自有的巨量資料即時分析與搜尋的功能除了減少人工作業的時間與人力外，也降低了營運的成本。

而splunk這套系統除了本身索引建置與查詢極具戰力之外，早期splunk最引人樂道的是他將資料轉換成更容易了解的互動式視覺資料，這讓使用者在從巨量(big data)中更能發現出所期望預測的結果或是一些因素，當我們都在ㄧ昧的要求做到更快速的查詢與建立更完善的資料的同時，是否能透過其他方式來找出更值錢的且更能讓看的人了解的資料是更加重要的。

對於D3有興趣的人可以參考下面的讀物，是中文的書籍以及他線上免費閱讀的原文版本(作者真的很佛心)

- [網頁互動式資料視覺化：使用 D3 (Interactive Data Visualization for the Web)](http://www.tenlong.com.tw/items/9862769858?item_id=887625)
- [線上閱讀(英文版)](http://chimera.labs.oreilly.com/books/1230000000345/index.html)