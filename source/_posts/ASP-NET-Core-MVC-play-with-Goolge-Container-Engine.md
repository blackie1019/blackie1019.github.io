---
layout: post
title: ASP.NET Core MVC play with Goolge Container Engine
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-10 09:52:01
categories:
- Asp.Net
tags: 
- Asp.Net Core
- Google Cloud
- Container Engine
- Docker
---

使用Google Container Engine 是Google所推出的Container Host Cluster服務，讓Docker(Cotainer)透過Cluster環境來執行你所寫的ASP.NET Core MVC程式。

<!-- More -->

Google Container Engine (GKE) 是Google所推出的Container Host Cluster服務，GKE 一方面允許擴展可以使用的資源，另一方面則可以讓執行時候可以有容錯的可能性(避免單點錯誤的狀況發生)。而為什麼叫GKE而不是叫GCE勒，原因在於K指的是Google 自家的kubernetes系統。 Docker本身強調build, ship and run的觀念，透過K8S作完整的管理即可達到擴展性與可修復等特性。

# Kubernetes Introduction #

Kubernetes (K8S) 是 Google 團隊發起並維護的Docker開源Container Host Cluster管理系統，它支援常見的雲平台(Google Cloud, AWS, Azure)，也支援內部架設。

Google 於2015年釋出K8S後，引起了話題。原先僅是屬於內部專案 – Borg，之後IT大廠如Redhat, CoreOS, IBM, 甚至 Amazon, Microsoft 這些公有雲端供應商都搶著整合進自己的服務中。

![kubernetes pods](kubernetes pods.png)

K8S本身透過GO來實作，有以下的特性:

- 簡單：輕量級，簡單，容易理解
- 方便：支援公有雲，私有雲，混合處理雲，以及多種雲平台
- 拓展姓：模組化，可插拔，支援鉤子，可任意組合
- 自修復：自動重調度，自動重啟，自動複製

針對K8S更詳細的介紹請參考[yeasy docker practice 2017年正體中文譯本 - Kubernetes](https://wild0522.gitbooks.io/yeasy_dp/content/kubernetes/))

![kubernetes_design](kubernetes_design.jpg)

以下節錄重點介紹

- 節點（Node）：一個節點是一個執行 Kubernetes 中的主電腦。
- 容器組（Pod）：一個 Pod 對應於由若干容器組成的一個容器組，同個組內的容器共享一個儲存卷(volume)。
- 容器組生命週期（pos-states）：包含所有容器狀態集合，包括容器組狀態類型，容器組生命週期，事件，重啟原則，以及replication controllers。
- Replication Controllers（replication-controllers）：主要負責指定數量的pod在同一時間一起執行。
- 服務（services）：一個Kubernetes服務是容器組邏輯的進階抽像，同時也對外提供存取容器組的原則。
- 卷（volumes）：一個卷就是一個目錄，容器對其有存取許可。
- 標籤（labels）：標籤是用來連線一組對象的，比如容器組。標籤可以被用來組織和選擇子物件。
- 介面權限（accessing_the_api）：連接埠，ip位址和代理的防火牆規則。
- web 界面（ux）：使用者可以透過 web 界面作業Kubernetes。
- 指令行指令列作業（cli）：kubecfg指令。

## Kubernetes Overviw ##

K8S屬於分散式架構，主要由三個元件所構成：

1. Master – 主節點，負責主要管理與協調各Node
2. Node – 主要工作的節點，上面運行了許多容器(Pod)。之前看過，在1.3版的K8S可操控高達2,000個nodes以上，可支援60,000個Pod。這邊最有名的案例就是Niantic推出的Pokémon Go
3. Masters和Nodes組成叢集(Clusters)

kubernetes pods:

![kubernetes pods](kubernetes pods.png)

kubernetes pods 細節:

![kubernetes pods_detail](kubernetes pods_detail.png)

# Setup up Google Container Engine #

## 1. Register and Create Google Container Engine Project ##

## 2. Google Clude SDK ##

## 3. Publish ASP.NET Core MVC App to Cloud ##

# References #
- [GKE 系列文章(一) – 為什麼使用 Kubernetes](https://www.cool3c.com/article/119184)
- [Pokémon GO全球大賣的隱形關鍵](http://www.ithome.com.tw/voice/108907)