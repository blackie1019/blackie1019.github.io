---
layout: post
title: Visaul Studio Code Quick Blame with GitLens
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-22 08:47:04
categories:
- Tool
tags:
- VSCode
- Git
---

使用GitLens套件，讓你的VSCode一秒看懂現在的程式碼是充滿靈性還是充滿鬼話

<!-- More -->

現在多半我們在寫程式或是文件的時候都是多人協同工作或是使用版本管控系統(Version Control System)，檔案內容多又雜就不用多說了，常常會發生有一段程式碼或是文章區塊你怎麼看都看不懂，當下只有一種*這是誰寫的啊*的感覺，而後我們通常都一段謾罵或是嘈諷後才發現好像是自己種下的希望種子(QQ)．

為了讓我們可以快速Blame到目前程式碼是誰在什麼時候commit的，理由又是什麼，今天就來介紹*GitLens*這個套件給大家

## GitLens for VSCode ##

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 的安裝請參考之前的文章，或是 VS Code Quick Open (⌘+P)輸入*ext install gitlens* 即可．

## git blame ##

此套件主要是建立在*git blame*的功能上，而當我們使用Git作為我們版本管控的工具後，你可以用 git blame 來檢視標注該檔案，查看檔案的每一行分別是由哪一位人員在哪一天修改的commit進去版控的。

    git blame <targetfile>

![git_blame](git_blame.png)

如上我們就可以看出各別誰commit的，但這真的很難一目了然...

## How to Use GitLens ##

而如果我們安裝了GitLens則變成簡單多了，我們先看還沒安裝前這篇文章的在VSCode的呈現

![before](before.png)

安裝後

![after](after.png)

是不是Magic! 

安裝完後，我們編輯器的每個file的右上角也會多出一個*Toggle Blame Annotation*來幫助我們展開各行詳細的commit區塊:

![test](test.gif)

當然還有更多功能，就麻煩上官網去發掘並給予五星回饋肯定作者的貢獻吧!

## References ##

- [Git 工具 - 使用 Git 做 Debug](https://git-scm.com/book/zh-tw/v1/Git-%E5%B7%A5%E5%85%B7-%E4%BD%BF%E7%94%A8-Git-%E5%81%9A-Debug)
- [每一行代码都有记录—如何用git一步步探索项目的历史](http://www.cnblogs.com/lanxuezaipiao/p/3552805.html)
- [強大的 Git Extension: GitLens - VS Code Extension | How-To | Editor 編輯者 #5](https://www.youtube.com/watch?v=_uOpqobNzWY)
