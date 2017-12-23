---
layout: post
title: 'Amazon Web Service 30 days - 18 : Elastic Beanstalk'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-06 00:03:18
---

30天鐵人賽介紹 AWS 雲端世界 - 18:　讓程式開發人員能更專注開發的上線環境 Elastic Beanstalk

<!-- More -->

## What is Elastic Beanstalk ##

Elastic Beanstalk 是提供一個在 AWS 裡面簡單管理、部署 Web 應用程的服務。只需要上傳開發好的應用程式，透過 Elastic Beanstalk 即可動態的幫你完成從容量配置、負載平衡（load balancing）、水平自動擴展（auto scaling）到應用程式的運行狀況監控(monitoring)的部署需求一次搞定。

對程式員來說，我們可以花更多時間來維護我們的程式碼而非惱人的運作環境跟監控，這對小型團隊來說是非常有幫助的服務。

<iframe width='560' height='315' src='https://www.youtube.com/embed/SrwxAScdyT0' frameborder='0' allowfullscreen></iframe>

目前支援開發語言包含:

- Apache Tomcat for Java applications
- Apache HTTP Server for PHP applications
- Apache HTTP Server for Python applications
- Nginx or Apache HTTP Server for Node.js applications
- Passenger or Puma for Ruby applications
- Microsoft IIS 7.5, 8.0, and 8.5 for .NET applications
- Java SE
- Docker
- Go

## Hands on Lab ##

接下來我們將會使用 [Next.js](https://github.com/zeit/next.js/) + [React](https://github.com/facebook/react) + Docker 運行在 Elastic Beanstalk 當中。

> Next.js is a minimalistic framework for server-rendered React applications.

這邊參考的 docker images 是別人的範例: [onready/demo-next.js](https://github.com/onready/demo-next.js)

透過以下兩行指令我們可以快速在本機啟用該範例

    docker pull onready/demo-next.js
    docker run -d -p 3000:3000 onready/demo-next.js

這邊我們可以看到網站已經成功運行起來，接著我們將放到 Elastic Beanstalk 當中運行。

![lab_3.png](lab_3.png)

先登入 [AWS Console](https://console.aws.amazon.com/console/home)然後再點選 Elastic Beanstalk 服務，這邊我們建立一個新的 Docker 類型的服務:

![lab_1.png](lab_1.png)

等服務準備好了，我們即可上傳檔案至當前環境:

![lab_2.png](lab_2.png)

![lab_4.png](lab_4.png)

![lab_5.png](lab_5.png)

接著我們將建立一個Dockerfile讓 Elastic Beanstalk 去拉取指定檔案去建置環境:

![lab_7.png](lab_7.png)

如果上傳的檔案指令或配置有錯誤則會收到下面的錯誤訊息:

![lab_9.png](lab_9.png)

完成後即可透過上方的連結看到當前網頁的畫面:

![lab_6.png](lab_6.png)

![lab_8.png](lab_8.png)

## References ##

- [AWS Elastic Beanstalk - Running Microservices and Docker](https://www.slideshare.net/AmazonWebServices/aws-elastic-beanstalk-running-microservices-and-docker)
- [什么是 AWS Elastic Beanstalk？](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
- [AWS Elastic Beanstalk - FAQs](https://aws.amazon.com/elasticbeanstalk/faqs/)
- [Single Container Docker Configuration](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_image.html)
- [Single Container Docker Environments](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/docker-singlecontainer-deploy.html#docker-singlecontainer-dockerfilesample)