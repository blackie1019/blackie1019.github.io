---
layout: post
title: 'Singleton Pattern Implementation in C#'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-03 08:58:41
categories:
- .NET
tags:
- C#
- ASP.NET
- ASP.NET Core
- Design Pattern
---

紀錄C# Singleton Pattern實作的相關資料

<!-- More -->

在程式開發上我們時常會用到Singleton這個Pattern來幫我們處理有哪些物件須不需要大量產生，特別它是在執行/操作的時候，只”需要”一個就夠，而某些情況甚至我們也”只能”有一個．

![singleton](singleton.jpeg)

# Singleton Pattern Positive and Negative Aspects #

## Positive ##

Singleton Pattern 除了可以有效的控管資源避免不必要的產生外，也可以有效的管理全域變數的處理與生命週期，這可以讓我們更有效率的使用．

## Negative ##

Singleton Pattern 會導致程式與Singleton的instance 產生隱含的耦合關係，會使得系統變得不易理解，最大的麻煩則是增加測試的難度（是增加，而非不可測）．

# C# Implement Singleton Pattern #

這邊參考[C# in Depth:Implementing the Singleton Pattern in C#](http://csharpindepth.com/Articles/General/Singleton.aspx)此篇文章的建議，分成兩種情況：

## .NET Framework 4.0's Lazy ##

如果你的.NET Framework版本在4.0之上或是使用ASP.NET Core那則放膽使用[System.Lazy<T>](https://msdn.microsoft.com/zh-tw/library/dd642331.aspx):

    public sealed class Singleton
    {
        private static readonly Lazy<Singleton> lazy =
            new Lazy<Singleton>(() => new Singleton());
        
        public static Singleton Instance { get { return lazy.Value; } }

        private Singleton()
        {
        }
    }

## Under .NET Framework 4.0 ##

如果你的.NET Framework版本在4.0之下則可參考下面做法:

### Not Quite as Lazy, But Thread-safe without using Locks ###

    public sealed class Singleton
    {
        private static readonly Singleton instance = new Singleton();

        // Explicit static constructor to tell C# compiler
        // not to mark type as beforefieldinit
        static Singleton()
        {
        }

        private Singleton()
        {
        }

        public static Singleton Instance
        {
            get
            {
                return instance;
            }
        }
    }

### Fully Lazy Instantiation ###

    public sealed class Singleton
    {
        private Singleton()
        {
        }

        public static Singleton Instance { get { return Nested.instance; } }
            
        private class Nested
        {
            // Explicit static constructor to tell C# compiler
            // not to mark type as beforefieldinit
            static Nested()
            {
            }

            internal static readonly Singleton instance = new Singleton();
        }
    }

# References #

- [搞笑談軟功:重新整理Singleton Pattern](http://teddy-chen-tw.blogspot.tw/2013/08/singleton-pattern.html)
- [獨體模式(Singleton Pattern)](https://dotblogs.com.tw/pin0513/2010/03/08/13931)
