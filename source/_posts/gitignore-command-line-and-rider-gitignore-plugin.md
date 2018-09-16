---
layout: post
title: 'gitignore command line and rider .gitignore plugin '
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-09-05 10:10:27
categories:
- Tool
tags:
- git
- git ignore
- Rider
---

分享 git ignore CLI 工具與 Rider 的 .gitignore 擴充套件(plugin)

<!-- More -->

早先在 [Visaul Studio Code Quick Add gitingore File](http://blackie1019.github.io/2017/03/22/Visaul-Studio-Code-Quick-Add-gitingore-File/)  有介紹過 vscode 的 extension 去協助我們針對語言或專案特性快速產生 *.gitignore*，省去繁雜的查詢與貼上．

由於最近使用 [rider](https://www.jetbrains.com/rider/) 作為主要 *C#* 開發工具，所以找了上面的擴充套件 - [Plugins - .ignore](https://plugins.jetbrains.com/plugin/7495--ignore).

該套件目前不只支援 Rider ，也支援以下 IDE:
- IntelliJ IDEA  
- PhpStorm  
- WebStorm  
- PyCharm  
- RubyMine  
- AppCode  
- CLion 
- GoLand  
- DataGrip  
- Rider  
- MPS  
- Android Studio

如果有使用 *jetbrains* 家族的其他產品也非常推薦下載．

## Install .ignore plugin on Rider ##

打開 Rider 先至 preferences > Plugins ：

![01](01.png)

選擇下方的 Browse Repositories 或是手動選擇加入下載的套件. 這邊以 Browse Repositories 為例，進入後上方輸入你要查詢的套件並按下安裝即可：

![02](02.png)

安裝好後會在你專案(.csproject)內透過右鍵或是新增檔案快速加入 .gitignore.

![09](09.png)

 但如果在方案(.sln)則反灰無法使用： 

![03](03.png)

如果需要在方案建立則可以透過以下方法

## Use gitignore.io Command Line Tool ##

而 [gitignore.io](https://www.gitignore.io/) 其實近年也出了自己的 CLI(Command Line Tool) - [gi](https://github.com/joeblau/gitignore.io) ，可以讓使用在 bash, zsh, fish 或是 windows cmd 與 powershell 下都能快速的產生 .gitignore 檔案．

安裝上就參考你所需要安裝的環境執行指令，這邊以 macOS 的 zsh 為例，到 zsh 貼上下面指令即可：


    echo "function gi() { curl -L -s https://www.gitignore.io/api/\$@ ;}" >> ~/.zshrc && source ~/.zshrc

![04](04.png)

安裝好後可以透過以下指令顯示所有 .gitignore 樣板：

    gi list

![05](05.png)

透過以下指令即可將指定樣板加入選定的位置：

    git visualstudio >> .gitignore

![06](06.png)

這邊可以將一個以上的樣板同時加入

上方指令運作完後透過顯示全部檔案即可看到檔案成功加入

![07](07.png)

接著，可以回到 *Rider* 透過顯示所有檔案看到剛剛被加入的 *.gitignore*

![08](08.png)

這邊不管是透過第一個方法還是第二個方法都會幫你加入一樣的 *.gitignore*, 如果是針對 *rider* 要客製化 git ignore 檔案的話只需加入下面至 *.gitignore*：

    # JetBrains Rider
    .idea/
    *.sln.iml

