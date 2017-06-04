---
layout: post
title: ASP.NET Core play with React and Webpack
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-06-05 23:04:42
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- C#
- React
- Webpack
---

介紹如何將 ASP.NET Core 與 React + Webpack 的環境結合起來

<!-- More -->

![cover](cover.png)

先前有介紹過的微軟官方的[ASP.NET Core play with SPA](https://blackie1019.github.io/2017/03/17/ASP-NET-Core-play-with-SPA/)與[ASP.NET Core SPA Boilerplate with React and Redux](https://blackie1019.github.io/2017/03/28/ASP-NET-Core-SPA-Biobiolerplate-with-React-and-Redux/)
這兩篇分享，可以透過SPA套件幫我們快速建立 React+Redux與 ASP.NET Core 的開發環境，但美中不足的是這套在開發 JS 上面預設使用 *TypeScript* 而非 *Babel JS*，這對多數的 React 的開發者並不是習慣且默認的開發方式．

今天就讓我們自己建立 React 與 ASP.NET Core 的開發環境．

## Developing Environment Overview ##

首先，先看一下建立出來的環境結果應該為何：

- React + Webpack + Babel 處理前端套件開發
- ASP.NET Core 負責提供伺服器端必要的 View 與 API 處理溝通
- 引入 *Swagger* 模組，支援 API 測試與文件化
- 引入 *react-hot-loader* 模組，支援前端開發動態熱加載
- 引入 *Microsoft.DotNet.Watcher.Tools* 模組，支援 ASP.NET Core 開發動態熱加載
- 引入 *Microsoft.AspNetCore.Mvc.TagHelpers*，支援 Razer View Engine 可以給予不同環境(Development, Staging, Production)區塊的設定
- 引入 *material-ui*，支援頁面設計的呈現(請參考[material-ui](http://www.material-ui.com/))

整理一下會使用到的技術與框架：

- 前端開發：
    JavaScript, ECMAScript 6/7, React
- 後端開發：
    C#, ASP.NET Core
- 相依管理與發佈工具：
    Webpack, NPM, NuGet, Dotnet Core CLI

所以最後的結果應該是一般 *React* 網頁應用程式開發所需要的**基本樣板**，而同時建立**一套流程**照顧了開發與發佈的需求．如果有用到 Redux 需求的朋友可以用純粹 Front-end 開發的方式做思考加入參考到 NPM 當中即可．

接著就讓我們一步步的完成．

### Create ASP.NET Core MVC + WebAPI Project ###

首先我們的專案是跑在 ASP.NER Core 2.0 上面，大部分都與1.1的部分差不多，所以兩著還是可以參考，細節產生出來的目錄結構與預設專案樣板可能有些微的差距但不影響使用．

首先先建立 *MVC* 專案並還原套件相依後啟動網站來觀看

    dotnet new mvc
    dotnet restore
    dotnet run

![ori_dotnet_run](ori_dotnet_run.png)

專案建立後會發現 2.0 的前端套件改用 *bower* 作為相依管理的工具了，這邊建議可以統一改用 NPM 套件會方便．

所以建議移除下面的檔案與資料夾:

![remove_bower](remove_bower.png)

另外，由於開發 React 的朋友普遍偏向不採用 jQuery 作為其中任何一個相依（基於對網站 DOM 的解讀與做法不同）所以這邊從 View 資料夾內的 _layout.cshtml 中整個清空為下：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>@ViewData["Title"] - boilerplate_dotnetcore_mvc_react</title>
    </head>
    <body>
        @RenderBody()
        @RenderSection("Scripts", required: false)
    </body>
    </html>

Index.cshtml 頁面則是全部清空，改為以下的內容(About.cshtml 與 Contact.cshtml同下)：

    @{
        ViewData["Title"] = "Home Page";
    }

    <p>This is Home Page</p>

所以這邊結果會如下：

![modify_ori_view](modify_ori_view.png)

由於 ASP.NET Core 的 MVC 與 WebAPI 都是繼承於 *Controller* 這個類別，透過不同的 *Routing* 設定來識別有沒有 View

所以，這邊在專案資料架內新增一個ApiController的資料夾並加入第一個 API - TodoApiController.cs

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    namespace boilerplate_dotnetcore_mvc_react.ApiControllers
    {
        [Route("api/[controller]")]
        public class TodoApiController : Controller
        {
            // GET api/values
            [HttpGet]
            public IEnumerable<string> Get()
            {
                return new string[] { "value1", "value2" };
            }

            // GET api/values/5
            [HttpGet("{id}")]
            public string Get(int id)
            {
                return "value";
            }

            // POST api/values
            [HttpPost]
            public void Post([FromBody]string value)
            {
            }

            // PUT api/values/5
            [HttpPut("{id}")]
            public void Put(int id, [FromBody]string value)
            {
            }

            // DELETE api/values/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            }
        }
    }

接著我們在透過 NuGet 加入 *Swashbuckle.AspNetCore* 套件並還原套件，對於 *NuGet* 的使用可以參考先前的[ASP.NET Core using Nuget with Visual Studio Code](https://blackie1019.github.io/2017/03/30/ASP-NET-Core-using-Nuget-with-Visual-Studio-Code/)

此時修改 Startup.cs 加入 ApiController 與 Swagger 的 Routing:

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    using Swashbuckle;
    using Swashbuckle.AspNetCore.Swagger;

    namespace boilerplate_dotnetcore_mvc_react
    {
        public class Startup
        {
            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            // This method gets called by the runtime. Use this method to add services to the container.
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddMvc();
                services.AddSwaggerGen (c => {
                    c.SwaggerDoc ("v1", new Info { Title = "My API", Version = "v1" });
                });
            }

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                }

                app.UseStaticFiles();

                app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");
                });

                app.UseSwagger ();
                app.UseSwaggerUI (c => {
                    c.SwaggerEndpoint ("/swagger/v1/swagger.json", "My API V1");
                });
            }
        }
    }

當上述修改都完成後即可啟動當前應用程式並開啟[http://localhost:5000/swagger/](http://localhost:5000/swagger/)看到以下畫面：

![swagger_test1](swagger_test1.png)

測試一下 Get 回應是否如預期：

![swagger_test2](swagger_test2.png)

接著我們在加入 *Microsoft.DotNet.Watcher.Tools* 幫我們做到 ASP.NET Core 熱載入的功能，詳細使用可以參考先前的[ASP.NET Core play with dotnet-watch](https://blackie1019.github.io/2017/03/13/ASP-NET-core-play-with-dotnet-watch/)

而我們接者只要將啟動指令從 dotnet run 改為 dotnet watch run 即可

到這邊 ASP.NET Core 的環境設定到一個段落，接著我們開始設定 React 的環境．

### Setup React + Webpack + Babel Environment ###

所以我們可透過下面指令新增 NPM 設定

    npm init

### Hot Load ASP.NET Core and React ###

### Import Microsoft.AspNetCore.Mvc.TagHelpers for Different Environment View Section ###

### Decorate Website with Material-ui ###

## 心得 ##

此版本提供了原本官方SPA沒有的動態熱載入功能與針對環境開法與發佈的彈性設定，這些是實務上一定會用到的功能，也是我想寫下此篇的原因．

除了微軟官方的 SPA 框架外，還有不少人可能聽過或使用過 *ReactJS.NET* 這個套件．透過 Server Rendering 快速整合整個 React 的開發環境，個人使用心得覺得設計出發點不錯，使用的好可以幫忙快速開發．但通常會採用這套間的使用者都是對JS或 React 相對不熟的人，往往造成一堆效能問題或是真的拋出什麼 Exception 反而都只能攤手不會處理，所以我個人反對使用這套件作 React 開發．

其實個人很反對把這種 Front-end 的解決方案透過 Back-end 再去包裹一次，只為了讓原本 Back-end 的技術框架建立會簡單一點上手．這樣的做法與風險用長期的角度來看是不小，除了多疊一次技術相依與整合難度，也大副降低了更新與維護的可能，因為開發者只會跟你說：ReactJS.NET 沒有提供我也不會啊．

其實認真來說，花點時間建立穩固且具有彈性的框架與流程其實算蠻好的投資．在開發上與其一開始導入一堆相依性的套件，不如先專心做核心開發，運用掌握度高的作法，透過較少的相異性建立起合理的框架是個人比較推崇的做法．這也是為什麼官方的 SPA 框架我不推薦拿來做 React 的開發，而另外建立這篇教學．

對於，專案上已經使用 TypeScript 搭配 Redux 開發 React 應用程式的朋友還是可以嘗試官方的做法，而如果本來就不太喜歡全部微軟解決辦法的朋友，就可以考慮參考此篇的作法自行搭建摟．

## References ##