---
layout: post
title: GCP - Running Windows Server Failover Clustering Step by Step - Part 2
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2018-06-01 20:40:48
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

## Creating the file share witness ##

## Testing the failover cluster ##

## Adding a role ##

## Creating the internal load balancer ##

## Validating the load balancer ##

## Installing your application ##

## Costs ##

## References ##
