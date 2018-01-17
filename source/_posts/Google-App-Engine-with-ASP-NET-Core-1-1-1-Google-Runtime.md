---
layout: post
title: Google App Engine with ASP.NET Core 1.1.1 on Google Runtime
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-13 23:04:07
categories:
- Cloud
tags: 
- ASP.NET Core
- .NET Core
- GCP
- GAE
- Google App Engine
---

介紹如何將 GAE 切換到指定的 Google Runtime 版本

<!-- More -->

![cover](cover.png)

先前[ASP.NET Core MVC play with Google App Engine - Flexible Environment and Google Runtime](http://blackie1019.github.io/2017/04/21/ASP-NET-Core-MVC-play-with-Google-App-Engine-Flexible-Environment-and-google-runtime/)介紹了如在 *GAE* 上使用 Google Runtime．

而就在 20170513 ，Google 悄悄推出了 ASP.NET Core 1.1.1 的[官方 Runtime](https://console.cloud.google.com/gcr/images/google-appengine/GLOBAL/aspnetcore)，而這邊我就來看看該如何指定安裝的版本吧

## Pull Google Container Repository to Local ##

當你勾選版本後可以按下 *Show Pull Command* :

![gcp_show_shell](gcp_show_shell.png)

這邊可以看到指令是透過 [Google Cloud SDK](https://cloud.google.com/sdk/) 執行，還未安裝的話是無法執行該指令的．

當我們將指令複製後即可取得：

![docker_pull](docker_pull.png)

接著我們可以查看當前的所有 Docker 映像檔有哪些 :

    docker images

![docker_images](docker_images.jpg)

## Running GCR Container with ASP.NET Core on Local ##

首先我們一樣先透過 *.NET Core CLI* 快速建立

    mkdir app;
    cd app;
    dotnet new mvc;
    dotnet restore;
    dotnet publish -c Release;

![dotnetcore_restore_publish](dotnetcore_restore_publish.png)

這邊如果沒有先執行 *restore* 而直接呼叫 *publish* 則會出現下面的錯誤提醒：

![dotnetcore_error](dotnetcore_error.png)

接著我們至發行的目錄下新增 *Dockerfile* ：

    cd bin/Release/netcoreapp1.1/publish;
    touch Dockerfile;
    vi Dockerfile

編輯以下內容：

    FROM gcr.io/google-appengine/aspnetcore:1.1
    COPY . /app
    WORKDIR /app

    EXPOSE 8080/tcp
    ENV ASPNETCORE_URLS http://*:8080

    ENTRYPOINT ["dotnet", "gae-dotnetcore-google-runtime.dll"]

這邊要注意，因為我們用 *Release* 版本，所以 Port 預設會帶 *8080* 而非測試開發的 *5000*

而之後如果要上傳到 GAE 上，一樣在同目錄加入 app.yaml ：

    vi app.yaml

填入以下內容：

    runtime: custom
    env: flex

接著我們將此環境 docker 映像檔：

    docker build -t blackie1019/gaeaspnetcore:1.1 .

    docker run -d -p 8080:8080 -t blackie1019/gaeaspnetcore:1.1

當跑起來後我們就可以去當跑起來後我們就可以去 [http://localhost:8080/](http://localhost:8080/) 觀看畫面：

![result](result.png)

## Upload to GAE ##

當本機正常運行後我們即可透過下面指令上傳至 GAE 上

### Setup Google Cloud SDK ###

- Download [CLOUD SDK](https://cloud.google.com/sdk/)
- Init CMD:
    
        gcloud init

- Setup gcloud SDK account

        gcloud config configurations create <config-name>
        gcloud config configurations activate <config-name>
        gcloud config set account <google-account>
        gcloud config set project <project-id>

- Deploy to GAE

        gcloud app deploy