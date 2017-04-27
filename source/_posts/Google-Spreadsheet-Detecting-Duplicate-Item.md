---
layout: post
title: Google Spreadsheet Detecting Duplicate Item
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-04-23 16:48:10
categories:
- Tool
tags:
- Google Spreadsheet
---

分享如何在 Google Spreadsheet 設定函示，針對Column檢查有無重複的值

<!-- More -->

今天假設幫社團開一個表單來讓各位社員填寫籃球球衣球褲的購買登記，其中號碼這個欄位不能重複

先看結果如下:

![preview](preview.gif)

實際成品[請參考](https://docs.google.com/spreadsheets/d/1zDnU-_eIQJyYhcRvd8kxtUCQ2vM0CvmRxLs-Fh2Gwx0/edit?usp=sharing)

## Add Dropbox by Data Validation ##

新增下拉資料到Sheet2，如下:

![setup_6](setup_6.png)

接著針對要提供下拉的欄位按住滑鼠右鍵新增*Data validation*:

![setup_1](setup_1.png)

在*Criteria*中下拉選擇*List from a range*，並填入要提供的下拉資料區間。這可以選擇的填入help text來幫我們提醒使用者:

![setup_2](setup_2.png)

在頁面上就可以看到下拉已經出現並會跳出指定的提醒文字:

![setup_4](setup_4.png)

接著繼續完成剩下的下拉選項的設定，這可以試著勾選*Reject input*來禁止使用者輸入:

![setup_3](setup_3.png)

完成後即可看到這部分的資料只能從下拉選項中選擇:

![setup_5](setup_5.png)

## Detecting Duplicate Value in Column ##

接下來用*countif*這個函式來幫我判斷特定欄位是否有重複的值:

    =countif(C4:C41,C4)>1

這邊當放上個寫法後就會去抓指定欄位是否有大於1的累加值，如果答案有重複的則會顯示*TRUE*，如果沒有重複則會顯示*FALSE*

## Add Conditional Formatting for Column ##

這邊將顯示加上樣式以便區分不同的狀態:

![setup_7](setup_7.png)

在這邊可以透過*Format cells if*選擇該欄資料(cell)的判斷規則:

![setup_8](setup_8.png)

下拉選擇*Text contains*就會針對有包含該特定文字的cell進行該樣式的套用:

![setup_9](setup_9.png)

完成後看一下剛剛的設定，如下(值為TRUE時給予紅色代表錯誤):

![setup_10](setup_10.png)

接著重複剛剛的步驟把正確時(值為FALSE給予湖水綠色代表正確)的樣式也新增套用上去，即可看到無重複資料時的結果:

![setup_11](setup_11.png)

有重複資料時的結果

![setup_12](setup_12.png)

## References ##

- [COUNTIFS](https://support.google.com/docs/answer/3256550?hl=zh-Hant)