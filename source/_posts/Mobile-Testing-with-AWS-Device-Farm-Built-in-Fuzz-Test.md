---
layout: post
title: Mobile Testing with AWS Device Farm - Built-in Fuzz Test
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2017-05-01 19:42:49
categories:
- Testing
tags:
- AWS
- AWS Device Farm
- Automation Testing
- Behavior Testing
---

介紹 AWS Device Farm 的 Built-in Fuzz Test，並透過它完成手機上的 Monkey Testing

<!-- More -->

![cover](cover.jpg)

這次要介紹 AWS Device Farm 的 Built-in Fuzz Test 如何可以幫我們快速地進行手機應用程式測試。但在開始前我們先提提 *Monkey Testing* 與 *Fuzz testing*

## Monkey Testing and Fuzz testing ##

Monkey Testing = no test case + no test plan + no test requirement (即沒有測試案例、沒有測試計畫、也不知道測試透過需求)

![monkey testing](monkey testing.jpg)

往往我們的測試都是以正常的商務流程與系統功能(Happy Path)為主去做測試，而異常測試不可能有所有的例外流程去包裹，*因為人能想出來的意外絕對不是意外*。

而 *Monkey Testing* 的概念，就是當下完全沒有想法的亂點整個應用程式，看會跑出什麼結果出來的沒有特定目標與範圍的測試，這類測試通常都是亂數隨機組成的，有可能開開按一下音量大小，然後回到桌面再打開隨便點點或是輸入一些奇怪的數值，製造出一切有可能的結果。

而網路上你打Monkey Testing 應該找到的資料不多，因為在軟體測試方面這樣的測試我們稱為 **Fuzzing** 或 **Fuzz testing**。 但有不少人認為兩者還是不一樣的，Fuzz testing　重視的是資料的變異(輸入合理範圍外的資料格式或數值)，Monkey Testing 則是行為的變異(不按標準或是沒有方向的操作行為)。

![fuzz_testing](fuzz_testing.jpg)

## Built-in Fuzz Test ##

AWS Device Farm 提供 Built-in Fuzz Test 可以讓我們透過實體的行動裝置來進行該 Monkey Testing 。 我們僅需上傳待測試的 APP 或是開啟網頁，透過幾個簡單的設定即可馬上進行這類型的測試。

## Hands on Lab ##

這邊讓我們來實際操作一次，一開始需要先建立一個新的 Device Farm 專案(Project):

![aws_device_farm_new_project](aws_device_farm_new_project.png)

而後開始選擇要做 Automation Testing 還是 Remote Access:

![aws_device_farm_new_project_success](aws_device_farm_new_project_success.png)

選擇 Automation Testing 後即可上傳你的測試類型，這邊選擇 *iOS* ：

![aws_device_farm_built_in_fuzz_create](aws_device_farm_built_in_fuzz_create.png)

然後上傳你封裝好的apk檔案，這邊要注意一下記得要給AdHoc的版本：

![aws_device_farm_built_in_fuzz_create_upload](aws_device_farm_built_in_fuzz_create_upload.png)

上傳完成且透過驗證即可以看到旁邊步驟都亮了綠燈，接著我們就可以來指定要測試的類型，這邊選擇 *Built-in:Fuzz* 作為我們的類型：

![aws_device_farm_built_in_fuzz_create_type](aws_device_farm_built_in_fuzz_create_type.png)

我們可以開始選擇要用哪個指定的 *Device Pool* 或是再次挑選該次要跑的實機：

![aws_device_farm_built_in_fuzz_create_select_devices](aws_device_farm_built_in_fuzz_create_select_devices.png)

![aws_device_farm_built_in_fuzz_create_select_devices_detail](aws_device_farm_built_in_fuzz_create_select_devices_detail.png)

如果我們的測試有些環境設定或是相依的App也可以從這邊傳入：

![aws_device_farm_built_in_fuzz_create_device_state](aws_device_farm_built_in_fuzz_create_device_state.png)

最後在執行前會讓你選擇你這要運行的時間(最少五分鐘)，這邊選擇的時間要乘上你先前設定的機器書量才會是計價的 **Device Minutes**，所以要特別注意：

![aws_device_farm_built_in_fuzz_create_review_run](aws_device_farm_built_in_fuzz_create_review_run.png)

這邊直接看實際使用 Built-in Fuzz Test 測試一個 Hybrid App (React Native) 的過程:

<iframe width="560" height="315" src="https://www.youtube.com/embed/GmY3LmHP6cY" frameborder="0" allowfullscreen></iframe>

當運行完成就會提供我們該次測試的測試影片(如上)，並包含下面每台實體機的各行為測試紀錄與報告：

![aws_device_farm_built_in_fuzz_report_devices](aws_device_farm_built_in_fuzz_report_devices.png)

![aws_device_farm_built_in_fuzz_report_files](aws_device_farm_built_in_fuzz_report_files.png)

![aws_device_farm_built_in_fuzz_report_screen](aws_device_farm_built_in_fuzz_report_screen.png)

這邊要注意的一下，我們上傳到AWS的 Mobile APP 會在 *30天* 後自動移除，而所有的測試報告與紀錄會保留 *15 個月*。

## References ##

- [猴子测试是什么？](https://www.zhihu.com/question/34939418/answer/107543574)
- [Quality Taiwan 中文品質筆記 - 搞怪測試 (Monkey Test)](https://qualitytaiwan.wordpress.com/2013/09/25/%E6%90%9E%E6%80%AA%E6%B8%AC%E8%A9%A6-monkey-test/)
- [Difference between “fuzz testing” and “monkey test”](http://stackoverflow.com/questions/10241957/difference-between-fuzz-testing-and-monkey-test)
- [tutorialspoint - Monkey Testing](https://www.tutorialspoint.com/software_testing_dictionary/monkey_testing.htm)
- [tutorialspoint - Fuzz Testing](https://www.tutorialspoint.com/software_testing_dictionary/fuzz_testing.htm)