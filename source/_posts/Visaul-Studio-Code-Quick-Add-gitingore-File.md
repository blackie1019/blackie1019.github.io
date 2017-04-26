---
layout: post
title: Visaul Studio Code Quick Add gitingore File
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-22 16:46:10
categories:
- Tool
tags:
- VSCode
- Git
---

使用git一定會使用到gitignore檔案來幫我們忽略一些檔案，不要加入版本控管。介紹如何使用VSCode的套件 - gitignore 快速新增gitignore

<!-- More -->

## gitignore plugin Introduction ##

[gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore)這個套件是透過抓取[https://github.com/github/gitignore](https://github.com/github/gitignore) repository取得各語言/framework/環境的gitignore設定來幫我們快速新增到目前專案中使用。

## How to Use ##

使用方法很簡單，只要至View>command palette (with Ctrl+Shift+P or F1) 輸入 Add gitignore 即可。

接者會有一個輸入框幫你filter你想要的gitignore格式，

這邊我們用一個NodeJS的專案來嘗試新增gitignore:

![example](example.gif)

## Setting ##

這邊可以調整的設定只有一個，我們可以設定動態幫你去github做filter的查詢可用的gitignore格式做新增，而這個查詢結果會放在我們的cache裡面做使用。

我們可以設定cache更新的時間避免太頻繁或是太久沒更新

    {
        // Number of seconds the list of `.gitignore` files retrieved from github will be cached
        "gitignore.cacheExpirationInterval": 3600
    }