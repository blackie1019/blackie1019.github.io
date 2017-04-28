---
layout: post
title: ASP.NET MVC 4 入門
subtitle: ""
date: 2013-10-23 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- ASP.NET
- Web MVC/WebApi
---

MVC 4開發環境與基本知識

<!-- More -->

## 檢視引擎(view engines):

- ASPX

	傳統的頁面架構，保持先前ASP.NET的web form概念使用.aspx/.ascx/.master 等檔案組成 templates 架構，使用<%%>的方式呈現ASP.NET程式碼區段，如下:

		<h1>Hello MVC</h1>
		<p>I am <%=name %></p>
		<% foreach(var skill in skills){ %>
			<li><%=skill.name %></li>
		<% } %>

- Razor

	因關注點分離(Aspect-Oriented Programming)概念所產生的一個新的頁面架構(CSHTML)，[HTML Helper](http://www.w3schools.com/aspnet/mvc_htmlhelpers.asp)完全支援該架構(HTML Helper的客製可參考[此](http://kelp.phate.org/2010/12/aspnet-mvc-htmlhelper.html))，而該架構設計的重點如下:

	- 避免弄亂你的程式碼(avoid spaghetti code)，透過Razor的注入方式即可將整段code插入，讓你的view能更加簡潔，且可將程式碼的關注點逐項分離避免一個頁面有太雜亂的資訊
	- 加速學習-對底層的HTML,js,CSS的概念與技術需更加熟悉但也更容易上手
	- Razor是一個頁面架構而非一個新的程式語言，所以你還是使用C#/VB(or Other)語言做學習，只是在頁面的安排上你透過Razor來簡化你原本的頁面程式注入的架構
	- Razor可以透過一般的文字編輯器即可編輯程式碼(Notepad++,sublimeText都OK)，修改.cshtml的檔案時不用重新compile程式，直接修改即可
	- 在VS2010之後的版本都有支援Intellisense，sublimeText也可以安裝package來支援(參考[Razor Syntax Definition - Sublime Text 2](https://github.com/joseph-turner/Razor))
	- 支援單元測試(Unit Test)，由於將關注點分離的概念可以使得View上每個Razor的subfunction都可以被拿來當作單元測試，單純檢測View而不用所接受到Controller所傳入的資料才能檢測

	使用@的方式呈現ASP.NET程式碼區段，如下:

		<h1>Hello MVC</h1>
		<p>I am @name </p>
		@ forearch(var skill in skills){
			<li>@skill.name</li>
		}

<em>根據ScottGu的推薦好像還有兩個[Spark](http://sparkviewengine.com/)與[HNaml](http://code.google.com/p/nhaml/)在先前MVC3時也常被使用，但MVC4之後就是Razor的天下了</em>

## NuGet

VS2012已經自動加入了，而透過NuGet做專案內的套件管理，這邊要稍微注意一下NuGet的版本有更新，如果你是用VS 2012安裝好的NuGet記得要更新一下，以下幾個不錯的Tips可參考

- [VS2010 手動加入NuGet參考](http://blog.miniasp.com/post/2011/05/17/Useful-Visual-Studio-2010-tool-NuGet-Package-Manager.aspx)
- 移除上有問題可以參考[Can't Update or Uninstall NuGet Package Manager in VS2012](http://stackoverflow.com/questions/14714619/cant-update-or-uninstall-nuget-package-manager-in-vs2012)
- [NuGet套件還原](http://demo.tc/Post/763)
- [架設自己的NuGet Server](http://blog.darkthread.net/post-2011-05-27-nuget-server.aspx)

## MVC架構

![mvc](MVC.png)

![mvc2](MVC2.png)

## 目錄架構(以Internet Application Template為例):
- App_Data

	這邊存放db, XML, 或是任一會使用到資料實體檔案

- App_Start

	因為加強關注點分離的概念所以這邊寫的東西會在外層的Global.asax.cs實際被註冊與使用的程式碼(a set of static classes)

- AreaRegistration

	與MVC3之前的使用相同，可將程式分區塊，藉此可以不用將一份程式碼分成兩個專案去管理(如前後台功能的網站，可透過Area的方式直接在同一個專案內分割成不同網站)

	- WebApiConfig

		針對WebAPI所設定的一些Routing與機制

	- FilterConfig

	- RouteConfig

	- BundleConfig

	- AuthConfig

- Content

	靜態檔案(可能參考到的images、css、js)，也包含預設的theme相關檔案(包含minified後的檔案)

- Controllers

	放所有可以使用的Controller檔案，注意Controllers這邊的檔案命名一定要以Controller結尾，且回傳結果必須為一個View的Class

- Filters

	Action 過濾器

- Images

	放使用到的圖檔
- Models

	放使用到的Model檔案

- Scripts

	放所有被會被使用到的JS檔案

- Views

	所有網頁裡面實際的檢視頁面檔案，會按照各頁面的Class名稱分別建立對應的sub-folder

- Global.asax

	註冊所使用到的程式與服務處

- packages.config

	所有在專案中透過NuGet管理的套件(package)都會寫在這邊做載名

- Web.config

	該網頁應用程式的相關設定與參數

## 整合BootStrap3

-
- 參考上面設定確認App_start->BootstrapBundle.Config.cs的設定正確，筆者設定如下:


		using System.Web.Optimization;
		[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(BlackieStudio.App_Start.BootstrapBundleConfig), "RegisterBundles")]
		namespace BlackieStudio.App_Start
		{
			public class BootstrapBundleConfig
			{
				public static void RegisterBundles()
				{
					// Add @Styles.Render("~/Content/bootstrap/base") in the <head/> of your _Layout.cshtml view
					// For Bootstrap theme add @Styles.Render("~/Content/bootstrap/theme") in the <head/> of your _Layout.cshtml view
					// Add @Scripts.Render("~/bundles/bootstrap") after jQuery in your _Layout.cshtml view
					// When <compilation debug="true" />, MVC4 will render the full readable version. When set to <compilation debug="false" />, the minified version will be rendered automatically
					BundleTable.Bundles.Add(new ScriptBundle("~/bundles/bootstrap/js").Include("~/Scripts/bootstrap.min.js"));
		            BundleTable.Bundles.Add(new StyleBundle("~/bundles/bootstrap/css").Include(
		                "~/Content/bootstrap/bootstrap.min.css",
		                "~/Content/bootstrap/bootstrap-theme.min.css"
		            ));
				}
			}
		}


- 新增一個Views->Shared->_BootStrapLayout.cshtml的頁面內有加入上一個項目所設定的Bootstrap css與js，筆者設定如下:

		<!DOCTYPE html>
		<html>
		<head>
		    <meta name="author" content="Blackie Tsai" />
		    <meta name="description" content="BlackieStudio Site" />
		    <meta name="keywords" content="blackie,blackiestudio" />
		    <meta charset="utf-8" />
		    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		    <title>[BootStrap]BlackieStudio-@ViewBag.Title</title>

		    @Styles.Render("~/Content/css")
		    @Styles.Render("~/Content/themes/base/css")
		    @Styles.Render("~/bundles/bootstrap/css")
		    @Scripts.Render("~/bundles/modernizr")
		</head>
		<body>
		    @RenderBody()

		    @Scripts.Render("~/bundles/jquery")
		    @Scripts.Render("~/bundles/bootstrap/js")

		    @RenderSection("scripts", required: false)
		</body>
		</html>



- 各頁面加入Bootstrap的配置即可，參考設定如下:

		@{
		    ViewBag.Title = "Index";
		    Layout = "~/Views/Shared/_BootstrapLayout.cshtml";
		}
		<!--View container -->
		<div id="brief" class="container">
		    <div class="starter-template">
		    <h1>Hi, I am Blackie</h1>
		    <p class="lead">......</p>
		    </div>
		</div>

## References

1. [Introducing “Razor” – a new view engine for ASP.NET](http://weblogs.asp.net/scottgu/archive/2010/07/02/introducing-razor.aspx)
2. [Basic-Understanding-On-ASP-NET-MVC-4](http://www.codeproject.com/Articles/585873/Basic-Understanding-On-ASP-NET-MVC-4)
3. [Understanding ASP.NET MVC Project Folders](http://www.c-sharpcorner.com/UploadFile/suthish_nair/mvc-folders/)
