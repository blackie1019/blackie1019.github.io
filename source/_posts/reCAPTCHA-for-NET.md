---
layout: post
title: reCAPTCHA for .NET
subtitle: ''
author: Blackie
header-img: ''
sitemap: true
date: 2016-08-22 10:59:06
categories:
- .NET
tags:
- CAPTCHA
- Web MVC/WebApi
- ASP.NET
---

reCAPTCHA計畫原本是由卡內基美濃大學所發展的系統，後來普遍被發展到防止非人為行為的自動程式上，包含Facebook與Twitter都有使用。此篇跟大家分享如何在Asp.Net上使用
reCAPTCHA for .NET來實現該功能。

<!-- More -->

## 運作方式 ##


> 為了驗證人類所輸入的文字是正確的，而不是隨意輸入，有兩個字會被顯示出來；一個是光學文字辨識軟體無法辨別的字，另一個是一個已經知道正確答案的字。如果使用者正確的回答出已知正確答案的字，那麼就假設所輸入的另一個光學辨識軟體無法辨識的字是認真的檢視後被輸入而非隨便輸入。

官方解說可以參考這部影片:

<iframe width="560" height="315" src="http://www.youtube.com/embed/jwslDn3ImM0" frameborder="0" allowfullscreen></iframe>

架構流程:

![流程](Recaptcha-api-diagram.gif)


## Google reCAPTCHA 演進 ##

其實目前Google的reCAPTCHA已經經過三次的演進，改變的目的都是降低人為辨識失敗率跟加速過程，避免在防止機器人的時候讓真的操作者使用者經驗更差。

### 第一代 ###

reCAPTCHA問題的所需的文字圖片，首先會由reCAPTCHA計畫網站利用Javascript API取得[6]，在終端使用者回答問題後，伺服器再連回reCAPTCHA計畫的主機驗證使用者的輸入是否正確。

![g1_ori](reCaptcha_1_o.jpg)

2012年起，reCAPTCHA除了原來的文字掃描圖片外，也採用Google街景拍攝的門牌號碼相片

![g1](reCaptcha_1.jpg)

### 第二代 ###

更新後的版本改用圖片來取代文字辨識率較差的問題，但有時圖片也不是真的很容易辨識..因為常常會有模擬兩可的答案...(畢竟不是自己拍的圖片呀)

![g2](reCaptcha_2.jpg)

### 第三代 ###

最新的版本在2014年底推出，這版只要勾選I'm not a rebot即可!是不是更簡單了

![g3](reCaptcha_3.png)

## reCAPTCHA for .NET ###

[recaptcha-net](https://github.com/tanveery/recaptcha-net)，這是NuGet上面的一個專案可讓.Net 同時支援Google reCAPTCHA Version 1與Version 2。設定與使用都相當簡單

### Features ###

- Render recaptcha control (HTML) with appropriate options for pre-defined themes and culture (language).
- Verify user's answer to recaptcha's challenge.
- Supports ASP.NET Web Forms and ASP.NET MVC.
- Supprts reCAPTCHA version 1 and version 2 in a seamless fashion.
- One of the most well-documented reCAPTCHA libraries in the open source community.

### Creating a reCAPTCHA API Key ###

- 前往[Google's reCAPTCHA](https://www.google.com/recaptcha)
- 點選Get reCAPTCHA. 此時會需要你登入Google帳號綁定該服務.
- 選擇註冊一個新網站(domain)並輸入一個識別名稱(tag/label)給該網站.
- 新增成功後會獲得一組 *Site Key* 與 *Secret Key*，這部分等等要被我們放進網站的 web.config 中設定.

### Setup ###

1. 安裝reCAPTCHA NuGet Package

        Install-Package RecaptchaNet

2. 將 reCAPTCHA Key 放入 Web.config File

    這邊範例放的是Version 2，如果要改成Version 1只需改成1就好

        <appSettings>
            <add key="recaptchaPublicKey" value="Your site key" />
            <add key="recaptchaPrivateKey" value="Your secret key" />
            <add key="recaptchaApiVersion" value="2" />
        </appSettings>

### Added Code ###

這邊官方提供兩個版本:WebForm與Web MVC(目前無WebAPI版本)。這邊因為不推廣WebForm了所以只講Web MVC的使用，如下:

#### Model ####

這邊簡單定義一個Model作為稍後傳入的資料結構，這邊設定為[Required]則表示稍後後段會驗證該參數是否有值，如果沒有給值則會視同表單驗證失敗

    namespace BKPlatform.App.MemberSite.Site.Models
    {
        using System.ComponentModel.DataAnnotations;

        public class MemberRegistrationModel
        {
            [Required]
            public string FirstName { get; set; }

            [Required]
            public string LastName { get; set; }

            [Required]
            public string MemberCode { get; set; }

        }
    }

#### Controller ####

使用上需載入Namespace

    using Recaptcha.Web;
    using Recaptcha.Web.Mvc;

然後加入新的Routing Action - RegisterMember

    public ActionResult RegisterMember([FromBody] MemberRegistrationModel model)
    {
        var recaptchaHelper = this.GetRecaptchaVerificationHelper();
        if (String.IsNullOrEmpty(recaptchaHelper.Response))
        {
            this.ModelState.AddModelError("", "Captcha answer cannot be empty.");
            return View(model);
        }

        var recaptchaResult = recaptchaHelper.VerifyRecaptchaResponse();

        if (recaptchaResult != RecaptchaVerificationResult.Success)
        {
            this.ModelState.AddModelError("", "Incorrect captcha answer.");
            return View(model);
        }

        if (this.ModelState.IsValid)
        {
            return RedirectToAction("Index");
        }

        return View(model);
    }

#### View ####

這邊在頁面只要透過官方寫好的Helper簡單的載入即可，記得要先載入google recaptcha的JavaScript API(這邊使用Layout客製的headScripts區域在head載入)

    @model BKPlatform.App.MemberSite.Site.Models.MemberRegistrationModel
    @using Recaptcha.Web.Mvc
    @{
        Layout = "~/Views/Shared/_Layout.cshtml";
    }

    @section headScripts{
        <script src='https://www.google.com/recaptcha/api.js'></script>
    }

    <h2>User Registration Form</h2>

    @using (Html.BeginForm())
    {
        @Html.ValidationSummary()
        <p>
            <label>Member Code:</label>
            @Html.PasswordFor(m => m.MemberCode)
        </p>
        <p>
            <label>First name:</label>
            @Html.TextBoxFor(m => m.FirstName)
        </p>
        <p>
            <label>Last name:</label>
            @Html.TextBoxFor(m => m.LastName)
        </p>

        @Html.Recaptcha(theme: Recaptcha.Web.RecaptchaTheme.Clean);

        <input type="submit" value="Submit" />
    }

#### Result #### 

這邊就是我們完成的畫面

![result](result.gif)

## References ##

- [ReCAPTCHA](https://zh.wikipedia.org/wiki/ReCAPTCHA)
- [Google釋出新版reCAPTCHA機制，只要點「我不是機器人」！](http://www.ithome.com.tw/news/92757)