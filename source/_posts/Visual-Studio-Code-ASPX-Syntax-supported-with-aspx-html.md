---
layout: post
title: Visual Studio Code ASPX Syntax supported with aspx-html
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-07-14 02:13:37
categories:
- Tool
tags:
- VSCode
---

介紹如何讓 VSCode 也能呈現 .aspx 檔案

<!-- More -->

VSCode 已經上市好幾年了，但始終預設不支援傳統的 ASP.NET Web 中 *.aspx* 的 Syntax 解析與高光。

今天要介紹透過對岸開發者所貢獻的 [aspx-html](https://marketplace.visualstudio.com/items?itemName=QQZZFT.aspx-html) 來呈現 ASP.NET Web Form 的程式碼。

他的主要功能有:
- 支持 HTML標籤變色高光
- 支持EMMET ，需在用戶設置裡自行添加代碼：“emmet.includeLanguages”：{“aspx”：“html”}，
- 提供 *webform* 和 *ajaxtoolkit* 程式碼片段(snippet)
- 提供以下文件標籤變色高光：
    - .aspx
    - .master
    - .ascx

這邊安裝之前的文件呈現如下:

![before](before.png)

安裝之後的文件呈現如下:

![after](after.png)