---
layout: post
title: ASP.NET Core CLI upgrade
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-10 17:17:26
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- C#
---

這邊記錄一下ASP.NET Core CLI的更新方式

<!-- More -->

剛好在最近重新研究ASP.NET Core的時候遭逢VS 2017的上市，很多套件也同步作了更新。而.NET Core的CLI也在此時更新到1.0.1版本，這邊就剛好來研究一下怎麼做更新。

## 如何查詢現在的版本 ##

    dotnet --version

![dotnet_cli](dotnet_cli.png)

## 更新CLI ##
更新方式有兩種:
- SDK下載(目前包含 .NET Core 1.0 and 1.1)
- Binary下載(通常是因為要測試Beta版或是舊版)

### SDK 下載###

1. 至ASP.NET Core官網下載新版SDK
2. 安裝完後可再輸入一次版本查詢安裝是否成功

![dotnet_cli_update](dotnet_cli_update.png)

## Template的 --help指令 ##

基本上官網沒有寫明dotnet cli所提供的template有哪些，不過我們可以透過--help幫我們查詢一下:

    dotnet new --help

![templates](templates.png)

所以這邊我們就知道如果要建立一個新的ASP.NET Core Web API專案可以透過下面指令:

    dotnet new webapi

而如果你要過濾某個套件如Authority並指定framework版本，則需要透過下面指令:

    dotnet new mvc --auth None --framework netcoreapp1.1

## 結語 ##

而從CLI 1.0.0升級到1.0.1主要是下面這個改變

- Available in the SDK and via Docker SDK images

這功能蠻方便使用docker作為主要開發環境的工具，也適合我們在透過CI工具做整合時也更具備彈性。

詳細的Release Note請參考[Announcing .NET Core Tools 1.0](https://blogs.msdn.microsoft.com/dotnet/2017/03/07/announcing-net-core-tools-1-0/)