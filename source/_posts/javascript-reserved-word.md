---
layout: post
title: JavaScript reserved word(保留字)
subtitle: ""
date: 2014-04-14 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- Basic JS
---

這禮拜在看以前的code的時候看到前人使用保留字的來宣告變數名稱的js code，可能當時的時空背景允許這樣的事情發生，但想到以後如果部門還有小朋友的話要告訴他們的正確的觀念所以寫了這篇來Memo一下。

<!-- More -->

![reserved](reserved.jpg)

## What is reserved word

reserved word就是在程式裡預先保留的文字，大多有特殊用途與意涵或本身附帶一些功能與屬性，在正常的情況下不能用來當作參數或變數的命名

## How To use reserved word

那如何在非正常的情況下來使用這些保留字勒

一般的NG使用法，我們以保留字import為例:

- a.import = value
- var import = value
- a = { import:value }

可以使用保留字的用法

- a['import']=value
- a = { 'import': value }

### 目前的保留字[詳情請參考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Reserved_Words?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FReserved_Words)

比較常用到的有以下的(JavaScript目前的版本對照到ECMAScript 3)

- abstract
- boolean
- byte
- char
- class
- const
- debugger
- double
- enum
- export
- extends
- final
- float
- goto
- implements
- import
- int
- interface
- long
- native
- package
- private
- protected
- public
- short
- static
- super
- synchronized
- throws
- transient
- volatile

### 以下是未來保留字(最新的JavaScript版本應該會符合ECMAScript 5)：

- class
- enum
- export
- extends
- import
- super

### strict 模式中的未來保留字

以下是僅限於 strict 模式中的未來保留字。 如需 strict 模式的詳細了解，請參考之前的文章[[JavaScript]use strict(嚴格模式)-strict mode 介紹](https://blackie1019.github.io/2013/08/29/javascript-strick-mode-introduction/)

- implements
- interface
- package
- private
- protected
- public
- static
- yield

### More reserved words

JavaScript 的保留字 (reserved word)  、未來保留字 (future reserved word) 另外包括關鍵字 (keyword)還有最常使用到的三個字面常數 (literal) ，分別是 null 、 true 、 false 。

關鍵字包含:

- break
- case
- catch
- continue
- default
- delete
- do
- else
- finally
- for
- function
- if
- in
- instanceof
- new
- return
- switch
- this
- throw
- try	with
- typeof
- var
- while
- with

## Avoid use reserved words

強烈建議不要使用保留字，如開頭所說，這些字叫做保留字就代表它們有特別的意涵與功能，請按照規則撰寫程式，好的規則與習慣可以讓你的程式可讀性大增!

所以，如果以後在以前的專案還有看到這些保留字被使用就順手把它改掉吧，套句[clean code](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)所說的:"與其幫一段完全錯誤的程式碼寫上註解不如動手改善它吧"
