---
layout: post
title: Angular FullStack developer with Yeoman
subtitle: ""
date: 2015-03-28 00:29:45
author: Blackie
header-img: "logo.jpeg"
categories:
- JavaScript
tags:
- AngularJS
- NodeJS
- MongoDB
- MAN
- Yeoman
---

這系列文章會用Yeoman的angular-fullstack來做介紹。

<!-- More -->

開發環境是Mac+sublimeText

因為是MEAN架構主要會用到以下幾項

- MongoDB
- Express
- AngularJS
- NodeJS
- Grunt
- Bower

額外會用到的有之後會依序介紹。接下來讓我們從實際來上手一次，如果想先知道結果會長怎樣可以先去[Demo](http://fullstack-demo.herokuapp.com/)這邊瞧瞧。

## Install

- 先安裝好NodeJs(with npm)
- 安裝 yeoman

		npm install -g yo

- 安裝 generator([angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack))

		npm install -g generator-angular-fullstack

- 建立一個資料夾然後進入該資料夾的路徑內

		mkdir my-new-project && cd $_

- 使用yeoman建立新專案

		yo angular-fullstack [app-name]

建立的過程需要一點時間而且他會幫你更新相依性套件，這邊要稍微注意一下權限，有必要的話記得把npm globle安裝路徑的權限設定為可讀

- 這邊我們沒有要在本機建立MongoDB，所以我們使用[MongoLab](https://mongolab.com/databases/webapp)來幫我們建置，請在註冊好帳號後新增一個Database跟新增一個Users來讓他連線

	![001](001.png)

	![002](002.png)

## Detail

建立完後我們先來看一下整個專案架構

![01](01.png)

有玩過一下上面的Demo那你大概會知道我們產生的這個樣品會有兩個跟DB有關的功能

- 註冊/登入 user
- 新增/移除 thing

所以你可以在api資料夾下面找到thing與user資料夾，裡面就是用Mongoose幫你建立的資料存取

![03](03.png)

而我們現在就要把這個範例的連線換到我們剛剛自己註冊的MongoLab上面，這邊你會需要修改一下config\environment資料夾裡面的一些連線設定，MongoLab的uri連線格式如下：

	mongodb://<dbuser>:<password>@<yourdsnumber>.mongolab.com:<yourdbport>/<databasename>

![04](04.png)

以上設定完成後你就可以透過下面指令在run起你的網站

	grunt server

此時你看到成功建立後就可以在瀏覽器輸入http://localhost:9000/ 來看看你的網站

![05](05.png)
