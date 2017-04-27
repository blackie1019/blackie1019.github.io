---
layout: post
title: ASP.NET Core add Git Ignore File
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-13 10:00:01
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- C#
- Git
---

ASP.NET Core的gitignore設定分享

<!-- More -->

做版本管控一定會遇到有些檔案不想加入追蹤或是特定folder想要整個排除在外，這時候我們就可以用.gitignore這樣的一個檔案來幫我們設定我們想要排除的行為。而這些必須要排除這些檔案，我們稱為「忽略清單」。

設定忽略清單除了可以幫我們減少不必要的檔案空間，也可以幫我們在資料安全的考量下公布必要的資訊即可。

## Git and Git Ignore ##

在 Git 裡面，是透過 .gitignore 檔案來進行定義「忽略清單」，這些被設定為忽略的檔案、資料夾不會出現在 git status 的結果中(還是屬於Untracked file時)，如果這些檔案在設定忽略清單前就加入追蹤(Staged file)則不受.gitignore 檔案控制。

## ASP.NET Core .gitignore ##

網路上最常參考[github - gitignore](https://github.com/github/gitignore)，而如果你是使用Github，則可以在一開始建立Repository的最下方選擇加入的.gitignore語言設定。

![github](github.png)

另外，也可以透過[gitignore.io](https://www.gitignore.io/)根據你輸入的語言、工具、環境等幫你產生.gitignore檔案

ASP.NET Core則有一份官方的[ASP.NET&ASP.NET Core共用版本](https://github.com/aspnet/Docs/blob/master/.gitignore)。

## .gitignore 設定 ##

當我們在專案的根資料夾放入下載好的.gitignore後我們先看一次我們現在的檔案目錄結構與檔案

![tree](tree.png)

而當我們commit並push至github後我們在看一次我們真實推出去的結果就可以發現我們已經過濾掉我們不想公開的檔案了

![git](git.png)

## 延伸主題 Visual Stuido Code Plugin - vscode-icons ##

這邊介紹一下[vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)這個套件，它幫VS Code補充了檔案的icon而且非常的豐富與完整。

可以看到我上圖我們新加入的.gitigore檔案會顯git的圖案，如果沒有加入這個plugin則會顯示為不認識的檔案內容。

![demo-1](https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/images/screenshot.gif)

### Installation ###

如果不能直接透過查詢找到該擴充套件，也可以直接透過指令安裝:

    ext install vscode-icons

如果在同一位置則可以嘗試下面指令:

    ext install icons
    # or
    ext install "vscode-icons"

### Enable the extension ###

前往 *File* > *Preferences* > *File Icon Theme* > *VSCode Icons*.

(注意:OSX it is *Code* > *Preferences* > *File Icon Theme* > *VSCode Icons*.)

## References ##

- [Git - 忽略檔案](https://zlargon.gitbooks.io/git-tutorial/content/file/ignore.html)
- [[GIT] 設定.gitignore 忽略檔案不被track](http://italwaysrainonme.blogspot.tw/2013/01/git-gitignore-commit.html)
- [30 天精通 Git 版本控管 (19)：設定 .gitignore 忽略清單](http://ithelp.ithome.com.tw/articles/10138831)