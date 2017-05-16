---
layout: post
title: .NET Core CLI switch to Different SDK Version by global.json
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-14 18:48:31
categories:
- .NET
tags: 
- .NET Core
- .NET Core CLI
- .NET Core SDK
---

介紹如何用 global.json 去切換當前 Dotnet Core CLI 的 SDK 版本

<!-- More -->

![cover](cover.png)

一般在我們下載安裝完  [.NET Core command-line (CLI)](https://github.com/dotnet/cli) 工具後可以透過下面的版本檢查當前運行的版本:

    dotnet --version

而今天我們可以透過 *global.json* 的方式幫我們指定當前環境所要運行的 *SDK* 版本，而 global.json 可以放置在專案資料夾根目錄之下，如:

![dotnet_global_json](dotnet_global_json.png)

而當我們有指定的 *sdk* 版本時，輸入 **dotnet** 相關指令就會開始判斷當前的環境是否有安裝當前指定的SDK版本，如果沒有的話就會出現下載的進度條，完成後輸入下方指令:

    dotnet --version
    dotnet new --help

![donet_after](donet_after.png)

這邊會看到我們已經成功切回舊版的指令。

而當我們將指定的版本移除後輸入一樣指令我就會看回當前預設(即下載安裝的版本) SDK 版本:

    dotnet --version
    dotnet new --help

![dotnet_before.png](dotnet_before.png)

## References ##

[DotNet / NetCore Versions](https://blog.stephencleary.com/2016/06/dotnet-netcore-versions.html)