---
layout: post
title: Visual Studio Code Snippet and Tab Completion
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-07 00:15:15
categories:
- Tool
tags:
- VSCode
---

分享如何增添 Visual Studio Code 的 Snappit 功能與開啟 Tab Completion 加速完成文件編輯

<!-- More -->

現代的編輯器大多有支援 snippet 功能，當然 VSCode 也不意外得具備這樣的功能，這次介紹如何透過 VSCode 的 Tab Completion 來加強 snippet 的使用

## Insert Existed Snippet ##

要在當前檔案插入已經建立的 Snippet ，可於 *Command Palette* 輸入 **insert snippet** ，VSCode 就會針對你的副檔名(file extension) 開啟對應的 Snippet 清單，下方示範 .md 檔案的 snippet 該如何插入:

![Insert](Insert.gif)

## Create New Snippet ##

眼尖的朋友會發現我們上面的示範所插入的是一個 **md-iframe** 的 snippet，這是一個客製的 snippet，專門負責在 [hexo](https://hexo.io/zh-tw/) 的 *.md* 內嵌入其他網頁，例如：youtube 影片．

而要新增一個 snippet 我們一樣要透過 *Command Palette* 輸入 **Preferences: Open User Snippets** ，接者選擇你的副檔名格式後就會開啟該語言的設定，此範例選則 *markdown* ：

markdown.json
```json
{
/*
	// Place your snippets for Markdown here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	}
	
*/
	"snippet-md-iframe": {
		"prefix": "md-iframe",
		"body": "<iframe width='560' height='315' src='$0' frameborder='0' allowfullscreen></iframe>",
		"description": "md-iframe"
	}
}
```

這邊要稍微解說一下裡面有一個 **$0** 的用意是讓我們再插入 snippet 之後，當前的滑鼠指標就會移到該區塊，我們就可以接著輸入網址，不用滑鼠再點選一次位置．

## Enable editor.tabCompletion ##

這邊我們可以搭配開啟 editor.tabCompletion 這個功能，可以幫我們透過 tab 的方式直接插入對應的 snippet．開啟該設定的方式如下：

![setup](setup.png)

而當我們開啟該設定後就可以透過 tab 的方式幫我們快速插入：

![vscode_tab_demo](vscode_tab_demo.gif)

## [補充] Snippet Generator ##

如果你除了VSCode 之外還有用其他編輯器，如 [Sublime Text](https://www.sublimetext.com/) 或 [Atom](https://atom.io/) 也想建立一樣的 *snippet* 指令，可以參考[Snippet Generator](https://Snippet.now.sh/) 一次幫你產生三個不同版本的 Snippet ，我們只要複製貼上就好．

![snippet-generator](snippet-generator.png)

## References ##

- [Creating your own Snippet](https://code.visualstudio.com/docs/editor/userdefinedSnippet)