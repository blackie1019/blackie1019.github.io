---
layout: post
title: Edit Hosts file in Mac OS X with Terminal
subtitle: ""
date: 2014-01-18 00:29:45
author: Blackie
header-img: ""
categories:
- Linux
tags:
- OSX
---

如何在OSX的環境加入自行建立的domain

<!-- More -->

Mac的host file 是在/etc/hosts，所以我們可以透過編輯器直接開啓

	sudo nano /etc/hosts

打開後再加入你要加入的domain

![hosts](hosts.png)

然後按下Control+O 再按下enter存檔後用Control+X離開

接著我們要清空我們現在的DNS資料(cache與正在執行的執行檔）

	dscacheutil -flushcache;sudo killall -HUP mDNSResponer

接下來就可以在網頁打入你剛剛輸入的domain測試看看摟
