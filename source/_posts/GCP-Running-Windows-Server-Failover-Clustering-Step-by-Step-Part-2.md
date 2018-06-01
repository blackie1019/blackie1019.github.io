---
layout: post
title: GCP - Running Windows Server Failover Clustering Step by Step - Part 2
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-06-01 09:40:48
categories:
- Cloud
tags:
- Cloud
- GCP
- Google Compute Engine
- Window Server
- Failover Clustering
- IIS
---
手把手介紹如何在 Google Platform 上面建立 Windows Server 容錯移轉叢集並達到IIS Web Application HA 的效果。此篇為下集從叢集容錯管理設定到如何在 GCP 中達成 IIS 的請求移轉。

<!-- More -->

本篇架構參考 Google 官方文件的 [Running Windows Server Failover Clustering](https://cloud.google.com/compute/docs/tutorials/running-windows-server-failover-clustering)。主要針對整體操作完整的手把手教學並針對細節描述。而針對讀者在閱讀上更能融入整體教學，稍微調整了原文的順序。

在上篇已建置完 GCP 主機並加入至 AD 內做管理，這邊將接手完成叢集容錯的安裝與設定

## Setting up failover clustering ##

接著在 *wsfc-1* 與 *wsfc-2* 完成以下動作
- 遠端登入主機
- 安裝 *Failover Clustering*，安裝時要用 *WSFC.TEST\clusteruser* 進行操作，不然會無法完成安裝。這邊要注意不用安裝該功能在 *wsfc-dc* 主機上。
- 將 wsfc-1 與 wsfc-2 設為叢集內的節點(node)
- 透過驗證步驟就可以知道當前設定是否正確，並透過 *Create the cluster now using the validated nodes* 這個按鈕即可立即為當前驗測過的步驟建立叢集。
- 在 Create Cluster Wizard 中的 *Access point* 內設定叢集名稱為 **testcluster**
- 將位置設定為 *10.0.0.8*

首先完成 Failover Clustering 安裝:

![Image 061.jpg](Image 061.jpg)

接著開始加入節點:

![Image 062.jpg](Image 062.jpg)

![Image 063.jpg](Image 063.jpg)

![Image 064.jpg](Image 064.jpg)

![Image 065.jpg](Image 065.jpg)

![Image 066.jpg](Image 066.jpg)

![Image 068.jpg](Image 068.jpg)

![Image 069.jpg](Image 069.jpg)

完成後即可看到當前節點出現兩台新增的主機與當前配置狀態(Assigned Vote 與 Current Vote):

![Image 067.jpg](Image 067.jpg)

詳細步驟可以參考微軟官方的 [Create a Failover Cluster](https://technet.microsoft.com/en-us/library/dn505754(v=ws.11).aspx#Validate%20the%20configuration)

## Creating the file share witness ##

而當成將兩台主機都加入叢集內作為可使用節點時，我們需要透過一個公平的投票機制選出誰為當前主要運作節點接手服務處理，為此我們需要建立一個 quorum 制度來做仲裁。

這部分很簡單的透過一個sharefolder的方式來傳給 AD ，告知當前哪一台主機離線則需要將判斷是否要將工作交給另外一台接手。 GCP 目前是相信可透過 [Live Migration](https://cloud.google.com/compute/docs/instances/live-migration) 與 [automatic restart](https://cloud.google.com/compute/docs/instances/setting-instance-scheduling-options#autorestart) 來提供可信賴的 Share Witness 服務。

這邊透過以下步驟可以透過檔案分享建立起見證機制來控制當前叢集處理的角色分配:

### 建立檔案分享路徑 ###

1. 遠端連線進入 *wsfc-dc*
2. 設定檔案分享的資料於該台主機上 *C:\\shares\\* ，透過滑鼠右鍵選擇分享。
3. 分享成功後並在裡面再建立一個資料夾 *clusterwitness-testcluster*

![Image 072.jpg](Image 072.jpg)

![Image 073.jpg](Image 073.jpg)

![Image 074.jpg](Image 074.jpg)

![Image 075.jpg](Image 075.jpg)

![Image 071.jpg](Image 071.jpg)

### 在叢集容錯處理中加入見證判斷的分享檔案配置 ###

1. 在叢集節點上的 *wsfc-1* 或 *wsfc-2*, 開啟 Failover Cluster Manager.
2. 於左側用滑鼠右鍵點選當前叢集 (testcluster.WSFC.TEST) 並移動至 More Actions 並點選 Configure Cluster Quorum Settings.
3. 接著透過設定精靈，一步步按下一步確認.
4. 當設定 quorum configuration option, 選擇 quorum witness 並選擇 Configure a file share witness.
6. 在路徑上選擇剛剛設定好的分享路徑(即可 "\10.0.0.6\clusterwitness-testcluster"). 這裡 10.0.0.6 的 IP 就是 wsfc-dc VM所設定配置的.
7. 按下確認完成所有配置

![Image 076.jpg](Image 076.jpg)

![Image 077.jpg](Image 077.jpg)

![Image 078.jpg](Image 078.jpg)

![Image 079.jpg](Image 079.jpg)

![Image 080.jpg](Image 080.jpg)

![Image 081.jpg](Image 081.jpg)

![Image 082.jpg](Image 082.jpg)

![Image 083.jpg](Image 083.jpg)

## Testing the failover cluster ##

到目前為止的配置已經成功完成了叢集處理的設定，這邊我們可以手動測試一下當前配置是否生效。

1. 在 wsfc-1 與 wsfc-2 以 clusteruser 身分運行 Windows PowerShell 
2. 在 PowerShell 輸入下方指令

        Move-ClusterGroup -Name "Cluster Group"

如果看到以下畫面則代表設定成功:

![Image 085.jpg](Image 085.jpg)

![Image 084.jpg](Image 084.jpg)

## Adding a role For IIS ##

接著開始針對叢集處理新增一個角色，該角色負責處裡 IIS 的工昨指派:

1. 在 Failover Cluster Manager 的 *Actions* 中選擇 Configure Role.
2. 在 Select Role 頁面中選擇 Other Server.
3. 在 Client Access Point 頁面中輸入 "IIS".
4. 設定分配進入的 IP 為 "10.0.0.9".
5. 跳過 Select Storage 與 Select Resource Types.
6. 確定當前配置並完成新增.

![Image 086.jpg](Image 086.jpg)

![Image 087.jpg](Image 087.jpg)

![Image 088.jpg](Image 088.jpg)

![Image 089.jpg](Image 089.jpg)

## Creating the internal load balancer ##

接著必須回去 Google Cloud Platform 上面建立一個內部使用的 Load Balancer 處理剛剛配置的 *10.0.0.9* 成為一個請求入口與後面分流。這邊配置分為前端(frotnend)負責處理進入的請求與後端(backend)負責處理真實請求的機器配置，設定時請記得同時配置才可使整體生效:

1. 進入 GCP Console 並前往 Load balancing 頁面. [OPEN LOAD BALANCING](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list?_ga=2.180746852.-2130771788.1527425782&_gac=1.257292665.1527645534.Cj0KCQjw9LPYBRDSARIsAHL7J5ndjL2Ymsb9CxFuNHjhk8yuQjCfNmrR55mOX6AGLaQSwJr8K6aVUeMaAsRQEALw_wcB)
2. 選擇建立一個新的 Load Balancer.
3. 選擇 TCP Load Balancing card 並選 Only between my VMs ，最後設定名稱為 *wsfc-lb*.

![Image 090.jpg](Image 090.jpg)

![Image 091.jpg](Image 091.jpg)

![Image 092.jpg](Image 092.jpg)

到此先別按下建立，我們需要切換至 Backend 區域給予其相關設定值。

### 配置 Backend ###

- 點選 Backend configuration.
- 選擇 Region.
- 選擇 *wsfcnet*.
- 選擇 *wsfc-group* 並建立 新的 health check.
- 名稱處輸入 *wsfc-hc*.
- 設定預設  cluster host agent 的回應接口 port 為 *59998*.
- 設定 Request, 輸入 *10.0.0.9*.
- 設定 Response, 輸入 *1*.
- 設定 Check interval, 輸入 *2*.
- 設定 Timeout 輸入 *1*.

![Image 093.jpg](Image 093.jpg)

![Image 094.jpg](Image 094.jpg)

![Image 095.jpg](Image 095.jpg)

儲存以上設定後繼續 frontend 配置。

### 配置 frontend ###

- 點選 Frontend configuration.
- 設定名稱 Name, 輸入 *wsfc-lb-fe*.
- 選擇 subnetwork (wsfcnetsub1).
- 設定 IP, 選擇 *Ephemeral (Custom)* 並輸入 *10.0.0.9*.
- 設定 Ports, 輸入 *80*.
- 點選完成.

![Image 096.jpg](Image 096.jpg)

### 重新檢視全部設定並完成配置 ###

在完成前可以再確認一下當前配置是否無誤:

![Image 097.jpg](Image 097.jpg)

### Create firewall rules for the health check ###

這邊要注意的是，後端配置上的主機必須要在 OS 防火牆內開啟相對的 port 號，否則無法生效。目前的配置為:

cluster node (wsfc-1 and wsfc-2) 必須允許 inbound 可透過 TCP connections 來接收至 59998 Port 的訊息.

![Image 098.jpg](Image 098.jpg)

![Image 099.jpg](Image 099.jpg)

![Image 100.jpg](Image 100.jpg)

![Image 101.jpg](Image 101.jpg)

![Image 102.jpg](Image 102.jpg)

透過 Cloud Shell 我們可以為當前的 Load Balancer 建立 Heathy Check 的機制來確認服務正常運行:

    gcloud compute firewall-rules create allow-health-check --network wsfcnet --source-ranges 130.211.0.0/22,35.191.0.0/16 --allow tcp:59998

![Image 103.jpg](Image 103.jpg)

## Validating the load balancer ##

目前的主機叢集的容錯檢查已經建立了，我們可以看到整個 GCP Load Balancing 服務當前只有一個 cluster-node 會是啟動的:

![Image 104.jpg](Image 104.jpg)

如果要進行測試，可以前往 Failover Cluster Manager 將其當下的 IIS Role 透過滑鼠右鍵選擇 *Move*，再點選 *Best Possible Node* 即可看到 Owner Node 在進行切換:

![Image 105.jpg](Image 105.jpg)

![Image 106.jpg](Image 106.jpg)

![Image 107.jpg](Image 107.jpg)

以上這個測試是模擬原先運作節點發生問題由叢集判斷需要其他節點接手時所會發生的行為。由此可以看到網站已經快速地將其從有問題的節點導入至其他正常運作的節點接手請求(request)的處理。

我們也可以透過 Cloud Shell 下面的指令進行確認:

    gcloud compute backend-services get-health wsfc-lb --region=[REGION]

![Image 108.jpg](Image 108.jpg)

接下來我們就只需要將兩台 cluster-node 安裝好 IIS 並啟動對應的網頁應用程式即可。

## Installing your application ##

這邊我們從 Add Roles and Features Wizard 可以快速地建立 IIS 服務與其角色:

![Image 109.jpg](Image 109.jpg)

![Image 110.jpg](Image 110.jpg)

這邊我們建立一個簡單的網頁應用程式並將 IP 顯示在網頁上面:

![Image 111.jpg](Image 111.jpg)

從 wsfc-1 本機檢查:

![Image 112.jpg](Image 112.jpg)

同樣的步驟我們也安裝在 wsfc-2 ，並從本機檢查:

![Image 113.jpg](Image 113.jpg)

而當配置都完成後我們從 wsfc-dc 去找 *10.0.0.9* (即我們區網內的 Load Balancer) 則可以看到出現的網頁是當前 Owner Cluster-Node 的頁面，即 wsfc-2:

![Image 114.jpg](Image 114.jpg)

![Image 115.jpg](Image 115.jpg)

到此，我們的設定教學已經完全結束。

## Costs ##

接下來讓我們看一下花費:

![Image 116.jpg](Image 116.jpg)

![Image 117.jpg](Image 117.jpg)

這個 POC 專案總共開了五天(5/27-5/31)，一天約 $10 美金的花費。開銷多半是花費在 Windows 的 VM 比較貴....

最後提醒大家記得要將已經不用的專案測底刪除避免 Comupted Engine 持續對你的 GCP 帳戶扣款...如何清除當前這個 POC 則參考原文的[Cleaning up](https://cloud.google.com/compute/docs/tutorials/running-windows-server-failover-clustering#clean-up)步驟吧

## 結語 ##

整個範例其實展示的結果很簡單但對於企業內部再使用雲端服務的幫助則是非常大的，以往要自行建立這樣的叢集容錯機制是具有相當大的難度與複雜度，但如今透過 GCP 的指令與 Windows UI 上面的設定精靈，我們可以很快速地完成相關設定，提供網頁應用程式更好的高可用性(High availability)。

而這個機制也不只用於內網，其實對外公開網站也可以用其方法建立叢集處理提供更佳的可用性!