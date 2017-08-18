---
layout: post
title: NuGet Package Management on JFrog Artifactory
subtitle: ''
author: Blackie
header-img: ''
categories:
  - CI&CD
tags:
  - JFrog Artifactory
  - Dependency Management
  - Continuous Integration
  - NuGet
  - Artifacts Management
sitemap: true
date: 2017-08-15 00:01:08
---

介紹如何使用 JFrog Artifactory 建立 private NuGet server

<!-- More -->

先前稍微介紹過 [JFrog Artifactory](http://blackie1019.github.io/2017/08/07/JFrog-Universal-Artifact-Repository-Manager/) 的安裝，這次介紹其中一個 **付費版** 才支援的 private NuGet server。

如何製作 *NuGet Package* 則可以參考[Using Package from Private NuGet Server in TFS2017](https://blackie1019.github.io/2017/08/03/Using-Package-from-Private-NuGet-Server-in-TFS2017/) ，這邊不多贅述。

## Create Remote Private NuGet Server ##

可以從介面的右上角選單內建立新的 *Repository*:

![quick_setup](quick_setup.png)

如果是已經透過 *Quick Setup* 建立了該類型的 Repository 則會於介面呈現灰色：

![already_create](already_create.png)

但還是可以透過上一個步驟建立其他同類型的本機或是遠端 Repository ，只是要多幾個步驟選擇：

![new_local](new_local.png)

而當我們選擇 *Quick Setup* 建立預設都會給予三個圖示：

![default.png](default.png)

其中一個是參考位置，另外兩個則為實際部屬的檔案：

![nuget_1](nuget_1.png)

而點選到 *nuget-local* 後可以看到右方有一個 Set Me Up 的圖示，點開後輸入密碼即可取得登入的API Key。

![api](api.png)

## Setup Development Environment ##

當完成遠端的 Packages Server 建立後我們則可以按照以下步驟透過 *NuGet Client* 完成本機環境設定：

1. 新增遠端 NuGet 位置：

    nuget sources Add -Name Artifactory -Source http://172.16.45.64:8081/artifactory/api/nuget/nuget-local

2. 設定 NuGet API Key:

    nuget setapikey <account>:<key> -Source Artifactory

## Publish NuGet Package ##

當環境也設定好後就可以將套件透過以下指令上傳：

  nuget push <PACKAGE_NAME> -Source Artifactory

完成後就可以看到我們上傳的套件：

![nuget_2](nuget_2.png)