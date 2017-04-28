---
layout: post
title: Flurry on iOS
subtitle: ""
date: 2013-08-27 00:29:45
author: Blackie
header-img: ""
categories:
- Mobile
tags:
- Phonegap
- Cordova
- iOS
- Flurry
- Customer Analysis
- Web Analysis
- Mobile Analysis
---

關於Flurry在iOS上面的設定

<!-- More -->

![Flurry 五周年研究報告：App 正在吞噬這個世界，Web 必須順應其變](1.PNG)

[完整文章來源](http://www.inside.com.tw/2013/04/08/flurry-five-year-report-it-s-an-app-world-the-just-web-lives-in-it)

## App 的世界：App 正在吞噬這個世界 ##

>Web 的世界：Web 已死？

開頭是一個很聳動的標題，但這的確是這幾年的趨勢，但不代表Web就要被淘汰，而是用其他延伸的開發架構轉化到不同使用方式，可以開發APP(web/hybrid app架構)或是做為server端語法(nodeJS),甚至可以做成embeded system(有興趣的可以參考[Mandice](http://www.mandice.com/))。這年頭要明確地掌握手中資源才可以做到最有效的利用，所以不管在哪一個平台或方式都要盡量收集使用者資訊，透過分析使用者行為的方式來改善或是藉此看到商機。

而這邊指的Web我把它視為指前端開發，因工作上還是hybrid app架構為主，所以環境還是以Phonegap+JQM為主要，這邊就來直接帶大家一步步的透過第三方的plugin在Phonegap上也快樂的使用Flurry這套收集工具的威力。

先列出所有要下載的東西很簡單只有兩項

- [Flurry](http://www.flurry.com/flurry-analytics.html)
- [Flurry plugin](https://github.com/jfpsf/flurry-phonegap-plugin)

Flurry的註冊跟操作比較複雜，這邊以iOS一步步的教學如下

## Flurry Setup on iOS ##

1. 至[Flurry](http://www.flurry.com/flurry-analytics.html)註冊會員並登入會員
2. 點到*Applications*後點選右方的*Add a New Application*
![新增Applicaion](2.PNG)
3. 這邊選擇你要加入的開發類型是哪一種，這邊我們選擇左上方的iPhone
![選擇Applicaion類型](3.PNG)
4. 接下來設定你的Application名稱與類型，下方有一個Restrict Feature Set的選項，如果勾選的話你會獲取到較少的使用者資料，與一般收集版本的差異請看[此處](http://support.flurry.com/index.php?title=Analytics/Overview/RestrictedFeatureSet)。
![設定Application名稱與類型](4.PNG)
5. 這邊如果你建立成功的話會產一組key，這組key就是專門來讓你放在程式裡面識別要記錄成哪一個Application的識別值，之後我們會把他放到你APP當中。![取得key](5.PNG)
6. 然後我們打開我們已經建立的iOS Phonegap專案(我這邊用的是2.5版本但目前到最新的2.9也是相容的)，將剛剛從官方SDK下載下來的*Flurry.h*跟*libFlurry.a*檔案放置你的專案內，位置在Classes下方
![iOS2架構](7.PNG)
7. 接者我們再把從plugin下載的iOS folder下的*FlurryPhoneGapPlugin.h*跟*FlurryPhoneGapPlugin.m*放到
Plugin下![iOS2架構](8.PNG)
8. 然後再把 flurryPlugin.js放入*www*下任意位置(這邊放在*www/js/ios/flurryPlugin.js*)
9. 最後會成這樣的配置，如圖
![iOS架構](6.PNG)

10. 接下來我們要在*config.xml*(舊版Phonegap是*Cordova.plist*)內新增一組key-value對應值
`<plugin name="flurryPlugin"value="FlurryPhoneGapPlugin" />`

如下圖![iOS2架構](9.PNG)

11. 最後我們只要再有要用到的html頁面加入剛剛的js位置並且使用下面的方式就可以使用了

```js
<script type="text/javascript"src="js/ios/flurryPlugin.js"></script><!--此段記得要放在cordova.js之後-->
<script  type="text/javascript">
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
window.plugins.flurry.startSession("你的application key");//這邊一定要先啟動Session
window.plugins.flurry.logEvent("[plugin]index.html");//記錄一項事件，事件名稱為[plugin]index.html
}
</script>
```

所有可以用function可以參考js裡面有實作的，如果有沒有的也可以自己實作再回饋到github歐(與你分享的快樂勝過獨自擁有~!)

Flurry比較麻煩的地方就是蒐集到的資料呈現在網站上大概要等6-12小時左右，所以一定不能即時回饋的。
在等待一陣子後返回剛剛的Flurry網站在Application的地方就可以看到妳剛剛的資料

![iOS2架構](10.PNG)

在左邊選單選到*Events*就可以看到我們設定的事件

![iOS2架構](11.PNG)

這邊如果點選每個事件右邊的user paths還能看到每個event之間的互動情形

![iOS2架構](12.PNG)

Flurry真的很棒，他可以幫你產生的數據直接產生報告，你可以從中做仔細分析使用者的行為以及偵錯一些exception的發生情形與統計使用者與硬體的情況...等等，應用面真的很廣，這邊希望大家都能透過這個工作做一個賺錢的app~!

如果你是要開發**iOS7 APP**的人請注意，這邊一定要用**最新的Flurry SDK**不然會有一定機率當機
