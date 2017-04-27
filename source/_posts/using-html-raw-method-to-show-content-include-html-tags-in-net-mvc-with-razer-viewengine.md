---
layout: post
title: Using Html.Raw() method to show content include Html tags in .NET MVC(under Razor ViewEngine)
subtitle: ""
date: 2013-11-13 00:29:45
author: Blackie
header-img: ""
categories:
- .NET
tags:
- Web MVC/WebApi
---
在.NET MVC中如果使用Razor作為ViewEngine 我們最常用來輸出一個model的參數的用法應該就是@了，這邊來介紹如何輸出包含HTML Tag的內容

<!-- More -->

詳細的說明與用法可以參考Demo大的[ASP.NET MVC3 Razor 初心者容易遇到的問題](http://demo.tc/Post/679)。

這邊要講的是如果你今天model的參數是一個包含HTML Tag的內容，如:

	<a hef="http://www.google.com.tw">click me</a>

或是

	&#60;a hef=&#34;http://www.google.com.tw&#34;&#62;click me&#60;/a&#62;

*上例HTML特殊字元encode可參考W3school的[HTML ISO-8859-1 Reference](http://www.w3schools.com/tags/ref_entities.asp)

上面兩個如果你直接使用@將其直印出的話就變成畫面上直接出現你的內容值，這邊用印出一個空白non-breaking space(&nbsp;)為例:

在View裡面的寫法如果是下面這樣

    <td class="align-l">
        @item.BaseCurrencySymbol
    </td>

![code1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131113/4.PNG)

![印出內容1](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131113/1.PNG)

如果改用Html.Raw()來輸出值的話

    <td class="align-l">
        @Html.Raw(item.BaseCurrencySymbol)
    </td>

![code2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131113/3.PNG)

![印出內容2](https://dl.dropboxusercontent.com/u/20925528/%E6%8A%80%E8%A1%93Blog/blogs/20131113/2.PNG)

從上面就可以明顯看出差異了，這邊再來看一下官方文件的解說([原文內容](http://msdn.microsoft.com/en-us/library/gg480740(v=vs.108).aspx))。

>###HtmlHelper.Raw Method (String)
>
>Returns markup that is not HTML encoded.
>
>- Namespace:  System.Web.Mvc
>
>- Assembly:  System.Web.Mvc (in System.Web.Mvc.dll)

如果你有使用類似[CKEditor](http://ckeditor.com/)這種編輯器plugin的話就一定要記得將輸出改為Html.Raw()的方式來轉換，避免直接將encode的Html Tag印出
