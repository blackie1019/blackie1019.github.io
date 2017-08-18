---
layout: post
title: JFrog - Universal Artifact Repository Manager
subtitle: ''
author: Blackie
header-img: ''
categories:
  - CI&CD
tags:
  - JFrog Artifactory
  - Dependency Management
  - Continuous Integration
  - Artifacts Management
sitemap: true
date: 2017-08-07 13:54:38
---

介紹通吃所有代碼儲存庫與相依管理套件庫的 JFrog Artifactory

<!-- More -->

![banner](banner.png)

這次要介紹的 JFrog Artifactory 是一個號稱全端相依管理與產出物管理工具(Universal Artifact Repository Manager)，能透過SaaS服務啟用也能透過自建主機的方式建置企業內部的產出管理儲存庫，將應用程式的開發與部屬的耦合性下降。

## JFrog Introduction ##

[JFrog](https://www.jfrog.com/)

>Host, manage and proxy artifacts using the best Docker Registry, Maven Repository, Gradle repository, NuGet repository, Ruby repository, Debian repository...

![overview](overview.png)

如同簡述他支援了很多版本的管理儲存庫，主要是為了達成下面的流程：

![overview_flow](overview_flow.png)

目前有支援的 repository/registry 種類如下：

![type_1](type_1.png)

![type_2](type_2.png)

目前分為免費開源版([OSS](https://www.jfrog.com/open-source/))僅支援 *Java* 與*Android* 的開發環境：

- [[免費]Maven](https://www.jfrog.com/artifactory/features/#addon-maven)
- [[免費]Gradle](https://www.jfrog.com/artifactory/features/#addon-gradle)

付費進階版(Pro)則是全部類別都有支援。其他更多付費功能可以參考[付費版簡介](https://www.jfrog.com/pricing/)與[付費版細部功能比較](https://www.jfrog.com/artifactory/versions/)

而每個上面列出有支援的功能可以參考官方整理的[The Most Powerful Repository Around](https://www.jfrog.com/artifactory/features/)

而除了 Artifactory Management 外，其實這套工具還有很多可以加強 *DevOps*　的功能，可以參考[官方技術白皮書](https://www.jfrog.com/support-service/whitepapers/comparing-artifactory-to-other-binary-repository-managers/)看更多使用情境與細節。

## Setup on Windows ##

這邊範例是下載[JFrog Open-source](https://www.jfrog.com/open-source/)

解壓縮後，開啟命令列(需有 administrator 權限)並指向到該解壓縮目錄下 *bin* 資料夾內：

![cmd_administrator](cmd_administrator.png)

這邊有兩種啟動方式:手動與 Windows 服務常駐

### Manually Running ###

如果是要手動執行，可以直接在命令列輸入 *artifactory.bat* 啟動：

![manually](manually.png)

從上面執行的過程我們可以看到預設幫我們開啟 8081 port 做為網站的連結，等到出現下面的成功資訊代表已經執行完網站的初始化。

![manually_success](manually_success.png)

這個時候連到[http://localhost:8081](http://localhost:8081)即可看到下面的網站樣貌：

![web_welcome](web_welcome.png)

### Run As Windows Service ###

而如果是要透過 windows 服務常駐，則可以返回剛剛的命令列執行 *installService.bat* 註冊服務：

![cmd_sc_register](cmd_sc_register.png)

當看到上面畫面代表註冊成功，這邊就可以將服務啟動：

    sc start Artifactory

![cmd_sc_start](cmd_sc_start.png)

## References ##
-[Install Artifactory 5 on Windows 10 as a service](https://www.youtube.com/watch?v=Lg4a6Sc_Xco)