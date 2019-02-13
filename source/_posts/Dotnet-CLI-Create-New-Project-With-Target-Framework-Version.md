---
layout: post
title: .NET CLI Create New Project With Target Framework Version
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-14 17:03:35
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- .NET Core CLI
---

使用-f參數讓我們將新增的專案放入指定的.Net Framework版本

<!-- More -->

今天如果是用dotnet cli幫我們產生新的類別庫(Class Library)專案與MVC專案我們會發現預設給我們的.Net Framework不一致：

![default](default.png)

而我們今天如果再新增專案時使用--help就可以知道為什麼了。

# Create New Class Library Project #

我們使用下面指令建立新的類別庫專案：

![default_classlib](default_classlib.png)

這邊可以看到預設的版本是 netstandard1.4

# Create New MVC Project #

我們使用下面指令建立新MVC專案：

![default_mvc](default_mvc.png)

這邊可以看到預設的版本是 netcoreapp1.1

# Create New Class Library Project with Target Framework #

如果想在新增專案時給予指定的Target Framework我們可以用-f或是--framework的方式帶指定版本的參數：

     dotnet new classlib -f netcoreapp1.1

![dotnet_new_framework](dotnet_new_framework.png)