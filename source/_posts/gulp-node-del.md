---
layout: post
title: 'NodeJS del - sDelete Files and Folder'
subtitle: 'Using NodeJS del module to help we delete directory/files on Gulp'
author: Blackie
header-img: ''
sitemap: true
date: 2016-08-18 01:32:24
categories: 
- Development&Coding
tags:
- Gulp
- Front-End Optimization
- NodeJS 
---

使用NodeJS的[del](https://www.npmjs.com/package/del)模組來協助Gulp快速地設定需清理的檔案與目錄夾

<!-- More -->

在使用Gulp時最常見的需求就是先清空目標目錄內的檔案或是將暫存檔案移除，這邊分享給大家使用del來取代fs module。

## del 基本操作 ##

### 安裝指令 ###

	$ npm install --save del

### 基本使用 ###

這邊示範的內容為:

- 刪除tmp目錄下的所有.js檔案
- 但須保留unicorn.js

代碼:

	var del = require('del');
	 
	del(['tmp/*.js', '!tmp/unicorn.js']).then(paths => {
	    console.log('Deleted files and folders:\n', paths.join('\n'));
	});


### del-cli ###

如果有需要透過指令來加速開發或日常使用的，可以參考[del-cli](https://github.com/sindresorhus/del-cli)

但因為del的刪除是永久性的刪除，如果是還有可能會需要還原的可能要參考[trash-cli](https://github.com/sindresorhus/trash-cli)。

## 結語 ##

在目前的使用上我是最常拿del來幫我做gulp建置前的清除與建置後的暫存檔案清楚，確保發布的專案沒有帶到不必要的內容。

不同於Grunt，因為Gulp是以JavaScript為主的Task manager，所以在使用上我們就能借用NodeJS已經有的模組來開發而無須重複製造輪子。