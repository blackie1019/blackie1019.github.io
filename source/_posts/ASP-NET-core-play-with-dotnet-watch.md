---
layout: post
title: ASP.NET Core play with dotnet-watch
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-14 02:00:03
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- C#
- .NET Tools
---

紀錄並介紹一下DotNetTools的其中一項工具 - dotnet-watch

<!-- More -->

## DotNetTools ##

這專案主要是強化.NET Core CLI的command-line工具，目前已釋出了三項工具，分別是

- [dotnet-watch (Microsoft.DotNet.Watcher.Tools)](https://github.com/aspnet/DotNetTools/tree/dev/src/Microsoft.DotNet.Watcher.Tools)

    可以幫我們監視與偵測特定應用程式的原始碼是否有改變，如果有則立即重新編譯啟動    

- [dotnet-user-secrets (Microsoft.Extensions.SecretManager.Tools)](https://github.com/aspnet/DotNetTools/tree/dev/src/Microsoft.Extensions.SecretManager.Tools)

    可以幫我們管理儲存在user secret store裡的資料

- [dotnet-sql-cache (Microsoft.Extensions.Caching.SqlConfig.Tools)](https://github.com/aspnet/DotNetTools/tree/dev/src/Microsoft.Extensions.Caching.SqlConfig.Tools)

    可以幫我們在 Microsoft SQL Server database 新建table and indexes用於distributed caching

今天我們要介紹的就是第一項 *dotnet-watch*

影片參考(前面三分鐘)：

<iframe width="90%" height="315" src="https://www.youtube.com/embed/48J9JLvesVE" frameborder="0" allowfullscreen></iframe>

## Install ##

將 Microsoft.DotNet.Watcher.Tools 加入專案的 DotNetCliToolReference 當中

    <ItemGroup>
        <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="1.0.0-msbuild3-final" />
        <!-- If you use .NET Core 1.1.1 please check your version should be greater than 1.0.0-* -->
        <!--<DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="1.0.0-*" />-->
    </ItemGroup>

![add watch](add watch.png)

然後重新restore專案取得工具，否則會出現下面的錯誤

![error](error.png)

    dotnet restore


*這邊稍微要注意一下，如果你是用.NET Core 1.1.1的朋友應該要把上面的dotnet-watch的版本改道1.0.0以上，否則會出現下面的錯誤*

![version error](version error.png)

## Execute ##

指令組成很簡單

    Usage: dotnet watch [options] [[--] <args>...]

    Options:
    -?|-h|--help  Show help information
    -q|--quiet    Suppresses all output except warnings and errors
    -v|--verbose  Show verbose output

| What you want to run  |  Dotnet watch command | 
|---|---|
| dotnet run  | dotnet *watch* run  |
| dotnet run --arg1 value1  | dotnet *watch* run --arg1 value  |
| dotnet run --framework net451 -- --arg1 value1  | dotnet *watch* run --framework net451 -- --arg1 value1  |
| dotnet test | 	dotnet *watch* test  |

所以就只要把原本的專案執行從dotnet [command]改為dotnet watch [command]就可以。

執行起來會出現下面的結果

![execute](execute.png)

## References ##

- [Developing ASP.NET Core apps using dotnet watch](https://docs.microsoft.com/en-us/aspnet/core/tutorials/dotnet-watch)
- [Github - dotnet-watch](https://github.com/aspnet/DotNetTools/blob/dev/src/Microsoft.DotNet.Watcher.Tools/README.md)