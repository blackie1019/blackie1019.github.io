---
layout: post
title: 'Robomongo, Native and cross-platform MongoDB manager'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-31 05:35:12
categories:
- Database
tags:
- MongoDB
---

介紹一個跨平台的MongoDB UI Admin 工具

<!-- More -->

用了MongoDB好一陣子，分享一下最近在用的MongoDB Admin Tool，來幫助大家快速地做資料管理

# Robomongo #

Robomongo是一個免費開源的跨平台MongoDB Admin UI Tool，標榜取之於社群用之於社群的開源精神，就是要給你免錢的大平台!!!!

而他目前提供三個平台Windows, macOS 與 Linux。目前三個的使用率如下:

![cross_platform](cross_platform.png)

目前推出的1.0RC會在正式版的時候support MongoDB 3.4。

# Work with MongoLab #

## MongoLab ##

以往學習 MongoDB，總是要大家先去網站下載檔案、解壓縮、設定、執行。這樣真的很浪費時間，如果是小型測試或是demo就可以用MongoLab來快速幫我們免費建置 MongoDB Server，大小是 512 MB，而從學習的角度來說已經相當足夠。如果是需要正式hosting也可以調高預算(看你想要的主機配備)。

![plan](plan.png)

# Robomongo Features #

這邊全覽一下實際的操作介面:

![ui](ui.png)

我們也可以打開操作的log看每一個指令實際上的訊息

![log](log.png)

## Robomongo Connection Setup with MongoLab ##

設定上這邊要稍微注意一下，MongoLab需要如果要從外面連過去建議另外開一個user 帳戶。

![detail](detail.png)

接著我們將連線資訊填寫到Robomongo的連線管理中

![setup1](setup1.png)

切換至authentication分頁填寫我們剛剛申請的user帳號與密碼，並將要連線的database名稱填入

![setup2](setup2.png)

接著我們再透過設定好的連線連結至指定資料庫即可

# References #
-['Unable to authorize' when connect to mongolab sandbox](https://github.com/Studio3T/robomongo/issues/949)