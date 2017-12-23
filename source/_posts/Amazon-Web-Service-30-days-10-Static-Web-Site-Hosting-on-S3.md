---
layout: post
title: 'Amazon Web Service 30 days - 10 : Static Web Site Hosting on S3'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2017-12-29 00:25:28
---

30天鐵人賽介紹 AWS 雲端世界 - 10:　透過 S3 架設靜態網頁

<!-- More -->

今天要介紹 S3 的一個實用功能，架設靜態網頁。

首先我們一樣先登入 [AWS Console](https://console.aws.amazon.com/console/home)

然後在中間的輸入框查詢s3，或是透過左上角的 Services 點選到　Storage　下的 S3 服務。

接著我們新增一個 Bucket 並在 Properties 開啟 *Static Web Hosting* 的功能:

![lab_1.png](lab_1.png)

接著我們上傳兩個寫好的 html 檔案，分別對應到剛剛設定中的 index.html 與 error.html:

![lab_2.png](lab_2.png)

然後我們可以藉著剛剛當前 bucket 的 URL 開啟網站 ：

![lab_4.png](lab_4.png)

這邊要記得將檔案設定為 *public read*

![lab_3.png](lab_3.png)

不然會出現下面問題：

![lab_5.png](lab_5.png)

以下是成功的畫面：

![lab_6.png](lab_6.png)

當我們將inex.html的 read 權限摘除後即可看到錯誤畫面：

![lab_7.png](lab_7.png)

![lab_8.png](lab_8.png)

而我們也可以開啟 Server access logging，就像是網頁伺服器紀錄 request 紀錄的功能一樣將其記錄存放至同一個資料槽內：

![lab_11.png](lab_11.png)

![lab_10.png](lab_10.png)

![lab_9.png](lab_9.png)

## 置換網站 Domain 至特定 Domain ##

如果想知道怎麼把 S3 的 Domain 換成自己的，可以參考這部影片(透過 [GoDaddy](https://tw.godaddy.com/) 購買 Domain)

<iframe width='560' height='315' src='https://www.youtube.com/embed/L7kqlkvllv0"' frameborder='0' allowfullscreen></iframe>

## References ##

- [Hosting a Static Website on Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)