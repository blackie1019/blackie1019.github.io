---
layout: post
title: ASP.NET Core play with Solution File
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-16 23:15:48
categories: 
- .NET
tags: 
- ASP.NET Core
- .NET Core
- C#
---

介紹如何建立solution檔案幫我們連接多個project

<!-- More -->

同於在ASP.NET的開發，ASP.NET Core也可以使用.sln檔案幫我們建立與多個csharproj檔案的關聯性

如果我們今天的整個開發會將底層的應用函式庫與執行的網頁應用程式抽離成兩個專案，並且另外再增添一個專案做測試，整個關聯可以表示如下：

![solution_project.png](solution_project.png)

這邊的專案拆分好處是我們可以分離不同的開發(關注點分離)並隔離彼此的影響．

而我們就可以透過.sln的檔案幫我們一次管理多個csharproj檔案，如執行NuGet還原或是多個專案建置等動作．

# Hands On with .sln #

這邊我們演練一個會用到.sln的情境，建立以下簡單的架構：

- App

    實際開發的函式庫專案

- App.Test

    測試函式庫的測試專案

# Create Folder and Two Project : App and App.Test #

首先我們新增一個根目錄資料夾並添加兩個專案(classlib與mstest專案)，先建立成以下的結構：

![folder](folder.png)

當專案建立完成後我們如果再根目錄直接執行dotnet restore則會看到以下錯誤：

![restore](restore.png)

# Create .sln and add .csharproj reference #

這邊我們透過以下指令建立一個新的.sln檔案：

    dotnet new sln

建立後我們必須把.csharproj的參考加入：

    dotnet sln add App/App.csproj
    dotnet sln add App.Test/App.Test.csproj

![add_csharproj](add_csharproj.png)

接著我們再次執行還原就可以看到NuGet成功地幫兩個專案都進行還原了

![sln_restore](sln_restore.png)