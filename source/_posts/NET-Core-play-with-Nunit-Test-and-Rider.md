---
layout: post
title: .NET Core play with NUnit Test and Rider
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-08-28 21:42:35
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- NUnit Test
- Unit Testing
- Automation Testing
- Rider
---

介紹如何將 NUnit Test 正確的於 .NET Corek的環境與 Rider 中運行 

<!-- More -->

當我們安裝完 [.NET Core SDK](https://www.microsoft.com/net/download) 從預設的 IDE 我們只能看到當前的專案版型預設僅支援 [MSTest](https://docs.microsoft.com/zh-tw/dotnet/core/testing/unit-testing-with-mstest) 與 [xUnit](https://docs.microsoft.com/zh-tw/dotnet/core/testing/unit-testing-with-dotnet-test)

![nunit_01](nunit_01.png)

這邊就來複習一下如何加入 NUnit 作為測試框架. 另外，最近開始重新接觸 .NET Core ，所以順手嘗試了一下 Rider 這個專門為 C# 開發所做的IDE．

## What is NUnit ##

[NUnit](https://NUnit.org/) 是一個從 *JUnit* 移植過來的專案計畫，主要是提供跟全面的測試與驗證．目前 *NUnit* 也被納入 .NET Foundation 計劃當中長期經營了．

如果簡單要建立一個空白的測試專案並讓其可以運作可以手動加入以下 package([Microsoft.NET.Test.Sdk](https://www.nuget.org/packages/Microsoft.NET.Test.Sdk/),[NUnit](https://www.nuget.org/packages/nunit/),[NUnit3TestAdapter](https://www.nuget.org/packages/NUnit3TestAdapter/)): 

    dotnet pack

這邊可以先透過擴充 *dotnet core* 當前的樣板，將 NUnit 的專案樣板加入命令列中：

    dotnet new -i NUnit3.DotNetNew.Template

這邊我們再次輸入 

    dotnet new -h

即可看到：

![nunit_02](nunit_02.png)

而之後我們就可以建立該測試專案了．

## What is Rider ##

[Rider](https://www.jetbrains.com/rider/) 是一款由 Jetbrain 所推出的.NET IDE ，由於很多功能基于 IntelliJ 和 ReSharper 開發，所以有機會取代 Visual Studio 成為 C# 開發人士的最愛並且目前能有效地開發跨平的 .NET Core 的應用程式，很值得來嚐試一下！

當我們透過上面的流程成功加入專案樣板後，新增專案的區塊則會多出一塊 *Other* 裡面就可以新增 NUnit Test 的測試專案．

而當我們從 NUnit Test 運行測試專案時，則會提示需要安裝額外的套件：

![nunit_03](nunit_03.png)

當我們成功透過 nuget 安裝好後即可從 UI 直接操作測試：

![nunit_04](nunit_04.png)

這邊如果有設定無結果或未知的測試驗證則會出現黃色的分岔服務與對應的意外錯誤：

![nunit_05](nunit_05.png)

Test.cs
```csharp
using System;
using System.Linq;
using dotnet_dapper_mysql.Domain.Dtos;
using dotnet_dapper_mysql.Domain.Services;
using NUnit.Framework;
using NSubstitute;

namespace dotnet_dapper_mysql.Domain.Test
{
    public class CustomerServiceUnitTest
    {
        [SetUp]
        public void SetUp()
        {
            
        }
        
        [Test]
        public void GetMembers_Verify_Count()
        {
            // Arrange
            var target = 1;

            // Act
            var actual = CustomerService.Instance.GetMembers().Result.Count;

            // Assert
            Assert.AreEqual(target,actual);
            
            // Arrange 
            Assert.AreEqual(actual,target);
        }
        
        [Test]
        public void GetMembers_Verify_FirstContent_Id()
        {
            // Arrange 
            var target = new Member
            {
                Id = 1,
                Code = "blackie1019",
                Name = "Blackie Tsai"
            };
            
            // Act
            var actual = CustomerService.Instance.GetMembers().Result.First();
            
            // Assert
            Assert.AreEqual(actual.Id,target.Id);
        }
        
        [Test]
        public void GetMembers_Verify_FirstContent_Code()
        {
            // Arrange 
            var target = new Member
            {
                Id = 1,
                Code = "blackie1019",
                Name = "Blackie Tsai"
            };
            
            // Act
            var actual = CustomerService.Instance.GetMembers().Result.First();
            
            // Assert
            Assert.AreEqual(actual.Code,target.Code);
        }
        
        [Test]
        public void GetMembers_Verify_FirstContent_Name()
        {
            // Arrange 
            var target = new Member
            {
                Id = 1,
                Code = "blackie1019",
                Name = "Blackie Tsai"
            };
            
            // Act
            var actual = CustomerService.Instance.GetMembers().Result.First();
            
            // Assert
            Assert.AreEqual(actual.Name,target.Name);
        }

        [Test]
        public void AddMember_Verify_ReturnCode()
        {
            Assert.Inconclusive("Not implement Yet");
        }
    }
}
```

另外有人介紹 NUnit 預設並不是以 平行(parallel) 進行單元測試，而是以 依序(sequential) 方式，主要是讓可以讓一個單元測試執行完，才會進行下一個單元測試．好處是可以安全的將有相依的測試依序執行，但由於不是每個單元測試平行執行，所以有以下缺點：

- 執行速度較慢，沒有完全發揮多核心 CPU 的優勢
- 如果有使用 Jenkins ，大多會以 parallel 方式執行單元測試
- 單元測試之間彼此有相依性也是一種壞味道，建議應該各別獨立運行．這可以參考[測試案例壞味道（8）：Erratic Test](http://teddy-chen-tw.blogspot.com/2015/03/8erratic-test.html)的說明

基於以上幾點我們可以透過建立專案內的 AssemblyInfo.cs 來設定：

![nunit_06](nunit_06.png)

當然也可以根據每個測試案例設定並行測試原則，可參考[Parallelizable Attribute](https://templecoding.com/blog/2016/02/29/running-tests-in-parallel-with-nunit3/)

## 一定要選 NUnit 嗎？ ##

其實 NUnit 在 .NET Framework 算是一個穩定的測試框架，相較於 MSTest 功能上比較受限且該測試框架只能跑微軟的語言，選擇 NUnit 是一個對於未來交為彈性的準備．而作為後起的 xUnit 則是加入更多新功能也被微軟作為未來除了官方 ＭSTest 為首推的開源框架．

而 xUnit 其實也是 NUnit 同一群人開發的，這邊也找了他們解釋為什麼要進行額外的 xUnit 開發：[Why Did we Build xUnit 1.0?](https://xunit.github.io/docs/why-did-we-build-xunit-1.0.html)

功能比較的部分可以參考[Comparing xUnit.net to other frameworks](https://xunit.github.io/docs/comparisons.html)，技術選擇青菜蘿蔔各有所愛，所以這邊也不說明選什麼比較好了，反正就是保持更換的彈性就對了！

這邊就有人整理了自己實務上的經驗推薦 xUnit([NET Core 2: Why xUnit and not NUnit or MSTest](https://dev.to/hatsrumandcode/net-core-2-why-xunit-and-not-nunit-or-mstest--aei))，不過這邊他比較的不是 *MSTest 2*．

## References ##
- [[鐵人賽 Day25] ASP.NET Core 2 系列 - 單元測試 (NUnit)](https://blog.johnwu.cc/article/ironman-day25-asp-net-core-unit-test-nunit.html)
- [利用 NUnit 與 .NET Core 進行 C# 單元測試](https://docs.microsoft.com/zh-tw/dotnet/core/testing/unit-testing-with-nunit)
- [如何在 .NET Core 使用 NUnit 與 NSubstitute ?](https://oomusou.io/nunit/setup/)
- [How to run tests in parallel using NUnit 3](https://templecoding.com/blog/2016/02/29/running-tests-in-parallel-with-nunit3/)
- [Framework Parallel Test Execution](https://github.com/nunit/docs/wiki/Framework-Parallel-Test-Execution)