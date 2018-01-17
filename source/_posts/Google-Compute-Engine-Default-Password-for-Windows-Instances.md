---
layout: post
title: Google Compute Engine Default Password for Windows Instances
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-11 21:16:27
categories:
- Cloud
tags:
- Cloud
- GCP
- GCE
- Google Compute Engine
- Windows Server
---

解決在 Google Compute Engine 啟用 Windows Server VM 需要 RDP 登入時的預設密碼問題

<!-- More -->

![cover](cover.jpg)

當我們在 Google Compute Engine 透過 *cloud launcher* 快速啟用 ASP.NET + Windows Server + SQL Server 的 VM Instance ：

![gcp_aspnet_launcher](gcp_aspnet_launcher.png)

過程中服務會一一啟動，在全部完成前無法連線至遠端或是開啟該主機的 80 port 網頁：

![gcp_windows_doing](gcp_windows_doing.png)

當成功完成所有啟用，會有下面的畫面：

![gcp_windows_create_pw](gcp_windows_create_pw.png)

而我們可以在 Chrome 安裝[Chrome RDP for Google Cloud Platform](https://chrome.google.com/webstore/detail/chrome-rdp-for-google-clo/mpbbnannobiobpnfblimoapbephgifkm?utm_source=chrome-ntp-launcher) 或是其他的 RDP 套件都可以幫我們做登入．

這邊我們就可以點選 RDP 登入遠端主機：

![gcp_rdp](gcp_rdp.png)

但當我們點下去的那一剎那應該會有點慌掉：

![gcp_windows_rdp_login](gcp_windows_rdp_login.png)

而回到剛剛的完成介面卻只看到 reset password 而非 create password :

![gcp_windows_first_login_fake](gcp_windows_first_login_fake.png)

還在回想 Windows Server 有預設什麼密碼的時候，決定先去官方看了一次文件才發現第一次登入是可以安心按下重設密碼的：

![gcp_windows_first_login](gcp_windows_first_login.png)

後我們成功的登入主機，這邊確定一下 ip 是一樣的：

![gcp_windows_rdp](gcp_windows_rdp.png)

提醒一下，密碼更換會導致該帳號的安全性相關設定重設，所以如果不是真的忘記密碼要稍微注意一下．

![gcp_windows_rdp_warning](gcp_windows_rdp_warning.png)

結論 ： Windows Server 是沒有預設密碼的，請第一次登入的朋友請安心**重設密碼**

## References ##

- [Creating Passwords for Windows Instances](https://cloud.google.com/compute/docs/instances/windows/creating-passwords-for-windows-instances)