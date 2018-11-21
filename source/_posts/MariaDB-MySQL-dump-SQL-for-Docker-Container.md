---
layout: post
title: MariaDB/MySQL dump SQL for Docker/Container
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-11-13 22:25:13
categories:
- Container
tags:
- Docker
- Container
- MySQL
- MariaDB
---

記錄如何將運行中的容器化 MySQL/MariaDB 資料匯出至其他容器內的 DB Instance 使用

<!-- More -->

使用 docker 運行 MySQL/MariaDB 已經漸漸常為開發常態，而如何將運行中的容器內 db schema 與 data 匯出至另外一個 cotainer 的 DB Instance 內則是協同開發必備的流程．

這邊簡單記錄如何從一個 *MariaDB* 匯入至另外一個 *MySQL* container 當中．

## 先建立 MariaDB 環境與資料 ##

這邊先透過以下指令下載 *MariaDB* image 檔案並簡單建立 db schema 與 table

1. 拉取 MariaDB image

        docker pull mariadb

2. 運行一個 Instance 並設定密碼與 port 對外

        docker run -p 3306:3306 --name lab-mariadb -e MYSQL_ROOT_PASSWORD=pass.123 -d mariadb

3. 建立資料如下：

  ![01.png](01.png)

## 建立 MySQL 環境 ##

接著透過以下步驟建立 MySQL 環境：

1. 拉取 MariaDB image

        docker pull mysql

2. 運行一個 Instance 並設定密碼與 port 對外

        docker run -p 3316:3306 --name test-mysql -e MYSQL_ROOT_PASSWORD=pass.123 -d mysql

這邊我們避免 *MySQL* 與 *MariaDB* 的 port 衝突，所以設定到 **3316** ，到這邊就可以進入本篇的重點，資料匯入與匯出了．

## Container DB dump ##

這邊可以透過下方指令簡單匯出匯入：

1. 從 *MariaDB* 備份至 *back.sql* :
   
        docker exec <containerid> /usr/bin/mysqldump -B <schema-name> --routines -u root --password=pass.123 <schema-name> > 01_backup.sql

   這邊的 *--routines* 是把 store procedure 匯出(預設 triiger 會匯出)
   
   另外就是 *-B <schema-name>* 這段是為了幫我們會出的 01_backup.sql 建立對應的資料庫並使用它作為匯入

2. 還原至 *MySQL* :

        cat backup.sql | docker exec -i 5b6d /usr/bin/mysql -u root --password=pass.123 test
  
到這邊我們就可以看到資料成功還原至 *MySQL* 了．

怕麻煩的朋友甚至可以寫成 *.sh* 檔案加快協同開發：

mysql-docker-export.sh 內容：

```shell
# Backup
docker exec 1ddf /usr/bin/mysqldump  -B LabMariabDB --routines -u root --password=pass.123 LabMariabDB > backup.sql

# Init
cat init.sql | docker exec -i 5b6d /usr/bin/mysql -u root --password=pass.123

# Restore
cat backup.sql | docker exec -i 5b6d /usr/bin/mysql -u blackie --password=pass.123 test
```

這邊的 *1ddf* 是 *MariaDB* 的 container id, *5b6d* 是 *MySQL* 的 container id

init.sql 內容：

```sql
CREATE USER 'blackie'@'%' IDENTIFIED BY 'pass.123';
GRANT All privileges ON *.* TO 'blackie'@'%';
```