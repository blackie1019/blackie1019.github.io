---
layout: post
title: Protobuf Development(.proto) on Visual Studio Code
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2019-03-22 23:19:26
categories:
- Tool
tags: 
- gRPC
- Protobuf

---

紀錄一下 Visual Studio 如何支援 .proto 檔案的撰寫

<!-- More -->

近期在大量以 gRPC 為基礎的開發上，很多時機需要新增或是編輯修改 .proto 檔案．

而在未安裝任何套件前當前版本的 VS Code 預設不支援 `.proto` 的程式碼高光(highlight)與程式碼智能快選(code intellisense)

![01.png](01.png)

這邊推薦安裝 [vscode-proto3](https://marketplace.visualstudio.com/items?itemName=zxh404.vscode-proto3) 

安裝完後即可看到 VS Code 有對應的檔案 icon 與 程式碼高光功能了

![02.png](02.png)

全部支援的功能包含：

- proto3 support.
- syntax highlighting.
- syntax validation.
- code snippets.
- code completion.
- code formatting.
- brace matching.
- line and block commenting.

另外還要推薦一個 [Protobuf Helper](https://marketplace.visualstudio.com/items?itemName=ripwu.protobuf-helper) 可以自動幫我們填入 field id．

由於 protobuf 撰寫定義檔時，針對 message 的每一個 field 都要明確的給定 id，其實大多開發人員都不在意這點但又覺得很擾人，這時此套件就可以幫你快速填上或是重整摟．

![03.png](03.png)

即可馬上變成下面：

![04.png](04.png)

這個套件再多屬性的 message 開發中，根本是神器，以往不敢亂改的 field 順序現在就可以隨便移動摟