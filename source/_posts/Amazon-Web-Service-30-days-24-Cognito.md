---
layout: post
title: 'Amazon Web Service 30 days - 24 : Cognito'
subtitle: ''
author: Blackie
header-img: ''
categories:
  - Cloud
tags:
  - AWS
sitemap: true
date: 2018-01-12 00:04:26
---

30天鐵人賽介紹 AWS 雲端世界 - 24: 簡單上手的帳號整合管理服務 Cognito 

<!-- More -->

## What is Cognito ##

AWS Cognito 可以快速輕鬆地將使用者註冊/登入和存取控制新增到應用程式( Web 或 Mobile App 皆可)，支援普遍的社交帳號作為使用帳戶註冊(如Facebook、Google 和Amazon) 以及透過SAML 2.0 以企業身分供應商進行登入。

![Cognito-SI-CI-IMG_landing_federation.png](Cognito-SI-CI-IMG_landing_federation.png)

因為這個服務在現在的應用程式實在太普遍，所以給大家看一張圖應該就知道這要幹嘛用的:

![Cognito_SI_IMG_landing_iphone.png](Cognito_SI_IMG_landing_iphone.png)

所以透過 AWS Cognito 我們就可以快速的實作登入服務並取得授權的資料摟，接下來我們就來實做一下吧。

## Hands on Lab ##

首先先登入 [AWS Console] 後在中間的輸入框查詢 Cognito ，或是透過左上角的 Services 點選到　Security, Identity & Compliance　下的 Amazon Cognito 服務：

![lab_01.png](lab_01.png)

接著我們就快速建立分散式登入:

![lab_02.png](lab_02.png)

![lab_03.png](lab_03.png)

![lab_04.png](lab_04.png)

上述步驟會需要填入要整合的 APP ID，這邊以Facebook為例示範如何申請。

首先先至 [Facebook Developer Portal](https://developers.facebook.com/apps/) 申請開發帳號後就建立一個新的 APP :

![lab_05.png](lab_05.png)

![lab_06.png](lab_06.png)

選擇 Facebook 登入類型:

![lab_07.png](lab_07.png)

這邊填入網址:

![lab_08.png](lab_08.png)

我們即可將申請好的 Facebok APP ID 填入 Cognito 服務中:

![lab_09.png](lab_09.png)

完成申請後官方會有提式教你該如何使用 Cognito 的 SDK 與 API回應，這邊請直接參考小範例的程式碼:

```html
<!DOCTYPE html>
<html>

<head>
    <title>AWS Cognito + Facebook Login JavaScript Example</title>
    <meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="https://s3-ap-northeast-1.amazonaws.com/www.blackie1019.com/favicon.ico" />
</head>
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.176.0.min.js"></script>
<body>
    <fb:login-button scope="public_profile,email" onlogin="FB.getLoginStatus(statusChangeCallback);"></fb:login-button>

    <div id="status"></div>
    <script>
        AWS.config.region = 'ap-northeast-1';
    
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    
        window.fbAsyncInit = function () {
            FB.init({
                appId: '<FB App ID>',
                cookie: true,
    
                xfbml: true,
                version: 'v2.11'
            });
            FB.getLoginStatus(statusChangeCallback);
        };
    
    
        function statusChangeCallback(response) {
            console.log('statusChangeCallback', response);
    
            if (response.status === 'connected' && response.authResponse) {
    
                testAPI();
    
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: '<AWS Cognito ID>',
                    Logins: {
                        'graph.facebook.com': response.authResponse.accessToken
                    }
                });
    
                AWS.config.credentials.get(function (err) {
                    if (err) return console.log("Error", err);
                    console.log("Cognito Identity Id", AWS.config.credentials.identityId);
                });
    
            } else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'Please log into this app.';
            } else {
                document.getElementById('status').innerHTML = 'Please log into Facebook.';
            }
        }
    
    
        function testAPI() {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
            });
        }
    </script>
    
</body>

</html>
```

由於先前註冊的 Facebook APP ID 網域內容是放置 S3 上，所以我們只要將剛剛編輯的網頁丟至 S3 即可看到該頁面:

![lab_11_1.png](lab_11_1.png)

![lab_12.png](lab_12.png)

![lab_13.png](lab_13.png)

最後當有人從頁面登入後就可以去 Cognito 這邊看紀錄:

![lab_14.png](lab_14.png)

如此一來我們就可以 Cognito 整合不同的平台帳號達到多重登入的效果。

程式碼範例:[AWS Cognito sample code](https://github.com/blackie1019/aws-cognito-example)

## References ##

- [AWS Cognito](https://aws.amazon.com/cognito/)
- [Facebook Developers - Quickstarts](https://developers.facebook.com/quickstarts)