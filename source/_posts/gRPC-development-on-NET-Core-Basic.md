---
layout: post
title: gRPC development on .NET Core - Basic
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-02-11 00:40:06
categories:
- .NET
tags: 
- .NET
- .NET Core
- gRPC
- Protobuf
- Microservice
---

介紹如何在 .NET Core 中開發 gRPC 應用程式 - 基礎入門

<!-- More -->

![landing.png](landing.png)

gRPC 是一個由 google 開發的開源、跨語言且高效能的 RPC Framework，它可以高效地連接單個或多個數據中心的服務，也可以支持可插拔的負載均衡，追踪，健康檢查以及認證。當然，它也能應用於分散式計算的中用來連接各種設備、APP 應用、瀏覽器(需要一點技巧)與後端服務．

目前在 .NET/.NET Core 的開發上說不上方便但執行上是沒問題的，但由於步驟相對於剛入手的朋友還是有點複雜，故紀錄一下整個流程．

但在開始實作前，先補充一下一點基礎知識．

[完整的範例下載](https://github.com/blackie1019/demo-grpc)

## RPC V.S REST ##

Remote procedure call (RPC) 顧名思義就是用於遠端調用, 簡單的說就是要像調用本地函數一樣請伺服器端根據輸入代為處理函數並回傳結果。

如兩台服務器A和B，A服務器上部署一個應用，B服務器上部署一個應用，A服務器上的應用想調用B服務器上的應用提供的接口，由於不在一個應用實體內，不能直接調用，所以需要通過網路來呼叫調用的方式和傳達調用所需的傳入數據。

人們最常比較 RPC 與 Restful API Restful API 現在可以說是整個網頁應用程式的主流用法，而 RPC 則是更早於 Restful API 出現的遠端調用，最簡單的差別如下：

- Restful API 使用http 協定透過 GET 方法來取得資料，如：/usr/2
- RPC 則使用類似函數呼叫的方式執行，例如：getUser(2)

## What is gRPC ##

gRPC 是由Google所開發的開源RPC Framework，可支援多種語言：C、C++、Java、Python、Go、R、Node.js、C#、Object-C、PHP 等。

透過 gRPC，可以享受如同 Restful API 呼叫一樣前後端不同語言的開發，而這也讓人常常誤會或是難分辨使用時機．

![bi-communication.png](bi-communication.png)

gRPC 是基於 `HTTP2` 以及 `Protocol buffer` 與 `Netty` 這三個很厲害的協定與技術所開發的框架．

不同於 Restful API，gRPC 提供了更加安全也穩定的取雙向的傳輸協定，比起 Restful API 單調的單方向應用更廣．且 gRPC 天生就是透過 `HTTP2.0` 的協定做傳輸，搭配基於 `Protocol Buffers` 的定義與序列化方式，將溝通用的模型與通道整合起來時效能更加提升．

但可惜的是，瀏覽器現在還不能直接跟 gRPC 伺服器溝通，所以你需要安插一個 Gateway 將請求轉到 gRPC 客戶端．

### protocol buffers ###

學習gRPC前，請先了解其傳輸通訊的設定檔：protocol buffers

這邊可以看到，宣告方式非常簡單，而每一個 gRPC 函式的呼叫與回傳皆為一個類別，都是需要定義的(連`null`或是`空值`都要宣告)，如下：

```protobuf
syntax = "proto3"; // protobuf 的版本

package Demo; // 類別與函式產生時所屬的 namespace，在 csharp 此設定沒用
option csharp_namespace = "Demo"; // csharp 需透過此設定才能指定所屬的 namespace

message HelloRequest {
  int Value =1;
}

message HelloResponse {
  string Value =1;
}

// 無傳入值時
message Empty{
  
}

// enum 型別
enum ResponseCode {
  Success = 0;
  GeneralError = 9999;
}
```

而型別轉換上(`Date` 與 `Decimal`)是目前比較缺乏的，但如果是希望傳入的屬性有 `Enum` 型別也是可以宣告的，

gRPC 有四種通訊方式，以下包含在 Protobuf 中函式(function)的表達方式：

- Unary RPCs，一次請求，一次返回，沒有流，這是最常用的方式：

    rpc SayHello(HelloRequest) returns (HelloResponse){
    }

- Server streaming RPCs，客戶端發送單次請求，服務端會返回一連串的數據，比如服務端推送比賽分數的持續變化至客戶端：

    rpc LotsOfReplies(HelloRequest) returns (stream HelloResponse){
    }

- Client streaming RPCs，客戶端會發送一連串的數據到服務端，服務端返回單次數據，比如客戶端持續發送當下的操作日誌與行為：

    rpc LotsOfGreetings(stream HelloRequest) returns (HelloResponse) {
    }

- Bidirectional streaming RPCs，兩邊各自會發送一連串的數據，比如即時的語音通話以及一些遊戲場景中的互動行為：

    rpc BidiHello(stream HelloRequest) returns (stream HelloResponse){
    }

## 開發流程 ##

應用程式與應用程式之間的通訊橋樑，一般來說開發流程為：

1. 先寫 .proto 檔案
2. 建立部署腳本 - 直接呼叫 `gRPC cli` 或是寫好的 `.sh` 檔案來動態產生 C# 內容至gRPC通訊介面的專案
3. 實作 服務器端程式
4. 實作 客戶端程式
5. 整合測試與實際使用

所以我們先產生了以下內容目錄的內容：

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

### 建立 .sln 與 .csproj ###

新增一個 .sln 接著 新增第一個 .csproj 檔案 `Demo.Message`，因為該專案只放定義與規格檔案，故將其設定為 .NET Standard 專案：

![02.png](02.png)

接著將以下的 nuget 套件安裝 Demo.Message 專案中：

[Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/)
[Google.Protobuf](https://www.nuget.org/packages/Google.Protobuf)
[Grpc](https://www.nuget.org/packages/Grpc/)

![05.png](05.png)

然後額外新增兩個 .NET Core Console Application 專案： `Demo.Clinet` 與 `Demo.Server` 並將兩者都加入 Demo.Message 的參考

![03.png](03.png)

基於.NET Core 參考會直接傳入下一個加入參考的專案，這裏就不需要額外加入 Google.Protobuf 與 Grpc 的 nuget 套件了．

### 撰寫 .proto 定義檔案 ###

接著在 `protos` 的資料夾放入兩份檔案，傳輸的規格與方法的定義檔案：

message.proto

```protobuf
syntax = "proto3";

package Demo.Message; //will be placed in a namespace matching the package name if csharp_namespace is not specified
option csharp_namespace = "Demo.Message";


message EmptyMsg{
  
}

message GreetingMsg {
  string Value =1;
}

message GreetingResponse{
  string MsgValue =1;
  string ReturnValue =2;
}

message TestResponse {
  repeated int32 Values =1;
}
```

service.proto

```protobuf
syntax = "proto3";

package Demo.Message; //will be placed in a namespace matching the package name if csharp_namespace is not specified
option csharp_namespace = "Demo.Message";
import "message.proto";

service DemoService {
  rpc Say(GreetingMsg) returns (GreetingResponse);
  rpc TestWithEmpty(EmptyMsg) returns (TestResponse);
}
```

這邊可以看到範例使用的 syntax 規格為 `proto3` 的定義，詳細使用可以參考[Language Guide (proto3)](https://developers.google.com/protocol-buffers/docs/proto3)

### 透過定義檔案產生 .cs 檔案 ###

而要成功產生 gRPC 的 *.cs* 檔案, 需要先安裝 homebrew 並透過下方指令由 brew 將 gRPC 的開發工具安裝完畢([詳細參考](https://github.com/grpc/homebrew-grpc))：

    brew install gRPC

安裝完成後，如果是 `GO` 或是其他開發語言就可以直接進行發了，而用 C# 與 .NET Core 進行開發還需要額外透過 nuget 安裝 [Grpc.Tools](https://www.nuget.org/packages/Grpc.Tools/)

![04.png](04.png)

並且透過 nuget 將安裝至電腦的暫存區作為之後使用，安裝後的檔案會放置底下路徑內 `/Users/{user}/.nuget/packages/grpc.tools/` ，如下：

![01.png](01.png)

接下來透過gRPC的CLI工具，將.proto的檔案產生對應的C#內容至指定的專案路徑下的即可，如下指令：

```sh
/Users/`whoami`/.nuget/packages/grpc.tools/1.18.0/tools/macosx_x64/protoc -I ./protos/ --csharp_out src/Demo.Message --grpc_out src/Demo.Message ./protos/*.proto --plugin=protoc-gen-grpc=/Users/`whoami`/.nuget/packages/grpc.tools/1.18.0/tools/macosx_x64/grpc_csharp_plugin
```

![06.png](06.png)

### 開發使用 .NET Core 開發 ###

接著在 `Demo.Server` 完成 DemoServiceImpl.cs 的開發，如下：

```csharp
namespace Demo.Server
{
    public class DemoServiceImpl:DemoService.DemoServiceBase
    {
        public override Task<GreetingResponse> Say(GreetingMsg request, ServerCallContext context)
        {
            var response = new GreetingResponse
            {
                MsgValue = request.Value,
                ReturnValue = $"Received on {DateTime.Now:O}",
            };
            return Task.FromResult(response);
        }

        public override Task<TestResponse> TestWithEmpty(EmptyMsg request, ServerCallContext context)
        {
            var response = new TestResponse();//new List<int>();
            var randon = new Random(DateTime.Now.Millisecond);
            for (var i = 0; i < 10; i++)
            {
                response.Values.Add(randon.Next(0, 100));
            }

            return Task.FromResult(response);
        }
    }
}
```

這邊我們可以透過 Rider 的自動產生功能帶出需要 override 的方法，加快開發流程：

![07.png](07.png)

![08.png](08.png)

完成後，即可在 program.cs 處加入以下設定並啟用服務端等待呼叫：

```csharp
namespace Demo.Server
{
    class Program
    {
        static void Main(string[] args)
        {
            var host = "127.0.0.1";
            var port = 9999;

            var serverInstance = new Grpc.Core.Server
            {
                Ports =
                {
                    new ServerPort(host, port, ServerCredentials.Insecure)
                }
            };

            Console.WriteLine($"Demo server listening on host:{host} and port:{port}");

            serverInstance.Services.Add(
                Message.DemoService.BindService(
                    new DemoServiceImpl()));

            serverInstance.Start();
            
            Console.ReadKey();

            serverInstance.ShutdownAsync().Wait();
        }
    }
}
```

接著看到以下畫面代表服務端準備好了

![09.png](09.png)

最後補上客戶端的呼叫實作如下：

```csharp
namespace Demo.Client
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Demo Client is Ready...");
            var host = "127.0.0.1";
            var port = "9999";

            var channel = new Channel($"{host}:{port}", ChannelCredentials.Insecure);
            var serviceClient = new DemoService.DemoServiceClient(channel);

            var result1 = serviceClient.TestWithEmpty(new EmptyMsg());
            Console.WriteLine($"Calling Say and return response is {result1.Values.ToString()}");
            
            Console.WriteLine("Please type input for calling Say:");
            var msg = Console.ReadLine();
            var result2 = serviceClient.Say(new GreetingMsg { Value = msg});
            Console.WriteLine($"Calling Say and return response is {result2.MsgValue},{result2.ReturnValue}");
        }
    }
}
```

完成後並且運行起來後看到的結果如下：

![10.png](10.png)

![11.png](11.png)

如此一來gRPC的開發就完成串接呼叫了！

由於功能與效能的強大，讓 gRPC 也正式被承諾會被整合進入 ASP.NET Core 中並在 .NET Core 3 發行．

有興趣的朋友可以追一下目前的專案進度[grpc/grpc-dotnet](https://github.com/grpc/grpc-dotnet)

## Reference ##

- [gRPC](https://grpc.io/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers/)