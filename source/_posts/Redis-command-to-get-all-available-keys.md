---
layout: post
title: Redis command to get all available keys
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-28 12:30:57
categories:
- redis
tags:
- redis commands
- redis-cli
---

如何顯示當前 Redis 內有的所以 keys 名稱

<!-- More -->

Redis CLI 提供了一組指令 *dbsize* 可以顯示當前的 keys 數量．

![01](01.png)

這邊可以透過兩個指令 *keys* 與 *scan* 來拉出當前所有 keys 名稱：

![02](02.png)

這兩個的差別如下：

## keys commands ##

- 支援最小版本：1.0.0 
- 時間複查度為：O(N)
- 在入門級筆記本電腦上運行的Redis可以在40毫秒內掃描100萬個 keys 
- 顯示出的每一行結果皆為 key 名稱

## scan commands ###

- 支援最小版本：2.8.0 
- 時間複查度為：O(1) for every call. O(N) for a complete iteration.
- 顯示出的第一行為符合條件的總資料筆數，第二行開始為每一筆皆為 key 名稱

上述的指令

    scan 0 match *

也可以簡化為：

    scan 0

結果是依樣的：

![03](03.png)