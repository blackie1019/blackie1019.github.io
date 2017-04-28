---
layout: post
title: JavaScript use strict(嚴格模式)-strict mode 介紹
subtitle: ""
date: 2013-08-30 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- Basic JS
---

JavaScript 的核心是基於[ECMAScript](http://zh.wikipedia.org/wiki/ECMAScript)標準，而該標準在最近一次更新(2009年)更新為第五版，其中加入strict mode(嚴格模式)這個功能，可以讓你的語法變得較嚴謹，相對於原本的語法較不容易出錯

<!-- More -->

使用上很簡單，只要加上即可，先呈現一個使用範例

```js
"use strict";//使用strict mode(嚴格模式)
function tryFunction(){
	var tryValue = 123;
	return tryValue;
}

// This causes a syntax error.
testvar = 123;
```

這邊如果你用瀏覽器看後會發現一個被拋出的錯誤

![架構圖](1.png)

如此就可以很簡單的透過strict mode來限制一些比較鬆散的寫法跟可能發生問題的地方(但這樣好像失去了原本js最被人家稱讚的彈性)

---

## 優缺點與使用

那為什麼要有這個strict mode以及優缺點為何，簡單幫大家整理如下:

+ 優點:讓語法更簡單、可以撰寫出較嚴謹的js避免一些突發的意外，要知道在js抓問題不是普通的難，尤其那一段程式碼還不是你寫的時候，通常你抓到問題架構你也全部搞懂了
+ 缺點:Browser支援程度需要先確認，也別期望只要加了`"use strict";`就不用改程式，通常用很多plugin的專案你會改到哭(但我還是建議用strict mode)

在使用上除了剛剛一開始的範例外你也可把`"use strict";`這個用在function裡面，就不會變成全域都嚴格模式，範例如下:

```js
function tryFunction(){
	"use strict";//使用strict mode(嚴格模式)
	tryValue = 123;
	return tryValue;
}

// This worked fine.
testvar = 123;
// This causes a syntax error
tryFunction();
```

## 瀏覽器支援程度

+ Chrome13之後都有支援(最新19)
+ IE10,11有支援(但上面有10有bug)
+ FF4有支援
+ Safari5.1之後有支援(最新6)

詳細資料可以看下面的資訊[ECMAScript 5 compatibility table(支援比較表)](http://kangax.github.io/es5-compat-table/)

如果你的瀏覽器沒有支援使用`"use strict";`對你不會有任何影響，只是一個文字而已，所以幹嘛不用~~!哈XD

而且未來JavaScript計畫也會全面朝向strict mode做架構，目前只是鼓勵但以後可能就是全面普及了(此句為自己腦補...)

---

## 常見用法之限制

比較常見的一些限制可以參考[微軟的中文文件](http://msdn.microsoft.com/zh-tw/library/ie/br230269(v=vs.94).aspx)(這幾年文件真的做很詳細還中文，糾甘心)

幾個重點整理節錄來至[NCZOnline](http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/) 用原本範例換成中文讓大家瞭解一下

### 消除 with 的用法

不能使用*with*這個用法了，所以在使用*strict mode*時請先確認你沒有用下列的寫法

```js
// Causes a syntax error in strict mode
with (location) {
	alert(href);
}
```
### 變數使用需要先宣告

在使用*strict mode*下不能用下面這樣的變數使用(下面的範例正確使用需要先透過var 宣告someUndeclaredVar才可以用)

```js
// Throws an error in strict mode
(function() {

	someUndeclaredVar = "foo";

}());
```

### 使用this前的注意事項

另外一個重點就是你不能使用在還沒宣告的時候給一個物件相關的this-value(沒宣告的定義是當該物件是null 或undefined時)，如下錯誤的示範

```js
window.color = "red";
function sayColor() {
	alert(this.color);
}

// Throws an error in strict mode, "red" otherwise
sayColor();

// Throws an error in strict mode, "red" otherwise
sayColor.call(null);
```

基於[變數使用需要先宣告](#變數使用需要先宣告)的原則不能直接使用上方的this的寫法因為你沒先宣告this的物件為何

下面這段也是一樣有錯誤，如果要透過constructor來產生的話要透過new的方式來告訴它this為何物件

```js
function Person(name) {
	this.name = name;
}

// Error in strict mode
var me = Person("Nicholas");
```

### 物件內不能重複定義相同名稱的屬性或是在變數宣告時定義重複的名稱

這通常是撰寫的時候誤打的，所以要注意下面兩個寫法在*strict mode*都是被禁止的

```js
// Error in strict mode - duplicate arguments
function doSomething(value1, value2, value1) {
	//code
}

// Error in strict mode - duplicate properties
var object = {
	foo: "bar",
	foo: "baz"
};
```

These are both syntax errors and so the error is thrown before the code is executed.

### 還是可以使用eval()，但有點小改變

最大的改變是在eval()內宣告的變數(variables)與函式(functions)並不會在scope中存在，如下範例

```js
(function() {

	eval("var x = 10;");

	// Non-strict mode, alerts 10
	// Strict mode, throws an error because x is undeclared
	alert(x);

}());
```

上面的範例可以透過return value的方式把x傳回給scope呈現，
如下範例

```js
(function() {

	var result = eval("var x = 10, y = 20; x + y");

	// Works in strict and non-strict mode (30)
	alert(result);

}());
```

### 對於不可改變的屬性無法在宣告後再對內容做彈性修改
如果屬性被設為read only 或 freezing，如果再去修改會拋出Error警示(在*non-strict mode*一樣實際的值不會改只是不會拋出Error警示)

```js
var person = {};
Object.defineProperty(person, "name", {
	writable: false,
	value: "Nicholas"
});

// Fails silently in non-strict mode, throws error in strict mode
person.name = "John";
```

以上希望對大家有幫助，*如果有錯的地方也麻煩指導一下小弟*，**一起進步**
