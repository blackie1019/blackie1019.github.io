---
layout: post
title: Visual Studio Code Customize your Own Edit Theme
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-05 10:43:25
categories:
- Tool
tags:
- VSCode
---

介紹如何修改 VSCode 整個 Editor 配色．

<!-- More -->

![cover](cover.png)

在 April 2017 Microsoft 發佈了新版的 VScode (Version 1.12.1 ) 增添了 *Workbench theming* 的功能，可以讓我們客製化整個編輯器的配色．

![vscode_latest_version](vscode_latest_version.png)

有美感且有興趣完全打造自己風格的編輯器請參考官方說明：[Theme Color Reference](https://code.visualstudio.com/docs/getstarted/theme-color-reference).

如果你沒有美感也關係，也可以直接套用預設的幾個 Theme :

![vscode_plate](vscode_plate.png)

![vscode_default_theme](vscode_default_theme.png)

或是下載別人的 Theme Extension:

![vscode_theme_download](vscode_theme_download.png)

這邊帶大家看幾個修改就好：

## How to Customize Your Activity Bar Color ##

```json
    "workbench.colorCustomizations": {
        "activityBar.background": "#cd9731"
    }
```

修改前：

![customize_activity_Bar](customize_activity_Bar.png)

修改後：

![customize_activity_Bar_after](customize_activity_Bar_after.png)

## How to Customize Editor Active Tab Color ##

```json
    "workbench.colorCustomizations": {
      "tab.activeBackground": "#cd9731"
    }
```

修改前：

![customize_tab](customize_tab.png)

修改後：

![customize_tab_after](customize_tab_after.png)

## How to Switch to different Theme ##

如何切換不同 Theme 請參考下方影片：

<iframe width="90%" height="315" src="https://www.youtube.com/embed/0L47rFf8JhU?ecver=2" frameborder="0" allowfullscreen></iframe>

## VSCode Theme Generator ##

如果你已經有想要呈現的色彩風格的色碼，也可以使用官方的[vscode-theme-generator](https://github.com/Tyriar/vscode-theme-generator)

使用與安裝很簡單，只需先下載官方的原始碼：

    git clone https://github.com/Tyriar/vscode-theme-generator-quick-start
    cd vscode-theme-generator-quick-start
    npm install

然後透過下方程式碼修改 *index.ts* ：

```js
import { generateTheme, IColorSet } from 'vscode-theme-generator';
const colorSet: IColorSet = {
  base: {
    background: '#12171F',
    foreground: '#EFEFEF',
    color1: '#399EF4',
    color2: '#DA6771',
    color3: '#4EB071',
    color4: '#FFF099',
  }
};
generateTheme('Blackie Theme', colorSet, path.join(__dirname, 'theme.json'));
```

接著我們透過下方指令即可快速產生 *theme.json* 檔案

    npm start

![theme_generator_result](theme_generator_result.png)

套用的 Theme 結果如下：

![theme_example](theme_example.png)

## [補充] Color Palette ##

如果不太會選擇顏色也沒關係，可以參考一些調色盤工具，如 [Adobe Color CC](https://color.adobe.com/)

這類型的工具已經幫我們配好色差應該是多少，我們只要給予基準色與選擇想呈現的色差風格即可：

![adobe_cc](adobe_cc.png)

對於這類型調色盤的工具選擇可以參考：

[Best Color Palette Generators](http://htmlcolorcodes.com/resources/best-color-palette-generators/)

## [補充] vscode-icons ##

眼尖的朋友有詢問影片中左邊的檔案與資料夾為什麼也有 icon 圖示 與資料夾分類的顏色與圖示呢？

![icons](icons.png)

其實這是另外一個套件 [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons) 所帶來的效果

![preview](preview.gif)

有興趣的朋友可以參考先前的[Visual Studio Code Icons Extension
](https://blackie1019.github.io/2017/04/04/Visual-Studio-Code-Icons-Extension/)安裝與設定