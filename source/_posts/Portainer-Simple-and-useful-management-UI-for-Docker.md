---
layout: post
title: Portainer - Simple and useful management UI for Docker
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-29 11:33:35
categories:
- Virtualization
tags:
- Container
- Monitoring
---

介紹一款簡單但實用的 Container 管理工具
<!-- More -->

![logo](logo.png)

[Portainer](https://portainer.io/) 是一款簡單的的容器圖像化管理工具．可以透過此工具協助全覽當前環境的容器運行狀況與相關配置．可以查看docker image, container，並執行start/stop/restart/remove 等動作，也可查看每個container的log及error. 

除了本機的 docker 環境可以被管理外，遠端的環境也可以被納入管理的範圍(登入的權限也需要給予對應的配置)．

最簡單的安裝方式可以透過 *docker-compose* 直接安裝：

1. 新增一份 *docker-compose.yml* 的檔案

    ![01](01.png)

2. 貼上官網的 docker-compose 配置內容並儲存

    ```yml
    version: '2'

    services:
    portainer:
        image: portainer/portainer
        ports:
        - "9000:9000"
        command: -H unix:///var/run/docker.sock
        volumes:
        - /var/run/docker.sock:/var/run/docker.sock
        - portainer_data:/data

    volumes:
    portainer_data:
    ```

3. 在該檔案目錄位置下執行下面指令：

        docker-compose up -d

    ![02](02.png)

建立時須注意預設配置是在本機 *9000* 端口上, 如果已被佔用會導致部屬失敗，此時更改配置的端口即可．

當我們建立完成後即可透過瀏覽器到[本機的9000端口上](http://localhost:9000/)查看, 第一次登入的時候會需要設定密碼．而密碼配置也可以從先前的 *yml* 或 指令列中傳入，相關內容可參考：[Docs » Configuration:Admin password](https://portainer.readthedocs.io/en/stable/configuration.html#admin-password)

完成密碼設定後即可看到以下 dashboard 畫面：

![03](03.png)

我們可以切換右邊的 tab 至不同的頁面，如當前的 container 運行與資源配置狀況：

![04](04.png)

已經下載的 images :

![05](05.png)

或是從設定好的 docker registry 可及時建置的 image 環境配置:

![06](06.png)

而除了這些基本的 docker 環境全覽外，也可以設定使用者帳戶與權限群組來針對資源進行分群：

![07](07.png)

也可以簡單地加入非官方的 docker registry 來讓我們可以快速的從 App Templates 處建立環境：

![08](08.png)

## References ##

- [Portainer documentation](https://portainer.readthedocs.io/en/stable/index.html)
- [How to Manage Docker Containers using Portainer on Ubuntu](https://www.howtoforge.com/tutorial/ubuntu-docker-portainer/)