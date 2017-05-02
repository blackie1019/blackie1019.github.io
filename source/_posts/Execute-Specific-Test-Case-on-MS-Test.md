---
layout: post
title: Execute Specific Test Case on MSTest
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-14 14:58:49
categories:
- .NET
tags: 
- ASP.NET Core
- MSTest
- Unit Testing
- Automation Testing
---

紀錄一下ASP.NET Core如何透過MSTest如何執行特定Test Case

<!-- More -->

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
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace App.MSTest
{
    [TestClass]
   public class UnitTest1
    {
        [TestMethod]
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

        [TestMethod]
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

![dotnet_test](dotnet_test.png)

我們可以透過預設的--help查出目前的所有支援的參數有哪些

    dotnet test --help

![dotnet_test_help](dotnet_test_help.png)

我們可以用 --list 的參數來列出目前所有測試案例

    dotnet test --list 

而當我們只要執行特定單一測試案例時，我們可以透過　--filter　的參數加上我們指定的查詢pattern(FullyQualifiedName=App.MSTest.UnitTest1.Test_Calculator_Add"
Namespace.Class.Method):

    dotnet test --filter "FullyQualifiedName=App.MSTest.UnitTest1.Test_Calculator_Add"

![dotnet_test_filter](dotnet_test_filter.png)

# References #

- [Announcing MSTest V2 Framework support for .NET Core 1.0 RTM
](https://blogs.msdn.microsoft.com/visualstudioalm/2016/09/01/announcing-mstest-v2-framework-support-for-net-core-1-0-rtm/)