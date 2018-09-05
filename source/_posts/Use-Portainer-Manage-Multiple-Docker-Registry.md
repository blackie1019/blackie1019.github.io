---
layout: post
title: 'Use Portainer Manage Multiple Docker Registry '
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-09-05 12:31:46
categories:
- Virtualization
tags:
- Docker
- Docker Registry
- Container
---

分享一下如何使用 Portainer 輕鬆管理多個 Docker Registry

<!-- More -->

Docker 是近年必備的開發技能之一，有不少企業也將此技術放置正式環境上作部署與運作．如果今天有需要從非官方的 docker registry（也就是不是從 *hub*, https//hub.docker.com/) 就會需要額外進行 *login* 並在 *pull* 時搭配指定的 registry 位置才可以成功取得，以下用 [Redhat regisry](https://registry.access.redhat.com) 為例 :

    docker login registry.access.redhat.com

![01_1](01_1.jpg)

登入成功後即可拉取映像檔案，這邊以[.NET Core 2.0 Runtime on RHEL](https://access.redhat.com/containers/?tab=images&platform=docker#/registry.access.redhat.com/dotnet/dotnet-20-runtime-rhel7)為例：

    docker pull registry.access.redhat.com/dotnet/dotnet-20-runtime-rhel7

![01_2](01_2.jpg)

如此便可取得非官網的 registry 檔案．但每次都要打上前綴的 registry url 實在很煩人，這時我們就拿出上次介紹的 [Portainer - Simple and useful management UI for Docker](http://blackie1019.github.io/2018/08/29/Portainer-Simple-and-useful-management-UI-for-Docker/) 

## Add New Registry into Portainer ##

運行 Portainer 後可以在 Settings> Registries 找到新增 Registry 的地方：

![02](02.jpg)

![03](03.jpg)

![04](04.jpg)

當設定好後，可以到 *Images* 選擇拉取一個新的 image ，這邊選擇剛剛的註冊的 registry 並輸入指定的 image 名稱即可：

![05](05.jpg)

是不是很簡單！趕快改用 *Portainer* 做你的容器管理工具吧