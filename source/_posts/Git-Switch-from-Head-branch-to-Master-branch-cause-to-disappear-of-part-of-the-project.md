---
layout: post
title: >-
  [Git] Switch from HEAD to master branch cause to disappear of part of
  the project
subtitle: ''
author: Blackie
HEADer-img: ''
sitemap: true
date: 2018-08-31 18:31:28
categories:
- CI&CD
tags:
- Git
- Source Control
---

記錄如何解決 Git 從 HEAD 切換到 master 分支部分交付不見/不見的問題

<!-- More -->

前陣子再一個經常操作的專案上做了 git commit 後，從當前的 HEAD 切換到 master 分支，部分交付的 commits 在 HEAD 操作的就全部遺失了，在 git cli 或 sourcetree 上都無法透過指令顯示不見的 HEAD 分支．

後來想到 Git *commit* 的特性，就透過 git reflog 指令然觀看全部 git 的操作記錄，裡面詳細記載你曾經下過的 git 指令:

    git reflog

![git002.png](git002.png)

這邊找到了移動到 master 分支前的一個 commit 的雜湊值(hash)為 596f379....(後面省略)．

這邊可以馬上透過建立 tag 的指令將當前消失的 commits 顯示出來：

    git tag emergency 596f379

![git003.png](git003.png)

當完成後回到 SouceTree 就可以看到結果如下：

![git001.png](git001.png)

## Why HEAD branch commits disappeared ##

這邊說明一下 HEAD 分支與那些 commits 原先之所以在切換到 master 會完全消失的原因在於：

- 任何 commit 需要有一個以上的 *label*
- 所屬哪一個 **branch** 屬於一個 *label*
- commit 被標示一個 **tag** 屬於一個 *label*
- HEAD 是一個 **tag**

詳細內容可以參考 [Git-內部原理-Git-References](https://git-scm.com/book/zh-tw/v1/Git-%E5%85%A7%E9%83%A8%E5%8E%9F%E7%90%86-Git-References).

當 HEAD 往新的 master branch 移動時，先前的 commit 因為沒有任何所屬的 branch, 所以除非給予一個 tag ，不然就真的消失了（其實是看不到而已)。而透過 **git reflog** 指令可以顯示所有操作的內容，從此指令我們就可以抓到消失的 sha1 ，並透過 **git tag** 指令給予一個 *label* 將所有相關 commits 顯示出來。

一個很久沒遇到的問題，這邊筆記一下以免下次又找半天．

## References ##

- [Switch from Head to Master cause to disappear of part of the project](https://community.atlassian.com/t5/Sourcetree-questions/Switch-from-Head-to-Master-cause-to-disappear-of-part-of-the/qaq-p/344387#U880366)
- [Git-內部原理-維護及資料復原](https://git-scm.com/book/zh-tw/v1/Git-%E5%85%A7%E9%83%A8%E5%8E%9F%E7%90%86-%E7%B6%AD%E8%AD%B7%E5%8F%8A%E8%B3%87%E6%96%99%E5%BE%A9%E5%8E%9F)
- [git tips 找尋遺失的 commit 紀錄](https://blog.wu-boy.com/2015/07/undo-git-reset-hard/)