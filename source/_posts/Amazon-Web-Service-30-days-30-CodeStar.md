---
layout: post
title: 'Amazon Web Service 30 days - 30 : CodeStar'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-17 00:04:26
---

30天鐵人賽介紹 AWS 雲端世界 - 30: AWS CodeStar 協助簡化與落實 CI / CD工作流程

<!-- More -->

## What is CodeStar ##

AWS CodeStar 是一個提供專案整合環境的雲端服務，可以將軟體開發的所有資源透過一個服務來呈現相關內容。我們可以透過此服務在 AWS 上快速開發、建立和部署應用程式，這些相關的CI/CD 流程都已經由 AWS 幫我們整合好了。而 CodeStar 透過提供統一的使用者界面，可輕鬆地從單一位置管理軟體的開發活動與團隊協同溝通、合作與開發。

以往持續集成和開發(CI / CD)工作流程的一個問題是：用戶必須在工具之間來回跳轉。這就是為什麼AWS要推出AWS CodeStar。CodeStar 能夠為協同開發軟體和管理AWS內的交付提供一個集成的環境。如果今天你是一個小團隊想要快速上手 AWS 服務，把重心專注在程式碼開發上，CodeStar 是一個不錯的開始。

它結合了 AWS 各種開發服務，包含:

- [AWS CodeCommit](https://aws.amazon.com/tw/codecommit/)(2015 發佈)

    雲端源碼版控服務，可視為 AWS 上的 git repo 

- [AWS CodeBuild](https://aws.amazon.com/tw/codebuild/)(2016 發佈)

    雲端自動化服務，協助編譯原始碼、執行測試，並產生可立即部署的軟件，可視為 AWS 上的 Jenkins 或 TravisCI 

- [AWS CodeDeploy](https://aws.amazon.com/tw/codedeploy/)(2014 發佈)

    雲端自動化部屬服務，可任何執行個體程式碼部署的服務至 EC2 或是 beanstalk 實體上。另外一個類似的服務 [Cloudformation](https://aws.amazon.com/tw/cloudformation/) 則更常用於 Lamdba 服務上，於其他同類型服務的比較可以參考[AWS CodeDeploy - 常見問答集](https://aws.amazon.com/tw/codedeploy/faqs/)


- AWS CodePipeline(2015 發佈)

    雲端管線管理服務，可以視覺化各流程當前的步驟、內容與狀態，讓我們了解當前狀況。

整個穿接起來就是下方：

![introducing-aws-codestar-and-the-aws-cicd-workflow-aws-summit-tel-aviv-2017-11-638.jpg](introducing-aws-codestar-and-the-aws-cicd-workflow-aws-summit-tel-aviv-2017-11-638.jpg)

而 CodeStar 也整合了 Cloud9 作為開發的 IDE 並且可以整合 Jira 作為問題追蹤管理。

這邊推薦大家看一下這個七分鐘的影片介紹，可以幫助大家對 CodeStar 有一個全面的了解。

<iframe width='560' height='315' src='https://www.youtube.com/watch?v=rrbp-IVwFGY' frameborder='0' allowfullscreen></iframe>

而費用計算上， CodeStar 是不用額外費用的，但所有的相關服務與雲端資源則要額外計費(美金)，內容大概如下：

- CodeCommit 

    前五位使用者免費，第六位開始每增加一位每月 $1

- CodeBuild

    - Small Instance : 每執行分鐘 $ 0.005
    - Medium Instance : 每執行分鐘 $ 0.01
    - Large Instance : 每執行分鐘 $ 0.02

- CodePipeline

    每個管線(pipelin)每個月 $1.00

- CodeDeploy

    同 CloudFormation 不用錢

## Hands on Lab ##

首先先登入 [AWS Console] 後在中間的輸入框查詢 CodeStar ，或是透過左上角的 Services 點選到　Developer Tools　下的 CodeStar 服務：

![lab_01.png](lab_01.png)

接著快速新增一個專案:

![lab_02.png](lab_02.png)

![lab_03.png](lab_03.png)

這邊可以選擇預設幫你建立的服務類型，可以根據開發語言與架構以及部屬的雲端服務做挑選，這邊以 Node.js 搭配 Beanstalk 為例：

![lab_04.png](lab_04.png)

這邊版控可以選擇 CodeCommit 或是 Github：

![lab_05.png](lab_05.png)

接著會讓你看一下各環節所配置的服務：

![lab_06.png](lab_06.png)

然後我們就可以設定EC2 金鑰、使用者與搭配的編輯器：

![lab_07.png](lab_07.png)

![lab_08.png](lab_08.png)

![lab_09.png](lab_09.png)

![lab_10.png](lab_10.png)

當服務配置好則可以看到當前所有專案的內容並透過畫面左方的快捷做開啟：

![lab_11.png](lab_11.png)

![lab_12.png](lab_12.png)

![lab_13.png](lab_13.png)

![lab_14.png](lab_14.png)

而這邊我們可以切至 CodeCommit 看到當前樣板給的源碼內容：

![lab_15.png](lab_15.png)

在 Cloud9 則可以看到當前資料夾內容：

![lab_16.png](lab_16.png)

在 Beanstalk 可以看到應用程式被正常服務：

![lab_18.png](lab_18.png)

而透過專案內的應用程式對外連結可以看到網站畫面：

![lab_17.png](lab_17.png)

接著我們針對源碼內容做些**修改**，並透過指令將此次改變加入 git 追蹤中推送到當前遠端的儲存庫內：

![lab_19.png](lab_19.png)

當我們對源碼做異動並交付至遠端儲存庫，就會自動偵測並啟動建置部屬流程：

![lab_20.png](lab_20.png)

當部屬完成後即可看到畫面內容已經成功被修改並部屬至正式環境上：

![lab_21.png](lab_21.png)

這邊要額外注意，刪除整個 CodeStar 當前專案並不會幫我們將資源都回收回來！有部分服務需要自行前往服務列表自行刪除，

## References ##

- [AWS CodeStar](https://aws.amazon.com/tw/codestar/)
- [NEW LAUNCH! AWS CodeStar: The Central Experience to Quickly Start Developing Applications on AWS](https://www.youtube.com/watch?v=pIaB7wSSReU)