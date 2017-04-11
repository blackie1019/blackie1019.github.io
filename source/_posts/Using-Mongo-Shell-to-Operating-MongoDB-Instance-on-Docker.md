---
layout: post
title: Using Mongo Shell to Operating MongoDB Instance on Docker
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-12 00:01:47
categories:
- Database
tags:
- MongoDB
---

介紹如何使用Mongo Shell操作執行在Docker內的MongoDB Instance

<!-- More -->

# Connect and Execute into Docker Instance #

當我們使用Docker來建立我們的MongoDB時我們可以透過直接連線至Docker執行中的Instance內進行操作．

首先我們可以先查看一下目前運行的Container有哪些:

    docker ps

接著我們可以透過下面指令連至Instance內:

    docker exec -ti <container id> bash

![docker_exec](docker_exec.png)

# Mongo Shell #

我們可以透過mongo這個指令直接進入mongo shell當中

    mongo

![mongodb_shell](mongodb_shell.png)

當我們看到版本資訊與歡迎文字後即可開始輸入我們要的指令, 完整的指令可以參考[mongo Shell Methods](https://docs.mongodb.com/manual/reference/method/)．

## Use Database ##

當我們需要建立一個新的Database時我們需要用use這個指令

    use <database>

接著我們可以用db這個指令列出目前的database

    db

![mongodb_shell](mongodb_shell.png)

而當我們需要切換database時也可用use這個指令

## Create Collection ##

接著我們新增一個collection

    db.createCollection("member")

![mongodb_shell_create_collection](mongodb_shell_create_collection.png)

這邊的第二個參數為選擇性加入，細節參考[db.createCollection()](https://docs.mongodb.com/manual/reference/method/db.createCollection/)

## Create Document ##

接著我們可以透過下面指令新增一筆檔案進入指定的collection內

    db.member.insertOne( { name: "blackie" } );

![mongodb_shell_create_document](mongodb_shell_create_document.png)

## Create User ##

我們可以透過以下指令建立一個新的user並綁定readWrite與dbAdmin兩個角色

    db.createUser(
        {
            user: "dbAdmin",
            pwd: "pass.123",
            roles: [ "readWrite", "dbAdmin" ]
        }
    )

![mongodb_shell_user](mongodb_shell_user.png)

細節參考[User Management Methods](https://docs.mongodb.com/manual/reference/method/js-user-management/)

# References #

- [MONGODB MANUAL : mongo Shell](https://docs.mongodb.com/manual/mongo/#introduction)
