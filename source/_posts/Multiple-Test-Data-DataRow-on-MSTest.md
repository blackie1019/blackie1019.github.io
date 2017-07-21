---
layout: post
title: Multiple Test Data(DataRow) on MSTest
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-07-21 10:39:27
categories:
- .NET
tags:
- MSTest
- ASP.NET Core 
- .NET Core
- Unit Testing 
- Automation Testing
---

介紹 MSTest V2 的新功能 - DataRow Support

<!-- More -->

![banner](banner.png)

MSTest V2從 2016 開始開放測試後有不少下載量，而.NET Core也是將 *MSTest V2* 列為預設的支援測試框架之一。

以往 MSTest 與其他測試框架:xUnit, NUnit比較起來，差別最大的就是 DataRow Support。

而在MSTest V2的版本中已經將此功能提供出來，今天就來稍微介紹一下該功能與如何透過他更有效率的撰寫我們的測試程式。

## Write a Test ##

如何建立MSTest的方式我們以.NET Core的開發為環境，可以參考[ASP.NET Core play with MSTest](https://blackie1019.github.io/2017/04/05/ASP-NET-Core-play-with-MSTest/)

而今天我們假設寫了一個很簡單的程式如下:

TestObject.cs
```csharp
using System;

namespace app
{
    public class TestObject
    {
        public static int TestMethod(int value1, int value2, bool isAllowNegative)
        {
            var result = value1-value2;
            if(result<0&&!isAllowNegative){
                return 0;
            }
            return result;
        }
    }
}
```

根據上面的程式我們寫了以下的測試案例:

- 驗證數值相減(1-2)，且**允許負數**的情況下結果為 *-1*
- 驗證數值相減(2-1)，且**允許負數**的情況下結果為 *1*
- 驗證數值相減(1-2)，且**不允許負數**的情況下結果為 *0*

### Write Test Without DataRow ###

在我們不用DataRow的方式撰寫實際的測試案例程式碼為下:

UnitTest.cs
```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
using app;
namespace test
{
    [TestClass]
    public class UnitTest
    {
        [TestMethod]
        public void TestMethod_Single_1_2_iSAllowNegativeIsTrue()
        {
            // arrange
            var var1 = 1;
            var var2 = 2;
            var iSAllowNegative = true;
            var expected = -1;
            // act
            var result = TestObject.TestMethod(var1,var2,iSAllowNegative); 
            // assert
            Assert.AreEqual(expected,result);
        }

        [TestMethod]
        public void TestMethod_Single_2_1_iSAllowNegativeIsTrue()
        {
            // arrange
            var var1 = 2;
            var var2 = 1;
            var iSAllowNegative = true;
            var expected = 1;
            // act
            var result = TestObject.TestMethod(var1,var2,iSAllowNegative); 
            // assert
            Assert.AreEqual(expected,result);
        }

        [TestMethod]
        public void TestMethod_Single_1_2_iSAllowNegativeIsFalse()
        {
            // arrange
            var var1 = 1;
            var var2 = 2;
            var iSAllowNegative = false;
            var expected = 0;
            // act
            var result = TestObject.TestMethod(var1,var2,iSAllowNegative); 
            // assert
            Assert.AreEqual(expected,result);
        }
    }
}
```

此時我們可以透過下方指令執行該測試:
    
    dotnet test --filter FullyQualifiedName~TestMethod_Single

![test_run_single](test_run_single.png)

這邊可以發現我們的程式碼其實重複了三個區塊，只有數值跟期望結果是不一樣的。

## Write Test With DataRow ##

而當我們改用DataRow後則為下面的程式碼:

UnitTest_DataRow.cs
```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
using app;
namespace test
{
    [TestClass]
    public class UnitTest_DataRow
    {
        [DataTestMethod]
        [DataRow(1, 2,true, -1)]
        [DataRow(2, 1,true, 1)]
        [DataRow(1, 2,false, 0)]
        public void TestMethod_DataRow(int var1,int var2, bool iSAllowNegative, int expected)
        {
            // act
            var result = TestObject.TestMethod(var1,var2,iSAllowNegative); 
            // assert
            Assert.AreEqual(expected,result);
        }
    }
}
```

此時我們可以透過下方指令執行該測試:
    
    dotnet test --filter FullyQualifiedName~TestMethod_DataRow

![test_run_datarow](test_run_datarow.png)

從上面我們即可看到DataRow帶來的程式碼的簡化與好處!

而如果要看所有當前的測試案例，我們可以透過 -t 參數
    
    dotnet test -t

![test_list](test_list.png)

## References ##
- [MSTest V2 – Now and Ahead](https://blogs.msdn.microsoft.com/devops/2017/02/25/mstest-v2-now-and-ahead/)
- [MSTest V2: First Impressions](https://dzone.com/articles/mstest-v2-first-impressions)