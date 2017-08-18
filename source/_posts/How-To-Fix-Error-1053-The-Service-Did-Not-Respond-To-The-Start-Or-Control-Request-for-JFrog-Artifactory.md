---
layout: post
title: >-
  How To Fix Error 1053 - The Service Did Not Respond To The Start Or Control
  Request for JFrog Artifactory
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
date: 2017-08-08 17:20:49
---

解決 JFrog Artifactory Pro 在 Windows 環境上服務無法啟動的問題
<!-- More -->

![banner](banner.png)

先前介紹的[JFrog - Universal Artifact Repository Manager](http://blackie1019.github.io/2017/08/07/JFrog-Universal-Artifact-Repository-Manager/)在安裝 JFrog Artifactory Pro 時會遇到服務註冊完沒有辦法啟動的問題。

這個問題主要是 JFrog Artifactory 製作服務檔案時使用的 Apache commons daemon 不相容所導致的

解決辦法如下：

1. 下載 [Apache daemon](http://www.apache.org/dist/commons/daemon/binaries/windows/)：

  ![download](download.png)

2. 解壓縮後至 *amd64* 目錄下將 **prunsrv** 改名為 **artifactory-service**，並複製至原先JFrog Artifactory Pro 的 *bin* 目錄下﹕

  ![rename](rename.png)

3. 到 bin 資料夾下執行 *uninstallService.bat* ，移除先前安裝的 Artifactory 服務

4. 重新執行 *installService.bat* 進行安裝 Artifactory 服務

5. 透過指令將服務啟動：

      sc start Artifactory

  這邊看到以下圖示代表服務正式啟動：

  ![start](start.png)

6. 前往 *http://<ip>:8081* 可以看到以下面網頁就代表啟動成功：

  ![success](success.png)