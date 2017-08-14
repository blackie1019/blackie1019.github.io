---
layout: post
title: Update Jenkins Theme with Simple Theme Plugin
subtitle: ''
author: Blackie
header-img: ''
categories:
  - CI&CD
tags:
  - Jenkins
sitemap: true
date: 2017-08-14 19:36:29
---

介紹如何透過 Simple Theme Plugin 更新 Jenkins UI

<!-- More -->

![banner](banner.png)

Jenkins 在現在程式開發裡面已經是不可或缺的 CI 工具，幫我們解決大大小小的建置流程與自動化行為，而預設的 Jenkins UI 是比較復古風的，這次介紹一下如何幫 Jenkins 拉皮給他一個符合現在網頁的長相。

## Simple Theme Plugin ##

首先要介紹的第一個套件是[Simple Theme Plugin](https://wiki.jenkins.io/display/JENKINS/Simple+Theme+Plugin)，這個套件可以幫我們加載客製化的 *css* 與 *js* 檔案。

安裝上只要先前往 Manage Jenkins > Plugin Manager > Available 頁籤:

![install_plugin](install_plugin.png)

記得要勾選重新啟動服務才能讓插件生效:

![install_plugin_restart](install_plugin_restart.png)

如果安裝過程遇到重啟服務一直是 *pending* 的可以手動至 *Service* 重新啟動 *Jenkins*

![install_plugin_pending](install_plugin_pending.png)

![install_plugin_manaually](install_plugin_manaually.png)

而當服務重新啟動後到 Manage Jenkins > Configure System 可以看到一個 Theme 區塊:

![configure_plugin](configure_plugin.png)

![theme_section](theme_section.png)

到這邊我們已經將套件與環境準備好了，接著我們可以採用任何一套 Jenkins 的 UI 主題，這邊要示範的是 afonsof 的 *Jenkins Material Theme*。

## Jenkins Material Theme ##

[jenkins-material-theme](http://afonsof.com/jenkins-material-theme/)的官方說明可以一步步的製作客製化的主題或是你要直接使用現有的主題。

![jenkin_material_theme](jenkin_material_theme.png)

當我們將產生的主題下載下來後可以放到任何一個空開的CDN，這邊展示上偷懶直接放到 Jenkins 的靜態路徑下(缺點是每次重新啟動該路徑都會不同)。

![static_theme](static_theme.png)

這邊我們可以看到每次啟動的靜態位置被寫入 head 屬性內:

![host_static](host_static.png)

![css_url](css_url.png)

接著將路徑填入剛剛的 Theme > URL of theme CSS :

![update_url](update_url.png)

存檔後就可以看到畫面更新了：

![new_theme](new_theme.png)