---
layout: post
title: ASP.NET Core play with MongoDB and MongoDB .NET Driver - Create and Delete
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-08 17:34:38
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- MongoDB
- MongoDB .NET Driver
---

針對MongoDB的Create(Insert)與Delete(Remove)進行介紹並應用MongoDB .NET Driver實作

<!-- More -->

關於專案環境請先下面兩篇文章

- [ASP.NET Core play with MongoDB and MongoDB .NET Driver](https://blackie1019.github.io/2017/03/31/ASP-NET-Core-play-with-MongoDB-and-MongoDB-NET-Driver/)
- [ASP.NET Core play with MSTest](https://blackie1019.github.io/2017/04/05/ASP-NET-Core-play-with-MSTest/)

# MongoDB Data Model Overview #

首先先看一下MongoDB的資料架構

![mongo_data](mongo_data.png)

## Database ##

MongoDB中的每一個 databases 可以保存多個 collections. 而我們也可以指派設定相同或不同的user給予database存取的權限作為管理．

## Collection and Documents ##

MongoDB 將每一個資料記錄透過 [BSON](https://docs.mongodb.com/manual/core/document/#bson-document-format) 的格式做文件(document)儲存在指定的collection中

## Compare with RMDB ##

這邊我們對比一下關連式資料庫的觀念：

![RMDB_MongoDB](RMDB_MongoDB.jpg)

# MongoDB Write Operation Overview #

在MongoDB中, 針對單一文件(single document)的寫入操作(write operation) 是處於基元((atomic)的狀態．
而atomic可以視為一種保護機制，基本上來講，是防止在寫未完成的時候被另外一個程序(thread)讀取而造成數據錯誤。

寫入操作(write operation)包含:

- 新增(Insert)
- 修改(Update)
- 刪除(Remove)

# MongoDB Insert #

![crud-annotated-mongodb-insert](crud-annotated-mongodb-insert.png)

MongoDB的[ db.collection.insert() ](https://docs.mongodb.com/v3.0/reference/method/db.collection.insert/#db.collection.insert)那幫我們在指定collection中新增一份document．

新增資料到MongoDB中，每筆record都會自動產生一個_id的參數(文字格式)，這是系統產生的唯一值，是在做查詢與交易時最佳的遍尋值．而這個在MongoDB .NET Driver當中是特別指定欄位為ObjectId這個class．

## MongoDB .NET Driver Create(Insert) Related Function ##

### Basic Insert ###

```csharp
public void Insert(Member dataObject)
{
    this.Collection.InsertOne(dataObject);
}
```

# MongoDB Remove #

![crud-annotated-mongodb-remove](crud-annotated-mongodb-remove.png)

這邊稍微注意一下，由於MongoDB針對Update與Delete提供一樣的條件參數(criteria或 conditions)與表態式(syntax)，如果有不懂的需要確認可以參考[read operations](https://docs.mongodb.com/v3.0/core/read-operations/)

而預設MongoDB的[ db.collection.remove() ](https://docs.mongodb.com/v3.0/reference/method/db.collection.remove/#db.collection.remove)行為則是移除所有符合條件的資料紀錄．

## MongoDB .NET Driver Delete(Remove) Related Function ##

```csharp
public DeleteResult Delete(string id)
{
    var filter = this.GenerateFilterInput(id);
    var result = this.Collection.DeleteOne(filter);

    return result;
}

private FilterDefinition<Member> GenerateFilterInput(string id)
{
    return Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));
}
```

# [補充] Member.CS #

因為之後的新增, 查詢, 更新與刪除都會帶到這個class所以這邊在特別拿出來看一下

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
        [BsonElement("balance")]
        public decimal Balance { get; set; }
    }
}
```

# References #

- [Using MongoDB .NET Driver with .NET Core WebAPI](http://www.qappdesign.com/using-mongodb-with-net-core-webapi/)
- [Introduction to MongoDB - CodeProject](https://www.google.com.tw/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjcqJfp7JfTAhUJGJQKHdbYBb8QjhwIBQ&url=https%3A%2F%2Fwww.codeproject.com%2FArticles%2F1037052%2FIntroduction-to-MongoDB&psig=AFQjCNFjUm5qx4lQ0eya3w1jDO6PPmWgHA&ust=1491843046801296)
- [Webinar: Back to Basics: Thinking in Documents](https://www.slideshare.net/mongodb/webinar-back-to-basics-thinking-in-documents)
- [MONGODB MANUAL : Databases and Collections](https://docs.mongodb.com/manual/core/databases-and-collections/)
- [MONGODB MANUAL : Write Operations Overview](https://docs.mongodb.com/v3.0/core/write-operations-introduction/)