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

我們可以透過下面指令建立一個擁有dbOwner權限的帳號

    db.createUser(
    {
        user: "dbdemo",
        pwd: "pass.123",
        roles: [ { role: "dbOwner", db: "demo" } ]
    }
    )

![mongo_shell_create_dbOwner](mongo_shell_create_dbOwner.png)

由於dbOwner這個role是預設建立(built-in)的角色，包括了readWrite, dbAdmin 與 userAdmin這三個角色的權限．對於role這邊可以參考[Built-In Roles](https://docs.mongodb.com/manual/reference/built-in-roles/)瞭解更多預設角色．

我們也可以透過以下指令建立一個新的user並只綁定readWrite與dbAdmin兩個角色

    db.createUser(
        {
            user: "dbAdmin",
            pwd: "pass.123",
            roles: [ { role: "readWrite", db: "demo" },
                    { role: "dbAdmin", db: "demo"} ]
        }
    )

![mongodb_shell_user](mongodb_shell_user.png)

細節參考[User Management Methods](https://docs.mongodb.com/manual/reference/method/js-user-management/)

## Using User login(Auth) ##

當我們新增user給指定database後我們就可以使用該user登入，而在登入前我們可以使用下面指令測試登入：

    db.auth("user name","password")

![mongo_shell_auth](mongo_shell_auth.png)

而登我們下次登入時則可使用-u, -p 與--authenticationDatabase參數，用該user做登入：

mongo --port 27017 -u "user name" -p "password" --authenticationDatabase "demo"

![mongo_shell_login_auth](mongo_shell_login_auth.png)

# References #

- [MONGODB MANUAL : mongo Shell](https://docs.mongodb.com/manual/mongo/#introduction)
- [MongoDB Tutorial](https://www.tutorialspoint.com/mongodb/)
- [MONGODB MANUAL : mongo Shell Quick Reference](https://docs.mongodb.com/manual/reference/mongo-shell/)