---
layout: post
title: .NET Core with AWS DynamoDB DynamoDB type
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-04-15 21:12:55
categories:
- Cloud
tags:
- AWS
- .NET Core
- C#
- DynamoDB
---

分享 .NET 在操作 DynamoDB 時資料型別(Data Type)的限制與解法

<!-- More -->

![SDKSupport.DDBLowLevelAPI.png](SDKSupport.DDBLowLevelAPI.png)

一般透過 AWS 官方提供的 SDK 與 .NET Core 進行開發有三種方式可以取得與操作資料：

1. [DynamoDB Low-Level API](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html)
2. [.NET: Document Model](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DotNetSDKMidLevel.html)(https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DotNetSDKMidLevel.html)
3. [.NET: Object Persistence Model](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DotNetSDKHighLevel.html)

其中 *Object Persistence Model* 是相對較高階的操作。而在資料類型上，有支援的 primitive .NET data types 如下：

- bool
- byte
- char
- DateTime
- decimal
- double
- float
- Int16
- Int32
- Int64
- SByte
- string
- UInt16
- UInt32
- UInt64

重點對應上則要參考這邊：

| .NET primitive type  | DynamoDB type                                                                  |
|----------------------|--------------------------------------------------------------------------------|
| All number types     | N (number type)                                                                |
| All string types     | S (string type)                                                                |
| MemoryStream, byte[] | B (binary type)                                                                |
| bool                 | N (number type), 0 represents false and 1 represents true.                     |
| Collection types     | BS (binary set) type, SS (string set) type, and NS (number set) type           |
| DateTime             | S (string type). The DateTime values are stored as ISO-8601 formatted strings. |

從上面表格我們可以知道如果今天要用左側的類則需要多進行處理，例如 *Boolean* 就是一個很好的舉例。

在 DynamoDB 的介面上做新增可以發現有 *Boolean* ，使用上也跟一般的 JSON/BSON 相同：

![2.png](2.png)

![3.png](3.png)

## Object Persistence Model ##

但如果從使用 *Object Persistence Model* 搭配 C#/.NET 類別中直接宣告 bool 類型

```csharp
[DynamoDBTable("xxxxx")]
public class GameDTO {
    [DynamoDBHashKey(AttributeName = "gameId")]
        public string GameId { get; set; }

    [DynamoDBRangeKey (AttributeName = "title")]
    public string Title { get; set; }

    [DynamoDBProperty("onsale")]
    public bool OnSale {get;set;}
}

public static async Task RunDataModel(AmazonDynamoDBClient client, string tableName, JToken gameTokenData){
    var context = new DynamoDBContext(client);
    var gameDto = new GameDTO(){
        GameId = gameTokenData["gameId"].ToString(),
        Title = gameTokenData["title"].ToString(),
        OnSale = new DynamoDBBool((bool)gameTokenData["onsale"])
    };
    await context.SaveAsync<GameDTO>(gameDto);
}
```

當新增時則會看到下面的樣子：

![1.png](1.png)

## Document Model + DynamoDBBool ##

這邊則需要特別針對 bool 做處理的話則需使用 *Document Model* 搭配特殊的 *DynamoDBBool* 才能正確處理該資料型別：

```csharp
public static async Task RunDocumentModel(AmazonDynamoDBClient client, string tableName, JToken gameTokenData){
    var table = Table.LoadTable(client,tableName);
    
    var document = new Document();

    document["gameId"]=gameTokenData["gameId"].ToString();
    document["title"]=gameTokenData["title"].ToString();
    document["onsale"]= new DynamoDBBool((bool)gameTokenData["onsale"]);

    await　table.PutItemAsync(document);
}
```

更換後的程式執行至介面檢查後，可以發現問題就修正了：

![4.png](4.png)

![5.png](5.png)

所以針對.NET + AWS DynamoDB 開發時，如果對資料型別特別在意，那請使用 *Document Model* 搭配特殊的 *DynamoDBBool* 才能正確處理該資料型別

而資料新增後也別忘記至 *AWS Console* 再次確認資料類別符合預期！

## References ##
- [Higher-Level Programming Interfaces for DynamoDB - .NET: Object Persistence Model](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DotNetSDKHighLevel.html)
- [DynamoDB Series – Conversion Schemas](https://aws.amazon.com/blogs/developer/dynamodb-series-conversion-schemas/)