---
layout: post
title: MariaDB/MySQL collaborative development with Docker-Compose/Container
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-11-14 11:01:09
categories:
- Container
tags:
- Docker
- Container
- MySQL
- MariaDB
---

記錄如何透過 docker-compose 使用 MySQL/MariaDB 完整容器化開發與測試

<!-- More -->

延續上篇[MariaDB/MySQL dump SQL for Docker/Container
](http://blackie1019.github.io/2018/11/13/MariaDB-MySQL-dump-SQL-for-Docker-Container/) , 在協同開發裡面最常遇到的狀況就是需要還原資料到本機搭配程式運行，如何將資料匯出與資料建立用最快的方式運行則是今天分享的內容．

這邊的前置作業請參考上一篇的 [建立 MariaDB 環境與資料](http://blackie1019.github.io/2018/11/13/MariaDB-MySQL-dump-SQL-for-Docker-Container/#%E5%85%88%E5%BB%BA%E7%AB%8B-MariaDB-%E7%92%B0%E5%A2%83%E8%88%87%E8%B3%87%E6%96%99)

本次要透過 docker-compose 加速整個流程的進行，會建立以下目錄與內容:

  /Database/
  |-------/dump/
  |-------|-- 00_init.sql
  |-------|-- 01_backup.sql
  |-- build.sh
  |-- docker-compose.yml

當我們有資料後則透過以下方式進行資料還原與準備初始化：

1. 資料還原的語法(與上一篇相同)，只是我們放入 *build.sh* 中:

    ```shell
    #! /bin/sh
    docker exec <containerid> /usr/bin/mysqldump -B <schema-name> --routines -u root --password=pass.123 <schema-name> > 01_backup.sql

    docker-compose up -d

    dockdr-compose ps
    ```

  這邊要注意

2. 準備 *init.sql* 如下

    ```sql
    CREATE USER 'blackie'@'%' IDENTIFIED BY 'pass.123';
    GRANT All privileges ON *.* TO 'blackie'@'%';
    ```

3. 這邊準備的 *docker-compose.yml*

    ```yaml
    version: '2'

    services:
      mmc-test-db:
        image: mysql:8.0.12

        ports:
          - "3316:3306"
        environment:
          MYSQL_ROOT_PASSWORD: pass.123
        volumes:
          - "./dump:/docker-entrypoint-initdb.d"

        stdin_open: true
        tty: true
    ```

    為了避免 *port* 重複，將對外的 port 改置 *3316*

    這邊透過 MySQL 與 ＭariaDB 的 *docker-entrypoint-initdb.d* 這個特殊的目錄，在 Instance 啟動時就幫我們執行資料目錄內的 .sh, .script 與 .sql 檔案．

    另外，如果透過 docker-compose 的方式啟動記得要補上 *stdin_open* 與 *tty* 設定，確保服務不會執行完就終止．

以上資料都準備好後，只需執行 *build.sh* 指令集即可幫我們將資料放入新的本機容器內運行．

我們可以透過以下指令確認當前運行的環境狀態：

    docker-compose ps

或是也可以透過下方指令查看所有 container 狀態:

    docker ps -a