---
layout: post
title: '[Rider] Shared Window Tools Layout in different Projects/Solutions'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-10-09 11:31:14
categories:
- Tool
tags:
- Rider
---

記錄如何使用 Rider 分享當前設定與視窗調整的樣貌到不同專案或是解決方案內

<!-- More -->

常使用 Rider 的朋友會發現，每次開出的新專案視窗的版面配置不會跟著上一個設定走，必須每次都調整，有時十分不方便．這邊方享如何快速的統一呈現的方式．

Rider 有幾種環境設定與配置可以跨專案或是跨電腦的與他人共享，這邊分為三個設定：

- Intellij IDEA Settings 
- Rider Settings
- Window Layout

## Intellij IDEA Settings  ##

如果你是要分享一些針對 Theme 的設定或是針對 IDE 的呈現設定，則可透過 Intellij IDEA Settings 協助你與分享或是引入至當前環境

可以從上方選項分類的 *File* 內看到相關匯入匯出設定

![03.jpg](03.jpg)

產生的設定檔為一個 **.jar** 副檔名類型的檔案，使用時就是直接匯入

關於此設定可以看 [Exporting and Importing Settings](https://www.jetbrains.com/help/idea/exporting-and-importing-settings.html) 了解更多細節

## Rider Settings ##

如果你是要分享一些 Code Snippet 或是針對 IDE 的開發設定，則可透過 Rider Settings 協助你與分享或是引入至當前環境

可分為兩種：

- directory-based settings format:
    
    這與 IntelliJ 平台內的前端開發有關，如 CSS, HTML, JS 等 Editor 內配置與設定.
- Layer-based settings format:

    使用與 *Resharper* 相同的 *layer-based*, 這個設定也可以匯入或匯出 ReSharper 內做使用

在偏好設定處的設定可以根據圖示分辨該設定屬於哪一種設定：

![code_style_settings.png](code_style_settings.png)

也可以從偏好設定的下方新增或調整當前的設定:

![02.jpg](02.jpg)

更多細節可以至官方看更多詳細說明 [Rider Settings](https://www.jetbrains.com/help/rider/Rider_Settings.html)

## Window Layout ##

最後是本篇的主要分享，如果你只是要簡單的想要跨專案的在本機有一致的 Window Laout，則可透過上方 Window 分類內的 Default Layout 功能達到

使用上只需儲存當前調整完的視窗版面，如我將 NuGet 與 Terminal 從原本的下方呈現更改至右方，並按下 *Store Current Layout as Default *

![05.jpg](05.jpg)

接著在你原先不符合預期的專案內按下上方 Window > Reset to Default Layout 即可統一呈現了