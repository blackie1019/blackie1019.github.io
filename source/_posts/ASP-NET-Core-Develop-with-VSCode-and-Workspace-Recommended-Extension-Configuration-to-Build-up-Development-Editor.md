---
layout: post
title: ASP.NET Core Develop with VSCode and Workspace Recommended Extension Configuration to Build up Project/Team Editor
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-06 00:28:25
categories:
- Tool
tags:
- VSCode
- ASP.NET Core
- .NET Core
- C#
---

介紹如何使用 VSCode 中 Workspace Recommended Extension Configuration 這項功能來幫我們迅速的建立 VSCode 的開發環境．

<!-- More -->

今天看到 [本週的Editor 編輯者#9](https://www.youtube.com/watch?v=zzon9KS90Dk&lc=z125zvf5swr2itnc123silawimnzwhwht04)的影片，介紹了 VSCode 中 **Workspace Recommended Extension Configuration** 這項功能，而本篇將接續分享如何透過這項功能來幫我們迅速的建立 VSCode 的開發環境．

建議對 *VSCode* 有興趣的朋友一定要去看一下影片！

## VSCode Extensions and Recommended Extension feature ##

VSCode 的 Extension 功能與 [Extension Marketplace](https://marketplace.visualstudio.com/) 補足了 VSCode 上許多的好用的功能，也同時帶給我們安裝上極佳的方便性．

![vs_marketplace](vs_marketplace.png)

在編輯器的 Activity Bar 最下方的 Extension 功能中其實還保留幾個快速的導覽功能，點擊 Extension 後可在視窗的右上方的 **...** 圖示透過滑鼠右鍵點擊後看到更多的選項：

![vscode_extension_features](vscode_extension_features.png)

其中 Show Popular Extension 等同我們用下載量做排序．而排序總共有三種：

- 依下載量排序

  @sort:installs

- 依評分排序

  @sort:rating

- 依名稱排序

  @sort:name

如果我們有一個關鍵字做查詢，也可以透過排序功能將我們的查詢結果從新整理，如：關鍵字 git,依評分排序：

  git @sort:rating

![vscode_extension_sorting](vscode_extension_sorting.png)

而另外一個選項 Recommended Extension 則是可以直接看當前推薦的套件有哪些．

## Workspace Recommended Extension Configuration ##

Recommended Extension 也可以分別運作在不同的專案，依據專案設定不同的 Workspace Recommended Extension ，如此一來當該團隊有新成員加入的時候，就可以第一時間把編輯器的安裝說明快速帶著新人上手．

我們可以透過在 *Command Palette* 中輸入 Recommended Extension 作過濾找到 **Extensions : Configure Recommended Extensions(Workspace)** ：

![vscode_extensions_config](vscode_extensions_config.png)

接著將套件的識別名稱貼入及可，請參考下方取得名稱方式：

![vscode_recommended_setup](vscode_recommended_setup.png)

當完成加入後，點擊 Extension 右上方的 **...** 圖示選擇 *Show Workspace Recommended Extensions* :

![vscode_show_workspace_recommended_extensions](vscode_show_workspace_recommended_extensions.png)

即可看到我們剛剛給當前專案加入的推薦套件：

![vscode_show_workspace_recommended_extensions](vscode_show_workspace_recommended_extensions_2.png)

再次提醒，新增專案推薦套件會在當前的專案底下的新增一個資料夾與一個 *extensions.json* 檔案，以自身在中間規模圖隊(100人上下)服務的經驗，請務必要將該檔案加入版控(Vision Control)才會方便大家互相支援．

## Build up ASP.NET Core Development Editor ##

而這邊就來分享小編在 ASP.NET Core 開發的環境所需要 Extensions ，有興趣的請直接拿去用摟．

載點：[dot-net-core-vscode-extensions](https://github.com/blackie1019/dot-net-core-vscode-extensions)

- [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
- [C# Extensions](https://marketplace.visualstudio.com/items?itemName=jchannon.csharpextensions)
- [C# IL Viewer](https://marketplace.visualstudio.com/items?itemName=josephwoodward.vscodeilviewer)
- [NuGet Package Manager](https://marketplace.visualstudio.com/items?itemName=jmrog.vscode-nuget-package-manager)
- [Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides)
- [Output Colorizer](https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore)
- [yo](https://marketplace.visualstudio.com/items?itemName=samverschueren.yo)
- [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
- [Code Spellchecker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Log File Highlighter](https://marketplace.visualstudio.com/items?itemName=emilast.logfilehighlighter)
- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

## References ##

- [VS Code Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery)