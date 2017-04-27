---
layout: post
title: ASP.NET Core play with Docker
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-26 11:46:37
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- Docker
- Container
---

紀錄一下如何透過Docker來Deploy .NET Core環境

<!-- More -->

Docker 充分地發揮.NET Core的跨環境的特色，讓我們不管在任何作業環境與雲端部署上都可以更加的方便與快速！這也是我被吸引往.NET Core的主因，今天紀錄一下如何在Dokcer啟用第一個.NET Core的Web應用程式．

## Install Docker ##

先至官網安裝Docker Community Edition環境．
- [Windows 10](https://store.docker.com/editions/community/docker-ce-desktop-windows)
- [macOS](https://store.docker.com/editions/community/docker-ce-desktop-mac)
- [Linux](https://store.docker.com/editions/community/docker-ce-server-centos)
- [Ubuntu](https://store.docker.com/editions/community/docker-ce-server-ubuntu)

## Create ASP.NET Core Project ##

這邊我們簡單的起一個.NET Core的MVC Web專案，

    mkdir DotnetMVC
    cd DotnetMVC
    dotnet new -t mvc

接著我們還原套件並將他運行起來後我們可以在[http://localhost:5000](http://localhost:5000.)看到目前的首頁已經成功運行．

    dotnet restore
    dotnet run

## Create Dockerfile ##

這邊我們取用[microsoft/dotnet](https://hub.docker.com/r/microsoft/dotnet/)的映像檔，官方提供的映像檔有三種：

- microsoft/dotnet:<version>-sdk

    這版本會包含：

    - .NET Core
    - .NET Core command line tools

- microsoft/dotnet:<version>-runtime

    針對實際環境用(包含runtime 與 libraries)做最佳化的映像檔

接著我們在專案的根目錄建立新的Dockerfile(這邊需要注意，副檔名格式不要存成.txt或其他類型)

    touch Dockerfile

再將我們的下列設定貼入Dockerfile中

    FROM microsoft/dotnet:latest
    COPY . /app
    WORKDIR /app
    
    RUN ["dotnet", "restore"]
    RUN ["dotnet", "build"]
    
    EXPOSE 5000/tcp
    ENV ASPNETCORE_URLS http://*:5000
    
    ENTRYPOINT ["dotnet", "run"]

## Creating the Docker image ##

接著輸入下面的指令（注意最後面有一個.不要忘記）去建立Docker image

    docker build -t test:aspnetcorehelloworld .

然後我們必將剛剛建立的image運行起來並將port指定為8888(這邊隨你喜好)

    docker run -d -p 8888:5000 -t test:aspnetcorehelloworld

運行起來後我們可以用docker ps這個指令查看一下運行中的container有哪些跟他們的唯一識別號碼

最後我們在前往 [http://localhost:8888](http://localhost:8080)確認網站是否正常運行.

如果要關閉container的話就直接輸入docker stop container唯一識別號，如

    docker stop 235

這邊識別號只要輸入前面幾碼可以區分出是哪一個container即可．

## References ##

- [Tutorial: Deploy an ASP.NET Core Application on Linux with Docker](https://stormpath.com/blog/tutorial-deploy-asp-net-core-on-linux-with-docker)