---
layout: post
title: Solve Windows Server Remote Desktop Error for 'The connection cannot proceed because authentication is not enable and the remote computer requires that authentication be enabled to connect'
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-07-25 21:22:19
categories:
- Windows
tags:
- Windows
- Windows Server
- Remote
---

解決使用 RDO 遠端  Windows(包含Windows 10, Windows Server 2016) 桌面遇到連線認證等級未啟用的錯誤

<!-- More -->

![banner](banner.png)

當我們今天設定好一台新的 Windows 環境(一般家用的 Windows 10 或是 Windows Server 2016) 並想用遠端桌面作日後使用時，蠻多人除了預設遠端桌面程式外，會改用如 [Remote Desktop Organizer](http://www.azofreeware.com/2010/06/remote-desktop-organizer-142.html) 這樣的工具幫我們管理連線免去記帳號密碼與連線資料的設定，方便日後登入使用。

當我們常常會遇到新機器第一次連線時會出現下面認證等級未啟用的錯誤:

![error](error.png)

正常解決辦法如下:

1. 前往控制台(Control Panel)
2. 於右上方的查詢輸入 *remote* 
3. 點選 *Allow remote access to your computer* 後取消勾選 **Allow connections only from computes running Remote Desktop with Network Level Authentiication(recommended)**
4. 儲存後重啟該電腦

![setting](setting.png)

以上步驟可解決於發生在非 *Windows 10* 與 *Windows Server 2016* 的 Windows 作業系統問題。

但如果你該遠端環境安裝的是Windows 10 與 Windows Server 2016 透過上述方式是無法成功修改的，此時就只能從註冊檔做修改:

1. 開啟 *RegEdit*
2. 找到 Key : HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp
3. 將預設值 2 修改 *SecurityLayer* 為 **0**
4. 儲存後重啟該電腦

![registry](registry.png)

![registry_update](registry_update.png)

透過上述兩種方式即可在任一 Windows 環境解決該問題。

## References ##
- [Fix | Windows 10, “the connection cannot proceed because authentication is not enabled”](https://digitaljive.wordpress.com/2015/07/21/fix-windows-10-the-connection-cannot-proceed-because-authentication-is-not-enabled/)