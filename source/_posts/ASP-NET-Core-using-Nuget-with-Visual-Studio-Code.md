---
layout: post
title: ASP.NET Core using NuGet with Visual Studio Code
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-30 16:26:50
categories:
- Development&Coding
tags: 
- ASP.NET Core
- .NET Core
- VSCode
- NuGet
---

整理如何在ASP.NET Core與Visual Studio Code中使用NuGet套件

<!-- More -->

在.NET Core 一開始的設計中，最大的改變之一就是將套件管理的設定而外獨立成一個package.json檔案。而到了今年.NET Core 1.1.0中最大個改變就是將這個檔案又合併回去project檔案中，而這項改變讓原本在Visual Studio code上面支援NuGet套件的[.NET Core Project Manager](https://marketplace.visualstudio.com/items?itemName=ksubedi.net-core-project-manager)頓時失效了。而這次要介紹的就是另外一個套件來管理.NET Core 1.1+的 .csproj file中的組件相依性。

# NuGet Introduction #

在介紹套件前先稍微介紹一下NuGet的功用，NuGet是一個管理與簡化專案中各組件相依性的延伸套件，從Visual Studio 2010開始支援，後來因為太受歡迎官方就在Visual Studio 2012時正式將NuGet視為.NET的官方推薦的組件工具。

如果對NuGet還想了解更多建議可以到[這個網站](http://www.devopsschool.com/slides/nuget/)

# Visual Studio Code Extension for NuGet #
由於Visual Studio Code本身只是一個編輯器的功能，不具備NuGet相關執行的能力，所以我們就需要透過[NuGet Package Manager](https://marketplace.visualstudio.com/items?itemName=jmrog.vscode-nuget-package-manager)這個套件，幫我們透過NuGet快速的新增/移除組件，新增組件的效果如下: 
![add_package](add_package.gif)

而當我們將套件加入後別忘記要使用下面指令restore組件至專案才可以使用

    dotnet restore

而移除組件也很簡單:

![remove_package](remove_package.gif)
