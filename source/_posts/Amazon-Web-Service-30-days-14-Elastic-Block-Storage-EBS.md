---
layout: post
title: 'Amazon Web Service 30 days - 14 : Elastic Block Storage(EBS)'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-02 00:10:47
---

30天鐵人賽介紹 AWS 雲端世界 - 14:　EC2的實體硬碟服務 Elastic Block Storage(EBS)

<!-- More -->

## What is Elastic Block Storage ##

Elastic Block Storage(EBS)可在 AWS 服務中提供用於 EC2 執行個體的永久性磁碟區，也就是我們熟知的實體硬碟概念。而 EBS 儲存在你所選擇的 AZ 當中，無法直接跨 AZ 使用。

EBS 只能提供給一個 EC2 Instance 安裝，如果有跨多個 EC2 Instance 分享磁碟的需求則要參考 [Amazon EFS](https://aws.amazon.com/tw/efs/) 而這個我們也會在後面日子重新介紹。

而 EBS 主要有四種分類：

- Solid State Drives (SSD)

    - EBS General Purpose SSD (GP2)

        適合用在絕大多數情況，可提供 < 10,000 IOPS 的服務。預設使用此類型 EBS 服務

    - EBS Provisioned IOPS SSD (IO1)

        適合用在對 I/O 相對敏感的使用情境，如 NoSQL 類型的資料庫，可提供 > 10,000 IOPS 的服務。

- Hard Disk Drives (HDD)

    - Throughput Optimized HDD (ST1)

        適合用在寫入有依序性的情況，如Big data, Data Warehouse或是 log 資料。**此類型 EBS 無法設為開機磁碟(boot device)**

    - Cold HD(SC1)

        最便宜的儲存費用，適合用在不常讀取的資料，如實體設定檔案。**此類型 EBS 無法設為開機磁碟(boot device)**

詳細內容可以參考[Amazon EBS 卷类型](http://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/EBSVolumeTypes.html)

## Hands on Lab ##

這邊來實際新增第二個 EBS 磁區給我們昨天建立的 EC2 Instance。

首先我們一樣先登入 [AWS Console](https://console.aws.amazon.com/console/home)

然後在中間的輸入框查詢 EC2 ，或是透過左上角的 Services 點選到　Compute　下的 EC2 服務。

首先先點到左側的 EBS 下的 Volumes，並嘗試新增一個 EBS:

![lab_1.png](lab_1.png)

![lab_2.png](lab_2.png)

![lab_3.png](lab_3.png)

![lab_4.png](lab_4.png)

![lab_5.png](lab_5.png)

上面要注意 EBS 需與EC2 Instance 同一個 AZ 才能將安裝上去，否則會出下面錯誤 ：

![lab_6.png](lab_6.png)

而我們重新新增一個同 AZ 的 EBS 後即可正常取用到原先的 EC2 Instance ：

![lab_7.png](lab_7.png)

![lab_8.png](lab_8.png)

安裝成功，我們即可遠端桌面進入主機內確認，一開始可能會還是只看到一個磁區：

![lab_9.png](lab_9.png)

而當我們使用 disk format tool 查看後則可以看到另外一個磁區，但該磁區目前卻顯示注意事項：

![lab_10.png](lab_10.png)

![lab_11.png](lab_11.png)

如果 Windows 出現以下警告: **The disk is offline because of policy set by an administrator**，則需要透過 CMD 呼叫 *diskpart* 工具協助將磁區安裝上去：

![lab_12.png](lab_12.png)

![lab_13.png](lab_13.png)

解決的方法就是找到該有問題的磁區後清除 *readonly* 設定並將該磁區上線(online) 即可，接下來就是一步步的初始化磁區即可：

![lab_14.png](lab_14.png)

![lab_15.png](lab_15.png)

全部完成即可看到兩個磁區顯示在我的電腦當中：

![lab_16.png](lab_16.png)

## References ##

- [Amazon EBS 產品詳細資訊](https://aws.amazon.com/tw/ebs/details/)
- [The disk is offline because of policy set by an administrator](https://www.youtube.com/watch?v=P2BOuxcccRM)