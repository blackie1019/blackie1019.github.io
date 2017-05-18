---
layout: post
title: Prepack - A tool for making JavaScript code run faster
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-04 11:44:54
categories:
- JavaScript
tags:
- Front-End Optimization
- Prepack
---

介紹 Prepack 如何透過預先處理與編譯的方式幫助 js 加速。

<!-- More -->

![cover](cover.png)

## Prepack Introduction ##

[Prepack](https://github.com/facebook/prepack) 主要是可以幫我們處理一下可在編譯階段就預先進行計算的 js 函式或初始賦予值等動作，好處是可以幫我們省下很多處理與運算的時間，在透過全域變數(global variable)的方式來取用這些值來大幅度的增加效能。

例如原始碼這樣的程式:

```js
(function() {
  function fib(x) {
    return x <= 1 ? x : fib(x - 1) + fib(x - 2);
  }

  let x = Date.now();
  if (x * 2 > 42) x = fib(10);
  global.result = x;
})();
```

經過 Prepack 編譯處理後變成簡單的三元運算子(:

```js
(function () {
  var _$0 = Date.now();

  if (typeof _$0 !== "number") {
    throw new Error("Prepack model invariant violation: " + _$0);
  }

  result = _$0 * 2 > 42 ? 55 : _$0;
})();
```

這邊在看一個例子: 

編譯前:
```js
(function() {

  let valueA = 123,
      valueB = 234,
      result = 0;

  for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
          result = i * j;
      }
  }

  global.result = result * valueA % valueB + result * valueB % valueA;

})();
```

編譯後:
```js
result = 108;
```

這邊可以看到所有的迴圈計算都直接編譯並執行了，而產生的最後結果108則是被我們存到全域變數result裡面。

以目前本人使用的結果看來， Prepack 的功能還是很有限，對於 module.exports 與 參數展開的功能沒有支援，另外連 const 也會被忽略。

如果真的有比較偏向靜態函式,啟動參數或是前端資源檔(resource file)需求的朋友倒是可以參考，但程式碼也要將這部分抽離得很乾淨不然應該會發生錯誤而產生不出來檔案。

有興趣的朋友可以來這邊玩玩看，[Try it](https://prepack.io/repl.html)

## How to Use ##

安裝 Prepack CLI

    npm install -g prepack

安裝完成後即可透過 *prepack* 指令編譯我們的 js 檔案:

    prepack test.js

如果要設定產出的檔案名稱可以透過 --out 參數

  prepack test.js --out test-processed.js

我們也可以將其套件載入後交給 Webpack 或是Gulp 等套件做處理，如下:

```js
var Prepack = require("prepack");
import { prepack, prepackFileSync } from 'prepack';
import * as Prepack from 'prepack';
```

這邊可以考慮跟 Webpack 做整合的朋友可以參考[prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)