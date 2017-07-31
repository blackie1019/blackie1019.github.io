---
layout: post
title: Travis CI Cron Job to build up Daily Release
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-17 14:31:08
categories:
- CI&CD
tags:
- Travis CI
- Continuous Integration
---

介紹Travis CI官方的Cron Job功能，讓固定週期佈署可以一鍵完成。

<!-- More -->

早先有介紹過一個協助Travis CI每固定週期(每天，每週或每月)至少建置一次的套件nightli.es。而Travis CI其實已經把Cron Job的功能導入了，就讓我們學習如何設置。

而之後我們也可以結合Travis CI與Hexo的發佈指令達到Hexo部落格每日排程更新的效果

# Cron jobs Introduction #

Linux上面一值都有Crontab的概念，而Travis CI的Cron jobs就是一個固定時間/週期就會執行的一個排程服務，會幫我們把指定Repository的最後push進去的commits拿出來重新按照TraivsCI設定重新建置。 而我們可以透Cron jobs總是獲取特定分支上的最近提交的特性，在該狀態下持續重新建構項目。

Cron作業可以每天，每週或每月運行，這實際上是指在所選時間段之後最多一個小時內會執行，但它們也可以被跳過(如果你已經有手動執行過)。 

下面這邊是透過設定即可看到新增或是刪除Cron Jobs的按鈕。

![setting_1.png](setting_1.png)

![setting_2.png](setting_2.png)

目前Cron作業無法設置為在特定時間運行，最小單位也必須與日為單位是比較可惜的。而該服務目前還在Beta希望之後還能在強化這方面。


# Daily Release #

這邊如何透過Travis偵測Github的push commit，可以參考另外一位MVP - Larry Nung的[Travis系列文章](http://larrynung.github.io/tags/Travis/)

而我們直接從Travis CI的Build History這邊看結果:

![result](result.png)

可以發現有一筆CRON標籤的紀錄，這就是排程幫我們執行。而這樣透過Cron Jobs在固定週期幫我們取出Hexo的Source Code做build，並透過Travis CI設定去執行NPM的指令達到Hexo Release我們即可輕鬆地做每日定期發布。

這樣的好處讓我們可以把Hexo的特定文章日期設為未來時間，透過這樣固定的發布就可以在我們在未來時間真的到的時候才做發布，達到部落格排程發佈的效果!!

# References #
- [Travis CI - Cron Jobs](https://docs.travis-ci.com/user/cron-jobs/)
- [Travis CI build daily with nightli.es](https://blackie1019.github.io/2016/08/19/Travis-CI-build-daily-with-nightli-es/)