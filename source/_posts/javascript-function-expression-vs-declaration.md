---
layout: post
title: function expression(函式陳述式) VS declaration (函式運算式)
subtitle: ""
date: 2015-04-10 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- Basic JS
---

先前寫過一篇[[Javascript]Call method(呼叫函式)](https://blackie1019.github.io/2014/01/13/javascript-call-method/)關於函數宣告,這邊進階一下做一個比較。

<!-- More -->


在開始前, 先來回憶一下如何自定一個JS函數

## How to create JS custom function

### 第一種 - declaration (函式運算式)

```csharp
function callTest(){
	console.log(123);
}

callTest();
```

### 第二種 - function expression(函式陳述式)

```csharp
var callTest=function(){
	console.log(123);
}

callTest();
```

大致上常見的有上面兩種, 其中第二種的變形使用很多變化，下面歸納兩點差異讓大家分辨

## What’s different

- 1

	function declaration (函式運算式)最大差異就是呼叫自定函式時可在function前，如剛剛的第一種我們可以改成下面的樣子依舊可以正常執行
	
	```csharp
	callTest();

	function callTest(){
		console.log(123);
	}
	```

	但如果改用function expression(函式陳述式)成下面這樣就會發現出現問題(變數未宣告)

	```csharp
	callTest();

	var callTest=function(){
		console.log(123);
	}
	```

- 2

	而在定義上，declaration (函式運算式)只要被定義過後就無法從記憶體中刪除並回收，而function expression(函式陳述式)則是正常的跟著變數生命週期運作, 所以可能定義完後則直接被回收或是跟著變數的參考被移除時就結束等待GC回收,如下就是直接被回收與變數被回收的範例

	- declaration (函式運算式)直接被回收

	```csharp
	（function(val){
		console.log(val);
	})(123);
	```

	- function expression(函式陳述式)變數被回收
	
	```csharp
	var callTest=function(){
		console.log(123);
	}

	callTest();
	callTest=null;
	callTest();
	```

## 結語

看完定義跟比較後應該很明確的可以知道以後什麼情況要用 *Function Expression* 與 *Declaration* 了，不要再誤用或以為都一樣摟！
