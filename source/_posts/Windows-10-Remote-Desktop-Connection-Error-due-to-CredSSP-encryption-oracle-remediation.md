---
layout: post
title: >-
  Windows 10 Remote Desktop Connection Error due to CredSSP encryption oracle
  remediation
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-05-23 23:45:31
categories:
- Windows
tags:
- Windows 10
---

分享如何解決 Windows 10 遠端登入時遇到 CredSSP encryption oracle remediation 問題

<!-- More -->

![1.png](1.png)

在 2018 年的三月 Microsoft 例行安全更新的發佈上This could be due to CredSSP encryption oracle remediation.

更多細節請參考,[CredSSP updates for CVE-2018-0886](https://support.microsoft.com/en-us/help/4093492/credssp-updates-for-cve-2018-0886-march-13-2018)

而會造成無法遠端登入的原因是因為要解決一個Credential Security Support Provider protocol (CredSSP) 安全性弱點，而在五月的Windows 更新當中有兩樣設定的變更:

1. 需自行修正與設定在連線進行身份驗證處理時如何支援 Credential Security Support Provider protocol (CredSSP) 的相關請求驗證。

2. 變更 *Group Policy*，將 Encryption Oracle Remediation 預設從 **Vulnerable** 變更至 **Mitigated**。

## How to Fix it! ##

1. 輸入 *gpedit.msc* 開啟 本機群組原則編輯器(Local Group Policy Editor):

  ![2_1.png](2_1.png)

2. 至  Computer Configuration > Administrative Templates > System > Credentials Delegation 中修改 Encryption Oracle Remediation，將其從未設定(Not Configured)改為啟用(Enalbed)的狀態:

  ![2.png](2.png)

3. 記得修改時也需要將保護等級(Protect Level)改為 **Vulnerable**:

  ![3.png](3.png)

透過以上設定即可恢復遠端登入的功能。

## RDP with CredSSP ##

如果是使用[Remote Desktop Organizer (RDO)](https://www.azofreeware.com/2010/06/remote-desktop-organizer-142.html)的朋友，記得要到進階選項中啟用 CredSSP:

![4.png](4.png)

## References ##
- [Unable to RDP to Virtual Machine: CredSSP Encryption Oracle Remediation](https://blogs.technet.microsoft.com/mckittrick/unable-to-rdp-to-virtual-machine-credssp-encryption-oracle-remediation/)