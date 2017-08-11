---
layout: post
title: ASP.NET Core play with Redis and StackExchange.Redis
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-17 02:35:50
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- Redis
- StackExchange.Redis
---

記錄如何使用StackExchange.Redis 取用Redis內的資料

<!-- More -->

![cover](cover.jpg)

# StackExchange.Redis #

[StackExchange.Redis](https://stackexchange.github.io/StackExchange.Redis/) 是由Stack Overflow所開發維護的Redis Driver與Framework，它提供了我們有效且方便的介面去操作Redis資料．

官方提供兩個套件：

- StackExchange.Redis
- StackExchange.Redis.StrongName

如果你的專案本身屬於strong-named那就選後者吧．

對於Redis與如果想更進一步的認識可以參考先前整理的教學[redis-tutoring](https://www.slideshare.net/chentientsai/redis-tutoring)，但比較可惜的不是專門為了ASP.NET Core所寫的教學，之後會有機會再更新整理與大家分享．

# Hands On #

這邊一樣我們透過dotnet new 指令幫我們建立classlib與xunit專案進行開發與測試

這邊可以參考前一篇[ASP.NET Core play with Solution File](https://blackie1019.github.io/2017/04/16/ASP-NET-Core-play-with-Solution-File/)使用.sln的方式將兩個專案關聯起來一起方便日後管理與還原

## Create Redis Instance on RedisLabs ##

[Redis Labs](redislabs.com)提供免費快速的建立雲端Redis Instance的服務．

這邊我們用Redis Labs幫我們快速建立一個Redis Instance，建立完成後Endpoint就是我們的連線資料，而Access Control & Security就是該Instance的Auth

![redislab](redislab.png)

## Add StackExchange.Redis from NuGet Package Manager ##

接著我們使用先前介紹的[NuGet Package Manager](ASP.NET Core using NuGet with Visual Studio Code)來幫我們載入StackExchange.Redis.

## Setup up ConnectionMultiplexer and IDatabase ##

```csharp
ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("<ip>:<port>,password=<auth>");
IDatabase db = Redis.GetDatabase();
```

這邊要稍微注意一下，如果將ip換成domain的話會發生下面錯誤：

```text
Failed   App.Test.UnitTest1.Test_SetValue
Error Message:
 System.AggregateException : One or more errors occurred. (This platform does not support connecting sockets to DNS endpoints via the insta
nce Connect and ConnectAsync methods, due to the potential for a host name to map to multiple IP addresses and sockets becoming invalid for
 use after a failed connect attempt. Use the static ConnectAsync method, or provide to the instance methods the specific IPAddress desired.
)
---- System.PlatformNotSupportedException : This platform does not support connecting sockets to DNS endpoints via the instance Connect and
 ConnectAsync methods, due to the potential for a host name to map to multiple IP addresses and sockets becoming invalid for use after a fa
iled connect attempt. Use the static ConnectAsync method, or provide to the instance methods the specific IPAddress desired.
Stack Trace:
   at System.Threading.Tasks.Task.ThrowIfExceptional(Boolean includeTaskCanceledExceptions)
   at System.Threading.Tasks.Task.Wait(Int32 millisecondsTimeout, CancellationToken cancellationToken)
   at StackExchange.Redis.ConnectionMultiplexer.ConnectImpl(Func`1 multiplexerFactory, TextWriter log)
   at App.MemberRepository..ctor() in /Users/blackie/Desktop/DEV/blackie1019/RedisDemo/App/Class1.cs:line 27
   at App.MemberRepository.<>c.<.cctor>b__18_0() in /Users/blackie/Desktop/DEV/blackie1019/RedisDemo/App/Class1.cs:line 10
   at System.Lazy`1.CreateValue()
   at System.Lazy`1.LazyInitValue()
   at App.MemberRepository.get_Instance() in /Users/blackie/Desktop/DEV/blackie1019/RedisDemo/App/Class1.cs:line 12
   at App.Test.UnitTest1.Test_SetValue() in /Users/blackie/Desktop/DEV/blackie1019/RedisDemo/App.Test/UnitTest1.cs:line 18
----- Inner Stack Trace -----
   at System.Net.Sockets.Socket.ThrowIfNotSupportsMultipleConnectAttempts()
   at System.Net.Sockets.Socket.BeginConnect(String host, Int32 port, AsyncCallback requestCallback, Object state)
   at System.Net.Sockets.SocketTaskExtensions.<>c.<ConnectAsync>b__5_0(String targetHost, Int32 targetPort, AsyncCallback callback, Object
state)
   at System.Threading.Tasks.TaskFactory`1.FromAsyncImpl[TArg1,TArg2](Func`5 beginMethod, Func`2 endFunction, Action`1 endAction, TArg1 arg
1, TArg2 arg2, Object state, TaskCreationOptions creationOptions)
   at System.Threading.Tasks.TaskFactory.FromAsync[TArg1,TArg2](Func`5 beginMethod, Action`1 endMethod, TArg1 arg1, TArg2 arg2, Object stat
e)
   at System.Net.Sockets.SocketTaskExtensions.ConnectAsync(Socket socket, String host, Int32 port)
   at StackExchange.Redis.SocketManager.BeginConnect(EndPoint endpoint, ISocketCallback callback, ConnectionMultiplexer multiplexer, TextWr
iter log)
   at StackExchange.Redis.PhysicalConnection.BeginConnect(TextWriter log)
   at StackExchange.Redis.PhysicalBridge.GetConnection(TextWriter log)
   at StackExchange.Redis.ServerEndPoint..ctor(ConnectionMultiplexer multiplexer, EndPoint endpoint, TextWriter log)
   at StackExchange.Redis.ConnectionMultiplexer.<ReconfigureAsync>d__124.MoveNext()
```

發生的原因跟解決辦法可以參考[[CoreCLR] Can't connect to Redis server by hostname. Only by IP](https://github.com/StackExchange/StackExchange.Redis/issues/410),但目前的最新ASP.NET的library依舊有這個問題，而StackExchange.Redis這邊也只能提供workaround跟送出RP給微軟做修補了．

## StringSet ##

```csharp
bool isSuccess = <IDatabase>.StringSet(key,value);
```

## StringGet ##

```csharp
bool value = <IDatabase>.StringGet(key);
```

## Recap All ##

實務上我們要盡可能地重複使用已建立的連線，避免開過多連線造成資源浪費效能下降，所以這邊我們用Singleton Pattern將整個程式碼與測試程式碼重新整理如下:

MemberRepository.cs:

```csharp
using System;
using System.Collections.Generic;

using StackExchange.Redis;

namespace App
{
    public class MemberRepository
    {
        private static readonly Lazy<MemberRepository> lazy = new Lazy<MemberRepository>(() => new MemberRepository());

        public static MemberRepository Instance { get { return lazy.Value; } }

        private ConnectionMultiplexer Redis {get;set;}

        private IDatabase DB {get;set;}

        private readonly string Domain;
        private readonly string Port;
        private readonly string Auth;

        private MemberRepository()
        {
            this.Domain = "54.158.21.26";//"redis-10968.c10.us-east-1-3.ec2.cloud.redislabs.com";
            this.Port = "10968";
            this.Auth = "hide";

            this.Redis = ConnectionMultiplexer.Connect(string.Format("{0}:{1},password={2}", this.Domain, this.Port, this.Auth));


        }

        private void GetDBInstance()
        {
            if(this.DB==null){
                this.DB = Redis.GetDatabase();
            }
        }

        public bool SetValue(string key, string value)
        {
            GetDBInstance();
            return this.DB.StringSet(key,value);
        }

        public string GetValue(string key)
        {
            GetDBInstance();
            return this.DB.StringGet(key);
        }
    }
}
```

UnitTest1.cs

```csharp
using System;
using System.Collections.Generic;
using Xunit;

namespace App.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test_SetValue()
        {
            var value = DateTime.Now.Millisecond.ToString(); 
            var key = string.Format("{0}_{1}", "blackie",value);

            var expected = true;
            bool actual;

            actual = MemberRepository.Instance.SetValue(key,value);
            Assert.Equal(expected,actual);

        }

        [Fact]
        public void Test_GetValue()
        {
            var key = "blackie";
        
            var expected = "35";
            string actual;

            actual = MemberRepository.Instance.GetValue(key);
            Assert.Equal(expected,actual);
        }
        
        [Fact]
        public void Test_SetValueAndGetValue()
        {
            var value = DateTime.Now.Millisecond.ToString(); 
            var key = string.Format("{0}_{1}", "blackie",value);
        
            var expectedOperationReturn = true;
            bool actualOperationReturn;

            actualOperationReturn = MemberRepository.Instance.SetValue(key,value);
            Assert.Equal(expectedOperationReturn,actualOperationReturn);

            var expectedGetValueReturn = value;
            string actualGetValueReturn;

            actualGetValueReturn = MemberRepository.Instance.GetValue(key);
            Assert.Equal(expectedGetValueReturn,actualGetValueReturn);
        }
    }
}
```

# References #

- [StackExchange.Redis - Configuration](https://stackexchange.github.io/StackExchange.Redis/Configuration)
- [StackExchange.Redis - Basic Usage](https://stackexchange.github.io/StackExchange.Redis/Basics)