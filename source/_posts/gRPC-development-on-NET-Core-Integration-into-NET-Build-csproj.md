---
layout: post
title: gRPC development on .NET Core - Integration into .NET Build(.csproj)
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-03-18 23:29:30
categories:
- .NET
tags: 
- .NET
- .NET Core
- gRPC
- Protobuf
- Microservice
---

介紹如何將 gRPC 整合至 .NET Core 的專案檔(.csproj) 內．

<!-- More -->

延續先前兩篇 [gRPC 應用程式 - 基礎入門](http://blackie1019.github.io/2019/02/10/gRPC-development-on-NET-Core-Basic/) 與 [gRPC 的 GUI 工具 - BloomRPC 協助 .NET Core 開發 gRPC 應用程式的整合測試](http://blackie1019.github.io/2019/02/12/gRPC-development-on-NET-Core-GUI-Tool-for-Testing/) 後，這篇要介紹一下Grpc.Tools `1.17.0` 之後整合 .csproj 的開發方式如何更加輕鬆地進行 gRPC 的開發．

以下內容是延續 [gRPC 應用程式 - 基礎入門](http://blackie1019.github.io/2019/02/10/gRPC-development-on-NET-Core-Basic/) 做分享，建議先看此篇後再往下閱讀．

範例程式碼：[blackie1019/demo-grpc-dotnet-build-integration](https://github.com/blackie1019/demo-grpc-dotnet-build-integration)

## 專案結構 ##

所以我們先產生了與之前雷同的目錄與內容：

```bash
/
├── Demo.sln
├── protos/
│   ├── message.cs
│   ├── service.cs
├── src/
│   ├── Demo.Clinet/
│   ├── Demo.Server/
│   ├── Demo.Message/
```

與先前不同的是本次直接將 gRPC 的開發整合進入 Demo.Message.csproj:

```xml
<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <TargetFramework>netstandard2.0</TargetFramework>
    </PropertyGroup>

    <ItemGroup>
        <PackageReference Include="Google.Protobuf" Version="3.7.0" />
        <PackageReference Include="Grpc" Version="1.19.0" />
        <PackageReference Include="Grpc.Tools" Version="1.19.0" PrivateAssets="All" />
    </ItemGroup>
    
    <ItemGroup>
        <!-- Explicitly include our helloworld.proto file by adding this line: -->
        <Protobuf Include="../../protos/Common/*.proto" ProtoRoot="../../protos" OutputDir="%(RelativePath)" CompileOutputs="False" GrpcServices="None" />
        <Protobuf Include="../../protos/App/*.proto" ProtoRoot="../../protos" OutputDir="%(RelativePath)" CompileOutputs="False" GrpcService="both" />
    </ItemGroup>

</Project>
```

另外，本次專案這邊額外定義了一個通用類別於 Common 目錄下，並於使用到該類型的 .proto 載入此檔案（路徑需包含 subfolder)．

而 Grpc.Tools 設定了 `PrivateAssets="All"` ，該屬性指定應取用哪些資產不會放入下一個專案的套件，阻止下一個引用該專案產生的 .dll 時 .csproj 的 .dll 引用繼承。

細節可參考[Package references (PackageReference) in project files](https://docs.microsoft.com/zh-tw/nuget/consume-packages/package-references-in-project-files)

只要設定此步驟即可完成編譯，而這邊我們選擇 CompileOutputs 為 `False` 則需要手動IDE編譯：

![01](01.png)

如果編譯有問題的朋友建議可以進入專案目錄下透過 `dotnet build` 編譯產出時查看細部編譯執行紀錄：

![02](02.png)

當將 Server 與 Client 兩者運行即可看到以下畫面：

![03](03.png)

透過 Grpc.Tools `1.17.0` 與 .csproj 的直接整合，即可加入原先手動執行 protoc 的麻煩與人為錯誤的可能，加速 gRPC 於 .NET 上的開發效率．

## References ##

- [Protocol Buffers/gRPC Integration Into .NET Build](https://github.com/grpc/grpc/blob/master/src/csharp/BUILD-INTEGRATION.md)