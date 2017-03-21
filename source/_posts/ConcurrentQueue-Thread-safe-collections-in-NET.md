---
layout: post
title: ConcurrentQueue - Thread safe collections in .NET
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-11-08 22:33:23
categories:
- HTML5
tags:
- C#
- .Net Framework
---

介紹一下如何使用.Net Framework 4.0開始提供Thread-Safe的集合 - ConcurrentQueue

<!-- More -->

.NET Framework 4.0 新增System.Collections.Concurrent命名空間，此命名空間中提供多種Thread-Safe的集合，可以搭配TPL (Task Parallel Library) 平行處理的功能來進行運算，很適合用來撰寫多執行緒的應用程式。

## ConcurrentQueue<T> Class ##

[MSDN:ConcurrentQueue<T> class](https://msdn.microsoft.com/zh-tw/library/dd267265(v=vs.110).aspx)

> Represents a thread-safe first in-first out (FIFO) collection.

簡單說 concurrent queue是一種設計給多執行同時讀寫時避免自行lock的資料結構。

使用這些執行緒安全(Thread-Safe)類別的好處是不用自行鎖定資源；不管並行CPU的數量有多少；也不用管多執行緒的[Race Condition](https://zh.wikipedia.org/zh-tw/%E7%AB%B6%E7%88%AD%E5%8D%B1%E5%AE%B3)，全交由System.Collections.Concurrent下的類別幫你處理。

這樣我們在開發上只要專心寫我們真的要運作的程式邏輯即可以。

## Official Sample Code ###

    // Construct a ConcurrentQueue.
    var cq = new ConcurrentQueue<int>();

    // Populate the queue.
    for (int i = 0; i < 10000; i++)
    {
        cq.Enqueue(i);
    }

    // Peek at the first element.
    int result;
    if (!cq.TryPeek(out result))
    {
        Console.WriteLine("CQ: TryPeek failed when it should have succeeded");
    }
    else if (result != 0)
    {
        Console.WriteLine("CQ: Expected TryPeek result of 0, got {0}", result);
    }

    int outerSum = 0;
    // An action to consume the ConcurrentQueue.
    Action action = () =>
    {
        int localSum = 0;
        int localValue;
        while (cq.TryDequeue(out localValue)) localSum += localValue;
        Interlocked.Add(ref outerSum, localSum);
    };

    // Start 4 concurrent consuming actions.
    Parallel.Invoke(action, action, action, action);
    Console.WriteLine("Processor Count = {0}", Environment.ProcessorCount);

    Console.WriteLine("outerSum = {0}, should be 49995000", outerSum);
    Console.ReadLine();

從上面的範例我們可以知道，我們透過四個併行的action 去執行一次並加總每一個號碼的結果。

最後的結果總和應該為=> (開始+結束)*總數/2 => (1+10000)*10000/2 => 49995000。

這邊另外附上CPU, Thread與Task之間的關係!

![threads](threads.gif)