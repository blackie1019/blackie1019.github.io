---
layout: post
title: "Visual Studio Code Find and Replace with New Line"
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-24 23:38:43
categories:
- Tool
tags:
- VSCode
---

介紹使用VSCode如何包括換行(new line)進行查詢

<!-- More -->

我們常常會有情況要做大量的文字置換，有可能是一個檔案裡面的多個地方，也有可能是一個特定資料夾內散落的特定副檔名(extension)檔案, 當然有時我們也會不管檔名是什麼只要有包含的內容全部換掉就對了．

VSCode 支援了上述所有情境的工作，而這次要為大家介紹如何在遍尋(find)與置換(replace)時能包含換行(new line)與其他文字．

例如：我們想將下圖 *categories* 下的 ASP.NET 換成 .NET，但是要避免置換到 *tags* 下的 ASP.NET

![single_file_before](single_file_before.png)

先直接來看結果：

## How To Do It ##

VSCode 在 [1.3](https://code.visualstudio.com/updates/June_2016#_multiline-find)支援多行的Regular Expression．

這邊我們可以用下面快速指令開啟單一檔案的遍尋與置換工具列：

- Windows 按下 *Ctrl+e*
- Mac 按下 *Cmd+e*

當查詢工具列出來後我們貼上下面內容並將 *Use Regular Expression* 這選項勾起來進行全文查詢 ：

    (categories:)\r?\n- ASP.NET

![single_file](single_file.png)

當然這個方法我們也能用在右方的Search功能上進行整個目錄的遍尋：

![multiple_files](multiple_files.png)

但當我們用上面這個指令更換的時候會發現我們的確更換到我們想要更換的區段，但結果好像不如預期，這此我們可以將指令改為：

    (categories:)\n- ASP.NET

這邊的\n是因為筆者的mac換行用\n，替換的文字記得也改為\n．如此即可

    categories:\n- .NET

而目前如果在Search啟用 *Use Regular Expression* 只能針對有**開啟**的檔案進行查詢，這邊實務上建議大家可以先關閉*Use Regular Expression*將原本要替換的文字作統一更改，如：*- ASP.NET* 我們統一改為 *- ASP.NET.* ，當我們按下更新後 VSCode 會把相關的檔案都開啟並置換，此時我們可以再將文字從 *- ASP.NET.* 改回 *- ASP.NET*．

接著再執行上一個段落的指令就可以成功將所有開啟檔案做遍尋了

如此即可有效的更換在專案資料內一次批次做替換了

## References ##

- [VSCode - Find does not match multi-line regex strings](https://github.com/Microsoft/vscode/issues/313)