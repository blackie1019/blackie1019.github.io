---
layout: post
title: Basic MariaDB/MySQL Stored Procedure with .NET Standard
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-10-08 14:27:04
categories:
- .NET
tags:
- C#
- .NET Core
- .NET Standard
- MySQL
- MariaDB
---

介紹如何使用 *MySqlConnector* 讓 .NET Standard/.NET Core 可以對 MariaDB/MySQL 進行基本的 Stored Procedure 操作．

<!-- More -->

延續前一篇的[Basic MariaDB/MySQL CRUD with .NET Standard](http://blackie1019.github.io/2018/10/05/Basic-MariaDB-MySQL-CRUD-with-NET-Standard/)

關聯式資料庫依定會遇到 *Stored Procedure* 的使用，一個 SP 的組成為下：

![00.png](00.png)


而在 MySQL/MariaDB 把 *Stored Procedures* 與 *Stored Functions* 合稱為 *Stored Routines*：

- Stored Procedures

    官方解釋為: 
    `Stored Procedures Routine invoked with a CALL statement.
    
    是一個可預先宣告的 SQL 語句，可透過 *CALL* 來呼叫．所以 *Stored Procedures* 可單獨做使用。

- Stored Functions

    官方解釋為: 
    `Stored Functions Defined Functions for use with SQL Statements.

    是一個預先定義好的函示，可在任一段 SQL 語句中呼叫使用．所以 *Stored Functions* 必須依賴在有 *Stored Procedures* 的情境下做使用(非硬規定)

國外知名論壇也有討論兩者的差異與整理如下：

![01.jpg](01.jpg)

而如果要撰寫一個 SP 包含資料回傳的話有 output 與 return value 兩種寫法

## 基本 SP 撰寫 - 使用 output ##

這邊如果要定義一個 SP 的可以透過下面的範例格式在資料庫實體執行:

```sql
DELIMITER //

CREATE PROCEDURE QUERY_USERS_COUNT (OUT param1 INT)
    BEGIN
        SELECT COUNT(*) INTO param1 FROM User;
    END
//

DELIMITER ;
```

以上寫法的第一行 *DELIMITER //* 主要是將換行字元從預設的 **;** 換為 **//** 避免在建立 SP 產生錯誤，詳細內容可以參考[只談MySQL (第16天) Stored Procedure及Function](https://ithelp.ithome.com.tw/articles/10032363)。而最後一行同理就是將其換行字元換為原先的 **;**

而上述語法可以看到我們用 *OUT* 當作外部宣告的參數傳入後在運行完整個查詢後將總數填入此  *param1* 內，所以今天我們在 MariaDB/MySQL 的 console 或是工具呼叫取用時反而要用下方語法：

    CALL QUERY_USERS_COUNT(@a);SELECT @a;

這邊以 Jetbrains 的跨平台資料庫 IDE - [datagrip](https://www.jetbrains.com/datagrip/) 為例做操作：

![02.jpg](02.jpg)

而對應的 C# 程式碼為:

```csharp
public async Task<int> GetUserCountBySPWithOutputValue()
{
    using (var conn = new MySqlConnection(_connStrinng))
    {
        await conn.OpenAsync();
        // Calling SP with output
        using (var cmd = new MySqlCommand())
        {
            var parameter = new MySqlParameter("@param1",MySqlDbType.Int32);
            parameter.Direction = ParameterDirection.Output;
            
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "QUERY_USERS_COUNT";
            cmd.Parameters.Add(parameter);
            
            await cmd.ExecuteNonQueryAsync();

            return Convert.ToInt32(parameter.Value);
        }
    }
}
```

## 基本 SP 撰寫 - 使用 return value ##

而如果將上述語法改為 *return value* 則為:

```sql
DELIMITER //

CREATE PROCEDURE LabMariabDB.QUERY_USERS_COUNT_WITH_RETURNVALUE()
    BEGIN
        SELECT COUNT(*) AS "Count" FROM User;
    END
//

DELIMITER ;
```

而這邊呼叫也相對簡單一點：

    CALL QUERY_USERS_COUNT_WITH_RETURNVALUE();

而對應的 C# 程式碼為:

```csharp
public async Task<int> GetUserCountBySPWithReturnValue()
{
    using (var conn = new MySqlConnection(_connStrinng))
    {
        await conn.OpenAsync();
        // Calling SP with return value
        using (var cmd = new MySqlCommand())
        {
            
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "QUERY_USERS_COUNT_WITH_RETURNVALUE";
            
            var reader = await cmd.ExecuteReaderAsync();
            await reader.ReadAsync();
            return reader.GetInt32(0);
        }
    }
}
```

而完整的範例與測試可以參考：[dotnet-mariadb-lab](https://github.com/blackie1019/dotnet-mariadb-lab)

## References ##
- [Learn about Stored Procedures](https://www.essentialsql.com/what-is-a-stored-procedure/)
- [Stored Procedure Overview](https://mariadb.com/kb/en/stored-procedure-overview/)
- [Stored Function Overview](https://mariadb.com/kb/en/library/stored-function-overview/)