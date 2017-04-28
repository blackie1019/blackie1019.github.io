---
layout: post
title: HTML5 Localstorage and Sessionstorage
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2013-07-17 15:25:21
categories:
- HTML5
tags:
- Web Storage
- localStorage
- sessionStorage
---

HTML5新增了一些client資料儲存的功能，localStorage與sessionStorage，這邊將講解一下如何使用正確的使用他們。

<!-- More -->

在談如何使用前，先參考前輩們整理出來為什麼不要用既有的cookie來作儲存解決的原因

## Cookie 缺點 ##

- Cookie在每個HTTP request送出時都會被送到Server端，不管你沒有要用到Cookie中的資訊，在某種程度上會拖慢執行的效能與浪費不必要的網路頻寬
- Cookie送出的資料本身並沒有加密，因此除非我們用SSL一類的技術做加密，否則Cookie中不宜放任何重要的資訊
- Cookies最大才4KB，不可能存太多資料

[參考](http://www.dotblogs.com.tw/jimmyyu/archive/2011/03/27/html5-client-storage.aspx)

## HTML5's new feature ##

知道cookie的缺點後，那我們才看看有哪些html5提出的新解決方法

主要可以分為以下三項

- localStorage

	支援度最廣，使用上最簡單，速度快，跨平台，生命週期較長，原則上要等到透過Javascript將內容清掉或者使用者清空Cache時才會消失

- sessionStorage

	同localStorage的特性，差別在於生命週期較短在Browser/Tab關閉時就會清空

- IndexedDB/Web SQL Database

	Web SQL Database支援用SQL存取，操作很像資料庫，是基於SQLite修改的，但目前是被W3C捨棄，不算是一個標準，IE和Firefox都不支援，操作速度也頗慢

*IndexedDB* 是W3C用來取代Web SQL Database的新規範，但目前仍在制定階段
使用上可以參考[這篇](http://msdn.microsoft.com/zh-cn/library/ie/hh779017(v=vs.85).aspx)

詳細支援程度可參考[http://www.html5rocks.com/it/features/storage](http://www.html5rocks.com/it/features/storage)

## Practice with localStorage and sessionStorage ##
 
今天我們先介紹前兩個最長被使用的localStorage與sessionStorage使用上與實務上結合json的擴充用法
 
首先我們先看一下支援度，[參考](http://www.quirksmode.org/dom/html5.html)

![support](20137711575447.png)

從上面我可以知道幾乎目前主流的瀏覽器都支援了Web Storage(localStorage and sessionStorage)，[市佔參考](http://thenextweb.com/apps/2013/01/01/ie10-below-1-market-share-firefox-back-under-20-chrome-recovers-from-three-months-of-losses/)。
 
而使用上可以分為get,set,remove三種，分別如下

 {% codepen blackie1019|anonymous|anon qhaIl 7928 result 300 100% %}

上面我可以在輸入框輸入值後透過 get 來 alert 值，而當我們 remove 之後再用 get 則會出現 **null** ，是不是很簡單使用

seesionStorage 也是如此歐，只是把window.localStorage.getItem換成(set,remove以此類推）

	windows.sessionStorage.getItem

 {% codepen blackie1019|anonymous|anon LykfE 7928 result 300 100% %}

因為是 *key-value* 的架構，所以在實務上我習慣將儲存進去的item設為是一個 **json** 的格式，如此一來之後要取用就很方便摟（而且可以一次拿多個值勒）
這邊要稍微注意在 *get* 跟 *set* 的時候要做一下資料處理
存進去前的值要做
	
	JSON.stringify()

取出去後的值要做

	JSON.parse()

使用上的參考範例如下

 {% codepen blackie1019|anonymous|anon ECrAk 7928 result 300 100% %}