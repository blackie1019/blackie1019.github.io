---
layout: post
title: SignalR tuning experience
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-08-21 00:01:00
categories:
- .NET
tags:
- ASP.NET
- SignalR
---

整理使用SignalR的一些經驗與調校內容

<!-- More -->

使用SignalR作為公司處理client-server的訊息傳遞的功能已經好一陣子，這邊整理一下相關知識。

## Basic ##

### Web Browser Support ###

Applications that use SignalR in browsers must use jQuery version 1.6.4 or major later versions (such as 1.7.2, 1.8.2, or 1.9.1).

SignalR can be used in the following browsers:

- Microsoft Internet Explorer versions 8, 9, 10, and 11. Modern, Desktop, and Mobile versions are supported.
- Mozilla Firefox: current version - 1, both Windows and Mac versions.
- Google Chrome: current version - 1, both Windows and Mac versions.
- Safari: current version - 1, both Mac and iOS versions.
- Opera: current version - 1, Windows only.
- Android browser

### Application Support ###

SignalR can be hosted in standalone Windows client or Silverlight applications. Windows Desktop and Silverlight SignalR applications

- Applications using .NET 4 are supported on Windows XP SP3 or later.
- Applications using .NET Framework 4.5 are supported on Windows Vista or later.

### Transport Medium ###

SignalR提供四種傳輸方式，依據瀏覽器的支援你可以自行設定(預設四種都支援，但會有先後順序的使用，Websocket最優先!)

![type](type.png)

- HTML 5 transports
	- WebSocket
	- Server-Sent Events

- Comet transports
	- Forever Frame
	- Long Polling

![support](support.png)

### Config Transport ###

我們可以手動設定自己要的Transport

	$.connection.hub.start({ transport: ['longPolling'] });

### Logging and Monitoring Transports in SignalR ###

SignlaR本身可以開啟Logging機制，只要透過簡單的設定打開即可

	$.connection.hub.logging = true;

## Tuning Experience ##

以下是正式環境上遇到的問題跟處理的方式:


- Reducing message size. All messaging solution concern size, smaller is better.
- Use latest SignalR to solved connection increase issue.

	To fix known knowing issue of early version, suggest to upgrade signalR to latest stable version. *SignalR 2 is only supported on .NET Famework 4.5 or higher version.

	- https://github.com/SignalR/SignalR/issues/1790
	- https://github.com/SignalR/SignalR/issues/2950
	
- Update windows service pack for SinglaR connection issue(Window Server 2012 以上不需要特別安裝)

	[Update for Windows Server 2008/2008 R2 with IIS 7/7.5 endless connection with a period](https://support.microsoft.com/en-us/kb/980368)

- Web request optimized
	
	- Move static file to CDN(JS, CSS, png, audio file and etc…)
	- Concatenate request to less request(only one request to retrieve data is best)
	
- SignalR web socket issue, caused Network setting limitation.
	
	Found SignalR using unsupported transport type and create a lot of connection.

	- Short-term: To turn off web socket from SignalR, pass the transport type(longPolling, foreverFrame, serverSentEvents, webSocket) you want.
			
			$.connection.hub.start({ transport: ['longPolling'] });

	- Long-term: Using sub-domain and update system architecture to support SignalR with Web Socket Issue.
	
- Avoid unobserved exceptions stop application due to too many connection from SignalR in global.asax.cs

        protected void Application_Start()
        {

        	this.RegisterUnobservedTaskException();
		}

		private void RegisterUnobservedTaskException()
		{
		    TaskScheduler.UnobservedTaskException += (s, e) =>
		    {
		        e.SetObserved();
		        e.Exception.Handle(
		            t =>
		            {
		                this.log.Exception(string.Format("UnobservedTaskException happen on Message={0}", e.Exception.Message));
		                return true;
		            });
		    };
		}

## SignalR ScaleOut Design ##

If still have connection issue, review web application design for SignalR scaleout design.

[ScaleOut In SignalR](http://www.asp.net/signalr/overview/performance/scaleout-in-signalr)

## Performance Tuning with IIS and .net framework ##

Sharing the tuning guide of official post.

[Performance Tuning SignalR](https://github.com/SignalR/SignalR/wiki/Performance)

## References ##

- [Introduction to SignalR](http://www.asp.net/signalr/overview/getting-started/introduction-to-signalr)
- [Identifying the SignalR Transport Medium](http://dailydotnettips.com/2014/03/20/identifying-the-signalr-transport-medium/)
- [SignalR Supported Platforms](http://www.asp.net/signalr/overview/getting-started/supported-platforms)