---
layout: post
title: .NET MVC Multiple types were found that match the controller named 'XXX'
subtitle: ""
date: 2014-02-18 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- ASP.NET
- Web MVC/WebApi
---

解決重複註冊多個的Routing問題

<!-- More -->

## 前言

在MVC的架構，當我們要註冊一個routing時我們通常會用以下方法註冊

```csharp
routes.MapRoute(
	"Default",
	"{controller}/{action}/{id}",
	new { controller = "Home", action = "Index", id = UrlParameter.Optional }
);
```

上面我們很簡單的註冊了一個Default的routing給Home這個Controller，但當我們有引用dll的時候好死不好dll裡面也有包入一個同樣名稱的Controller時就會導致.net拋出以下錯誤

![controller](controller.png)

## How to fix it

解決辦法有兩種，一種是設定單一Routing的Controller Namespace

```csharp
routes.MapRoute(
	"Default",
	"{controller}/{action}/{id}",
	new { controller = "Home", action = "Index", id = UrlParameter.Optional },
	new[] {"YourCurrentProjectNamespace.WebSite.Controllers"}
);
```

另外一種就是把整個site的Routing都設定預設的Controller Namespace

```csharp
ControllerBuilder.Current.DefaultNamespaces.Add("YourCurrentProjectNamespace.WebSite.Controllers");
```

以上的設定都在App_Start>RouteConfig.cs中
