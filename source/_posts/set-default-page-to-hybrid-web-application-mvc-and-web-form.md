---
layout: post
title: Set Default Page to Hybrid Web Application(MVC and Web Form)
subtitle: ""
date: 2014-02-17 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- Web MVC/WebApi
- ASP.NET
---

關於MVC架構下的Default Page的機制

<!-- More -->

在MVC架構，如果要設定預設的Default Page給MVC，我們可以在RoutConfig.cs中設定Default的MVC Controller來讓他接收，如下:

```csharp
public static void RegisterRoutes(RouteCollection routes)
{
	// MVC default
	routes.MapRoute(
		"Default",                          // Route name
		"{controller}/{action}/{id}",       // URL with parameters
		new { controller = "Home",
					action = "Index",
					id = UrlParameter.Optional }  // Parameter defaults
	);
}
```


而如果要設定Hybrid(WebForm與MVC同時存在的架構)的Routing時需要注意一下先後順序，避免Routing註冊不到

```csharp
public static void RegisterRoutes(RouteCollection routes)
{
	routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
	routes.IgnoreRoute("{myWebForms}.aspx/{*pathInfo}");

	// Web Forms default
	routes.MapPageRoute(
		"WebFormDefault",
		"",
		"~/default.aspx");

	// MVC default
	routes.MapRoute(
		"Default",                          // Route name
		"{controller}/{action}/{id}",       // URL with parameters
		new { controller = "Home",
					action = "Index",
					id = UrlParameter.Optional }  // Parameter defaults
	);
}
```

至於架構的原因待了解後在分享給大家了...
