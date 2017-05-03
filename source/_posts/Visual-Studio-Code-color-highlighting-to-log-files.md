---
layout: post
title: Visual Studio Code adding Color Highlighting to log files
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-03 00:36:26
categories:
- Tool
tags:
- VSCode
---

介紹如何透過 Log File Highlighter 增強 VSCode 呈現 *.log 檔案

<!-- More -->

![conver](cover.png)

先前有篇介紹了 [log4net 與 ASP.NET Core 的整合](http://blackie1019.github.io/2017/05/02/ASP-NET-Core-play-with-Log4Net/)，但無論今天是用哪一個套件來產生日誌檔案，我們在閱讀時往往都希望能 **一目瞭然**．

但很可惜的，如果使用 VSCode 打開 *.log 檔案，雖然有部分 Highlight 的支援，閱讀起來還是很吃力．所以今天要為大家介紹 VSCode 上面閱讀日誌檔必備的 [Log File Highlighter](https://marketplace.visualstudio.com/items?itemName=emilast.LogFileHighlighter)．

在介紹功能前我們先來看一個安裝套件前，VSCode 預設呈現的樣子：

![before.png](before.png)

這邊我們可以看到雖然有 Highlight ，但後面內容中帶到 Warning 或是 Error 的字樣就呈現錯誤的顏色來提示．

而當我們用 *Log File Highlighter* 這個套件呈現就正確了：

![after.png](after.png)

這邊除了支援 log4net 的 Log Level ，其他針對資料格式的 Highlight 還包括：

- Dates and times in ISO format, such as

    2015-12-09
    2015-12-09 09:29
    2015-12-09 09:29:02,258

- Dates and times in some culture specific formats

    12/09/2016
    12.09.2016
    12-09-2016
    12-09-2015 09:29
    12-09-2015 09:29:02,258

- Log level, such as

    DEBUG
    INFO, INFORMATION
    WARN, WARNING
    ERROR, FAIL, FAILURE

- Numeric constants, such as

    1
    234

- Standard .Net constants

    null
    true
    false

- String constants, enclosed in single or double quotes. Examples:

    "lorem ipsum"
    'lorem ipsum'

- GUIDs. Example:
    
    859A4209-A82D-4CA1-8468-C2606A3501EE

- .Net exception type names, i.e. word ending with Exception, such as

    ArgumentNullException
    HttpException

- .Net exception stack traces, i.e. lines starting with whitespace characters, followed by at, for example:
    
    System.NullReferenceException: Object reference not set to an instance of an object.
        at MyClass.DoSomethingElse(string foo)
        at MyClass.DoSomething()
- Url:s

    http://www.meadow.se/wordpress/

- Namespaces (sequences of alpanumeric and dot characters). Useful to identity namespace qualified type names, for example.

    MyApp.MyNameSpace.MyClass


