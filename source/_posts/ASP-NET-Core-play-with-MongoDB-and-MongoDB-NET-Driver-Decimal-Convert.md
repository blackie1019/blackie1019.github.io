---
layout: post
title: ASP.NET Core play with MongoDB and MongoDB .NET Driver - Decimal Convert
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-13 00:01:04
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- MongoDB
- MongoDB .NET Driver
---

紀錄如何使用MongoDB .NET Driver處理 Decimal 值

<!-- More -->

# MongoDB .NET Driver Handle Decimal #

在資料型別轉換的部分可使用BsonRepresentation這個修飾attribute幫我們做轉換，但由於Mongo 3.4之前尚未支援BsonDecimal128，所以僅能使用BsonType.Double

測試程式碼：

![mongo_net_driver_decimal](mongo_net_driver_decimal.png)

Member.cs：

```csharp
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoCRUD.Core.Pocos
{
    public class Member
    {
        public ObjectId Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }

        // MogoDB 3.4, Support BsonDecimal128, Decimal (28-29)
        [BsonElement("balance"),BsonRepresentation(BsonType.Decimal128)]

        // Below than 3.4, only convert to Double (15-16)
        //[BsonElement("balance"), BsonRepresentation(BsonType.Double)]
        public decimal Balance { get; set; }
    }
}
```

測試程式結果(依序為:BsonRepresentation為BsonType.Double,不設定BsonRepresentation,BsonRepresentation為BsonType.Decimal128):

![mongo_decimal](mongo_decimal.png)

這邊我們其實是將Decimal的值傳入0.123456789876543212345678987654321M，但從結果來看他會將超出的部分進位後截斷

蛋如果是我們指定BsonRepresentation為BsonType.Double且資料長度超出轉換長度則會拋出例外(exception)．

另外，[先前介紹跨平台的MongoDB UI Admin 工具 - Robomongo](https://blackie1019.github.io/2017/03/30/Robomongo-Native-and-cross-platform-MongoDB-manager/)則在顯示decimal資料上有問題，會出現unsupported的狀況．

![robomongo_unsupported](robomongo_unsupported.png)

# References #

- [MONGODB MANUAL : Model Monetary Data](https://docs.mongodb.com/manual/tutorial/model-monetary-data/#numeric-decimal)
- [Introduction to MongoDb with .NET part 15: object serialisation continued](https://dotnetcodr.com/2016/04/25/introduction-to-mongodb-with-net-part-15-object-serialisation-continued/)