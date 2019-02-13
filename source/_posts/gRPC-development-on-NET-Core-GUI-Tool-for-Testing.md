---
layout: post
title: gRPC development on .NET Core - GUI Tool for Testing
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-02-13 00:51:09
categories:
- .NET
tags: 
- .NET
- .NET Core
- gRPC
- Protobuf
- Microservice
---

介紹如何使用 gRPC 的 GUI 工具 - BloomRPC 協助 .NET Core 開發 gRPC 應用程式的整合測試

<!-- More -->

先前分享了如何開發 gRPC 應用程式，而開發完成的服務端除了自己寫客戶端/應用端去呼叫外，也可以透過 GUI 工具進行整合測試．

本此使用的工具是 [BloomRPC](https://github.com/uw-labs/bloomrpc)

這邊可以直接下載安裝版的使用，安裝完成後打開的介面如下:

![editor-preview](https://github.com/uw-labs/bloomrpc/raw/master/resources/editor-preview.gif)

以先前示範的 gRPC 專案[demo-grpc](https://github.com/blackie1019/demo-grpc)來做範例，我們可以先將 `Demo.Server` 運行起來

而後於BloomRPC的介面載入 .proto 定義，接著就可以從上面發起整合測試：

![01.png](01.png)