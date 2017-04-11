---
layout: post
title: Callback function and how to override jQuery method
subtitle: ""
date: 2014-02-17 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- ECMAScript
- jQuery
---

關於Callback這是一個在javascript很重要的機制

<!-- More -->

在開始前先截錄一下它的解釋

>A reference to executable code, or a piece of executable code, that is passed as an argument to other code.


先從一張圖來講一下他到底是在幹嘛。

國外朋友也寫了篇很好的說明文，有興趣的朋友可以參考[Callback Functions in JavaScript](http://www.impressivewebs.com/callback-functions-javascript/)

	function test(param1, param2, callback) {
	    console.log('this is a test: ' + param1 + ', ' + param2);
	    if (callback && typeof(callback) === "function") {
	        callback();
	    }
	}

## override jQuery method

這邊順邊說明如何override jQuery的method,我們以html()這個method來看，[.html()說明](https://api.jquery.com/html/)

由官方說明看來這個method預設只能讓你換內容

- .html( htmlString )

	- <b>htmlString</b>
	- Type: htmlString
	- A string of HTML to set as the content of each matched element.

- .html( function(index, oldhtml) )

	- <b>function(index, oldhtml)</b>
	- Type: Function()
	- A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.

先在我們要幫他加上一個callback的功能只要

	$(function () {
	    $.fn.htmlOriginal = $.fn.html;
	    $.fn.html = function (html, callback) {
	        this.htmlOriginal(html);
	        if (callback&&typeof (callback) === "function") {
	            callback();
	        }
	    };
	});

有沒有很簡單，使用上只要如下即可:

	$('#test').html(content,function(){
		console.log("test2");
	});

## == vs ===

簡單說明一下:

- == 比較兩者是否相等

	EX:

		100=="100"	//true
		1==true		//true

- === 比較兩者是否相等(還包含類型的相等)

	EX:

		100==="100" //false
		1===true	//false

這邊順便說明為什麼typeof要用三個等於，我們先看Mozilla的文件[typeof](https://developer.mozilla.org/zh-TW/docs/JavaScript/Reference/Operators/typeof)

從文件可以看到

![typeof](typeof.PNG)

所以簡單來講回傳的就是文字瞜，所以就可以透過===來更嚴謹的作辦定條件。
