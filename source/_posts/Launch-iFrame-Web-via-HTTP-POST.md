---
layout: post
title: Launch iFrame Web via HTTP POST
subtitle: ''
author: Blackie
header-img: ''
categories:
  - HTML5
tags:
  - iFrame
sitemap: true
date: 2018-03-24 21:14:02
---

介紹如何透過 HTTP POST 的方式開啟 iframe 頁面

<!-- More -->

一般寫網頁需要嵌入一個完整的頁面時，常常會使用 iframe 的方式來做內容的嵌入。

而 HTML iframe 是框架的一種，也稱為內置框架或內聯框架，用來在網頁內嵌入另外一個網頁，例如現在非常流行的嵌入Facebook 粉絲團到部落格或個人網站、在網站內容加上別人的網站或是可獨立執行的網頁。

最簡單的使用方式如下:

```html
<iframe src="URL"></iframe>
```

而進階一點的屬性如: *height* 和 *width* 屬性用於規定iframe的高度和寬度。
屬性值的默認單位是像素，但也可以用百分比來設定（比如“80％”）。如下:

```html
<iframe src="demo_iframe.htm" width="200" height="200"></iframe>
```

而如上方所顯示的範例，可以看到大多都是透過 *src* 屬性設定連結並透過 *HTTP GET* 的方式開啟。

如果有需要透過HTTP POST的方式開啟則可以透過下面的方式:

```html
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

</head>
<body>
<iframe src="about:blank" name="myFrame" width="600" height="350" scrolling="auto" frameborder="1"></iframe>
<form action="http://localhost:3000/posttest" method="POST" target="myFrame">
Search: <input type="text" name="q"><br>
<input type="submit" value="Go!">
</form>
</body>
</html>
```

這邊可以看到我們多用了一個 *form* 去傳遞 *HTTP POST* 所需要傳入的內容。

有興趣的朋友可以參考這邊用 Nodejs 寫好的範例[iframe-post-demo](https://github.com/blackie1019/iframe-post-demo)

這是方面可以透過 [Postman]() 協助發出 *HTTP POST* 的訊息來看結果，如下:

![demo](demo.png)