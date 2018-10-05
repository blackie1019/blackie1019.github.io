---
layout: post
title: Basic MariaDB/MySQL CRUD with .NET Standard
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-10-06 00:10:38
categories:
- .NET
tags:
- C#
- .NET Core
- .NET Standard
- MySQL
- MariaDB
---

介紹如何使用 *MySqlConnector* 讓 .NET Standard/.NET Core 可以對 MariaDB/MySQL 進行基本的操作．

<!-- More -->

最近開始學習一些非微軟且 Open Source的技術，在 RDBMS 的選項中選擇使用 [MariaDB](https://mariadb.com/)．今天就分享如何讓 .NET 也能基本的使用CRUD.

## About MariaDB ##

MariaDB 資料庫管理系統是MySQL的一個分支，主要由開源社群在維護，採用 **GPL** 授權授權。MariaDB 是由MySQL的創始人 Ulf Michael Widenius 主導開發並以他女兒的名字為該專案命名．

MariaDB 的特色是 MariaDB 的 API 和協定相容 MySQL，但又擴充了一些功能，以支援原生的非阻塞操作和進度報告。這也讓當前使用MySQL的連結器、程式庫和應用程式也將可以在 MariaDB 正常運作．

整個 MariaDB 的架構可以參考下圖：

![01.jpg](01.jpg)

更深入的介紹可以參考[MariaDB: in-depth (hands on training in Seoul)](https://www.slideshare.net/bytebot/mariadb-indepth-hands-on-training-in-seoul)

## How to operate Data via .NET with MariaDB ##

由上面簡單的介紹可以知道 MariaDB 基本上跟 MySQL 是相同但跟先進，且所有工具都能直接沿用的． 

所以這邊直接切入本篇重點使用 [MySqlConnector](https://github.com/mysql-net/MySqlConnector) 來協助 .NET 操作 MariaDB 的資料．

MySqlConnector 不是 MySQL 官方推出的套件，但號稱比官方效能更好且完美的支援常見的 ORM 框架如：Dapper, NReco.Data, Paradigm ORM, ServiceStack.OrmLite 與 SimpleStack.Orm 等。

而最棒的是他有實作非同步的介面讓開發更為方便。

### Host MariaDB on Docker ###

這邊的範例使用 Docker 來運行 MariaDB, 操作上只有兩步驟：

1. 拉取 MariaDB image

         docker pull mariadb

2. 運行一個 Instance 並設定密碼與 port 對外

        docker run -p 3306:3306 --name lab-mariadb -e MYSQL_ROOT_PASSWORD=pass.123 -d mariadb

### MariaDB CRUD via MySqlConnector ###

接著開一個 .NET Standard 專案後從 [nuget 加入 MySqlConnector](https://www.nuget.org/packages/MySqlConnector/)

    dotnet add package MySqlConnector

接著我們簡單地透過以下的樣式就可以建立第一個 Read 的操作：

```csharp
public class UserRepository : IUserRepository
{
    private static readonly Lazy<UserRepository> Lazy =
        new Lazy<UserRepository>(() => new UserRepository());

    public static UserRepository Instance
    {
        get { return Lazy.Value; }
    }
    private string _connStrinng;

    private UserRepository()
    {
        _connStrinng = "Server=localhost;User ID=root;Password=pass.123;Database=LabMariabDB";
    }
    

    public async Task<UserEntity> GetUserById(int id)
    {
        using (var conn = new MySqlConnection(_connStrinng))
        {
            await conn.OpenAsync();
            
            using (var cmd = new MySqlCommand())
            {
                cmd.Connection = conn;
                cmd.CommandText =
                    "SELECT Id, Name, BalanceAmount, DateCreated, DateUpdated FROM User WHERE Id = @Id";
                cmd.Parameters.AddWithValue("Id", id);

                var reader = await cmd.ExecuteReaderAsync();

                // Retrieve first rows
                await reader.ReadAsync();

                return new UserEntity()
                {
                    Id = reader.GetInt16(0),
                    Name = reader.GetString(1),
                    BalanceAmount = reader.GetDecimal(2),
                    DateCreated = reader.GetDateTime(3),
                    DateUpdated = reader.IsDBNull(4) ? (DateTime?) null : reader.GetDateTime(4),
                };
            }
        }
    }
}
```

從上面可以看到步驟依序為：
1. 設定一個連線字串，並提供主機 host 、連線帳號與密碼、預設連入的 DB 名稱
2. 透過連線字串建立一個 *MySqlConnection*
3. 透過 *conn.OpenAsync();* 以非同步的方式開啟連線
4. 接著建立 *MySqlCommand* 物件後放入下面屬性資料：
    1. 使用的連線實體(Connection)
    2. 執行的指令(CommandText)
    3. 避免 SQL Injection 的參數化傳值(Parameters)
5. 接著就是看操作指令的回傳類型決定是呼叫有回傳值的 *cmd.ExecuteReaderAsync()* 或是無回傳值的 *cmd.ExecuteNonQueryAsync()*
6. 如果是有回傳值的就是透過 reader.ReadAsync() 一筆筆讀出資料
7. 可透過不同型別的資料去給予回傳的欄位index 即可。而且欄位資料可以透過 *reader.IsDBNull* 確認當前回傳是否為 null 並進行 nullable 處理

以上就是一個基本的流程，所以同理補上新增的範例如下:

```csharp
public async Task CreateUser(UserDto inputObj)
{
    using (var conn = new MySqlConnection(_connStrinng))
    {
        await conn.OpenAsync();
        // Insert some data
        using (var cmd = new MySqlCommand())
        {
            cmd.Connection = conn;
            cmd.CommandText = "INSERT INTO User (Name) VALUES (@Name)";
            cmd.Parameters.AddWithValue("Name", inputObj.Name);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}

public async Task UpdateUser(UserDto inputObj)
{
    using (var conn = new MySqlConnection(_connStrinng))
    {
        await conn.OpenAsync();
        
        // Insert some data
        using (var cmd = new MySqlCommand())
        {
            cmd.Connection = conn;
            cmd.CommandText =
                "UPDATE User SET Name = @Name, BalanceAmount = @BalanceAmount, DateUpdated = NOW() WHERE Id = @Id";
            cmd.Parameters.AddWithValue("Name", inputObj.Name);
            cmd.Parameters.AddWithValue("BalanceAmount", inputObj.BalanceAmount);
            cmd.Parameters.AddWithValue("Id", inputObj.Id);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
public async Task DeleteUser(int id)
{
    using (var conn = new MySqlConnection(_connStrinng))
    {
        await conn.OpenAsync();
        
        // Insert some data
        using (var cmd = new MySqlCommand())
        {
            cmd.Connection = conn;
            cmd.CommandText =
                "DELETE FROM User WHERE Id = @Id";
            cmd.Parameters.AddWithValue("Id", id);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
```

這邊參考了官方的建議使用在每一個操作後就透過 conn 外面包裹的 using 架構，直接 Dispose 時關閉 DB 連線，避免有漏關的狀況發生。

而上面的程式碼寫法與相關注意事項可以參考以下三篇文章的說明:

- [Proper Etiquette for using MySQL in C# (Part of 1 of 3) – IDisposable](https://derekwill.com/2015/02/17/proper-etiquette-for-using-mysql-in-c-part-of-1-of-3/)
- [Proper Etiquette for using MySQL in C# (Part of 2 of 3) – Parameterized Queries](https://derekwill.com/2015/04/01/proper-etiquette-for-using-mysql-in-c-part-of-2-of-3/)
- [Proper Etiquette for using MySQL in C# (Part of 3 of 3) – DbDataReader](https://derekwill.com/2015/05/17/proper-etiquette-for-using-mysql-in-c-part-of-3-of-3-dbdatareader/)

而完整的範例與測試可以參考：[dotnet-mariadb-lab](https://github.com/blackie1019/dotnet-mariadb-lab)

## References ##

- [MySQL Tutorial](http://www.tutorialspoint.com/mysql/)
- [MySqlConnector - Documents](https://mysql-net.github.io/MySqlConnector/)