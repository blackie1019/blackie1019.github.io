---
layout: post
title: ASP.NET Core Development via Container
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-10 12:21:28
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- Docker
- Container
---

分享如何不在本機安裝.NET Core CLI　的情況下，直接使用 container 建立 ASP.NET Core 開發環境

<!-- More -->

![cover](cover.png)

.NET Core 的開發環境可以透過 Docker 的　Container 方式快速建立，好處就是不用在本機**直接安裝**　.NET Core 的 SDK。

## Pull Official .NET Core Development Image ##

這邊我們可以透過下方指令抓取最新穩定版裝有的 .NET Core SDK　的環境映像檔

    docker pull microsoft/dotnet

拉取下載完後可以透過下方指令看本機有的映像檔：

    docker images

![docker_pull](docker_pull.png)

這邊如果沒有特定指定後方版本號則預設抓取　tag 為　latest　的映象檔版本。

## Develop non-web/non-internet Application ##

如果我們要開發的是不用暴露 port 的　classlibrary 或是　console　應用程式類型的開發，直接輸入下方將指定版本的 Docker Container 運行起來即可：

    docker run -it microsoft/dotnet:latest

這邊我們即可輸入 dotnet 相關指令開始做開發

## Develop Web Application ##

如果我們要開發的是要暴露 port 的　mvc 或是　webapi　應用程式類型的開發，就要透過下方指令運行 Docker Container　：

    docker run -it -p 5001:5000 microsoft/dotnet:latest

接著我們快速地建立一個 *mvc* 應用程式並運行起來：

    mkdir app
    cd app
    dotnet new mvc
    dotnet restore
    dotnet run

![dotnet_run](dotnet_run.png)

而當我們將 *port* 暴露出去後並將網站運行起來會發現我們的網站無法連到。

這邊解法有兩個：

1. 加入環境變數 ASPNETCORE_URLS　為 http://*:5000
2. 透過以下修改，將運行 asp.net core 網站的 host ip 設定為 http://*:5000 

```Program.cs
namespace app
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseUrls("http://*:5000")
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
```

接著在運行起來：

    dotnet run

可以發現跟原本的 host 的位置不同了：

![aspnetcore_domain](aspnetcore_domain.png)