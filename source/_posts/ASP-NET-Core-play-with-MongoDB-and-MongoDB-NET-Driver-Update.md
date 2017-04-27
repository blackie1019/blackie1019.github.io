---
layout: post
title: ASP.NET Core play with MongoDB and MongoDB .NET Driver - Update
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-10 17:35:24
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- MongoDB
- MongoDB .NET Driver
---

紀錄與整理MongoDB .NET Driver相關資料Update相關函式的差異與各別使用時機

<!-- More -->

先前一篇[ASP.NET Core play with MongoDB and MongoDB .NET Driver - Create and Delete](https://blackie1019.github.io/2017/04/08/ASP-NET-Core-play-with-MongoDB-and-MongoDB-NET-Driver-Create-Delete/) 分享了如何做資料的新增與刪除，此篇文章我們來看一下如何做資料的更新

# MongoDB Update #

![crud-annotated-mongodb-update](crud-annotated-mongodb-update.png)

在MongoDB中更新指令主要是透過一個主體與三個參數組成：

- collection

    欲更新的collection主體

- update criteria

    更新物件的指定條件

- update action

    實際執行更新時所做的欄位替換

- option

    執行更新交易時的相關選項

這邊稍微注意一下預設的更新都是針對單一文件(single document)，如果需要針對多個文件做更新則需在option中設定為multi，即可透過criteria將符合條件的文件一併做更新．

# MongoDB .NET Driver Upldate Related Function #

而在MongoDB .NET Driver則將更新動作細分三種，又根據Sync與Async交易處理上的差別分為不同的Method:

## UpdateOne/UpdateOneAsync, UpdateMany/UpdateManyAsync ##

使用時機為更新指定物件/符合條件的物件群，且不需回傳該物件．此類型method的回傳為UpdateResult只會告訴你符合criteria的物件筆數與更新的物件筆數．這裡查詢的criteria可以為任何一個欄位，不限定_id．

```csharp
public UpdateResult Update(Member dataObject)
{
    var filter = Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));
    var update = Builders<Member>.Update.Set(s => s.Balance, dataObject.Balance);

    return this.Collection.UpdateOne(filter, update);
}
```

### Update with upsert option ###

MongoDB在呼叫Update時有一個特殊的參數upsert，透過這個參數如果該物更新物件已存在在資料庫時則做更新的動作，但如果尚未存在指定查詢的物件時則執行新增動作：

```csharp
public UpdateResult Update(Member dataObject)
{
    var filter = Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));
    var update = Builders<Member>.Update.Set(s => s.Balance, dataObject.Balance);
    var option = new UpdateOptions(){
        IsUpsert = true
    };

    return this.Collection.UpdateOne(filter, update,option);
}
```

## ReplaceOne/ReplaceOneAsync ##

相對於UpdateOne/UpdateOneAsync, UpdateMany/UpdateManyAsync 更新的action可以任意指定，ReplaceOne/ReplaceOneAsync則會將符合條件的物件內容直接用新值取代：

```csharp
public ReplaceOneResult Update(Member dataObject)
{
    var filter = Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));

    return this.Collection.ReplaceOne(input.Item1, dataObject);
}
```

## FindOneAndUpdate/FindOneAndUpdateAsync ##

而當我們實務上會需要在更新前/後將符合更新條件的交易物件內容回傳時，則需使用FindOneAndUpdate/FindOneAndUpdateAsync：

```csharp
public Member Update(Member dataObject)
{
    var filter = Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));
    var update = Builders<Member>.Update.Set(s => s.Balance, dataObject.Balance);

    return this.Collection.FindOneAndUpdate(input.Item1, update);
}
```

預設回傳更新前的物件內容，如果需要回傳更新後的內容則需設定option，將ReturnDocument 設為 ReturnDocument.After(預設為Before):

```csharp
public Member Update(Member dataObject)
{
    var filter = Builders<Member>.Filter.Eq("_id", ObjectId.Parse(id));
    var update = Builders<Member>.Update.Set(s => s.Balance, dataObject.Balance);
    var option = new FindOneAndUpdateOptions<Member>()
    {
        ReturnDocument = ReturnDocument.After
    };

    return this.Collection.FindOneAndUpdate(input.Item1, update,option);
}
```

# References #

- [MONGODB MANUAL : Write Operations Overview](https://docs.mongodb.com/v3.0/core/write-operations-introduction/)
- [MONGODB MANUAL : Indexes](https://docs.mongodb.com/manual/indexes/)
- [MONGODB MANUAL : Atomicity and Transactions](https://docs.mongodb.com/v3.0/core/write-operations-atomicity/)
- [MONGODB MANUAL : Update Data with C# Driver](https://docs.mongodb.com/getting-started/csharp/update/)
- [MongoDB Map Property 'new' in findAndModify using FindOneAndUpdateOptions class C# Driver](http://stackoverflow.com/questions/30739596/mongodb-map-property-new-in-findandmodify-using-findoneandupdateoptions-class)
