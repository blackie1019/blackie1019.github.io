---
layout: post
title: 'Amazon Web Service 30 days - 15 : Elastic Load Balancing(ELB)'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-03 00:02:29
---

30天鐵人賽介紹 AWS 雲端世界 - 15:　EC2的網路負載平衡服務 Elastic Load Balancing(ELB)

<!-- More -->

## What is Elastic Load Balancing ##

Elastic Load Balancing(ELB)是提供 EC2 或是後面會介紹到的　可在多個目標(例如Amazon EC2 執行個體、容器與IP 地址) 之間自動分配傳入的應用程式流量。它可以在單一可用區域或跨多個可用區域處理您應用程式流量的各種負載。

- Classic Load Balancer

    可串聯 EC2 Instance 提供基本負載平衡的功能

- Application Load Balancer

    適合用來處理 HTTP 與 HTTPS 流量的負載平衡，可適用於一般 EC2 Instance或是微型服務與容器方式運行的服務，以提供進階請求路由功能。Application Load Balancer 在網路的應用層 (Layer 7 - application layer)運作。

- Network Load Balancer

    提供極高效能的情況下處理 TCP 流量的負載平衡。Network Load Balancer 在連線層 (Layer 4 - transport layer) 運作，可將流量路由到 Amazon Virtual Private Cloud (Amazon VPC) 內的目標。

這邊有提到不同的網路層，從ISO的OSI定義的網路七層([Layers in the OSI and Internet Models](https://www.nginx.com/resources/glossary/layer-4-load-balancing/#layers))來看不同網路層提供的網路負載平衡各有優缺點，但簡單來說越偏向上方第七層的負載平衡器可以提供更多 CPU 運算的能力與彈性，而越偏向下方第四層的負載平衡器則是可以針對IP與封包做出有效的分流。

![FreeLoadBalancerLayer4Layer7](FreeLoadBalancerLayer4Layer7.jpg)

像是我們常見的 Load Balancers 都趨向用*連線層 (Layer 4 - transport layer)*運作，好處是比較容易透過區分與實作，基本上就是用一個Load Balancers建立一個 pool ，此 pool 會有一個對外 IP ，所有request 透過此 inbond IP 得到回應。而每個 instance 個別 IP 位置則指向此 pool 內做管理，由 Load Balancer 做分配。由於是較為底層的協定所以能做的通訊協定只要基於 UDP、TCP等都可以實作。

![layer_4_load_balancing.png](layer_4_load_balancing.png)

而使用*應用層 (Layer 7 - application layer)*運作的 Load Balancers 則可以提供我們更多的功能，能從路由來源直接給予特殊的規則指派，如反向代理功能(reverse proxy)。

![layer_7_load_balancing.png](layer_7_load_balancing.png)

更多細節可以參考[WHAT IS LAYER 7 LOAD BALANCING?](https://www.nginx.com/resources/glossary/layer-7-load-balancing/)與[WHAT IS LAYER 4 LOAD BALANCING?](https://www.nginx.com/resources/glossary/layer-4-load-balancing/)。

## Hands on Lab ##

今天將會建立兩個 Linux + Apache 的網路伺服器，再透過 ELB Classic Load Balancer將兩個串連起來並透過 ELB 的 DNS 接出去給外面做使用。

### Create EC2 Instance for Linux + Apache ###

首先我們先快速的建立一個獨立的 Linux + Apache EC2 Instance

先登入 [AWS Console](https://console.aws.amazon.com/console/home)

然後在中間的輸入框查詢 EC2 ，或是透過左上角的 Services 點選到　Compute　下的 EC2 服務。

接著我們按照先前的範例先建立一個 Instance 裝載 apache 可以服務一個簡單的網頁，這邊我們改用 Linux 環境為範例：

![lab_1.png](lab_1.png)

這邊挑選一個指定的AZ，並額外給予 Tags(這在之後的 CloudWatch 可以協助我們看整體花費的比例):

![lab_2.png](lab_2.png)

![lab_3.png](lab_3.png)

這邊我們設定 80、443給網站使用，並開放 22 port 做 ssh，而這邊如果打上 0.0.0.0/0 表示全開，所以會有警告：

![lab_4.png](lab_4.png)

![lab_5.png](lab_5.png)

在登入後使用管理者權限做操作更新當前的套件：

    sudo su
    yum update -y

![lab_10.png](lab_10.png)

![lab_11.png](lab_11.png)

接著我們安裝 apache ，並且設定 index.html 做為網站起始頁面:

    yum install httpd -y

![lab_12.png](lab_12.png)

![lab_13.png](lab_13.png)

![lab_14.png](lab_14.png)

完成上述步驟記得將 httpd 服務呼叫起來:

    service httpd start

![lab_15.png](lab_15.png)

![lab_16.png](lab_16.png)

### Create ELB for EC2 instance ###

這邊我們一樣從 EC2 頁面左側的 Load Balancers 新增一組 Application Load Balancer：

![lab_20.png](lab_20.png)

![lab_21.png](lab_21.png)

![lab_22.png](lab_22.png)

首要要給這個 Load Balancer 我們需要處理的 port 與啟用的 AZ :

![lab_23.png](lab_23.png)

![lab_24.png](lab_24.png)

而如果我們有 80 port 則會跳出以下警告提醒我們改用 HTTPS: 

![lab_25.png](lab_25.png)

接著加入先前設定的 EC2 Instance:

![lab_26.png](lab_26.png)

這邊設定 *Routing* 以及 *Health Checks* 的規則，稍後我們會回去 EC2 建立該頁面:

![lab_27.png](lab_27.png)

不要忘記將Target 加入上方 Registered targets當中：

![lab_28.png](lab_28.png)

最後確認無誤後即可從 ELB 對外的 dns 看到整個網站已經成功被加入：

![lab_29.png](lab_29.png)

![lab_30.png](lab_30.png)

![lab_31.png](lab_31.png)

![lab_32.png](lab_32.png)

### Add healty.html for healthy check ###

而這邊為了之後的 ELB healthy check功能我們新增一個 healty.html 網頁：

![lab_17.png](lab_17.png)

![lab_18.png](lab_18.png)

![lab_19.png](lab_19.png)

這邊要稍微注意如果使用 ELB 但healty.html 失效或被移除則該服務的 EC2 Instance 會被認為服務異常而將整個 Instance 移除當前的 Load Balancer pool 裡面，直到 healthy check 的狀態恢復正常。

### Windows use putty login EC2 ###

這邊提一下如何在 Windows 使用 SSH 登入，通常我們從 EC2 可以下載 .pem 檔案，而這邊我們必須使用 PuttyGen 轉換成 .ppk 檔案後才透過 Putty 做為登入的金鑰：

![lab_6.png](lab_6.png)

![lab_7.png](lab_7.png)

![lab_8.png](lab_8.png)

而這邊建議設定連線時要帶入 ec-2-user@<RemoteDomain> 的方式登入：

![lab_9.png](lab_9.png)

## References ##

- [Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/?nc1=h_ls)
- [An Introduction to HAProxy and Load Balancing Concepts](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts)