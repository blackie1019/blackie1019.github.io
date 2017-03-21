---
layout: post
title: No Access-Control-Allow-Origin header is present on the requested resource
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-10-04 23:52:42
categories:
- Development&Coding
tags:
- Chrome
- CORS
---

解決Chrome在本機開發使用localhost時遇到Access-Control-Allow-Origin的問題

<!-- More -->

## Background ##

一般來說browser都會阻擋跨網域的XMLHttpRequest請求而造成情求發生錯誤，主要是基於安全考量。

下面就是發生問題時的畫面

![錯誤畫面](ori.png)

## Root Cause ##

Chrome會阻擋CORS的原因可以看一下[官方說明](https://developer.chrome.com/extensions/xhr)，節錄重點部分如下:

> 
Regular web pages can use the XMLHttpRequest object to send and receive data from remote servers, but they're limited by the same origin policy. Extensions aren't so limited. An extension can talk to remote servers outside of its origin, as long as it first requests cross-origin permissions.

## Solution ##

[原文](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)，依樣節錄重點:

> This is not a fix for production or when application has to be shown to the client, this is only helpful when UI and Backend development are on different servers and in production they are actually on same server. For example: While developing UI for any application if there is a need to test it locally pointing it to backend server, in that scenario this is the perfect fix. For production fix, CORS headers has to be added to the backend server to allow cross origin access.

所以最簡單的方法就是就增加extension去允許CORS.
例如以下解法:

### [NodeJS+Express](http://enable-cors.org/server_expressjs.html) ###

		app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		  next();
		});
		
		app.get('/', function(req, res, next) {
		  // Handle the get for this route
		});
		
		app.post('/', function(req, res, next) {
		 // Handle the post for this route
		});

### [IIS7](http://enable-cors.org/server_iis7.html) ###

		<?xml version="1.0" encoding="utf-8"?>
		<configuration>
		 <system.webServer>
		   <httpProtocol>
		     <customHeaders>
		       <add name="Access-Control-Allow-Origin" value="*" />
		     </customHeaders>
		   </httpProtocol>
		 </system.webServer>
		</configuration>

對於不同語言的完整解法有興趣的可以參考[enable cross-origin resource sharing](http://enable-cors.org/index.html).

或是直接用下列指令另開一個新的Chrome視窗也可以快速解決你的問題.

    chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

開啟來後就可以正常執行了

![成功畫面](success.png)