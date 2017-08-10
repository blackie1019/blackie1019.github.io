---
layout: post
title: 'local-npm: Offline npm registry'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-08-10 10:13:00
categories:
  - CI&CD
tags:
  - npm
  - Continuous Integration
---

介紹 local-npm 並使用它達到 offline 或 on-premise 的 npm registry 建置。

<!-- More -->

![banner](banner.svg)

不少企業在公司內都有設定防火牆會去阻斷不在白名單裡面的連線來源或目的地，而當公司防火牆把 npm 官方的 registry 阻斷時或是與官方 registry 連線過慢希望有一個內部的 npm registry 加速下載時該怎麼處理呢？

這是要介紹的 local-npm 就是解決這樣的一個問題的神器！

## local-npn introduction ##

[local-npm](https://github.com/local-npm/local-npm/)，引用官方自述：

>Local and offline-first npm mirror

它就是一個本機版本的 npm registry，當它運行起來後會持續地去官方 registry 更新下載 packages。而我們只要將運行專案的 npm registry 指向 local-npm 後，就如同正常操作 npm 指令的方式操作即可，沒有任何多餘的設定或修改。

### Setup and running ###

安裝透過 npm 即可完成：

    npm install local-npm -g

安裝完後執行下面指令啟動：

    local-npm

當運行起來後會看到視窗顯示再跑 sync 套件的指令，第一個數字是目前下載的套件數，第二個數字是整體完成度。

![sync_1](sync_1.png)

當完成度到100%他還是會持續進行 sync ，所以就算線上有一個馬上新增的套件也可以被 local-npm 在短時間 sync 回本機。

![sync_2](sync_2.png)

而在 sync 的過程不會影響我們的使用，只是套件可能看不到而已。我們可以透過 npm *set* 指令來修改當前的 npm registry 或是透過專案下的　.npmrc　檔案來做 registry 修改

    registry = http://<local-npm server ip>:<port>