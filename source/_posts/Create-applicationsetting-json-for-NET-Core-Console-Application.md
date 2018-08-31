---
layout: post
title: Create applicationsetting.json for .NET Core Console Application
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-31 10:10:44
categories:
- .NET
tags: 
- .NET Core
- Console
- C#
---

記錄一下如何在 .NET Core console 中取得設定檔(applicationsetting.json)的內容

<!-- More -->

在 ASP.NET Core 中預設就有一套相依注入的架構可以協助將設定檔讀出後提供應用程式取用．

整個細節可以參考 [Configuration in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1)

而這樣的方式其實是透過 *Configuration providers* 這個機制做到的，他能夠運用在下面場景：

- Azure Key Vault
- Command-line arguments
- Custom providers (installed or created)
- Directory files
- Environment variables
- In-memory .NET objects
- Settings files

最後一項就是本篇的重點，這邊就看如何在一個新專案中透過 *Configuration providers* 將設定檔的內容讀出．

## How to do it! ##

首先透過先前的 [.NET Core play with NUnit Test and Rider](http://blackie1019.github.io/2018/08/28/NET-Core-play-with-Nunit-Test-and-Rider/) 介紹的方式建立一個 *NUnit* 測試專案：

    dotnet new nunit

![01.png](01.png)

接著我們引入兩個套件 [Microsoft.Extensions.Configuration.Json](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Json/) 與 [Microsoft.Extensions.Configuration.Binder](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.Binder/)：

    dotnet add <projectName.csproj> package Microsoft.Extensions.Configuration.Json
    dotnet add <projectName.csproj> package Microsoft.Extensions.Configuration.Binder

![02.png](02.png)

接著我們加入一個空白的 *applicationsetting.json* 在專案內，內容如下：

```json
{
  "Settings":{
    "parameter1":123,
    "parameter2":"abc"
  }
}
```

另外新增一個 *Settings.cs* 的 class 類型檔案放入以下內容：

Setting.cs
```csharp
namespace Tests
{
    public class Settings
    {
        public int Parameter1 { get; set; }
        public string Parameter2 { get; set; }
    }
}
```

接著看一下當前的專案內容與配置：

![02_2.png](02_2.png)

最後我們要將先前加入的 *applicationsetting.json* 設定輸出條件，讓我們的專案在建置與發佈時都能更新這份檔案:

![05.png](05.png)

如果我們直接編輯 *.csproj* 檔案只要如上即可．

如果是使用 *Rider* 當作開發的 IDE 工具就更方便了：

![03.png](03.png)

![04.png](04.png)

## Execute tests ##

首先先設定好 Config 的私有變數與對應位置：

```csharp
private IConfiguration config;

[SetUp]
public void Setup()
{
    config =  new ConfigurationBuilder()
        .AddJsonFile("applicationsettings.json", true, true)
        .Build();
}
```

測試的部份，這邊可以用簡單的 *GetSection* 取得區段內資料再配合做資料轉型, 方法內容：

```csharp
[Test]
public void Test_GetSection()
{
    // Arrange
    var parameter1 = 123;
    var parameter2 = "abc";

    // Action
    var settings = config.GetSection("Settings");

    // Assert
    Assert.AreEqual(parameter1, Convert.ToInt32(settings.GetSection("Parameter1").Value));
    Assert.AreEqual(parameter2, settings.GetSection("Parameter2").Value);
}
```

除了簡單的用法，也可以考慮引用 *Microsoft.Extensions.Configuration.Binder* 後透過 **bind()** 幫我們做類別自動媒合．

方法內容：
```csharp
[Test]
public void Test_FromBinder()
{
    // Arrange
    var parameter1 = 123;
    var parameter2 = "abc";

    // Action
    var settings =new Settings();
    config.Bind("Settings",settings);

    // Assert
    Assert.AreEqual(parameter1, settings.Parameter1);
    Assert.AreEqual(parameter2, settings.Parameter2);
}
```

如此一來即可透過與 ASP.NET Core 一樣的做法方便的取得設定檔了．

[測試範例下載](https://github.com/blackie1019/dotnet-core-config-example)

## References ##

- [ConfigurationBuilder Class](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.configuration.configurationbuilder?view=aspnetcore-2.1)
- [ConfigurationBinder Class](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.configuration.configurationbinder?view=aspnetcore-2.1)