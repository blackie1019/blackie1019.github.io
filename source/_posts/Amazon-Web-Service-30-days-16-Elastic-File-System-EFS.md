---
layout: post
title: 'Amazon Web Service 30 days - 16 : Elastic File System(EFS)'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-04 00:03:16
---

30天鐵人賽介紹 AWS 雲端世界 - 16:　EC2的共用檔案儲存服務 Elastic File System(EFS)

<!-- More -->

## What is Elastic File System ##

Amazon Elastic File System (EFS) 可提供在 AWS 中 EC2 可擴展的共用檔案儲存服務，無須先定義容量可自由拓展並且跨 AZ 提供給 EC2 Instance 使用。

這邊可以參考官方影片可以很快的了解上面這句話是什麼意思：

<iframe width='560' height='315' src='https://www.youtube.com/embed/-9ODewId9X4' frameborder='0' allowfullscreen></iframe>

目前 EFS 有限 Region 支援，僅支援以下：

- EU (Ireland)
- Asia Pacific (Sydney)
- EU (Frankfurt)
- US East (N. Virginia)
- US East (Ohio)
- US West (Oregon)

如果不支援進去該服務會顯示以下警告：

![supported_region](supported_region.png)

## Hands on Lab ##

接著我們將很快的啟用兩個不同 AZ 的 EC2 instance 並透過 EFS　掛載一個共用的磁區做分享使用。

先登入 [AWS Console](https://console.aws.amazon.com/console/home)

然後在中間的輸入框查詢 EC2 ，或是透過左上角的 Services 點選到　Compute　下的 EC2 服務。

然後快速的開啟兩個 Linux Instance ，這邊請參考前幾天的步驟，只是要稍微注意一下請建立在不同的 AZ 上，因為我們要展示 EFS 跨 AZ 的功能，並且使用相同的 Security Group 避免設定錯誤：

![lab_1.png](lab_1.png)

![lab_2.png](lab_2.png)

接著我們使用 SSH　登入後輸入以下指令完成 Apache 安裝與啟用：

    sudo su
    yum update -y
    yum install httpd -y
    service start httpd

![lab_2_2.png](lab_2_2.png)

接著我們將透過左上角的 Services 點選到　Storage　下的 EFS 服務。

![lab_3.png](lab_3.png)

接著我們將選擇 EFS 啟用的 AZ，當選擇完後給予 Tag (之後 CloudWatch 會使用到)點下確認新增即可：

![lab_4.png](lab_4.png)

![lab_5.png](lab_5.png)

這邊完成新增後須等待服務準備好，接著點開 *Amazon EC2 mount instances* 即可看到指令，只要稍微修改輸入到我們遠端的 EC2 主機即可：

![lab_6.png](lab_6.png)

![lab_7.png](lab_7.png)

在遠端設定前千萬要記得回去 EC2 將剛剛產生的兩個 instance 加入 *VPC* Security Group 當中，否則無法使用:

![lab_6_1.png](lab_6_2.png)

![lab_6_2.png](lab_6_2.png)

完成設定後立即設定一個 index.html 儲存後再另外一邊的 instance 即可立即可在清單看到並馬上可透過公開的 DNS 顯示網頁內容：

![lab_8.png](lab_8.png)

![lab_9.png](lab_9.png)

![lab_10.png](lab_10.png)

## References ##

- [Amazon Elastic File System](https://aws.amazon.com/tw/efs/)