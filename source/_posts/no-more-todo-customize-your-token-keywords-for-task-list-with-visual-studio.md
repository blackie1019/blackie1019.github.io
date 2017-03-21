---
layout: post
title: No more TODO - Customize your token keywords for Task List with Visual Studio
subtitle: ""
date: 2013-12-19 00:29:45
author: Blackie
header-img: ""
categories:
- Development&Coding
tags:
- Visual Studio
---

在開發程式的時候想必我們都很習慣使用直接下註解TODO的方式來記錄我們以後要完成的function或是提醒自己有哪些事情還沒做，而使用Visual Studio 開發如果是自動產生的程式碼時不時都還會幫你加上這段

<!-- More -->

而VS應該從05開始應該就有工作清單(支援Todo List)功能，而在Visual Studio稱為則Task Manager，預設支援KeyWord 有 HACK, TODO, UNDONE, UnresolvedMergeConflict 這幾個關鍵字，也就說你可以直接使用下面的注解方式增加你的待處理事項(各解釋請參考[MSDN](http://msdn.microsoft.com/en-us/library/aa652344(v=VS.71).aspx))

	//TODO:
	//HACK:
	//UNDONE:
	//UnresolvedMergeConflict:


這些預設字在使用上是不用分大小寫

![TODO](todo.png)

如果使用的是C++在vs2010倒是有限制要完全一樣的大小寫！如果要開啓的話可到Tools -> Options -> Text Editor -> C/C++ -> Formatting -> Miscellaneous -> change Enumerate Comment Tasks將其設定為true

![8](8.png)

而實際上你加入的這些task是被存放到在隱藏的solution文件(.suo)中

如果我們今天想要擴充這些預設字並設定各task類型的priority的話可以參考下面的步驟

1. Visual Studio 選擇上方Tools->Options

	![1](1.png)


2. Enviroment->Task List，這邊可以新增自己新的定義(NeedFinish)

	![2](2.png)

3. Visual Studio 選擇上方View->Task List，打開待處理事項清單

	![3](3.png)

4. 在程式上打上註解符號並使用剛剛新增的NeedFinish作為Task manager判斷分類

	![4](4.png)

5. 因為我們剛剛有設定priority的關係我們就可以看到NeedFinish這邊有標示出左邊的紅色驚嘆號！

	![5](5.png)

6. 透過設定priority，我們就可以使用它作為排序條件重整目前代辦事項(預設的關鍵字除了UnresolvedMergeConflict外都是normal)

	![6](6.png)

## 補充說明

提醒一下，如果有人在Task List看不到自己在註解所加入的代辦事項的要確認是不是在Task List有選對歐(Comments或User Tasks)

+ User Taskstasks

	entered in the Task List)

+ Comments

	tasks entered as comments in your code, prefaced by a token keyword

![7](7.jpg)

另外，這個功能也是可以用在js與css的檔案上的，vs2012預設就有支援，vs2010的話要安裝一下[Web Essentials](http://visualstudiogallery.msdn.microsoft.com/6ed4c78f-a23e-49ad-b5fd-369af0c2107f)，而如果事前端開發者的話請開心使用[JSLint for vs2012](http://jslint4vs2010.codeplex.com/)或是用[resharper](http://www.jetbrains.com/resharper/)也有支援。

最後最後！記住如果自己Customize的token keyword是不能直接讓其他人產生效果的(這有點像是你在設定自己的VS環境而已)，所以如果是團隊開發或是要把你做的token keyword List分享給其他人的話可以參考官方的做法
[匯出目前所有環境設定](http://blogs.msdn.com/b/zainnab/archive/2010/07/14/exporting-your-environment-settings-vstipenv0021.aspx)與
[匯入或合併目前的環境設定](http://blogs.msdn.com/b/zainnab/archive/2010/07/15/importing-or-changing-your-environment-settings-vstipenv0022.aspx).
