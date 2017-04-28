---
layout: post
title: c# ternary operator, null coalescing operator and var
subtitle: ""
date: 2014-05-05 00:29:45
author: Blackie
header-img: "https://blackie1019.github.io/2014/05/04/csharp-ternary-operator-null-coalescing-operator-and-var/main.JPG"
categories:
- .NET
tags:
- C#
- ASP.NET
---

在寫程式中往往會遇到一些簡化程式碼的簡寫，如foreach在C# 3.0有了LinQ與Lambda表態是後就漸漸的被少用了(在大型的開發架構下看的懂程式碼的架構才是第一步最重要的,除了效能考量外)

<!-- More -->

## c#的?:

這是傳統的三元運算子(ternary operator)的使用方式，

	test ? expression1 : expression2


範例如下:

```csharp
int a= b > 1 ? b : c ;
```

上面這個範例的意思就是宣告一個變數a，並判斷如果b的值>1就將b值給a，否則則將c值給a。

透過三元運算子我們可以簡化不少反鎖的if statement，這讓我們的程式碼更容易被閱讀。

## C#的??

而??這是C# 2.0之後出來運算子，主要用在判別test!=null(null coalescing operator)的情況,

	test ?? expression1 : expression2

這邊我們先用傳統的三元運算子寫出判別!=null的code:

```csharp
object A = B != null ? B : C ;
```

接著我們將上面用??改寫

```csharp
object A =  B ?? C ;
```

而??有另外一個特性就是可以直接串連，如下:

```csharp
object A =  B ?? C ?? D ?? E ?? F;
```

意思就是B如果是null就傳C,C如果是null就穿D...最後如果BCDE都null就傳F。

這樣是不是減少很多if statement與ternary operator!

## var的用法

另外，在C# 3.0 變數宣告可透過隱含型別的方式來做為宣告，隱含型別區域變數是強型別 (Strongly Typed)，就和自行宣告型別一樣，差別在於隱含型別是由編譯器 (Compiler) 判斷型別。

```csharp
// implicitly typed
var test = 100;
var test2 ="123";

//explicitly typed
int test = 100;
string test2 ="123";
```

對於這個部份的介紹小弟推薦另外一篇MVP-91 所撰寫的介紹文會更為詳細

[快快樂樂學 LINQ - 前哨戰 - var 與匿名型別](http://msdn.microsoft.com/zh-tw/library/dn467616.aspx)

這邊截錄一個重點:

> 什麼時候不用var？對我來說，只有兩種情況：
>
> 第一，要用到多型的時候，尤其是變數的型別為interface，這如果用var，變數型別就直接變成concrete class的型別了，雖說執行上不會有任何問題，但在開發上意義可完全不同，加上使用變數時看到的雜訊，會讓我不太愉悅，所以在運用多型的設計上，我不會用var。
>
> 第二，top-down的設計方式，當我還沒有實際的方法時，我不會用var。因為用Visual Studio的產生功能，會判斷成object，這樣我還要移過去改，太麻煩了，所以這類的宣告，我會想好型別宣告後，再透過產生功能來幫忙產生function的殼。

簡單來講就是用vs開發的話就安心交給工具來幫你整理吧~

其他可以幫忙簡化的工具要花錢的就是[Resharper](http://www.jetbrains.com/resharper/)，免錢的就是[CodeMaid](http://visualstudiogallery.msdn.microsoft.com/76293c4d-8c16-4f4a-aee6-21f83a571496)

透過上面三個簡單的步驟來一起簡化/美化程式碼吧
