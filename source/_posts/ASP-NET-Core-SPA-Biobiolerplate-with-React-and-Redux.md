---
layout: post
title: ASP.NET Core SPA Boilerplate with React and Redux
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-29 02:06:35
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- React
- Redux
---

介紹一下React與Redux在.NET Core的框架

<!-- More -->

先前有介紹過[如何幫ASP.NET Core加入Web Single Page Application的架構](https://blackie1019.github.io/2017/03/17/ASP-NET-Core-Playing-with-SPA/)

這邊稍微再補充一下React&Redux的開發環境。

## Project Setup ##

這邊我們透過先前的Microsoft.AspNetCore.SpaTemplates建立一個React與Redux的開發環境

    dotnet new reactredux

建立完成後一樣restore nuget套件

    dotnet restore

如果我們接著直接執行dotnet run 就會看到以下錯誤

![exception](exception.png)

原因是因為NodeJS這邊找不到專案的必要套件，所以要先執行一次npm 的套件restore

    npm install

接著我們再執行dotnet run 後打開browser連至[http://localhost:5000/](http://localhost:5000/)就可以正常運作了

![preview](preview.png)

## Project Structure ##

當我們執行完dotnet restore與npm install之後將專案套件都還原的目錄結構會如下:

![structure](structure.png)

整體的結構就是.Net Core WebAPI作為骨幹，加入了TypeScript與React+Redux的開發環境與設定，並將Webpack, Gulp與bootstrap等預設，完成的一個基礎專案。

- [ASP.NET Core](https://get.asp.net/) and [C#](https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx) for cross-platform server-side code
- [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), and [TypeScript](http://www.typescriptlang.org/) for client-side code
- [Webpack](https://webpack.github.io/) for building and bundling client-side resources
- [Bootstrap](http://getbootstrap.com/) for layout and styling

所以整個專案目錄除了.NET Core WebAPI架構外，會有另外一個ClientApp來幫我們放關於SPA這邊TypeScript與在Client的設定:

![clientapp](clientapp.png)

而在WebAPI的部分與先前使用.Net Framework的WebAPI2差異不大，若對.NET Web MVC4/5 或是WebAPI 1/2結構有實務經驗應該可以馬上上手。