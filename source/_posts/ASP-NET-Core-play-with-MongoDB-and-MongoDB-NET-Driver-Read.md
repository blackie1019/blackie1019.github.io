---
layout: post
title: ASP.NET Core play with MongoDB and MongoDB .NET Driver - Read
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-11 01:35:10
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- MongoDB
- MongoDB .NET Driver
---

針對MongoDB的Read(Find)進行介紹並應用MongoDB .NET Driver實作資料查詢功能

<!-- More -->

# MongoDB Find #

![crud-annotated-mongodb-find](crud-annotated-mongodb-find.png)

在MongoDB中查詢指令主要是透過一個主體與三個參數組成：

- collection

    欲查詢的collection主體

- query criteria

    查詢物件的指定條件

- query projection

    查詢結果呈現的每筆所必須顯示之欄位

- cursor modifier

    給予查詢的資料筆數限制


# MongoDB .NET Driver Find Related Function #

當我們想要查詢全部資料可簡單的透過下面程式找出：

```csharp
public IList<Member> Get()
{
    return this.Collection.Find(new BsonDocument()).ToList();
}
```

而當我們需要找出指定單筆資料時則可透過指定的查詢找出第一筆符合的物件：

```csharp
public Member Get(string id)
{
    var filter = Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));

    return this.Collection.Find(filter).FirstOrDefault();
}
```

如果查詢的欄位為複雜的內容(單一屬性又為另一BSON格式的子集)，則可透過下面的方式查詢：

```csharp
public Member Get(string id)
{
    var filter = Builders<Member>.Filter.Eq("address.zipcode", "100");

    return this.Collection.Find(filter).FirstOrDefault();
}
```

## Query Behavior - Sorting ##

當我們要透過特定排序呈現回傳:

```csharp
public IList<Member> Get()
{
    var sort = Builders<Member>.Sort.Ascending("name").Ascending("balance")
    return this.Collection.Find(new BsonDocument()).Sort(sort).ToList();
}
```

# RMDB Script compare with MongoDB Script #

這邊找到網路上大大製作的一個ＭySQL與MongoDB查詢指令的對比圖：

![MongoDB-part3-MySQL-to-MongoDB-mapping](MongoDB-part3-MySQL-to-MongoDB-mapping.jpg)

# References #

- [Introduction To MongoDB NoSQL Database For SQL Developers – Part 3](http://bicortex.com/page/12/)
- [MONGODB MANUAL : Read Operations Overview](https://docs.mongodb.com/v3.0/core/read-operations-introduction/)
- [MONGODB MANUAL : Find or Query Data with C# Driver](https://docs.mongodb.com/getting-started/csharp/query/)