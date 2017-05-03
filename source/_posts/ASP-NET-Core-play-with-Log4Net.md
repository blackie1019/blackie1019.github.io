---
layout: post
title: ASP.NET Core play with log4net
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-02 21:17:14
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- Log
- log4net
---

介紹如何在 ASP.NET Core 使用 log4net 幫我們強化 Log 相關功能

<!-- More -->

![cover](cover.png)

ASP.NET Core 本身有提供 Logging 的延伸套件 *Microsoft.Extensions.Logging* 協助我們透過 (dependency injection (DI)](dependency injection) 的方式在程式中加入 ILoggerFactory 的實體(instance)．如下：

```csharp
public void Configure(IApplicationBuilder app,
    IHostingEnvironment env,
    ILoggerFactory loggerFactory)
{
    loggerFactory
        .AddConsole()
        .AddDebug();
```

而今天我們則是要介紹另外一套在 .NET 開發中必備的 Logging 套件 - log4net，來協助我們建立 Logging 機制．

接下來就讓我們先簡單介紹 log4net 是什麼．

## log4net Introduction ##

log4net 是 Apache Logging Services 專案的其中一部分，是由 Apache log4j 移轉制 .NET Runtime 上所開源的日誌紀錄套件，可協助我們快速的開發 Logging 相關功能．

![apace_logging_services](apace_logging_services.png)

幾乎所有的大型應用都需要有一套強大的日誌系統來診斷和修復功能上的問題，而log4net就是小編這幾年(2012 - 2017) 在 .NET 開發上所採用的Logging 套件，目前運用在全部經手過的各大小專案上，在繁重的應用程式中(每秒接受並處理五萬筆以上的 transaction 請求與每秒10萬筆的 API 請求) 都能有不錯的效能處理與豐富的資料格式與分檔寫入的效果．

### The structure of log4net ###

log4net 有五種主要的組件:

- ILog

    是我們日誌記錄實體的介面(interface)，這邊我們要透過 LogManager 內的函式與傳入的類型來建立實體．

- LogManager

    可以幫我們建立 Repository 與 ILog 的實體

- Appender

    是一個幫我們處理寫入日誌記錄的物件(object)

- Filter

    是一個幫我們依據設定的條件限制寫入日誌記錄的條件式(condition)

- Layout

    日誌記錄的呈現風格(display)

- Repository

    是一個為了儲放 log4net 設定與 LogManager 內實體的集中的儲存槽(store)

執行上的順序為：

[log4net_objects](log4net_objects.gif)

### Log Level ###

我們可以給予不同的 Log Level 來方便我們解讀與觀看，層級如下：

![log4net_tag.jpg](log4net_tag.jpg)

當然 log 不是銀彈，千萬不要因為偷懶就在一開始打了一堆根本不會用到的 log ，因為**每個 log 的處理與寫入檔案都是成本**，好的 log 帶你上天堂(快速的顯示問題或是我們要找的資料)，壞的 log 讓你住套房(很難找到我們的資料或是導致應用程式效能不佳)

而當我們有了足夠的 log 後，我們就可以考慮採用 ELK 的架構幫我們建立起強大的分析與監控機制，有興趣的可以參考好友的文章：[ELK 教學 - 從無到有安裝 ELK (CentOS/Red Hat)](https://blog.johnwu.cc/article/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-centos-red-hat.html)．而筆者之後也會分享 *ELK* 與 *ASP.NET Core* 這塊的整合與做法．

## Hands on Lab ##

[Demo Source Code](https://github.com/blackie1019/DEMO-AspNETCore-Log4Net)

這邊我們可以透過新增一個 ASP.NET Core MVC 專案

    mkdir app; dotnet new mvc

專案建立後可以透過先前介紹的nuget套件幫我們加入 log4net 至當前專案：

![nuget_add](nuget_add.png)

加入完成後可以看到專案多了一個相依的 framework :

![nuget_add_project](nuget_add_project.png)

接著使用還原所有相依套件:

    dotnet restore

接著我們加入 *log4net.config* 至專案內

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <!-- This section contains the log4net configuration settings -->
  <log4net>
    <appender name="ConsoleAppender" type="log4net.Appender.ConsoleAppender">
      <layout type="log4net.Layout.PatternLayout" value="%date [%thread] %-5level %logger - %message%newline" />
    </appender>
    
    <appender name="FileAppender" type="log4net.Appender.FileAppender">
      <file value="log-file.log" />
      <appendToFile value="true" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
      </layout>
    </appender>

    <appender name="RollingLogFileAppender" type="log4net.Appender.RollingFileAppender">
      <file value="logfile/" />
      <appendToFile value="true" />
      <rollingStyle value="Composite" />
      <staticLogFileName value="false" />
      <datePattern value="yyyyMMdd'.log'" />
      <maxSizeRollBackups value="10" />
      <maximumFileSize value="1MB" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
      </layout>
    </appender>

    <!-- Setup the root category, add the appenders and set the default level -->
    <root>
      <level value="ALL" />
      <appender-ref ref="ConsoleAppender" />
      <appender-ref ref="FileAppender" />
      <appender-ref ref="RollingLogFileAppender" />
    </root>

  </log4net>
</configuration>
```

接著我們在程式當中加入下面日誌紀錄：

```csharp
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using log4net;
using log4net.Repository;
using log4net.Config;

namespace DEMO_AspNETCore_Log4Net
{
    public class Startup
    {
        public static ILoggerRepository repository { get; set; }
        public readonly ILog log;
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            repository = LogManager.CreateRepository("NETCoreRepository");
            XmlConfigurator.Configure(repository, new FileInfo("log4net.config"));

            log = LogManager.GetLogger(repository.Name,typeof(Startup));
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            log.Info("Doing ConfigureServices...");
            services.AddMvc();
            log.Info("Done ConfigureServices...");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            // loggerFactory.AddDebug();

            log.Info("Doing Configure...");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
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

            log.Info("Done Configure...");
        }
    }
}
```

接著啟用網站:

    dotnet run

我們即可看到專案下多了一份log-file.log，內容如下：

![log_file](log_file.png)

詳細的config設定可以參考[Apache log4net™ Config Examples](http://logging.apache.org/log4net/release/config-examples.html)

## Alternative for Logging ##

除了 ASP.NET Core 自身的 Logging 機制與 本篇介紹的 log4net 外，還有其他可以用在 ASP.NET Core 的 Logging 套件：

- [elmah.io](https://github.com/elmahio/Elmah.Io.Extensions.Logging)
- [Loggr](https://github.com/imobile3/Loggr.Extensions.Logging)
- [NLog](https://github.com/NLog/NLog.Extensions.Logging)
- [Serilog](https://github.com/serilog/serilog-framework-logging)

這邊會在之後再介紹各相關套件與優劣/適合的使用時機．

## References ##

- [What is Apache log4net](http://logging.apache.org/log4net/)
- [Apache log4net™ Manual - Configuration](http://logging.apache.org/log4net/release/manual/configuration.html)
- [Apache log4net™ Config Examples](http://logging.apache.org/log4net/release/config-examples.html)
- [Introduction to Logging in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/logging)
- [log4net XmlConfigurator Simplified](https://www.codeproject.com/Articles/19207/log-net-XmlConfigurator-Simplified)
- [Log4Net full range tracking program](http://www.programering.com/a/MjN1EjNwATI.html)
- [Troubleshoot your ASP.NET Core web app using logging](https://jonhilton.net/2016/09/14/troubleshoot-your-asp-net-core-web-app-using-logging/)