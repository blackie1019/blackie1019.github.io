---
layout: post
title: 'Amazon Web Service 30 days - 7 : AWS CLI Tool'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-12-17 21:14:50
categories:
- Cloud
tags:
- AWS
---

30天鐵人賽介紹 AWS 雲端世界 - 7:　AWS CLI Tool

<!-- More -->

## What is AWS Command Line Tool

AWS 命令列界面 (CLI) 是管理 AWS 服務的統一工具。可透過指令碼操作 AWS 服務省去介面操作的麻煩。

我們可以從官方[https://aws.amazon.com/tw/cli/](https://aws.amazon.com/tw/cli/)下載安裝。

至於 AWS CLI、API與SDK的定位與使用可以參考 [CLI、API與SDK（本文取自「優福網－AWS教學手冊）](https://www.tts.bz/archives/2463)

## Setup up ##

當安裝好後我們可以透過 cmd 呼叫下方指令確認是否安裝完成：

    aws --version
    
![lab_1.png](lab_1.png)

接著拿出在先前 IAM 所設定的 Access Key ID和Secret Access Keys做為登入設定：

    aws configure

![lab_2.png](lab_2.png)

設定完後可以透過下方指令看當前環境設定：

    aws configure list

![lab_3.png](lab_3.png)

## Hands on with S3 transfer replication files ##

AWS CLI 引進一組新的簡單檔案命令，可有效率的從 Amazon S3 傳入和傳出檔案，而我們將透過他將昨天建立的S3 檔案傳入 replication 內。

當完成上面 AWS cli 登入設定後，我們可以透過下方指令列出目前 S3 的bucket有哪些：

    aws s3 ls

![lab_4.png](lab_4.png)

接著我們可以輸入下方的指令進行檔案遞迴傳送：

    aws s3 cp --recursive s3://blackiecloudfiles s3://replication-euro

![lab_5.png](lab_5.png)

這邊我們可以回介面看到檔案已經傳送過去，但檔案的存儲等級不是先前設定的 IA 而是 Standard，這邊要稍微住一下執行命令列指令時記得要指定等級(不會自動套用當前的replication policy)

![lab_6.png](lab_6.png)

## References ##

- [https://aws.amazon.com/tw/cli/](https://aws.amazon.com/tw/cli/)
