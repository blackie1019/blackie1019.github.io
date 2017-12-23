---
layout: post
title: 'Amazon Web Service 30 days - 12 : CloudWatch and Billing Alarm'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2017-12-31 00:08:21
---

30天鐵人賽介紹 AWS 雲端世界 - 12:　透過 AWS CloudWatch 啟用帳戶當前使用預算通知

<!-- More -->
## What is CloudWatch ##

CloudWatch 是一項針對 AWS 上的服務與資源與執行中的應用程式進行監控的服務。他可以做很多不同層次的紀錄追蹤與收集，並且產生圖像化可視的圖表讓我們一目了然當前 AWS 使用的情況。也可以設定一些通知與警示事件，當達到觸發條件時寄信通知或是執行特定動作。

這邊我們就來實際透過 CloudWatch 幫我們監控每個月的 AWS 開銷，並在超過警示上限時寄送通知信。

首先我們一樣先登入 [AWS Console](https://console.aws.amazon.com/console/home)

然後在中間的輸入框查詢 CloudWatch ，或是透過左上角的 Services 點選到　Management Tools　下的 CloudWatch 服務。

接著點選進入 Account Billing Console 功能，如果發現帳戶權限不夠請提高權限或是使用 root 帳號登入：

![lab_1.png](lab_1.png)

![lab_2.png](lab_2.png)

![lab_3.png](lab_3.png)

畫面拉至下方可以看到啟用費用故算的連結：

![lab_4.png](lab_4.png)

勾選啟用帳單通知：

![lab_5.png](lab_5.png)

接著到剛剛的 Alarm 新增一筆 Billing Alarm，這邊我們可以給予預定通知的上限金額為多少，並且指定寄送信箱：

![lab_6.png](lab_6.png)

最後收信開通即可：

![lab_7.png](lab_7.png)

![lab_8.png](lab_8.png)

![lab_9.png](lab_9.png)

CloudWatch 的監控功能非常多，Billing Alarm　只是其中一種。後續的服務使用到時會再陸續與各位介紹！

## References ##
- [Amazon CloudWatch](https://aws.amazon.com/tw/cloudwatch/)