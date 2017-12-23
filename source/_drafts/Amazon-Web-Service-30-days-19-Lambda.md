---
layout: post
title: 'Amazon Web Service 30 days - 19 : Lambda'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-01-07 00:09:40
categories:
- Cloud
tags:
- AWS
---

30天鐵人賽介紹 AWS 雲端世界 - 19:　改變雲端架構的核心計算服務 Lambda

<!-- More -->

## What is Lambda ##

AWS Lambda 是一種無伺服器運算服務(Serverless)，可設定觸發條件後執行特定的程式碼作為事件的回應，並自動透過該服務管理基礎設備(Infrastructure)的運算資源，不必考慮伺服器的類型或選項，只需思考需要使用的多少運算時間來作為費用成本。

簡單來講 Lambda 就像是把服務外包出去，開發人員能花更多的精力專注在開發的本質上(只需撰寫程式碼)，而與昨天介紹的 *beanstalk* 最大的差別在於 Lambda 定義事件觸發條件，此後程式便會在條件滿足時自動運作，如果沒有遇到觸發條件則不運作，因此可以省下更多的經費。

![Lambda.jpg](Lambda.jpg)

而 Lambda 應用的情境非常廣泛，這邊附上官方給的三個範例:

![pull-user-app-example-10](pull-user-app-example-10.png)

![push-s3-example-10.png](push-s3-example-10.png)

![push-user-app-example-10.png](push-user-app-example-10.png)

收費方式主要可以考量三點:

- 所需 Memory 與程式執行時間
- 呼叫次數
- 資料傳輸量

不過 Lambda 有提供免費方案，包含每月 100 萬個免費請求以及每月 400,000 GB-秒的運算時間；這個400,000 GB-秒的部份，會根據我們選擇的記憶體（Memory）而有不同的免費秒數。

Lambda是被動式的呼叫，預設它並不支援外部網址；Lambda只支援透過其他 AWS 服務本來觸發呼叫。另外開發上，不支援Debug下中斷點，所以我們需要透過Log的方式來進行Debug，而且 Lambda 在執行的環境是唯讀的，所以無法透過Disk I/O的方式寫入任何檔案至Lambda上，如果有寫入檔案的需求則需要串接至 S3 服務上面。

目前支援的開發語言與架構:

- Node.js (JavaScript)
- Python
- Java (與 Java 8 相容)
- C# (.NET Core, 2.0 快要有 support 了...[Support to .NET Core 2.0](https://github.com/aws/aws-lambda-dotnet/issues/149))

詳細支援內容可以參考[Lambda Execution Environment and Available Libraries](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html)，不過目前這邊的更新有點慢...


## Hands on Lab ##

這邊我們將以 .NET Core 示範，如何撰寫第一個 Lambda。

首先可以參考筆者先前的部落格內容[.NET Core 專區](http://blackie1019.github.io/dotnet/)或是 John 大的 [ASP.NET Core 從入門到實用 ](https://ithelp.ithome.com.tw/users/20107461/ironman/1372) 完成 .NET Core 的環境設置，並安裝[aws-extensions-for-dotnet-cli](https://github.com/aws/aws-extensions-for-dotnet-cli)。這個 CLI 整合了原先 .NET Core 的 CLI ，可以更快速的發佈應用程式到 AWS 上。

而我們也可以參考 [aws-lambda-dotnet](https://github.com/aws/aws-lambda-dotnet)，只要在我們的新增下面這個套件的相依

    dotnet new -i Amazon.Lambda.Templates::*

我們就可透過以下指令列出當前可用的樣板

    dotnet new lambda --list

或是用 Visual Stuido 2017 + [AWS Toolkit for Visual Studio 2017](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.AWSToolkitforVisualStudio2017)。

由於開發目前還限制在 .NET Core 1.0 的版本，避免過多人為問題...所以本文將採 VS2017 + AWS Toolkit for Visual Studio 2017方式示範。

這邊會需要設定一個 *aws-lambda-tools-defaults.json* 的檔案來指定到時發佈時的相關設定:

其中 function-handler 的 組合規則為 : **{DLL Name}::{Class namespace}:{Method name}** 的結構

![lab_1.png](lab_1.png)

## References ##
- [AWS Lambda](https://aws.amazon.com/tw/lambda/details/)