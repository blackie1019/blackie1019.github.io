---
layout: post
title: 'Amazon Web Service 30 days - 17 : EC2 AutoScaling Group'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-05 00:05:33
---

30天鐵人賽介紹 AWS 雲端世界 - 17:　透過 EC2 AutoScaling Group 實現自動拓展功能

<!-- More -->

## EC2 AutoScaling Group ##

AWS Auto Scaling 是用來處理 Web application 水平擴充性(scale out)問題，會依據當下請求的忙碌程度來增減所需的 instance　數目。這邊需要稍微注意該功能需要搭配 ELB 或是 CloudWatch 一起使用，使用上需要先搭配 Launch Configuration 來運作，由 Launch Configuration 當作範本來加速擴展時 instance 配置設定的參考，搭配 Auto Scaling Group 設定擴展的條件與其對應的動作與通知等行為。

![step](step.png)

## Hands on Lab ##

延續昨天的環境，我們將啟用不同 AZ 的 EC2 instance 並透過 EFS　掛載一個共用的磁區做分享使用。並在　instance 中都安裝 Apache 服務並啟用。

不一樣的是今天我們先新增一個 healthy.html 至 當前的 EFS 中：

![lab_1.png](lab_1.png)

![lab_2.png](lab_2.png)

接著我們將建立一組 ELB 服務給當前的 instance 們使用，設定上有問題可以參考先前 *Day 15* 的教學：

![lab_4.png](lab_4.png)

建立好後就可以用 ELB 當前的 DNS 去瀏覽網頁：

![lab_5.png](lab_5.png)

接著在 EC2 服務下新增一組 Launch Configuration 幫我們作為 AutoScaling 的設定依據：

![lab_3.png](lab_3.png)

依序選擇擴展時的 AMI　與 Instance Type ：

![lab_6.png](lab_6.png)

![lab_7.png](lab_7.png)

這邊我們可以再進階設定加入以下的 user data 作為第一次啟用時的初始化腳本：

    #!/bin/bash
    yum update -y
    yum install httpd -y
    sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 fs-d4a09e9d.efs.us-east-1.amazonaws.com:/ /var/www/html
    service httpd start
    chkconfig httpd on

![lab_8.png](lab_8.png)

最後選擇磁碟空間與安全權限設定即可：

![lab_9.png](lab_9.png)

![lab_10.png](lab_10.png)

當完成 Lauch Configuration 設定後即可設定擴展的判斷標準與動作，這邊我們首先要設定擴展時使用的 AZ 與榜定的 ELB 為誰與 Healthy check的依據:

![lab_11.png](lab_11.png)

擴展的選項在進階項目可以將增加 instance 數目與減少 instance 數目兩種行為分開設定，今天設定上比較簡單的採用預設選項，。

![lab_12.png](lab_12.png)

最後設定通知按下確定即可完成：

![lab_13.png](lab_13.png)

此時我們可以看到原先的 ELB 上運作的兩台 instance 外有一台新的 instance 在準備，而當我們將原本兩台暫時關閉時，這台 instance 也會開始處理對應的擴展判斷，增減其 instance 數目。

![lab_14.png](lab_14.png)

![lab_15.png](lab_15.png)

![lab_16.png](lab_16.png)

除非遇上 instance 還在初始化，不然單一主機卸離或出現實體主機問題都可以透過自動擴展的方式來解決，而當所有 ELB 等下的主機都還在準備則會遇到以下錯誤：

![lab_17.png](lab_17.png)

不過該錯誤在有機器準備好運行的情況下馬上就可以恢復了：

![lab_18.png](lab_18.png)

而過程中如果有自動增減 instance 的行為發生，所有的通知都可以從設定的信箱中確認：

![lab_19.png](lab_19.png)

## References ##

- [Auto Scaling](https://aws.amazon.com/tw/autoscaling/)
- [AWS Auto Scaling 中文教學](http://vmixp7.blogspot.tw/2017/02/aws-auto-saling.html)