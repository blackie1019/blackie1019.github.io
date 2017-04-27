---
layout: post
title: Use NonAction Attribute to Hide Controller in .NET MVC Routing Table
subtitle: ""
date: 2013-11-04 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- Web MVC/WebApi
---

如果我們想要讓某一個Controller中的Action不要在路由表內被註冊的時候就可以透過NonAction的方式來實現

<!-- More -->

在.NET MVC當中一個Controller通常會被對應到URL中並透過該Controller本身具有的Action來作為整個路由(Routing)註冊的樣式，以一個叫做SportController的範例來說可能如下:

![1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131104/1.PNG)

通常產生的Controller都會被註冊成上面這樣格式的路由至MVC的路由表中，而當我們的網頁在被使用者透過瀏覽器的URL連結進來的時候，會先檢查MVC的路由表裡面有沒有這樣格式的路由，如果沒有就會再去檢查IIS的路由是否有，如果也沒有就會回傳錯誤訊息404至使用者端。

而當我們想要讓某一個Controller中的Action不要在路由表內被註冊的時候就可以透過NonAction的方式來實現，使用的方式很簡單只要在你的Action上面加上[NonAction]就可以了

![2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131104/2.PNG)

- 一般的結果如下:

	![3](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131104/3.PNG)

- 加入NonAction之後的如下:

	![4](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131104/4.PNG)

這邊可以看到加上NonAction之後就真的不會註冊在MVC Routing Table當中當然就會去詢問IIS，如果IIS也沒有就會拋出404錯誤(這邊被我另外寫的ErrorPage所接收起來)

而MVC Error Page我這邊目前是透過Web.config來設定，如下:

- Web.config

	![5](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131104/5.PNG)

- ErrorController

		using System;
		using System.Collections.Generic;
		using System.Linq;
		using System.Web;
		using System.Web.Mvc;

		namespace BlackieStudio.Controllers
		{
		    public class ErrorController : Controller
		    {
		        public ActionResult Index()
		        {
		            return View("Error");
		        }
		        public ActionResult NotFound()
		        {
		            Response.StatusCode = 404;
		            return View("NotFound");
		        }
		        public ActionResult Forbidden()
		        {
		            Response.StatusCode = 403;
		            return View("Forbidden");
		        }
		        public ActionResult InternalError()
		        {
		            Response.StatusCode = 500;
		            return View("InternalError");
		        }

		    }
		}

- Forbidden.html

		@{
		    ViewBag.Title = "Forbidden";
		    Layout = "~/Views/Shared/_BootstrapLayout.cshtml";
		}

		<div id="brief" class="container">
		    <div class="starter-template">
		    <h1>@ViewBag.Title</h1>
		    </div>
		</div>


- Index.html

		@{
		    ViewBag.Title = "Error";
		    Layout = "~/Views/Shared/_BootstrapLayout.cshtml";
		}
		<div id="brief" class="container">
		    <div class="starter-template">
		    <h1>@ViewBag.Title</h1>
		    <div class="list-sfs-holder">
		        <div class="alert alert-error">
		            An unexpected error has occurred. Please contact the system administrator.</div>
		        @if (Model != null && HttpContext.Current.IsDebuggingEnabled)
		        {
		            <div>
		                <p>
		                    <b>Exception:</b> @Model.Exception.Message<br />
		                    <b>Controller:</b> @Model.ControllerName<br />
		                    <b>Action:</b> @Model.ActionName
		                </p>
		                <div style="overflow:scroll">
		                    <pre>
		                        @Model.Exception.StackTrace
		                    </pre>
		                </div>
		            </div>
		        }
		    </div>
		    </div>
		</div>


- InternalError.html

		@{
		    ViewBag.Title = "InternalError";
		    Layout = "~/Views/Shared/_BootstrapLayout.cshtml";
		}

		<div id="brief" class="container">
		    <div class="starter-template">
		    <h1>@ViewBag.Title</h1>
		    <div class="list-sfs-holder">
		        <div class="alert alert-error">
		            An unexpected error has occurred. Please contact the system administrator.</div>
		        @if (Model != null && HttpContext.Current.IsDebuggingEnabled)
		        {
		            <div>
		                <p>
		                    <b>Exception:</b> @Model.Exception.Message<br />
		                    <b>Controller:</b> @Model.ControllerName<br />
		                    <b>Action:</b> @Model.ActionName
		                </p>
		                <div style="overflow:scroll">
		                    <pre>
		                        @Model.Exception.StackTrace
		                    </pre>
		                </div>
		            </div>
		        }
		    </div>
		    </div>
		</div>

- NotFound.html

		@{
		    ViewBag.Title = "NotFound";
		    Layout = "~/Views/Shared/_BootstrapLayout.cshtml";
		}

		<div id="brief" class="container">
		    <div class="starter-template">
		    <h1>@ViewBag.Title</h1>
		    </div>
		</div>
