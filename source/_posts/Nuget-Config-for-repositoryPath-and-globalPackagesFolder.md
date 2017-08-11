---
layout: post
title: NuGet.Config for repositoryPath and globalPackagesFolder
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-18 21:22:32
categories:
- .NET
tags: 
- ASP.NET
- NuGet
---

說明一下NuGet.Config中 repositoryPath與 globalPackagesFolder 的不同，並分享如何使用根目錄的NuGet.Config內所有專案設定。

<!-- More -->

## repositoryPath 與 globalPackagesFolder ##

會有兩個值來做同樣的事情其實是因為當初微軟曾經把project.json這個部分獨立出來，而這也是ASP.NET Core從vNext開始就一直存在的改變，這導致NuGet的還原有兩個版本的參數:

- packages.config 用 repositoryPath
- project.json 用 globalPackagesFolder

但project.json這件事情到ASP.NET Core 1.1時卻又被並回.csharproj檔案內，所以參數也被合併到同一個NuGet.Config檔案內，但根據有沒有packages.config有了不一樣的兩個參數:

- 如果是舊版或是有 packages.config  用 repositoryPath
- NuGet 3.4+ 且專案沒有 packages.config 用 globalPackagesFolder

## NuGet.Config Path 與 Setup  ##

開始講解前，先解說一下NuGet.Config 放置上的幾個選項:

### Project-specific ###

每一個專案內我們可以建立獨立的NuGet.Config，將相依的套件載入之專案資料夾下的位置單獨使用

### Solution-specific ###

我們有可以針對Solution建立.nuget資料夾建立NuGet.Config，將相依的套件載入之專案資料夾下的位置給與該soltion相關的所有專案參考使用

*要稍微注意一下的是，這個Solution內.nuget資料夾下的 NuGet.Config只會在 NuGet 3.3 與更早的版本才能生效，3.4開始已經不能使用這個方式了*，這部分公告請參考[Configuring NuGet behavior](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior)

### Global ###

根據版本不同有兩個版本的區隔

- NuGet 2.7 to NuGet 3.5(根據版本不同預設的檔案名稱不同[NuGet defaults file](https://docs.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#nuget-defaults-file))

    %PROGRAMDATA%\NuGet\NuGetDefaults.Config

- NuGet 4.0+

    %ProgramFiles(x86)%\NuGet\Config

### Machine-wide ###

我們也可以幫整台機器(不管當前使用的使用者是誰)，設定通用的NuGet.Config位置，這邊版本上有兩個版本的區隔:

- NuGet 2.6 ~ NuGet 3.5: 

    %ProgramData%\NuGet\Config[\{IDE}[\{Version}[\{SKU}\]]]NuGet.Config

    - {IDE} 可以是 VisualStudio
    - {Version} 可以是你的IDE版本如 14.0, 
    - {SKU} 指的是你用 Community, Pro 或 Enterprise. 這邊也跟上面的版本號有關.

- NuGet 4.0+

    %ProgramFiles(x86)%\NuGet\Config

### Default ###

如果沒有異動，這邊也是我們安裝完後NuGet的預設設定，如果上述設定都沒有特別設定，則NuGet會回來參考這邊。
 
    %APPDATA%\NuGet\NuGet.Config

## Root Folder NuGet.Config and Project-specific NuGet.Config ##

除了上述官方有寫明的這幾種之外，其實我們也可以在根資料夾(root folder)建立一個shared的NuGet.Config給底下所有子目錄使用:

![folder_structure.png](folder_structure.png)

這邊我們假設Common下的Packages是存放大家共用的library實際位置，那我們則可以在App的資料夾(根目錄)內建立一個NuGet.Config並且設定以下內容:

- NuGet 3.4+ 且專案沒有 packages.config:

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
    <config>
        <add key="globalPackagesFolder" value="Common\Packages" />
    </config>
    </configuration>
    ```

-   如果是舊版或是有packages.config 則:

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
    <config>
        <add key="repositoryPath" value="Common\Packages" />
    </config>
    </configuration>
    ```

而這邊NuGet.Config的參考也是有順序的，依序為:

![sequence](sequence.png)

## References ##

- [NuGet.Config reference](https://docs.microsoft.com/en-us/nuget/schema/nuget-config-file)