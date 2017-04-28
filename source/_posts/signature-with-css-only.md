---
layout: post
title: 使用CSS製作對話框簽名檔效果
subtitle: ""
date: 2013-10-09 00:29:45
author: Blackie
header-img: ""
categories:
- CSS
tags:
-
---
運用CSS製作取代圖片的簽名檔
<!-- More -->

![signature](singature.png)

小弟最近發現原來文章推薦數有點少(文章寫得太沒內容…orz)，所以只好用哀兵策略，跪求看完文章的大大們給點指教或按個推薦之類的，想說來弄個簽名檔提醒大家一下吧

剛好之前有看到[梅問題用CSS做對話框的效果](http://www.minwt.com/css/8996.html)

這邊使用他教學的範例做了一些小修正後搭配了圖片寫成下面的html與CSS

```html
<!--簽名檔CSS-->
<style type="text/css">
.mwt_border{
width: 250px;
height: 40px;
text-align: center;
color: #fff;
background: #252525;
position: relative;
border: solid 1px #252525;
margin-left: 80px;
top: -50px;
padding: 0px;
}
/*箭頭右*/
.signature .mwt_border .arrow_r_int{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:transparent transparent transparent #252525;
	position:absolute;
	top:20%;
	right:-30px;
}
/*箭頭右-邊框*/
.signature .mwt_border .arrow_r_out{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:transparent transparent transparent #252525;
	position:absolute;
	top:20%;
	right:-29px;
}

/*箭頭左*/
.signature .mwt_border .arrow_l_int{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:transparent #252525 transparent  transparent ;
	position:absolute;
	top:20%;
	left:-30px;
}
/*箭頭左-邊框*/
.signature .mwt_border .arrow_l_out{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:transparent #252525 transparent transparent ;
	position:absolute;
	top:20%;
	left:-29px;
}

/*箭頭上*/
.signature .mwt_border .arrow_t_int{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:transparent transparent #252525 transparent ;
	position:absolute;
	top:-30px;
	left:40px;
}
/*箭頭上-邊框*/
.signature .mwt_border .arrow_t_out{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:transparent transparent #252525 transparent ;
	position:absolute;
	top:-29px;
	left:40px;
}

/*箭頭下*/
.signature .mwt_border .arrow_b_int{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:#252525 transparent transparent transparent ;
	position:absolute;
	bottom:-30px;
	right:50px;
}
/*箭頭下-邊框*/
.signature .mwt_border .arrow_b_out{
	width:0px;
	height:0px;
	border-width:15px;
	border-style:solid;
	border-color:#252525 transparent transparent transparent ;
	position:absolute;
	bottom:-29px;
	right:50px;
}
.signature .signature-profile{
	width: 60px; 
	height: 60px;
}
</style>
<!--簽名檔HTML(http://www.minwt.com/css/8996.html)-->
<hr />
<div class="signature">
	<img alt="" src="http://blackie1019.github.io/img/profile2.jpg" style="width: 60px; height: 60px;" />
	<div class="mwt_border">
	<span class="arrow_l_int"></span>
	<span class="arrow_l_out"></span>
	如果覺得文章還不錯麻煩請在文章上面給予推薦，你的支持是小弟繼續努力產出的動力！</div>
</div>
```

將上面的的內容貼到後台組態設定的文章簽名檔中的Source內(如下圖)

![1](1.png)

這邊要稍微注意一下，上面程式碼中倒數的幾行，在編輯存檔後如果再進去原始碼修改則編輯器會把下面兩行清除，所以這邊建議可以先用註解的方式包起來之後有編修簽名檔的時候要記得把這兩行手動加回來。

```html
<span class="arrow_l_int"></span>
<span class="arrow_l_out"></span>
```

以上就可完成一個對話框效果的簽名檔摟，大家一起來改一下吧～
