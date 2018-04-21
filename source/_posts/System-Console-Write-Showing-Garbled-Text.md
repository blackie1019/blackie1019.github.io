---
layout: post
title: System.Console.Write 顯示亂碼
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-04-14 22:50:32
categories:
- .NET
tags: 
- .NET Core
- C#
---

紀錄一下 System.Console.Write 顯示亂碼的解決方式

<!-- More -->

呼叫 System.Console.Write 如果有漢字或是一些需要透過 UTF-8 呈現的語言如果因為 Encoding 與 Decoding 沒處理好，很容易出現以下的錯誤畫面:

![before.png](before.png)

此時如果去看了原始的檔案在編輯器中都是正常呈現:

![json.png](json.png)

那大多這類型的問題都是  System.Console.Write  的 **System.Console.OutputEncoding** 沒有做正確的設定。

## Solution ##

解決方法只要設定對等的文字編碼做輸出即可，範例如下:

```csharp
    System.Console.OutputEncoding=System.Text.Encoding.UTF8;
    System.Console.WriteLine(data["title"]);
```

此時在執行一次程式即可正確呈現。

![after.png](after.png)

## Encoding != Encryption ##

這邊要稍微提及一下 *Encoding(編碼)* 完全不等同於 *Encryption(加密)*，這兩者的功能與出發點是截然不同的:

### Encoding and Decoding ###

編碼是將一個信息從某一種形式/格式直接轉換為成另一種形式/格式，主要是協助雙方可以使用統一的形式/格式進行溝通。更進一步的來說編碼也可以是一個將原先無意義的輸入轉換成有意義輸出的方式。

程式開發上的編碼有：Text encoding(Big5, UTF-8), [URL encoding/Percent Encoding](https://www.w3schools.com/tags/ref_urlencode.asp)

![encode_decode.png](encode_decode.png)

### Encryption and Decryption ###

加密（Encryption）是為了保密而對信息進行轉換的過程，主要的訴求是避免溝通在傳遞時被發現。密碼學是中從很早期還在羅馬時期就出名的 *凱撒密碼(Caesar cipher)* 到現在程式開發很常見 DES, AES 都是以不讓他人發現資料的真實內容所進行的處理。以　AES　為例，只有取得授權金鑰(public key)與加密變換值/起始變數(Initialization vector)才可將此檔案解開。

![Encrypt_Decrypt.png](Encrypt_Decrypt.png)

加密更像是幫檔案增加一個箱子傳遞給對方，對方拿到箱子後需要知道有對應的鑰使並知道從哪邊插入才可以打開內容。

而這樣的金鑰又可以分為　*對稱*　與 *不對稱*　：

| 名稱    | 密鑰管理                | 安全性 | 速度                                                 |
|-------|---------------------|-----|----------------------------------------------------|
| 對稱式算法  | 相對複雜,一般用於內部系統或高度安全性處 | 中   | 快好幾個數量級(軟件加解密速度至少快100倍,每秒可以加解密數M比特數據),適合大數據量的加解密處理 |
| 非對稱式算法 | 密鑰較容易管理              | 高   | 慢,適合小數據量加解密或數據簽名 

程式開發上的加密有：DES, 3DES, MD5, SHA-1, AES, RSA

## References ##

- [JSON Encoding And Decoding - Swift 4](https://medium.com/@YuriD4/json-encoding-and-decoding-swift-4-c106d7b3c2bd)
- [http://www.selamigungor.com/post/7/encrypt-decrypt-a-string-in-csharp](http://www.selamigungor.com/post/7/encrypt-decrypt-a-string-in-csharp)
- [DES、AES、RSA等常用加密算法介紹與比較](http://www.itread01.com/articles/1501720695.html)