---
layout: post
title: SQL convert int to datetime overflow issue
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2013-08-26 14:56:37
categories:
- Database
tags:
- MSSQL
---

SQL convert int to datetime(轉換 expression 到資料類型 datetime 時發生算術溢位錯誤)

<!-- More -->

今天在幫客戶新增一個功能的時候看到前人把生日分為三個欄位(民國年,月與日)，應該是歷史包袱或效果考量吧..

![img_1](2013826191632853.png)

直覺上看到這個，直覺上就把它用數學解成(1911+year)*10000+month*100+day ,以74 10 19來說就會變成 19851019這樣的數字

再來再透過

```sql
convert(datetime,‘文字時間’)
```

可以把文字轉換成時間格式，所以我們取得的數字轉成文字就可以

```sql
CONVERT(VARCHAR(8),((birthyear+1911)*10000+birthmonth*100+birthday))
```

完整的語法與結果如下

```sql
select gicuitem as id,convert(datetime,CONVERT(VARCHAR(8),((birthyear+1911)*10000+birthmonth*100+birthday))) as'西元年月日'  from testTable
```

![img_2](2013826192452728.png)

**注意歐！日期時間比對在非閏年的2/29 比對會發生問題(如果1973/2/29 就會發生下面的問題）**

![img_3](20138261934271.png)