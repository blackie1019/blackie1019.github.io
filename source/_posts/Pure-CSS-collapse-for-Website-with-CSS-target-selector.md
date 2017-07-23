---
layout: post
title: 'Pure CSS collapse for Website with CSS :target selector'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - CSS
tags:
  - HTML5
  - CSS Selector
sitemap: true
date: 2017-07-23 10:06:07
---

分享如何使用 CSS Selector 製作 Pure CSS 的 Collapse 效果。
<!-- More -->

![banner](banner.gif)

在網頁開發時難免會需要製作收闔(Collapse)的可摺疊效果，如 *w3schools.com* 呈現的 *Bootstrap Collapse* 的[範例](https://www.w3schools.com/bootstrap/bootstrap_collapse.asp)，使用上非常簡單。

而如果我們今天想自己刻一個類似的 Collapse 其實也沒太複雜，只是會HTML醜一點。這邊就是示範如何使用CSS Selector的 **:target** 來實作 Collapse 效果。

## CSS Selector ##

這邊我們會使用 CSS Selector 來幫我們實作，而由於 CSS Selector 在目前個瀏覽器的主流版本大都支援，所以很少會有相容性的問題。完整的相容性參考[Browser support varies](http://caniuse.com/#feat=css-sel3)

實作請參考下方:

<iframe width="100%" height="315" src="https://codepen.io/blackie1019/pen/xLKPoK" frameborder="0" allowfullscreen></iframe>

使用上的語意與結構不難，就是將我們原本的 <a> 的 *href* 屬性指定到特定錨點ID(如:範例的#hide, #show) 就是我們對應的 id 為 *hide* 與 *show* 的屬性為我們的更改目標，並套購 :target 內的 CSS 屬性值。

而第一個 css 的條件 => **.details,.show,.hide:target** 翻成白話為以下條件:
- 不顯示 class 名稱為 *details* 的元素
- 不顯示 class 名稱為 *show* 的元素
- 不顯示 class 名稱為 *hide* 內的 **指定的target目標** 元素

而第二個 css 的條件 => **#hide:target + #show,#hide:target ~ .detail** 翻成白話為以下條件:
- 顯示 id 名稱為 *hide* 內的 **指定的target目標**下 緊接著 id 名稱為 *show* 的元素
- 顯示 id 名稱為 *hide* 內的 **指定的target目標**下 且包含 class 名稱為 *detail* 的元素

## Other Alternatives ##

除了上面的 *CSS Selector* 的做法，如果不考慮部分瀏覽器的相容性(IE, Edge與Opera Mini)，單用HTML5的 *summary* 與 *detail* 標籤就可以達成我們的需求:

<iframe width="90%" height="315" src="https://codepen.io/blackie1019/pen/ayoVxe" frameborder="0" allowfullscreen></iframe>

光就解決辦法來看，這個寫法比較漂亮也不會撰寫重複的HTML內容。而這個解決的詳細相容性參考[Browser support varies](http://caniuse.com/#feat=details)

至於選擇哪一個解法就要見仁見智瞜~!

## References ##

- [Bootstrap Collapse](https://www.w3schools.com/bootstrap/bootstrap_collapse.asp)
- [MDN : CSS Selectors :target](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)
- [CSS3 :target Selector](https://www.w3schools.com/cssref/sel_target.asp)
- [HTML <summary> Tag](https://www.w3schools.com/tags/tag_summary.asp)
- [stackoverflow : Pure CSS collapse/expand div](https://stackoverflow.com/questions/15095933/pure-css-collapse-expand-div)