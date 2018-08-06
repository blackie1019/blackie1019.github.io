---
layout: post
title: Play K8S with Fun - Minikube
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-06 23:34:47
categories:
- Container
tags:
- K8S
- Minikube
---

K8S 的本機單節點玩具：Ｍinikube

<!-- More -->

K8S 是 *kubernetes* 的縮寫(軟體界很習慣保留前後字母中＋中間字數)．而 [Minikube](https://github.com/kubernetes/minikube) 主要是協助推廣 K8S 在本機運行*單節點*的架構，讓開發者可以熟悉相關指令．


macOS的安裝相對簡單，先準備好以下其中一種：

- Hyperkit driver
- xhyve driver
- VirtualBox
- VMware Fusion

本次嘗試運行於 ＊VirtualBox＊ 上．另外由於安裝透過 [Brew](https://brew.sh/index_zh-tw) 進行配置，所以先必須將環境安裝好

![01](01.png)

記得在安裝 Brew 前必須先同意 XcodeBuild 的許可：

![02](02.png)

準備好 Brew 後即可透過以下指令進行安裝:

    brew cask install minikubebrew

![03](03.png)

接著可以透過 minikube 與 kubectl 指令確認一下安裝完成：

![04](04.png)

![05](05.png)

接著我們可以透過 **start** 指令帶起 minikube

    minikube start

這個動作會幫我們把必要的 image 檔案下載會來並運行起來．

![06](06.png)

但如果安裝過程有出錯，如以下：

![07](07.png)


可以透過 **delete** 指令刪除當前的安裝環境

    minikube delete && rm -rf ~/.minikube

![08](08.png)

並重新執行 start 指令安裝

![09](09.png)

接著就可以透過 kubectl 確認當前執行的節點資訊:

    kubectl get nodes

![10](10.png)

也可以透過 **dashboard** 前往當前環境的 dashboard

    minikube dashboard

![11](11.png)