---
layout: post
title: Reactive Programming with RxJS
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-08-16 11:07:40
categories:
tags:
---

<!-- More -->

Rx (Reactive Extensions)

[jsbin](https://jsbin.com/bumokeb/edit?html,js,console)

## About ReactiveX ##

>ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming.

### Ubiquitous ###

- FRONTEND
    Manipulate UI events and API responses, on the Web with RxJS, or on mobile with Rx.NET and RxJava

- CROSS-PLATFORM
    Available for idiomatic Java, Scala, C#, C++, Clojure, JavaScript, Python, Groovy, JRuby, and others

- BACKEND
    Embrace ReactiveX's asynchronicity, enabling concurrency and implementation independence

### Better codebases ###

- Functional
    Avoid intricate stateful programs, using clean input/output functions over observable streams.

- Less is more
    ReactiveX's operators often reduce what was once an elaborate challenge into a few lines of code.

- Async error handling
    Traditional try/catch is powerless for errors in asynchronous computations, but ReactiveX is equipped with proper mechanisms for handling errors.

- Concurrency made easy
    Observables and Schedulers in ReactiveX allow the programmer to abstract away low-level threading, synchronization, and concurrency issues.

### Supported Languages ###

Java: RxJava
JavaScript: RxJS
C#: Rx.NET
C++: RxCpp
Lua: RxLua
Ruby: Rx.rb
Python: RxPY
Go: RxGo
Kotlin: RxKotlin
Swift: RxSwift
PHP: RxPHP

[ReactiveX - Languages](http://reactivex.io/languages.html)

[Netflix JavaScript Talks - RxJS + Redux + React = Amazing!](https://www.youtube.com/watch?v=AslncyG8whg)

[vue-rx](https://github.com/vuejs/vue-rx)

Angular 2 也全面引用了 RxJS

### Where is Reactive-Programming appropriate ###

[](http://www.introtorx.com/Content/v1.0.10621.0/01_WhyRx.html#WhyRx)

#### Should use ####
Managing events like these is what Rx was built for:

- UI events like mouse move, button click
- Domain events like property changed, collection updated, "Order Filled", "Registration accepted" etc.
- Infrastructure events like from file watcher, system and WMI events
- Integration events like a broadcast from a message bus or a push event from WebSockets API or other low latency middleware like Nirvana
- Integration with a CEP engine like StreamInsight or StreamBase.

#### Could use ####

Rx can also be used for asynchronous calls. These are effectively sequences of one event.

Result of a Task or Task<T>
Result of an APM method call like FileStream BeginRead/EndRead

#### Won't use ####

Rx and specifically IObservable<T> is not a replacement for IEnumerable<T>. I would not recommend trying to take something that is naturally pull based and force it to be push based.

Translating existing IEnumerable<T> values to IObservable<T> just so that the code base can be "more Rx"
Message queues. Queues like in MSMQ or a JMS implementation generally have transactionality and are by definition sequential. I feel IEnumerable<T> is a natural fit for here.

## Function Programming ##

Functional Programming 皆為 *表達式 (Expression)* 不會是 *陳述式(Statement)*

- 表達式是一個運算過程，一定會有返回值，例如執行一個 function:

        add(1,2)

- 陳述式是表現某個行為，例如一個 賦值給一個變數:

        a = 123;

Functional Programming 強調**沒有 Side Effect**，也就是要*保持純粹*，*只做運算*並*返回一個值*，**沒有其他額外的行為**。

### Functional Programming 優勢 ###

- 可讀性高
- 可維護性高
- 易於併行/平行處理

## Observable ##

Observable 是兩個思想的結合:

- Observer Pattern 用於

    生產者*推送(push)*資料給消費者

- Iterator Pattern 用於

    消費者主動向生產者*要求(pull)*資料

一句話形容，*Observable 就像是一個序列，裡面的元素會隨著時間推送*

這邊提供一個簡單的範例，透過 RxJS 來實作 Observable 的概念：

而同屬　Behavioral Patterns　類型，簡單的做些說明：

### Observer Pattern ###

在對象間定義一個一對多的聯繫性，由此當一個對象改變了狀態，所有其他相關的對象會被通知並且自動刷新。

兩種類型的物件，「通知者」和「觀察者」。
訂閱：「通知者」可增減訂閱列表中的「觀察者」
發佈：當有監聽的事件發生時，「通知者」可從訂閱列表中，將事件通知「觀察者」，「觀察者」則會對此事件做相對應的動作。
功用：解除耦合，讓耦合的雙方依賴抽像(接口)，而不依賴具體。

設計概念解說可參考[搞笑談軟工 - Observer Pattern](http://teddy-chen-tw.blogspot.tw/2013/08/observer-pattern.html)

C# 實作技術可以參考[dofactory - Observer Pattern](http://www.dofactory.com/net/observer-design-pattern)

### Iterator Pattern ###

給定一個語言, 定義它的文法的一種表示，並定義一個解釋器, 該解釋器使用該表示來解釋語言中的句子。例如遍歷不同容器裡面元素的統一一種方法，像是 C# 中的 *foreach* 支援任一個實作 IEnumerable 的類別 。

C# 實作技術可以[dofactory - Iterator Pattern](http://www.dofactory.com/net/iterator-design-pattern)

## Learning from Interactive Exercises Lab ##

對於 RxJS 有興趣的朋友可以繼續到下面這個網址一步步地練習與從做中學
[Functional Programming in Javascript](http://reactivex.io/learnrx/)

如果真的不知道該怎麼寫就案下 *Show Answer* 就會答案公開給你參考! 

## References ##
- [Reactive Programming 簡介與教學(以 RxJS 為例)](http://blog.techbridge.cc/2016/05/28/reactive-programming-intro-by-rxjs/)
- [Functional Reactive Programming 的入門心得](https://medium.com/@rayshih771012/functional-reactive-programming-70be6bd8726b)
- [30 天精通 RxJS 系列](http://ithelp.ithome.com.tw/users/20103367/ironman/1199)
- [Reactive Programming 響應式程式設計方法](http://blog.maxkit.com.tw/2015/08/reactive-programming.html)
- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [Introduction to Reactive Programming](https://egghead.io/courses/introduction-to-reactive-programming)
- [函数式反应型编程(FRP) —— 实时互动应用开发的新思路](http://www.infoq.com/cn/articles/functional-reactive-programming)
- [iThome - FRP與函數式](http://www.ithome.com.tw/voice/91328)
- [Expressions versus statements in JavaScript](http://2ality.com/2012/09/expressions-vs-statements.html)
- [.NET Design Patterns](http://www.dofactory.com/net/design-patterns)