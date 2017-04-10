---
layout: post
title: ASP.NET Core play with MongoDB and MongoDB .NET Driver - Update
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-20 17:35:24
categories:
- Asp.Net
tags: 
- Asp.Net Core
- MongoDB
- .NET MongoDB Driver
---

紀錄與整理.NET MongoDB Driver相關資料更新函式的差異與各更新函式的使用時機

<!-- More -->


# .NET MongoDB Driver Upldate Related Function #

## FindOneAndUpdate/FindOneAndUpdateAsync ##

## UpdateOne/UpdateOneAsync ##

## ReplaceOne/ReplaceOneAsync ##

## UpdateMany/UpdateManyAsync ##

## Update with upsert option ##

MongoDB在呼叫Update時有一個特殊的參數upsert，透過這個參數如果該物更新物件已存在在資料庫時則做更新的動作，但如果尚未存在指定查詢的物件時則執行新增動作

```csharp



```

# Conclusion #

# Reference #

- [MONGODB MANUAL : Write Operations Overview](https://docs.mongodb.com/v3.0/core/write-operations-introduction/)
- [MONGODB MANUAL : Indexes](https://docs.mongodb.com/manual/indexes/)
- [MONGODB MANUAL : Atomicity and Transactions](https://docs.mongodb.com/v3.0/core/write-operations-atomicity/)
- [MongoDB Map Property 'new' in findAndModify using FindOneAndUpdateOptions class C# Driver](http://stackoverflow.com/questions/30739596/mongodb-map-property-new-in-findandmodify-using-findoneandupdateoptions-class)
- []()