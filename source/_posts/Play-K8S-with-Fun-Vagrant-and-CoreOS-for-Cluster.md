---
layout: post
title: Play K8S with Fun - Vagrant and CoreOS for Cluster
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-07 00:36:14
categories:
- Virtualization
tags:
- K8S
- Vagrant
- CoreOS
- VM
---

K8S 的本機多節點玩具 Vagrant + CoreOS 

<!-- More -->

基本上本次是透過 Vagrant 與已經製作好的 Vagrant file 進行多節點的 K8S 環境建置．

前置條件就是 [Vagrant](https://www.vagrantup.com/) :

- Vagrant 2.1.1+
- Vagrant hypervisor 可選:
    - Virtualbox (the default)
    - Parallels Desktop
    - VMware Fusion or VMware Workstation

![02](02.png)

本次搭配預設安裝好的 [VirtualBox](https://www.virtualbox.org/) 

準備好即可至[pires/kubernetes-vagrant-coreos-cluster](https://github.com/pires/kubernetes-vagrant-coreos-cluster)專案目錄下載專案後與專案目錄執行：

    git clone git@github.com:pires/kubernetes-vagrant-coreos-cluster.git

![01](01.png)

接著於專案目錄執行：

    vagrant up

![04](04.png)

整個安裝過程非常無腦，只要記得輸入密碼就好：

![02](02.png)

![03](03.png)

安裝好可透過以下指令查看當前節點配置：

    vagrant status

![05](05.png)

知道節點名稱後，可透過下面指令遠端進入內部：

    vagrant ssh master

![06](06.png)

最後我們可以透過 kubectl 確認當前節點：

    kubectl get nodes

![07](07.png)

如此我們就準備好環境．透過 kubectl 我們可以查看當前環境：

    kubectl config get-contexts

![08](08.png)

如果需要在多個 K8S 叢集環境切換，可以透過以下方式切換回 *minikube*:

    kubectl config set current-context minikube

![09](09.png)

而整個 kube 設定檔案可以透過 ＊~/.kube/config＊ 找到並修改

    