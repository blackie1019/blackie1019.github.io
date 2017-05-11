---
layout: post
title:  Google Chart API 畫出QRCode
subtitle: ""
date: 2013-09-27 00:29:45
author: Blackie
header-img: ""
categories:
- JavaScript
tags:
- Google Chart API
---

這是Google提供的一個免費的畫圖Web API Service ，只要傳入指定選項與內容即可透過呼叫Web API Service的方式產生你要的圖或表甚至是QRCode

<!-- More -->

## Google Chart API

除了傳統的直接互叫web service 服務之外，現在只要是google提供的API都有做動態載入的功能，使用上如下

```js
  <!--載入 AJAX API-->
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <script type="text/javascript">

    //動態載入 Visualization API 與 piechart package.
    google.load('visualization', '1.0', {'packages':['corechart']});

    // 設定 Google Visualization API 成功載入時的callback function
    google.setOnLoadCallback(drawChart);

    // 執行畫圖
    function drawChart() {

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // 設定畫圖相關屬性
      var options = {'title':'How Much Pizza I Ate Last Night',
                      'width':400,
                      'height':300};

      // 傳入畫圖相關數興趣產生畫圖的instance並將結果畫在指定內容上
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
  </script>
```
## 範例

這邊帶大家看一個QRCode的範例，此範例是用呼叫服務的方式產生

<a class="jsbin-embed" href="http://jsbin.com/AbEFEmu/1/embed?html,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

基本上要畫圖表也可以，而此範例適用動態載入後再呼叫服務的方式產生

<a class="jsbin-embed" href="http://jsbin.com/AbEFEmu/2/embed?html,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

## 結語

想知道還可以做到什麼更多的內容，請參考[此](https://google-developers.appspot.com/chart/interactive/docs/gallery)

想要線上玩玩Google的Chart API 可以到[此](https://code.google.com/apis/ajax/playground/?type=visualization#pie_chart)
