---
layout: post
title: Register customize .NET MVC Web/WebAPI Routing URL from Reflection
subtitle: ""
date: 2014-01-12 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- Web MVC/WebApi
- ASP.NET
---

分享一下如何動態註冊客製的Routing

<!-- More -->

![電線杆](image.jpg)

## 前言

因工作需求，需要將原本的預設Controller\Action\ID或api\Controller\Action\ID的Routing方式都改為只有Action的情況，說明如下:

有一個TestController裡面有一個叫做GetTest的Action Method在預設的Rouing裡面應該會註冊成下面的樣子，

*http:\\domain\Test\GetTest\*

或是

*http:\\domain\api\Test\GetTest\*

但這邊需求上面卻要*http:\\domain\GetTest\*，這邊有兩種方式可以幫你達到這樣的需求:

1. 在App_Start裡面的RoueCofig.cs或是WebApiConfig.cs裡面針對需要改變的Action手動做額外的註冊
2. 使用Reflection的方式找出共用的類別或是判斷方式後針對要註冊的method透過寫好的迴圈判斷條件做註冊

這邊稍微為大家介紹一下如何使用Refactor的方式找出程式裡面既有的controller然後再透過controller裡面的Action去做MVC Web與WebAPI的Routing註冊

## About MVC/WebAPI Routing

傳統我們在針對.NET MVC的Routing做註冊時會直接增添或修改App_Start裡面的RoueCofig.cs或是WebApiConfig，預設專案裡面的設定應該會長的像下面這樣：

    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
    routes.MapRoute(
        name: "Default",
        url: "{controller}/{action}/{id}",
        defaults: new { controller = "Default", action = "Index", id = UrlParameter.Optional }
    );

或是

    //Register HttpRoute
    config.Routes.MapHttpRoute(
        name: "PostActionApi",
        routeTemplate: "api/{controller}/{action}"
    );

透過上面的兩個預設使用方式我們可以知道URL的組成預設就包含了一個Routing名稱、url filter格式、預設控制項(controller與actionName或其他參數等設定)，URL的組成如果有不懂可以看[這篇](https://blackie1019.github.io/2013/11/03/use-nonaction-attribute-to-hide-controller-in-net-mvc-routing-table/)，或[保哥的文章](http://blog.miniasp.com/post/2011/08/01/ASPNET-MVC-Developer-Note-Part-21-Routing-Concepts-and-Skills.aspx)‧

而上面有一段`routes.IgnoreRoute()`這是設定可以忽略的檔案與路徑(過濾掉路由規則定義)，有以下幾種用法

- 過濾所有 *.aspx 的路徑

		routes.IgnoreRoute("{resource}.aspx/{*pathInfo}");

- 過濾 Page 目錄下的所有程式與檔案 (會直接讓IIS 來決定要用何種 Handler 來處理這次 HTTP 要求 )

		routes.IgnoreRoute("Page/{*pathInfo}");

- 忽略所有在 Page 目錄下的所有檔案 ( 保哥文章提供的另一種寫法 )

		routes.Add(new Route("Page/{*pathInfo}", new StopRoutingHandler()));

基本上我們要注意一個要點，.NET MVC的Routing與IIS的Rouing是兩件事情，所以使用上要稍微注意不是沒註冊就連不到檔案(有可能Rouing的URL與IIS的目錄結構剛好一樣)

## Register customize MVC/WebAPI Routing

而當我們要新增一個customize的Routing的時候可以透過下面的方式寫在App_Start裡面的RoueCofig.cs或是WebApiConfig當中:

	routes.MapRoute(
	    "Admin",
	    "Admin/{action}",
	    new { controller="Admin" },
	    new { OnlyLocalhostCanApply=new LocalhostConstraint() }
	);

或

    config.Routes.MapHttpRoute(
        name: "PostActionApi",
        routeTemplate: "api/{controller}/{action}"
    );

所以回歸到今天的需求如果是只要連到*http:\\domain\GetTest\*的Request都要轉到TestController下面的GetTest這個ActionName來接收，我們應該要註冊一個Routing如下(以WebAPI為例):

    config.Routes.MapHttpRoute(
        name: "GetTest",
        routeTemplate: "api/Test/GetTest"
    );

## Register customize MVC/WebAPI Routing from Reflection

如果你今天只有新增一個的話只要透過上面的方式來增加就可以了，但如果你今天是要把所有Controller都做這樣的設定一個一個手動設定實在太白吃了而且如果像我有手殘的情形就會導致頁面連不到的窘境，所以下面就分享如何透過Reflection來抓出所有ActionName後來做各別註冊。

先簡單說一下什麼是Reflection，Reflection官方翻譯反映或鏡射反映(這我比較喜歡)，主要是可應用在動態建立型別的執行個體、繫結型別至現有物件，或從現有物件取得型別，簡單來講就是你可以透過取得一個叫為抽象的類別並透過GetType方式來確認他的型別並建立該型別特有的一些處理行為，有點類似工廠的概念‧

使用Reflection可大幅簡化程式碼複雜度但會稍微付出一些代價，有興趣的可以參考黑大的[Reflection執行效能測試](http://blog.darkthread.net/post-2011-07-06-reflection-performance.aspx)

這邊我直接show上我的controller與action register routing的程式碼

 	public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            //Register HttpRoute
            //config.Routes.MapHttpRoute(
            //    name: "PostActionApi",
            //    routeTemplate: "api/{controller}/{action}"
            //);

            //RegisterMemberApi by Action to HttpRoute
            RegisterMemberApiAction(config);

        }
        private static void RegisterMemberApiAction(HttpConfiguration config)
        {
            var excludedControllerNames = new List<string>();
            excludedControllerNames.Add("DefaultController");
            var controllers = MvcHelper.Instance.GetAllApiControllers(excludedControllerNames);
            foreach (var c in controllers)
            {
                var actionNames = MvcHelper.Instance.GetActionNames(c);
                foreach (var actionName in actionNames)
                {
                    var controllerName = c.Name.Replace("Controller", "");
                    config.Routes.MapHttpRoute(
                        name: controllerName + actionName,
                        routeTemplate: actionName,
                        defaults: new
                        {
                            controller = controllerName,
                            action = actionName
                        },
                        constraints: new { action = @"^" + actionName + "" }
                    );
                }
            }
        }
	}

MVCHelper.cs

	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Reflection;
	using System.Web.Http;

	namespace Example.Util
	{
	    public class MvcHelper
	    {
	        private static MvcHelper _mvcHelper;

	        public static MvcHelper Instance
	        {
	            get
	            {
	                if (_mvcHelper == null)
	                {
	                    _mvcHelper = new MvcHelper();
	                }
	                return _mvcHelper;
	            }
	            set
	            {
	                _mvcHelper = value;
	            }
	        }

	        private static List<Type> GetSubClasses<T>()
	        {
	            return Assembly.GetCallingAssembly().GetTypes().Where(
	                type => type.IsSubclassOf(typeof(T))).ToList();
	        }

	        public List<Type> GetAllApiControllers(List<string> excludedControllerNames)
	        {
	            List<Type> controllers = new List<Type>();
	            GetSubClasses<ApiController>().ForEach(
	                type => controllers.Add(type));
	            foreach (var c in controllers)
	            {
	                if (excludedControllerNames.Contains(c.Name))
	                {
	                    controllers.Remove(c);
	                }
	            }
	            return controllers;
	        }

	        public List<string> GetActionNames(Type controllerType)
	        {
	            List<string> actionNames = new List<string>();
	            var methods = controllerType.GetMethods();
	            foreach (var m in methods)
	            {
	                if (m.IsPublic && m.ReturnType.IsSubclassOf(typeof(BaseResponseModel)))
	                {
	                    actionNames.Add(m.Name);
	                }
	            }
	            return actionNames;
	        }
	    }
	}

TestController.cs

	using System;
	using System.Web.Http;

	namespace Example.Controllers
	{
	    public class ServiceLocatorController : ApiController
	    {
	        [HttpPost]
	        public TestResponse GetTest(TestRequest request)
	        {
	            return GenTestRequest(request);
	        }
		}
	}

TestResponse.cs

	using System.Runtime.Serialization;
	namespace Example.Models
	{
	    [DataContract]
	    public class TestResponse : BaseResponseModel
	    {
	        [DataMember]
	        public string Value
	        {
	            get;
	            set;
	        }

	        public TestResponse(BaseResponseModel request)
	            : base(request)
	        {
	        }
	    }
	}

這邊因為我所有的Respone與Request都有一個父類別來給他們繼承所以我直接找尋回傳符合父類別的Method就可以找到他的Controller並幫他註冊對應的Routing，所以透過RegisterMemberApiAction這個method我們就可以把所有符合的Controller跟ActionName註冊起來，很簡單吧。

## Combined with WebApi.HelpPage

如果是開發WebAPI的朋友應該多少都會安裝WebApi.HelpPage，這邊要稍微注意一下，預設的HelpPage會去抓你已經註冊進入Routing的Method去幫你根據註解(comment)建立文件，所以記得要把vs專案預設建立的WebAPI routing注解或刪除，不然會有把每個method都註冊兩次歐!
