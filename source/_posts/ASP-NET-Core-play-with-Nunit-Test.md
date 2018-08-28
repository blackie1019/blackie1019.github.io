---
layout: post
title: ASP.NET Core play with NUnit Test
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-06-30 11:55:26
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- NUnit Test
- Unit Testing
- Automation Testing
---

介紹如何在ASP.NET Corek的環境使用Nunit Test Framework

<!-- More -->

先前介紹過[MSTest](https://blackie1019.github.io/2017/04/05/ASP-NET-Core-play-with-MSTest/)，今天讓我們來嘗試用另外一套在.NET也十分流行的Nunit測試。

# Nunit Test #

與其他框架的比較:

- [Comparing xUnit.net to other frameworks](http://xunit.github.io/docs/comparisons.html)
- [MSTest,NUnit 3,xUnit.net 2.0 比較](http://xunit.github.io/docs/comparisons.html)

# First Unit Test on ASP.NET Core and Nunit #

## Create App Project ##

## Create Test Project and Add App Project Reference ##

## Write Function and Test it ##

我們簡單的做一個計算機並提供兩個計算功能，因為呼叫方便用了[Lazy實作Singleton Pattern](https://blackie1019.github.io/2017/04/03/Singleton-Pattern-Implementation-In-CSharp/)：

```csharp
using System;

namespace App
{
    public class Calculator
    {

        private static readonly Lazy<Calculator> lazy = new Lazy<Calculator>(() => new Calculator());

        public static Calculator Instance { get { return lazy.Value; } }

        private Calculator()
        {

        }
        
        public int Add(int value1,int value2){
            return value1+value2;
        }

        public int AddWithAutoPlus3(int value1,int value2){
            return value1+value2+3;
        }
    }
}
```

這邊簡單的寫一個測試如下：

```csharp
using NUnit.Framework;
using App;

namespace App.Test
{
    [TestFixture]
    public class UnitTest1
    {
        [Test]
        public void Test_Calculator_Add()
        {
            var value1 = 1; 
            var value2 = 2;

            var expected = 3;
            int actual;

            actual = Calculator.Instance.Add(value1,value2);
            Assert.AreEqual(expected,actual);
            Assert.Inconclusive("Test Passed with Basic Values");
        }

        [Test]
        public void Test_Calculator_AddWithAutoPlus3()
        {
            var value1 = 1; 
            var value2 = 2;

            var expected = 6;
            int actual;

            actual = Calculator.Instance.AddWithAutoPlus3(value1,value2);
            Assert.AreEqual(expected,actual);
            Assert.Inconclusive("Test Passed with Basic Values");
        }
    }
}
```

當我們撰寫好後就可以執行指令觀看測試結果

    dotnet test



至於如何寫出一個好的測試案例，我個人是很推崇91的系列文章，除了解析的清楚也把所有的考量與訴求都一併的做說明。有興趣的朋友可以參考一下[[30天快速上手TDD][Day 3]動手寫 Unit Test](https://dotblogs.com.tw/hatelove/2012/11/07/learning-tdd-in-30-days-day3-how-to-write-a-unit-test-code)與這[30天快速上手TDD系列文章](https://dotblogs.com.tw/hatelove/2013/01/11/learning-tdd-in-30-days-catalog-and-reference)

# NUnit 3 Test Runner for .NET Core #

[NUnit 3 Test Runner for .NET Core](https://github.com/nunit/dotnet-test-nunit)是一套


*由於該套件還在alpha階段，如果在windows的環境使用Visaul Studio的NuGet Management的話記得要選擇show prereleases才能找到該套件。*

# References #

- [Github - Nunit](https://github.com/nunit)
- [Unit testing with .NET Core](https://cmatskas.com/unit-testing-with-net-core/)
- [NUnit 3 Test Runner for .NET Core](https://github.com/nunit/dotnet-test-nunit)
- [NUnit 3 Tests for .NET Core RC2 and ASP.NET Core RC2](http://www.alteridem.net/2016/06/18/nunit-3-testing-net-core-rc2/)
- [VS Code Extension - Show Test Results](https://marketplace.visualstudio.com/items?itemName=EffectiveLabs.ShowTestResults)
- [Running a specific test with .NET Core and NUnit](http://www.jerriepelser.com/blog/running-specific-test-with-dotnet-core-nunit/)