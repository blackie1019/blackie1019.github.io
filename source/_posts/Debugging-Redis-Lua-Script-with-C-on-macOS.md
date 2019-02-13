---
layout: post
title: 'Debugging Redis Lua Script with C# on macOS'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-01-13 14:20:07
categories:
- .NET
tags:
- Lua Script
- ZeroBrane Studio
- .NET
- .NET Core
- C#
- Redis
---

分享如何在 .NET Core 使用 C# 正確的使用 Redis Lua Script 開發與除錯流程。

<!-- More -->

先前[分享如何使用 ZeroBrane Studio 協助 Redis 的 Lua Script 開發與除錯](http://blackie1019.github.io/2018/05/01/Write-Redis-Lua-Script-with-ZeroBrane-Studio/)介紹如何正確地使用工具來幫我們除錯 Redis Lua Script.

本次結合 C#, .NET Core 與 macOS 環境，重新整理與介紹如何正確地使用 Redis Lua Script.

## 為什麼使用 Redis Lua Script ##

在大部分的開發者中，會使用 Redis 相關 framework 的人很普遍，但絕大多數僅使用這些 Framework 已包裹好的指令做操作，鮮少自己將商業邏輯包裹成一個 `Lua Script` 指令操作．

以 C# + .NET Core 為例，大多使用者都會使用下列的 framework 操作 Redis 內資料:

- [StackExchange](https://github.com/StackExchange/StackExchange.Redis)
- [ServiceStack](https://github.com/ServiceStack/ServiceStack.Redis)

如果今天要開發的一個資料儲存的情境如下:

- 確認當前 `test` 是否存在，如果不存在則在第一次呼叫的時候給予預設值 `0`
- 第二次開始的呼叫會針對 `test` 當前的值每次增加 `50`

以一般 Redis 的指令操作來說我們需要透過多個指令串接以上內容，這會造成 .NET Core 的程式多次進出 Redis Instance 內．

而透過 `Lua Script` 以上的指令可以僅透過一個客製的指令進行操作，大幅提升 Redis 效能與反應．

Redis的架構設計**單執行緒**的設計，在運行Lua script的時候是沒辦法處理其他的請求的，所以Lua script並不能像Database的Stored Procedure一樣運行複雜的商務邏輯，個人認為如果有以下情境可以考慮採用：

- 避免多次請求來回浪費掉的round-trip network latency
- 創造出 Redis 與 Redis Framework 沒有支援的command
- Atomic的資料操作 與 Transaction

## Redis Lua Script Development and Debugging on macOS ##

這邊開始介紹如何在 macOS 的環境開發 Redis Lua Script

大致上的內容請先參考[分享如何使用 ZeroBrane Studio 協助 Redis 的 Lua Script 開發與除錯](http://blackie1019.github.io/2018/05/01/Write-Redis-Lua-Script-with-ZeroBrane-Studio/)

### Redis with Docker ###

環境使用 Docker 進行 Redis Instance 的建置，指令如下：

    docker pull Redis
    docker run -P --name redis-lab -d redis

透過 `-P` 參數，這裡進行動態的 port 配置與對應至 container 內的 `6379` port

從 `docker ps -a` 可以查到當前配置的 port 為 32768

![01.png](01.png)

透過以下指令與 `redis-cli` 取得當前的所有鍵值

    docker exec -it <container-id> bash
    redis-cli
    KEYS *

![02.png](02.png)

### Install ZeroBrane Studio ###

至官網下載[ZeroBrane Studio](https://studio.zerobrane.com/download?not-this-time) 與 [ZeroBranePackage/redis.lua](https://raw.githubusercontent.com/pkulchenko/ZeroBranePackage/master/redis.lua) 這個 plugin

安裝好後可配置使用者設定，載入剛下載的 plugin 至 ZeroBrane Studio 中：

    mkdir $HOME/.zbstudio
    mkdir $HOME/.zbstudio/packages

接者將下載的 `redis.lua` plugin 檔案放入剛剛建立的目錄下($HOME/.zbstudio/packages)

接著將程序打開後可以看到下圖及代表設定成功:

![03.png](03.png)

而開發時不要忘記要開啟 `watch window` 與 `stack window` 協助觀察變數的變化

![04.png](04.png)

### Try round for ZeroBrane Studio debugging ###

這邊開啟應用程式後選擇 `redis` 則會跳出連線設定視窗，如果要重設則需要重新啟動 ZeroBrane Studio 才可以變更．

![05.png](05.png)

而如果開發的 `Lua Script` 本身有帶入參數的需求可以使用 `Command Line Parameters` 的設定帶入(多個參數可用*空白*分隔)

![06.png](06.png)

如需求所列，這邊我們建立的 Lua Script 如下:

test.lua
```lua
local targetKey = KEYS[1] -- target key for redis
local initValue =  tonumber(ARGV[1]) -- initial value for target key if not exist and need to create
local incrementValue =  tonumber(ARGV[2]) -- increment value for target key when exist and calling for each time

local currentValue =  initValue

-- create key with 0 if key is not exist
local isNewKey = redis.call('SETNX',targetKey,currentValue)

-- add current value if key is exist
if isNewKey == initValue then

  currentValue = redis.call('GET',targetKey)

  if currentValue then

    currentValue = currentValue + incrementValue

  end

  redis.call('SET',targetKey, currentValue)

end

-- return key value
return currentValue
```

這邊就需要傳入三個參數，所以設定上則變成:

![07.png](07.png)

test 為 *Key*，透過中間的`逗號`分隔了後面兩個 *Arg* ，分別為 0 與 10

而介面上簡單介紹如下(詳細介紹可參考[如何使用 ZeroBrane Studio 協助 Redis 的 Lua Script 開發與除錯](http://blackie1019.github.io/2018/05/01/Write-Redis-Lua-Script-with-ZeroBrane-Studio/))：

![08.png](08.png)

## .NET Core with Redis Lua Script ##

這邊最後給一段 Sample Code 說明如何透過預先載入的方式避免執行重複的 Redis Lua Script 所造成的內存耗盡問題．

其實 *Redis* 本身就有這個做法，可透過 [SCRIPT LOAD](https://redis.io/commands/script-load) 產生一組 SHA 的編碼後，透過 SHA 與 [EVALSHA](https://redis.io/commands/evalsha) 來執行．

所以這邊的 C# 與上面已經寫好的 test.lua 的呼叫如下：

program.cs

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using StackExchange.Redis;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            var redisHost = "localhost:32768";
            
            Console.WriteLine("App Start...");
            
            using (var conn = ConnectionMultiplexer.Connect(redisHost))
            {
                var db = conn.GetDatabase();
                Console.WriteLine($"Current Value:{db.StringGet("test").ToString()}");
                
                var loadedLuaScripts = new Dictionary<LuaScriptEnum, LoadedLuaScript>();
                loadedLuaScripts.Add(LuaScriptEnum.AddValueWithTargetKey, PrepareLuaScript(conn, redisHost,
                    @"local targetKey = KEYS[1] -- target key for redis
local initValue =  tonumber(ARGV[1]) -- initial value for target key if not exist and need to create
local incrementValue =  tonumber(ARGV[2]) -- increment value for target key when exist and calling for each time

local currentValue =  initValue 

-- create key with 0 if key is not exist 
local isNewKey = redis.call('SETNX',targetKey,currentValue)

-- add current value if key is exist
if isNewKey == initValue then 

  currentValue = redis.call('GET',targetKey)

  if currentValue then

    currentValue = currentValue + incrementValue

  end

  redis.call('SET',targetKey, currentValue)

end 

-- return key value
return currentValue"));

                var executedReturn = db.ScriptEvaluate(loadedLuaScripts[LuaScriptEnum.AddValueWithTargetKey].Hash,
                    new RedisKey[] {"test"},
                    new RedisValue[] {0, 50});
                Console.WriteLine(executedReturn);
            }
        }
        
        private static LoadedLuaScript PrepareLuaScript(ConnectionMultiplexer redis, string defaultServer, string luaScriptContent)
        {
            return LuaScript
                .Prepare(luaScriptContent)
                .Load(redis.GetServer(defaultServer));
        }
    }

    public enum LuaScriptEnum
    {
        AddValueWithTargetKey
    }
}
```

執行結果如下：

![10.png](10.png)

這段程式碼還有呼叫了`Load()`，這會把Lua script先載入指定的Redis server

一般指定 *Master* 就可以了，會自動鏡像備份到*Slave*。

載入後會拿到一個SHA1的 *hash code*，之後執行時只需傳入這個code，不需重傳整份Lua script，對需要頻繁執行的script有效能上的幫助。