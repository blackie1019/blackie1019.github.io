---
layout: post
title: MariaDB/MySQL Transaction with .NET Standard
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-11-07 22:47:41
categories:
- .NET
tags:
- C#
- .NET Core
- .NET Standard
- MySQL
- MariaDB
- Transaction
---

介紹如何使用 MySqlConnector 讓 .NET Standard/.NET Core 可以對 MariaDB/MySQL 進行 Transaction 與 TransactionScope 操作．

<!-- More -->

程式碼實作參考[dotnet-mariadb-lab](https://github.com/blackie1019/dotnet-mariadb-lab) 內的:

-  dotnet-mariadb-lab/db-scripts/Lab/Transaction/
-  dotnet-mariadb-lab/Mariadb.Labs/Mariadb.Lab.Test/TransactionRepositoryTest.cs

## Something about DB Transaction ##

資料庫的交易(Transaction)功能，能確保多個 SQL 指令，能夠一起全部執行成功，或是全部不執行，而不會因為一些意外狀況，而只執行部份指令，造成資料異常。

交易功能4個特性 (ACID)

- Atomicity (原子性、不可分割)
  All or Nothing!
  交易內的 SQL 指令，不管在任何情況，都只能是全部執行完成，或全部不執行。若是發生無法全部執行完成的狀況，則會回滾(rollback)到完全沒執行時的狀態。
- Consistency (一致性)
  交易完成後，必須維持資料的完整性。所有資料必須符合預設的驗證規則、外鍵限制...等。
- Isolation (隔離性)
  多個交易可以獨立、同時執行，不會互相干擾。這一點跟後面會提到的「隔離層級」有關。
- Durability (持久性)
  交易完成後，異動結果須完整的保留。

MySQL 常用的兩個資料表類型：MyISAM、InnoDB，MyISAM **不支援交易功能**，所以以下使用交易時也是需要使用*InnoDB*。

詳細的內容可以參考[MySQL 交易功能 Transaction 整理](https://xyz.cinc.biz/2013/05/mysql-transaction.html)這篇詳細的整理

## MariaDB/MySQL 的交易機制 ##

InnoDB 支援全部四種 Isolation Level ，使用者可以用 SET TRANSACTION 語法切換。

InnoDB 預設的 Isolation Level 是 REPEATABLE READ ，而 REPEATABLE READ 的問題就是有可能 Phantom Read

以 MySQL 8.0 Isolation Level 有以下等級分類:

- REPEATABLE READ
  預設的層級，確保每次讀取都可以讀到同樣的資料
- READ COMMITTED
  比 REPEATABLE READ 更為嚴謹的層級，讀取時只會取得已經 commit 的資料
- READ UNCOMMITTED
  比 REPEATABLE READ 更寬鬆的層級，讀取時可以讀出尚未被 commit 的資料
- SERIALIZABLE
  最為嚴謹的層級，可以確保資料的依序的寫入與讀取，但效能的耗損最大

![Isolation_Level.png](Isolation_Level.png)

這邊如果要了解Isolation分級可以參考：[資料庫交易的 Isolation](https://medium.com/getamis/database-transaction-isolation-a1e448a7736e)

## Transaction 與 TransactionScope ##

MySQL 與 MariaDB 中的 Transaction 與 TransactionScope 雖然都可以達到交易鎖定與一至性交付的目的，但使用地情境卻大不相同．

針對同一個資料庫實體進行交易鎖定時，多半會使用 *Transaction* 的方式建立單一資料庫連線進行設定．應該所有的 db driver 都有支援．

而針對跨多種資料庫類型或是多個不同連線的情境則會使用 *TransactionScope* 的方式來幫我們確認分散式交易(distributed transaction)能確實在多個實體內如期按照規劃運行．這邊除了要確認使用的db driver 支援外，也要確認環境設定等配製是正確的，如 MSSQL 就是使用 MSTDC 進行控制．

這邊如果要在 DB 直接進行 SQL 的指令運行 Transaction 如下：

```sql
BEGIN;
  call Test.AddNewUser('Beck3');
  call Test.GetNewUser();
rollback ;
```

結果可以看到上方的查詢有顯示最後新增的資料，但真實進去資料表內查詢則維持原樣，表示交易成功回朔：

![rollback.png](rollback.png)

接下來的交易實作的範例都已 ADO.NET 為例：

### Transaction 實戰 ###

預設的情況， MySqlConnector 需要設定每一個Transaction 內的 MySqlCommand.Transaction 的內容，透過同一個 DB 連線與設定的 Transaction 一至性來達到交易的確認或是回朔．

這篇 [Transaction Usage](https://mysql-net.github.io/MySqlConnector/troubleshooting/transaction-usage/) 就提到可以在 *Connection* 字串後面補上 **IgnoreCommandTransaction=true** 來確保不會發生錯誤．

官方範例如下：
```csharp
using (var connection = new MySqlConnection(...))
{
    connection.Open();
    using (var transaction = connection.BeginTransaction())
    using (var command = connection.CreateCommand())
    {
        command.CommandText = "SELECT ...";

        // *** ADD THIS LINE ***
        command.Transaction = transaction;

        // otherwise, this will throw System.InvalidOperationException: The transaction associated with this command is not the connection's active transaction.
        command.ExecuteScalar();
    }
}
```

實務上，複雜的資料查詢或是資料的新刪修因為牽扯到交易鎖定，大多會在 *預存程序(stored procedure)* 內做掉，而當我們今天有一個測試的需求如下：

- 透過 stored procedure 新增一筆資料
- 透過 stored procedure 讀出當前最新新增的一筆資料並確認此為上一步新增的資料
- 透過 transaction.Rollback 的方式，確認該筆交易尚未 commit 進入 DB 內儲存

```csharp
// Arrange
var userName = $"CT_{DateTime.Now:yyyyMMddHHmmss}";
string result;
string currentUserName;

// Act
using (var conn =
    new MySqlConnection(
        "Server=localhost;User ID=root;Password=pass.123;Database=Test;IgnoreCommandTransaction=true;"))
{
    await conn.OpenAsync();
    using (var transaction = conn.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
    {
        // Start a local transaction.
        await UserSpRepository.Instance.AddNewUser(userName, conn,transaction);
        result = await UserSpRepository.Instance.GetNewUser(conn,transaction);
        transaction.Rollback();
    }
}

currentUserName = UserSpRepository.Instance.GetNewUser().Result;

// Assert
Assert.AreEqual(userName,result);
Assert.AreNotEqual(currentUserName,result);
```

上面是一個交易的實際寫法，而程式碼內可以發現我們呼叫 *AddNewUser* 與 *GetNewUser* 這兩個方法，同在新增資料與取得資料內進行邏輯驗證．最後透過 transaction.Rollback() 的方式回逤資料．

這邊要注意的是由於需求會讀到未確認的交易資料，所以必須設定隔離層級為 *IsolationLevel.ReadUncommitted*．

```csharp
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Mariadb.Lab.DataAccessLayer
{
    public class UserSpRepository
    {
        private static readonly Lazy<UserSpRepository> Lazy =
            new Lazy<UserSpRepository>(() => new UserSpRepository());

        public static UserSpRepository Instance
        {
            get { return Lazy.Value; }
        }

        private string _connStrinng;

        private UserSpRepository()
        {
            _connStrinng = "Server=localhost;User ID=root;Password=pass.123;Database=Test;";
        }

        public async Task AddNewUser(string name, MySqlConnection sharedConnection = null, MySqlTransaction sharedTransaction =null)
        {
            async Task ExecuteSp(MySqlConnection conn)
            {
                // Calling SP with return value
                using (var cmd = conn.CreateCommand())
                {

                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "AddNewUser";
                    cmd.Parameters.AddWithValue("userName", name);
                    if (sharedTransaction != null)
                    {
                        cmd.Transaction = sharedTransaction;
                    }
                    await cmd.ExecuteNonQueryAsync();
                }
            }

            
            if (sharedConnection == null)
            {
                using (var conn = new MySqlConnection(_connStrinng))
                {
                    await conn.OpenAsync();
                    await ExecuteSp(conn);
                }
            }
            else
            {

                await ExecuteSp(sharedConnection);
            }
        }

        public async Task<string> GetNewUser(MySqlConnection sharedConnection = null, MySqlTransaction sharedTransaction =null)
        {
            async Task<string> ExecuteSp(MySqlConnection conn)
            {
                // Calling SP with return value
                using (var cmd = conn.CreateCommand())
                {

                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "GetNewUser";
                    if (sharedTransaction != null)
                    {
                        cmd.Transaction = sharedTransaction;
                        
                    }

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        await reader.ReadAsync();
                        return reader.GetString(1);
                    }
                }
            }

            if (sharedConnection == null)
            {
                using (var conn = new MySqlConnection(_connStrinng))
                {
                    await conn.OpenAsync();
                    return await ExecuteSp(conn);
                }
            }

            return await ExecuteSp(sharedConnection);
        }
        
    }
}
```

從上面的程式碼可以發現裡面使用了 C#7.0 的[local function](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions) 來讓我們的程式碼可以盡量重複使用同一段邏輯．並搭配 [optional paramater](https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/classes-and-structs/named-and-optional-arguments) 我們可以盡可能讓測試程式碼與真實運行的測試碼走過一樣的邏輯確保測試的正確性．

這邊需要注意如果是 *ExecuteReaderAsync()* 將 [DataReader](https://docs.microsoft.com/zh-tw/dotnet/framework/data/adonet/retrieving-data-using-a-datareader) 資料讀出，一定要記得 dispose 或是透過範例的方式正確的透過 using 的預設呼叫 dispose 來避免程式運行時發生 *System.InvalidOperationException : This MySqlConnection is already in use* 這類的問題！

![datareader.png](datareader.png)

### TransactionScope 實戰 ###

MySQLConnector 在安裝與設定的指引那邊 [Migrating from Connector/NET](https://mysql-net.github.io/MySqlConnector/tutorials/migrating-from-connector-net/)有提到
目前的更新版本已經全面支援 *distributed transaction* ， 這一舉解決了在 2017 以前官方 client([MySQL Connector/NET](https://github.com/mysql/mysql-connector-net)) 長久存在的問題．

實務上，TransactionScope 的應用範圍會再異質資料庫牽扯到一筆交易需要多個 Connection 的交易範圍鎖定，測試的需求如下：

- 透過 stored procedure 新增一筆*User*資料
- 透過 stored procedure 新增一筆*Product*資料
- 透過 transaction.Rollback 的方式，確認兩筆交易皆尚未 commit 進入 DB 內儲存

```csharp
// Arrange
var postfix = DateTime.Now.ToString("yyyyMMddHHmmss");
var userName = $"CT_{postfix}";
var productName = $"Product_{postfix}";
string resultUserName;

var transactionOption = new TransactionOptions();
transactionOption.IsolationLevel = IsolationLevel.ReadUncommitted;

// Act
using (var transactionScope = new TransactionScope(TransactionScopeOption.Required, transactionOption,
    TransactionScopeAsyncFlowOption.Enabled))
{
    await UserSpRepository.Instance.AddNewUser(userName);
    await ProductSpRepository.Instance.AddNewProduct(productName);
    transactionScope.Dispose();
}
resultUserName = UserSpRepository.Instance.GetNewUser().Result;

// Assert
Assert.AreNotEqual(userName,resultUserName);
```

這邊可以看到使用上必須設定 *TransactionScopeAsyncFlowOption.Enabled* 確保兩個不同 thread 的交易可以被鎖定．另外也需要注意 IsolationLevel.ReadUncommitted 這個設定是否合乎真實的使用情況(一般來說不會使用當前的設定，會在嚴格一點)

而呼叫資料庫的方式則大同小異：

```csharp
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Mariadb.Lab.DataAccessLayer
{
    public class ProductSpRepository
    {
        private static readonly Lazy<ProductSpRepository> Lazy =
            new Lazy<ProductSpRepository>(() => new ProductSpRepository());

        public static ProductSpRepository Instance
        {
            get { return Lazy.Value; }
        }

        private string _connStrinng;

        private ProductSpRepository()
        {
            _connStrinng = "Server=localhost;User ID=root;Password=pass.123;Database=Test;";
        }

        public async Task AddNewProduct(string name, MySqlConnection sharedConnection = null, MySqlTransaction sharedTransaction =null)
        {
            async Task ExecuteSp(MySqlConnection conn)
            {
                // Calling SP with return value
                using (var cmd = conn.CreateCommand())
                {

                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "AddNewProduct";
                    cmd.Parameters.AddWithValue("productName", name);
                    if (sharedTransaction != null)
                    {
                        cmd.Transaction = sharedTransaction;
                    }
                    await cmd.ExecuteNonQueryAsync();
                }
            }

            
            if (sharedConnection == null)
            {
                using (var conn = new MySqlConnection(_connStrinng))
                {
                    await conn.OpenAsync();
                    await ExecuteSp(conn);
                }
            }
            else
            {

                await ExecuteSp(sharedConnection);
            }
        }
    }
}
```

這邊需要稍微注意 AutoEnlint 這個屬性預設在 *Connection* 內如果不特定指定則為*true*．當設定為true時則會將當前打開連線的交易設為同一個 transaction scope．所以如果要使用 *TransactionScope* 千萬不要在 *Connection* 手動補上 **AutoEnlint=false** 這樣的設定．

而不管用 Transaction 或是 TransactionScope 都要注意關閉相關資源避免 Lock 發生，讓後續相關查詢與異動失敗：

![lock.png](lock.png)