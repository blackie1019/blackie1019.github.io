---
layout: post
title: Chrome Dev Tools for CPU and Network Throtting
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-01 16:39:05
categories:
- Development&Coding  
tags:
- Chrome
---

紀錄如何透過Chrome來調節CPU與Network模擬較差的環境

<!-- More -->

現代網頁開發裡面，針對較差的環境(Network比較慢)與硬體(CPU比較慢)來測試應用程式針的回應已經變成一個必然的事情。這次分享一下如何透過Chrome Dev Tools來幫我們達到這樣的模擬。

# Chrome Dev Tools #

我們可以在 Chrome > More Tools > Developer Tools (Ctrl+Shift+i)　即可打開Dev Tools ：

如果對整個工具想有更近一步的認識可以參考[Chrome DevTools中文手册](https://www.gitbook.com/book/leeon/devtools/details)

# Chrome Dev Tools - Network Tab #

這邊我們可以透過Network這個tab來調整模擬不同的網路狀況(2G,3G,4G, Wifi等)

![network_ui](network_ui.png)

# Chrome Dev Tools - Timeline Tab #

而剛剛提及的網路速度調節也可以從Timeline這邊調整

![network](network.png)

另外，如果針對ＣＰＵ也可以在此做調節

![cpu](cpu.png)

如果有任何異動，上面的設定會呈現紅色的icon表示這邊進入了調節的模式，如果應用程式有變慢是正常的
