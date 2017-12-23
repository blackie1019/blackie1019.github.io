---
layout: post
title: 'Amazon Web Service 30 days - 6 : S3 and Cross Region Replication'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2017-12-25 00:24:16
---

30天鐵人賽介紹 AWS 雲端世界 - 6:　建立跨區域的S3 Bucket

<!-- More -->

## Why need CloudCross-Region Replication S3 Bucket ##

![data-replication-options](data-replication-options.jpg)

再開始介紹該功能前，先就官方整理的需求情境做一個簡單的說明：

- 法規規定(Compliance requirements)

    法規規定檔案可能只能留在境內

- 最低網路延遲需求(Minimize latency)

    希望提供最快速的檔案取得方式

- 操作與維運需求(Operational reasons)

    跨區域的 AWS 服務

- 副本控制需求(Maintain object copies under different ownership)

    我們希望讓獲得該資料槽的人有完全操控副本的權力，即更換修改或是新增

從以上情境我們可以知道，跨區域的S3資料槽地確有其使用情境，接這著我們來手把手的開啟該功能。

## Hands on Lab ##

首先回到昨天所建立的資料槽

![lab_1.png](lab_1.png)

我們先新增一個資料夾名為 *Replication*:

![lab_2.png](lab_2.png)

並將此資料槽設定為公開後，在上傳一張新的檔案至該資料夾內：

![lab_2_2.png](lab_2_2.png)

接著為了省去每次上傳都將預設的 private開啟至 ，可至 Bucket Policy 下方產生特定的規範給該 Bucket套用：

![lab_2_4.png](lab_2_4.png)

![lab_2_5.png](lab_2_5.png)

![lab_2_6.png](lab_2_6.png)

![lab_2_7.png](lab_2_7.png)

設定好後按下產生將內容貼回按下儲存即可，之後的檔案則全部會套用預設為公開。

![lab_2_8.png](lab_2_8.png)

![lab_2_9.png](lab_2_9.png)

![lab_2_10.png](lab_2_10.png)

接著我們再點選 Management 下的Replication功能，輸入我們剛剛新增的資料夾名稱

![lab_2_3.png](lab_2_3.png)

而這邊可以給予不同的儲存等級設定：

![lab_2_11.png](lab_2_11.png)

接著我們依序下一步完成建立可以看到頁面上新增了一個bucket:

![lab_2_12.png](lab_2_12.png)

![lab_2_13.png](lab_2_13.png)

這邊可以看到新增的bucket並未設定成預設公開，且我們的檔案也沒有同步過來：

![lab_2_14.png](lab_2_14.png)

而當我們回去原本的資料夾新增檔案後，這邊的Replication則會正常啟動抄寫一份過來

![lab_2_15.png](lab_2_15.png)

![lab_2_16.png](lab_2_16.png)

## References ##

- [Cross-Region Replication (CRR)](http://docs.aws.amazon.com/AmazonS3/latest/dev/crr.html)
- [Data Replication Options in AWS (ARC302) | AWS re:Invent 2013](https://www.slideshare.net/AmazonWebServices/massive-message-processing-with-amazon-sqs-and-amazon-dynamodb-arc301-aws-reinvent-2013-28420896)