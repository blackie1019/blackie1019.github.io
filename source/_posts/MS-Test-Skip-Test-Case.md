---
layout: post
title: MSTest Skip Test Case
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-07 20:03:58
categories:
- .NET
tags: 
- ASP.NET Core
- MSTest
- Unit Testing
- Automation Testing
---

如何在MSTest 中跳過特定測試案例

<!-- More -->

因為最近在開發ASP.NET Core的時候還是還找不到IDE支援UI點選執行特定測試案例或透過dotnet CLI來幫忙執行單一案例，目前都做法還是透過dotnet test的預設指令跑過所有測試，但難免有部分開發還沒完成或是想要跳過特定測試的情境，而此時我們就可以透過[IgnoreAttribute]來協助我們

一般來說，當我們執行dotnet test跑起我們的測試時，我們可以看到的輸出結果應該如下：

![general](general.png)

這邊會有四個計數器：

- Total tests
- Passed
- Failed
- Skipped

而當我們在測試案例外層掛上[IgnoreAttribute]即可快速的skip掉特定的測試案例:

```csharp
[IgnoreAttribute]
[TestMethod]
public void MemberRepository_Delete()
{
    var id = "r2";
    var data = MemberRepository.Instance.Delete(id);

    Assert.IsNotNull(data);
    Assert.AreEqual(data.DeletedCount,1);
}
```

而再次執行dotnet test結果如下：

![skip](skip.png)