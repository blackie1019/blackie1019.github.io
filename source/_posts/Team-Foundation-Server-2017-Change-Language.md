---
layout: post
title: Team Foundation Server 2017 Change Language
subtitle: ''
author: Blackie
header-img: ''
categories:
  - CI&CD
tags:
  - TFS
sitemap: true
date: 2017-07-31 11:42:18
---

分享如何切換 TFS Web Access的語系顯示
<!-- More -->

![banner](banner.png)

當我們一開始登入 TFS 服務後，會發現 TFS 的服務會呈現我們預設的網頁瀏覽器語(browser preferred language)系或是當前使用的系統偏好語系。

如果要更改呈現語系，有兩種做法:

1. 修改 TFS 使用者檔案
2. 修改瀏覽器預設語系

## 修改 TFS 使用者檔案 ##

1. 開啟 Team Web Access Portal

2. 點選右上角的使用者名稱

    ![setting](setting.png)

3. 右鍵選擇 *我的設定檔*

    ![profile](profile.png)

4. 點選 *locale* 分類項(tab)，選擇語系與相關設定

    ![locale](locale.png)

    ![language](language.png)

5. 儲存後，頁面會自動更新。即可看到更新後的指定語系呈現

    ![result](result.png)

## 修改瀏覽器預設語系 ##

當然我們也可以透過*修改瀏覽器預設語系*的方式達到相同效果，這邊可以參考該文章的整理

[How to Change Your Browser's Language](http://www.wikihow.com/Change-Your-Browser%27s-Language)

如果是 *Chrome* 的愛好者，可以參考[Quick Language Switcher](https://chrome.google.com/webstore/detail/quick-language-switcher/pmjbhfmaphnpbehdanbjphdcniaelfie) 這個套件幫你做語系切換的功能。

## References ##

- [How to – Change Language Settings in Team Web Access (Team Foundation Server 2013)](http://big.info/2014/05/how-to-change-language-settings-in-team-web-access-team-foundation-server-2013.html)