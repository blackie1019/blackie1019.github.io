---
layout: post
title: .NET Core load appsettings.development.json
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-02-14 01:37:21
categories:
- .NET
tags: 
- .NET
- .NET Core
---

分享如何讓 .NET Core 應用程式讀出 appsetting.development.json 的值

<!-- More -->

有開發過 ASP.NET Core 的朋友一定對 appsetting.json 的使用不陌生，預先支援多個環境的設定可以更方便我們在不同環境中切換

典型的設定提供者順序是：
- 檔案 (appsettings.json、appsettings.{Environment}.json，其中 `{Environment}` 是應用程式的目前裝載環境，變數值為`ASPNETCORE_ENVIRONMENT`)
- Azure Key Vault
- 使用者祕密 (祕密管理員) (僅限開發環境)
- 環境變數
- 命令列引數

這邊則是要分享如何使用檔案的方式讓 .NET Core 的 Console Application 透過環境變數可以載入不同環境的 configuration setting.

開發上需要載入 [Microsoft.Extensions.Configuration](https://www.nuget.org/packages/Microsoft.Extensions.Configuration/), [Microsoft.Extensions.Configuration.Abstractions](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Abstractions/) 與 [Microsoft.Extensions.Configuration.Json](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Json/)

```csharp
public class AppSettingsHelper
{
    private IConfigurationRoot _configuration;

    private readonly IConfigurationBuilder _builder;

    private static readonly Lazy<AppSettingsHelper> Lazy =
        new Lazy<AppSettingsHelper>(() => new AppSettingsHelper());

    public static AppSettingsHelper Instance
    {
        get { return Lazy.Value; }
    }

    AppSettingsHelper()
    {
        var basePath = Directory.GetCurrentDirectory();
        _builder = new ConfigurationBuilder()
            .SetFileProvider(new PhysicalFileProvider(basePath))
            .AddJsonFile("appsettings.json")
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json",
                optional: true);

        _configuration = _builder.Build();
    }

    public string GetValueFromKey(string key)
    {
        return _configuration.GetSection(key).Value;
    }
}
```

以上即可使用 *singleton* 的物件將設定值透過`GetValueFromKey`與指定的`key`取回．

這邊在專案上如果需要同時載入 appsettings.{Environment}.json 檔案時，需要先將本機配置環境變數，使其設定可以成取得

如希望開發時能成功載入  appsettings.development.json 檔案去複寫當前的appsettings.json設定，則需有幾種方式：

1. 啟動應用程式時透過參數額外帶入，如：
     - Windows

            C:\> set ASPNETCORE_ENVIRONMENT=Development
            C:\> dotnet ...

     - Unix/macOS

            $ export ASPNETCORE_ENVIRONMENT=Development
            $ dotnet ...
2. `launch profile` 帶入，如：

    launchSettings.json
    ```json
    { 
      "profiles": {    
        "EnvironmentsSample": {
          "commandName": "Project",
          "launchBrowser": true,
          "environmentVariables": {
            "ASPNETCORE_ENVIRONMENT": "Staging"
          },
          "applicationUrl": "http://localhost:54340/"
        },   
      }
    }
    ```

    然後指行指令時透過`--launch-profile`帶入參數

       dotnet run --launch-profile EnvironmentsSample

3. IDE 設定，這邊以 Rider 為例：
   
    ![01.png](01.png)


這邊要特別注意 Rider 內的測試專案是另外一個設定，需要透過以下方式額外設定 `Test Runner` 的環境變數：

![02.png](02.png)

## References ##

- [Configuration in ASP.NET Core](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.2)
- [Use multiple environments in ASP.NET Core](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/environments?view=aspnetcore-2.2)