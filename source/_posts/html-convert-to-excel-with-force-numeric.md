---
layout: post
title: 網頁資料輸出轉為Excel檔案時數字資料強制為文字呈現(含其他mso支援格式轉換)
subtitle: ""
date: 2013-09-30 00:29:45
author: Blackie
header-img: ""
categories:
- CSS
tags:
- Excel
---

在網頁應用程式開發上常常會有需求是要把表格呈現的資料轉為excel儲存，而遇到這些需求的時候往往就是透過直接輸出一個表格的方式(html table tag)把資料透過tr,th,td的方式印出來。

<!-- More -->

而有時候在印出的資料為一個數字的時候會發生印出少0的情況，如035781178印出來會變成35781178，而資料如果是035-781178卻可以成功印出。其實這樣是因為excel column預設的general format會將數字開頭的0去除，而文字格式則不會有這個問題。

實務上，下面是一段可以將電話前端0印出的classic asp程式

```html
<%
'設定輸出為excel格式
response.ContentType = "application/vnd.ms-excel"
'設定檔名
response.AddHeader "content-disposition", "attachment; 	filename=Export.xls"
%>
<%
Set RS = conn.execute(session("CardApply_Sql"))
%>
<HTML>
'設定編碼，避免中文亂碼
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body>
<%
Response.Write("<style type=text/css>")
Response.Write("td{mso-number-format:\@;}") '將所有td欄位格式改	為"文字"
Response.Write("</style>")
%>
<table border=1 style="font-size:12pt;">
<tr>
<th bgcolor="#d0d0d0">卡別</th>
<th bgcolor="#d0d0d0">卡號</th>
<th bgcolor="#d0d0d0">會員編號</th>
<th bgcolor="#d0d0d0">身分證字號</th>
<th bgcolor="#d0d0d0">姓名</th>
<th bgcolor="#d0d0d0">印製狀態</th>
<th bgcolor="#d0d0d0">E-mail</th>
<th bgcolor="#d0d0d0">申請時間</th>  
<th bgcolor="#d0d0d0">聯絡地址</th>
<th bgcolor="#d0d0d0">聯絡電話</th>
<th bgcolor="#d0d0d0">手機電話</th>
</tr>
<%
while not RS.EOF
	response.write "<tr>"
		response.write "<td align='left'>" & RS("CardType") & "</td>"
		response.write "<td align='left'>" & RS("CardNo") & "</td>"
		response.write "<td align='left'>" & RS("member_gicuitem") & "</td>"
		response.write "<td align='left'>" & RS("personalid") & "</td>"
		response.write "<td align='left'>" & RS("realname") & "</td>"
		response.write "<td align='left'>" & RS("email") & "</td>"
		response.write "<td align='left'>" & RS("xreffctupublic") & "</td>"			
		response.write "<td align='left'>" & RS("deditDate") & "</td>"
		response.write "<td align='left'>" & RS("address")&"</td>"
		response.write "<td align='left'>" & RS("telSection")&RS("tel") & "</td>"
		response.write "<td align='left'>" & RS("mobile") & "</td>"
	response.write "</tr>"
	RS.movenext
wend
%>
</table>
</body>
</html>
```

從上面可以看到，只要一段CSS就可以解決你的問題了，而如果你是要其他格式也可以幫你轉換，這邊幫大家找到一份整理資料如下：

```html
<table border="0" cellpadding="1" cellspacing="1" width="100%"><tbody><tr><td valign="top" width="50%">mso-number-format:"0"</td><td valign="top" width="50%">NO Decimals</td></tr><tr><td valign="top" width="50%">mso-number-format:"0\.000"</td><td valign="top" width="50%">3 Decimals</td></tr><tr><td valign="top" width="50%">mso-number-format:"\#\,\#\#0\.000"</td><td valign="top" width="50%">Comma with 3 dec</td></tr><tr><td valign="top" width="50%">mso-number-format:"mm\/dd\/yy"</td><td valign="top" width="50%">Date7</td></tr><tr><td valign="top" width="50%">mso-number-format:"mmmm\ d\,\ yyyy"</td><td valign="top" width="50%">Date9</td></tr><tr><td valign="top" width="50%">mso-number-format:"m\/d\/yy\ h\:mm\ AM\/PM"</td><td valign="top" width="50%">D -T AMPM</td></tr><tr><td valign="top" width="50%">mso-number-format:"Short Date"</td><td valign="top" width="50%">01/03/1998</td></tr><tr><td valign="top" width="50%">mso-number-format:"Medium Date"</td><td valign="top" width="50%">01-mar-98</td></tr><tr><td valign="top" width="50%">mso-number-format:"d\-mmm\-yyyy"</td><td valign="top" width="50%">01-mar-1998</td></tr><tr><td valign="top" width="50%">mso-number-format:"Short Time"</td><td valign="top" width="50%">5:16</td></tr><tr><td valign="top" width="50%">mso-number-format:"Medium Time"</td><td valign="top" width="50%">5:16 am</td></tr><tr><td valign="top" width="50%">mso-number-format:"Long Time"</td><td valign="top" width="50%">5:16:21:00</td></tr><tr><td valign="top" width="50%">mso-number-format:"Percent"</td><td valign="top" width="50%">Percent - two decimals</td></tr><tr><td valign="top" width="50%">mso-number-format:"0%"</td><td valign="top" width="50%">Percent - no decimals</td></tr><tr><td valign="top" width="50%">mso-number-format:"0\.E+00"</td><td valign="top" width="50%">Scientific Notation</td></tr><tr><td valign="top" width="50%">mso-number-format:"\@"</td><td valign="top" width="50%">Text</td></tr><tr><td valign="top" width="50%">mso-number-format:"\#\ ???\/???"</td><td valign="top" width="50%">Fractions - up to 3 digits (312/943)</td></tr><tr><td valign="top" width="50%">mso-number-format:"\0022£\0022\#\,\#\#0\.00"</td><td valign="top" width="50%">£12.76</td></tr><tr><td valign="top" width="50%">mso-number-format:"\#\,\#\#0\.00_ \;\[Red\]\-\#\,\#\#0\.00\ "</td><td valign="top" width="50%"><p>2 decimals, negative numbers in red and signed<br>(1.56   <span style="color:#cc0000;">-1.56</span>)</p></td></tr></tbody></table>
```