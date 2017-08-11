---
layout: post
title: ASP.Net Core nuget can't restore on macOS
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-03-27 10:42:34
categories:
- .NET
tags: 
- ASP.NET Core
- .NET Core
- NuGet
- macOS
---

紀錄一下在macOS上遇到NuGet無法抓取還原的問題

<!-- More -->

之前在ASP.NET Core的開發都在Ｗindows環境，所以沒有遭遇NuGet還原或是dotnet cli有類似問題的情況．
今天在安裝.NET Core SPATemplate時發生錯誤，問題詳細的錯誤訊息如下：

![NuGet_Exception](NuGet_Exception.png)

後來在爬了官方的討論後發現可能是安裝上面有少安裝套件或是必要更新．

後來比較了我在Windows與macOS上安裝的步驟後發現我應該是Http Proxy相關的設定有問題，接著回去官網再看一次macOS的安裝發現第一步pre-requisites就說明需要更新OpenSSL，一整個被我忽略掉．這邊紀錄一下安裝流程．

## HomeBrew ##

官方第一個要我們做的OpenSSL更新是brew指令，預設macOS不認識這指令，這邊我們透過Homebrew來讓我們的CLI支援brew指令．

![Brew_not_found](Brew_not_found.png)

[HomeBrew](https://brew.sh/index_zh-tw.html)是安裝 Apple 沒有預裝但是你需要的東西(很大一部分是指開發的時候/環境)．

這邊我們貼上頁面提供的指令即可

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

## .NET Core pre-requisites on macOS 10.11 or higher(64 bit) ##

當完成brew指令安裝，接著我們就要執行[.NET Core官網](https://www.microsoft.com/net/core#macos)要我們做的更新指令

    brew update
    brew install openssl
    mkdir -p /usr/local/lib
    ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
    ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/

當更新做完且.NET Core SDK也安裝完了我們就再回去zsh執行我們的指令就正常了．這邊我們再重新安裝一次Microsoft.AspNetCore.SpaTemplates這個套件就可以看到nuget可以正常運作了．

![Full_List](Full_List.png)

## zsh補充說明 ##

這一次的zsh安裝發現如果是使用VSCode的zsh他會需要把字串用“”包起來．如下方指令：

    dotnet new --install Microsoft.AspNetCore.SpaTemplates::*

這是官網建議的執行指令，丟到zsh的terminal時不需要特別用""把後面的Microsoft.AspNetCore.SpaTemplates::*包起來也可以正常執行．

但，如果是使用VSCode的Terminal為zsh去執行，就會拋出Not Found的問題．需要將指令改為下面：

    dotnet new --install "Microsoft.AspNetCore.SpaTemplates::*"

這邊小問題在VSCode的github討論串也是有人提出，不知道是zsh有問題還是VSCode這邊不一致，這邊分享給遇到這樣問題的朋友來解決．