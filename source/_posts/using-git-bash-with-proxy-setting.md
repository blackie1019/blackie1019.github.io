---
layout: post
title: Using Git bash with Proxy setting
subtitle: ""
date: 2014-01-01 00:29:45
author: Blackie
header-img: ""
categories:
- CI&CD
tags:
- Git
- Source Control
---

Git一般在使用上都是直接安裝就可以Clone, Pull或Push你想要的專案了，但如果你所在的開發環境需要透過Proxy才可以連外的話，你也必須幫Git設定一些參數才可以方便他透過Proxy來幫你取得外部設定

<!-- More -->

## Set Git with Proxy

在我們安裝完Git之後打開Git Bash，輸入`git config --list` 即可看到目前的設定

![01](01.png)

![02](02.png)

這邊有三個重點要設定:

1. Http.proxy

		git config --global http.proxy http://account:password@proxy Domain:port

2. Https.proxy

		git config --global https.proxy https://account:password@proxy Domain:port

3. http.sslcainfo

		git config --global http.sslcainfo /bin/curl-ca-bundle.crt


這三個要分別設定成對的內容才可以成功的透過Proxy取得git內容，這邊稍微注意一下，如果你輸入的文字是有特殊字符的(例如$#%^...等文字)，你需要將內容轉換成特殊的character codes格式才可以，
例如:
帳號blackie.tsai
密碼$RFV5tgb

再上面的ScreenShot就可以看到其實我打進去setting的密碼是**%24RFV5tgb**而不是**$RFV5tgb**

如果需要特殊字符轉碼可以參考[HTML character codes](http://www.obkb.com/dcljr/charstxt.html)

## Try clone with git proxy

設定完後我們可以到隨意一個Github公開專案去複製他.git的位置(如下圖)

![03](03.png)

然後同樣透過git bash我們輸入`git clone https://github.com/angular/angular.js.git` 的方式即可clone回來瞜，如下圖再跑進度表即可

![05](05.png)

這邊順到一提如果你要再git bash 貼上文字的話要在git bash的邊框按下右鍵點選Edit>Paste

![04](04.png)

同樣，如果要複製git bash內某段文字內容就點選Edit>Mark然後滑鼠左鍵選完後再按下右建複製即可。
