---
layout: post
title: .NET Core Upgrade to .NET Core 2.0 Preview 1
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-16 19:59:11
categories:
- .NET
tags: 
- .NET Core
- .NET Core CLI
- .NET Core SDK
---

分享如何升級 .NET Core 2.0 Preview 1

<!-- More -->

![cover](cover.png)

隨著 Build 2017 的活動，.NET Core 2.0 Preview 1 正式開放下載與使用。

有興趣的朋友可以至 [Preview 官網](https://www.microsoft.com/net/core/preview) 下載。

當下載完成後點擊安裝後可以到 Terminal 去確認一下版本:

    dotnet --version

![dotnet_version](dotnet_version.png)

而當我們輸入下方指令則可以看到 2.0 的新樣板:

    dotnet new

![dotnet_new](dotnet_new.png)

這邊我們嘗試新增一個 *razer* 專案時可用下方指令:

    dotnet new razer

由於 .NET Core 2.0 CLI 的 *new* 指令預設會幫我們執行 **NuGet Restore**，所以我們可以不用執行 restore 指令，但當還原如果出現錯誤:

![dotnet_restore_failed](dotnet_restore_failed.png)

這邊我們可以透過新增 *NuGet.Config* 的方式指令我們拉取的 NuGet 位置:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <!--To inherit the global NuGet package sources remove the <clear/> line below -->
    <clear />
    <add key="dotnet-core" value="https://dotnet.myget.org/F/dotnet-core/api/v3/index.json" />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
</configuration>
```

當我們再次執行還原指令則可以正常完成套件還原下載:

    dotnet restore
 
 ![dotnet_restore_success](dotnet_restore_success.png)

 接著運行就可以看到網站了:

    dotnet run

![result](result.png)

如果需要切換到之前版本的 SDK ，可以參考先前的[.NET Core CLI switch to Different SDK Version by global.json](http://blackie1019.github.io/2017/05/14/NET-Core-CLI-switch-to-Different-SDK-Version-by-global-json/)

## References ##

- [Unable to restore 'Microsoft.NETCore.App >= 2.0' #6581](https://github.com/dotnet/cli/issues/6581)